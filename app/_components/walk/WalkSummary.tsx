// app/walk/walking-summary.tsx
"use client";

import { useMemo, useState } from "react";
import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { Share, Save, Trophy, MapPin, Clock, Route } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGoogleMaps } from "@/app/_providers";
import { WalkingSession, WalkingPin } from "@/app/_types/walking";
import { mapsSearchUrlForLatLng } from "@/app/_utils/googleMaps";
import { addRoutePins } from "@/app/_components/map/pinUtils";
import { saveRoute } from "@/app/_libs/routeService";

// 간단 지도: sessionStorage/localStorage에서 경로를 읽어 폴리라인으로 표시
function RouteMap({ route, pins }: { route: google.maps.LatLngLiteral[]; pins: WalkingPin[] }) {
	const { isLoaded } = useGoogleMaps();

	// 지도를 파일 내부에서 직접 렌더(공용 컴포넌트 없어도 동작하도록)
	return (
		<div
			className="w-full h-[220px] rounded-2xl bg-gray-100"
			ref={el => {
				if (!el || !route.length || !isLoaded) return;
				if (!window.google?.maps) return;
				const map = new google.maps.Map(el, {
					zoom: 16,
					center: route[0],
					clickableIcons: false,
					disableDefaultUI: true,
				});

				// 폴리라인으로 경로 표시
				new google.maps.Polyline({
					path: route,
					geodesic: true,
					map,
					strokeColor: "#22C55E",
					strokeOpacity: 0.95,
					strokeWeight: 5,
				});

				// 시작점과 종료점 핀 추가 (유틸리티 함수 사용)
				addRoutePins(map, route, pins);

				// bounds 설정
				const bounds = new google.maps.LatLngBounds();
				route.forEach(point => bounds.extend(point));
				map.fitBounds(bounds);
			}}
		/>
	);
}

