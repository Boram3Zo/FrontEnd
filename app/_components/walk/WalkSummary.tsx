// app/walk/walking-summary.tsx
"use client";

import { useMemo, useState } from "react";
import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { Share, MapPin, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGoogleMaps } from "@/app/_providers";
import { WalkingPin } from "@/app/_types/walking";
import { mapsSearchUrlForLatLng } from "@/app/_utils/googleMaps";
import { addRoutePins } from "@/app/_components/map/pinUtils";
import { WalkTrackerStats } from "./WalkTrackerStats";
import { createPost, convertWalkingSessionToPostRequest } from "@/app/_libs/postService";

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
	const [isSharing, setIsSharing] = useState(false);

	// 1) 트래커가 방금 저장한 세션을 우선 사용
	const { durationSec, distanceKm, route, pins } = useMemo(() => {
		try {
			const raw = sessionStorage.getItem("walking:latest");
			if (raw) {
				const s = JSON.parse(raw) as {
					durationSec?: number;
					distanceKm?: number;
					route?: Array<{ lat: number; lng: number }>;
					pins?: WalkingPin[];
				};
				return {
					durationSec: s.durationSec ?? 0,
					distanceKm: s.distanceKm ?? 0,
					route: s.route?.map((r: { lat: number; lng: number }) => ({ lat: r.lat, lng: r.lng })) ?? [],
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
		const start = pins?.find((p: WalkingPin) => p.type === "start");
		if (!start) return { startAddress: null, startCoords: null, startDetailed: null, startGuRoad: null };
		const mapInfo = {
			startAddress: start.address ?? null,
			startCoords: { lat: start.lat, lng: start.lng },
			startDetailed: (start.addressDetailed as StartDetailed) ?? null,
			startGuRoad: [start.guName, start.roadName].filter(Boolean).join(" ") || null,
		};

		return mapInfo;
	}, [pins]);

	/**
	 * 산책 코스 공유하기 핸들러
	 * API를 먼저 호출하고 성공하면 /share 페이지로 이동
	 */
	const handleShareWalkingCourse = async () => {
		if (!route.length || durationSec === 0) {
			alert("공유할 산책 데이터가 없습니다.");
			return;
		}

		setIsSharing(true);

		try {
			// 산책 세션 데이터 구성
			const sessionData = {
				durationSec,
				distanceKm,
				route,
				pins,
			};

			// API 요청 데이터로 변환
			const postRequest = convertWalkingSessionToPostRequest(sessionData, {
				memberId: 1, // TODO: 실제 사용자 ID로 대체
				title: `${new Date().toLocaleDateString()} 산책`,
				region: startGuRoad || startAddress || "알 수 없는 지역",
				content: "멋진 산책 코스를 공유합니다!",
				theme: "",
				hashtags: [],
			});

			// 게시글 생성 API 호출
			const result = await createPost(postRequest);

			if (result.success) {
				// postId는 반드시 있어야 함
				if (result.data !== null && result.data !== undefined) {
					// 동적 라우트로 이동: /share/[id]
					const shareUrl = `/share/${result.data}`;

					// sessionStorage 백업 (브라우저 뒤로가기 등을 위한 보험)
					sessionStorage.setItem("created:postId", String(result.data));

					router.push(shareUrl);
				} else {
					// postId가 없는 경우는 API 에러로 처리
					console.error("❌ 게시글 생성은 성공했으나 postId가 반환되지 않음");
					alert("게시글 생성 후 ID를 받아오지 못했습니다. 다시 시도해주세요.");
				}
			} else {
				alert(`게시글 생성 실패: ${result.message}`);
			}
		} catch (error) {
			console.error("공유 중 오류 발생:", error);
			alert("공유 중 오류가 발생했습니다. 다시 시도해주세요.");
		} finally {
			setIsSharing(false);
		}
	};

	return (
		<div className="min-h-[60vh] px-4 py-6">
			{/* 통계 */}
			<div className="mb-6">
				<WalkTrackerStats
					distance={distanceKm * 1000}
					elapsedMs={durationSec * 1000}
					layout="grid"
					showExtended={false}
				/>
			</div>

			{/* 경로 지도 */}
			<Card className="mb-6 overflow-hidden">
				<div className="p-4 border-b bg-gradient-to-r from-blue-50 to-green-50">
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-2 mb-2">
							<div className="p-1.5 bg-blue-500 rounded-full">
								<MapPin className="h-4 w-4 text-white" />
							</div>
							<h3 className="font-semibold text-gray-800">내가 걸은 경로</h3>
						</div>
					</div>

					{/* 시작 위치 정보 */}
					<div className="mt-3 p-3 bg-white/70 rounded-lg">
						<div className="text-xs text-gray-500 mb-1">시작 위치</div>
						<div className="text-sm font-medium text-gray-700">
							{startGuRoad ? (
								<div className="flex items-center gap-1">
									<span className="text-blue-600">📍</span>
									<span>{startGuRoad}</span>
								</div>
							) : startAddress ? (
								<div>
									<div className="flex items-center gap-1">
										<span className="text-blue-600">📍</span>
										<span>{startAddress}</span>
									</div>
									{startDetailed?.formatted && startDetailed.formatted !== startAddress && (
										<div className="text-xs text-gray-500 mt-1 ml-4 opacity-75">{startDetailed.formatted}</div>
									)}
								</div>
							) : startCoords ? (
								<a
									className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
									href={mapsSearchUrlForLatLng(startCoords.lat, startCoords.lng)}
									target="_blank"
									rel="noreferrer"
								>
									<span>🗺️</span>
									<span className="underline">위치 보기</span>
								</a>
							) : (
								<div className="flex items-center gap-1 text-gray-400">
									<span>❓</span>
									<span>주소 정보 없음</span>
								</div>
							)}
						</div>
					</div>
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
			<div className="w-full space-y-3">
				<Button
					variant="outline"
					className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
					onClick={handleShareWalkingCourse}
					disabled={isSharing}
				>
					{isSharing ? (
						<>
							<Loader2 className="h-5 w-5 mr-2 animate-spin" />
							<span className="font-semibold">공유 중...</span>
						</>
					) : (
						<>
							<Share className="h-5 w-5 mr-2" />
							<span className="font-semibold">이 산책 코스 공유하기</span>
						</>
					)}
				</Button>

				<p className="text-sm text-gray-500 text-center">
					{isSharing ? "게시글을 생성하고 있습니다..." : "다른 사람들과 함께 이 멋진 산책 코스를 나누어보세요! 🚶‍♀️✨"}
				</p>
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
