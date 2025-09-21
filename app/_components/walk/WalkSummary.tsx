// app/walk/walking-summary.tsx
"use client";

import { useMemo } from "react";
import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { Share, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGoogleMaps } from "@/app/_providers";
import { WalkingPin } from "@/app/_types/walking";
import { mapsSearchUrlForLatLng } from "@/app/_utils/googleMaps";
import { addRoutePins } from "@/app/_components/map/pinUtils";
import { WalkTrackerStats } from "./WalkTrackerStats";

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
		console.log(mapInfo);
		return mapInfo;
	}, [pins]);

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
			<div className="w-full">
				<Button
					variant="outline"
					className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-lg font-medium rounded-xl"
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