export default function WalkingSummary() {
	const router = useRouter();
	const [isSaving, setIsSaving] = useState(false);

	// 1) 트래커가 방금 저장한 세션을 우선 사용
	const { durationSec, distanceKm, route, pins } = useMemo(() => {
		try {
			const raw = sessionStorage.getItem("walking:latest");
			if (raw) {
				const s = JSON.parse(raw) as WalkingSession;
				return {
					durationSec: s.durationSec ?? 0,
					distanceKm: s.distanceKm ?? 0,
					route: s.route?.map(r => ({ lat: r.lat, lng: r.lng })) ?? [],
					pins: s.pins ?? [],
				};
			}
		} catch {}
		// 2) 없으면 예제 호환(localStorage.manualPath)
		try {
			const manual = localStorage.getItem("manualPath");
			if (manual) {
				const arr = JSON.parse(manual) as { lat: number; lng: number }[];
				const dist = arr.reduce((acc, cur, i) => (i ? acc + haversine(arr[i - 1], cur) : 0), 0);
				return {
					durationSec: 0,
					distanceKm: +(dist / 1000).toFixed(3),
					route: arr,
					pins: [],
				};
			}
		} catch {}
		return {
			durationSec: 0,
			distanceKm: 0,
			route: [] as { lat: number; lng: number }[],
			pins: [] as WalkingPin[],
		};
	}, []);

	// 시작 위치 주소(가능하면 pins에서 가져옴)
	type StartDetailed = {
		formatted?: string;
		[k: string]: unknown;
	} | null;

	const { startAddress, startCoords, startDetailed, startGuRoad } = useMemo((): {
		startAddress: string | null;
		startCoords: { lat: number; lng: number } | null;
		startDetailed: StartDetailed;
		startGuRoad: string | null;
	} => {
		const start = pins?.find(p => p.type === "start");
		if (!start) return { startAddress: null, startCoords: null, startDetailed: null, startGuRoad: null };
		const mapInfo = {
			startAddress: start.address ?? null,
			startCoords: { lat: start.lat, lng: start.lng },
			startDetailed: (start.addressDetailed as StartDetailed) ?? null,
			startGuRoad: [start.guName, start.roadName].filter(Boolean).join(" ") || null,
		};
		console.log(mapInfo);
		return mapInfo;
	}, [pins]);

	const formatTime = (seconds: number) => {
		const h = Math.floor(seconds / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		const s = seconds % 60;
		if (h > 0) return `${h}시간 ${m}분 ${s}초`;
		return `${m}분 ${s}초`;
	};
	const formatDistance = (km: number) => (km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(2)}km`);
	const calculatePace = () => {
		if (!distanceKm) return "0'00\"";
		const paceMinutes = (durationSec || 1) / 60 / distanceKm;
		const m = Math.floor(paceMinutes);
		const s = Math.round((paceMinutes - m) * 60);
		return `${m}'${s.toString().padStart(2, "0")}"`;
	};

	// 경로 저장 핸들러
	const handleSaveRoute = async () => {
		if (isSaving) return;

		try {
			setIsSaving(true);

			// 세션 데이터 구성
			const session: WalkingSession = {
				id: crypto.randomUUID(),
				startTime: new Date().toISOString(),
				endTime: new Date().toISOString(),
				durationSec,
				distanceKm,
				route: route.map((r, i) => ({
					lat: r.lat,
					lng: r.lng,
					timestamp: new Date(Date.now() + i * 1000).toISOString(),
				})),
				pins,
				isActive: false,
				isPaused: false,
			};

			// 임시 memberId (실제로는 인증된 사용자 ID 사용)
			const memberId = 1; // TODO: 실제 로그인 사용자 ID로 교체

			const result = await saveRoute(
				session,
				pins,
				memberId,
				`산책 경로 - ${new Date().toLocaleDateString()}`,
				`총 거리: ${formatDistance(distanceKm)}, 소요시간: ${formatTime(durationSec)}`,
				"일반",
				["산책", "운동"]
			);

			console.log("경로 저장 성공:", result);
			alert(`경로가 성공적으로 저장되었습니다! (ID: ${result.data})`);
		} catch (error) {
			console.error("경로 저장 실패:", error);
			alert("경로 저장에 실패했습니다. 다시 시도해주세요.");
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className="min-h-[60vh] px-4 py-6">
			{/* 통계 */}

			<div className="grid grid-cols-4 gap-4 mb-6">
				<Card className="p-4 text-center bg-white shadow-lg">
					<Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
					<div className="text-lg font-bold text-gray-800 mb-1">{formatTime(durationSec)}</div>
					<div className="text-xs text-gray-600">총 시간</div>
				</Card>

				<Card className="p-4 text-center bg-white shadow-lg">
					<Route className="h-6 w-6 text-green-500 mx-auto mb-2" />
					<div className="text-lg font-bold text-gray-800 mb-1">{formatDistance(distanceKm)}</div>
					<div className="text-xs text-gray-600">총 거리</div>
				</Card>

				<Card className="p-4 text-center bg-white shadow-lg">
					<Trophy className="h-6 w-6 text-orange-500 mx-auto mb-2" />
					<div className="text-lg font-bold text-gray-800 mb-1">{calculatePace()}</div>
					<div className="text-xs text-gray-600">평균 페이스</div>
				</Card>
				<Card className="p-4 text-center bg-white shadow-lg">
					<Trophy className="h-6 w-6 text-orange-500 mx-auto mb-2" />
					<div className="text-lg font-bold text-gray-800 mb-1">{calculatePace()}</div>
					<div className="text-xs text-gray-600 break-words max-w-[10rem]">
						{startGuRoad ? (
							<div>{startGuRoad}</div>
						) : startAddress ? (
							<div>
								<div>{startAddress}</div>
								{startDetailed?.formatted && startDetailed.formatted !== startAddress ? (
									<div className="text-[10px] text-gray-500 mt-1 break-words">{startDetailed.formatted}</div>
								) : null}
							</div>
						) : startCoords ? (
							<a
								className="text-blue-600 underline"
								href={mapsSearchUrlForLatLng(startCoords.lat, startCoords.lng)}
								target="_blank"
								rel="noreferrer"
							>
								위치 보기
							</a>
						) : (
							"주소 정보 없음"
						)}
					</div>
				</Card>
			</div>

			{/* 경로 지도 */}
			<Card className="mb-6 overflow-hidden">
				<div className="p-4 border-b">
					<h3 className="font-semibold text-gray-800 flex items-center gap-2">
						<MapPin className="h-4 w-4" />
						내가 걸은 경로
					</h3>
				</div>
				<div className="p-4">
					{route.length ? (
						<RouteMap route={route} pins={pins} />
					) : (
						<div className="h-48 flex items-center justify-center text-gray-500">최근 산책 경로가 없습니다.</div>
					)}
				</div>
			</Card>

			{/* 액션 */}
			<div className="grid grid-cols-2 gap-3">
				<Button
					variant="outline"
					className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-lg font-medium rounded-xl"
					onClick={handleSaveRoute}
					disabled={isSaving}
				>
					<Save className="h-4 w-4 mr-2" />
					{isSaving ? "저장 중..." : "저장하기"}
				</Button>
				<Button
					variant="outline"
					className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-lg font-medium rounded-xl"
					onClick={() => router.push("/share")}
				>
					<Share className="h-5 w-5 mr-2" />
					공유하기
				</Button>
			</div>
		</div>
	);
}

// 보조: 거리(m)
function haversine(a: google.maps.LatLngLiteral, b: google.maps.LatLngLiteral): number {
	const R = 6371000;
	const toRad = (x: number) => (x * Math.PI) / 180;
	const dLat = toRad(b.lat - a.lat);
	const dLng = toRad(b.lng - a.lng);
	const lat1 = toRad(a.lat);
	const lat2 = toRad(b.lat);
	const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
	return 2 * R * Math.asin(Math.sqrt(h));
}
