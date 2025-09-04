// app/walk/walking-summary.tsx
"use client";

import { useMemo } from "react";
import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { Share, Save, Trophy, MapPin, Clock, Route } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGoogleMaps } from "@/app/_providers";

// 간단 지도: sessionStorage/localStorage에서 경로를 읽어 폴리라인으로 표시
function RouteMap({ route }: { route: google.maps.LatLngLiteral[] }) {
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
				new google.maps.Marker({ map, position: route[0], label: "S", title: "시작" });
				new google.maps.Marker({ map, position: route[route.length - 1], label: "E", title: "도착" });
				new google.maps.Polyline({
					path: route,
					geodesic: true,
					map,
					strokeColor: "#22C55E",
					strokeOpacity: 0.95,
					strokeWeight: 5,
				});
				// bounds
				const b = new google.maps.LatLngBounds();
				route.forEach(p => b.extend(p));
				map.fitBounds(b);
			}}
		/>
	);
}

export default function WalkingSummary() {
	const router = useRouter();

	// 1) 트래커가 방금 저장한 세션을 우선 사용
	const { durationSec, distanceKm, route } = useMemo(() => {
		try {
			const raw = sessionStorage.getItem("walking:latest");
			if (raw) {
				const s = JSON.parse(raw) as {
					durationSec: number;
					distanceKm: number;
					route: { lat: number; lng: number }[];
				};
				return { durationSec: s.durationSec ?? 0, distanceKm: s.distanceKm ?? 0, route: s.route ?? [] };
			}
		} catch {}
		// 2) 없으면 예제 호환(localStorage.manualPath)
		try {
			const manual = localStorage.getItem("manualPath");
			if (manual) {
				const arr = JSON.parse(manual) as { lat: number; lng: number }[];
				const dist = arr.reduce((acc, cur, i) => (i ? acc + haversine(arr[i - 1], cur) : 0), 0);
				return { durationSec: 0, distanceKm: +(dist / 1000).toFixed(3), route: arr };
			}
		} catch {}
		return { durationSec: 0, distanceKm: 0, route: [] as { lat: number; lng: number }[] };
	}, []);

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

	return (
		<div className="min-h-[60vh]">
			{/* 통계 */}
			<div className="grid grid-cols-3 gap-4 mb-6">
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
						<RouteMap route={route} />
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
					onClick={() => {
						console.log("[save] walking record saved");
					}}
				>
					<Save className="h-4 w-4 mr-2" />
					저장하기
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
