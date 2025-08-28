// app/walk/walking-tracker.tsx
"use client";

import { useEffect, useRef, useState } from "react";
// Google Maps API <Script>는 layout.tsx에서 한 번만 로드됨
import { Button } from "@/components/ui/button";
import { ManualGpsControl } from "@/components/map/ManualGpsControl"; // 예제와 동일한 인터페이스 사용

// 부모 /walk 페이지의 stopWalking()을 그대로 호출하기 위한 props
export default function WalkingTracker({
	onStop,
}: {
	onStop: () => void; // 부모에서 정의한 stopWalking 그대로
}) {
	// === 지도/트래킹 상태 ===
	const mapRef = useRef<HTMLDivElement | null>(null);
	const map = useRef<google.maps.Map | null>(null);
	const marker = useRef<google.maps.Marker | null>(null);
	const poly = useRef<google.maps.Polyline | null>(null);
	const pathRef = useRef<google.maps.LatLngLiteral[]>([]); // 경로 리터럴 누적

	// GPS
	const watchIdRef = useRef<number | null>(null);
	const [tracking, setTracking] = useState(true); // 입장 시 자동 시작(스토리보드)
	const [paused, setPaused] = useState(false);

	// 수동
	const [manualMode, setManualMode] = useState(false);
	const [manualLatLng, setManualLatLng] = useState<{ lat: number; lng: number } | null>(null);

	// 통계
	const [elapsedMs, setElapsedMs] = useState(0); // 진행 시간
	const [distance, setDistance] = useState(0); // 누적 거리(m)
	const [startedAt] = useState<number>(() => Date.now());

	const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };
	const DELTA = 0.0001; // 수동 이동량

	const minutes = Math.floor(elapsedMs / 60000);
	const seconds = Math.floor((elapsedMs % 60000) / 1000);

	// === 지도 초기화 ===
	const handleMapLoad = () => {
		if (!mapRef.current || !window.google) return;
		map.current = new google.maps.Map(mapRef.current, {
			zoom: 16,
			center: DEFAULT_CENTER,
			clickableIcons: false,
			disableDefaultUI: true,
		});
		marker.current = new google.maps.Marker({
			map: map.current,
			position: DEFAULT_CENTER,
			title: "현재 위치",
		});
		poly.current = new google.maps.Polyline({
			path: [],
			geodesic: true,
			strokeColor: "#0066FF",
			strokeOpacity: 0.95,
			strokeWeight: 5,
			map: map.current,
		});
	};

	const startTracking = () => {
		if (manualMode) return;
		if (!navigator.geolocation) {
			alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
			return;
		}
		if (watchIdRef.current !== null) {
			navigator.geolocation.clearWatch(watchIdRef.current);
		}
		watchIdRef.current = navigator.geolocation.watchPosition(
			pos => {
				const cur = { lat: pos.coords.latitude, lng: pos.coords.longitude };
				handleNewPoint(cur);
			},
			err => {
				console.error(err);
				alert("위치 정보를 가져오지 못했습니다. 브라우저 권한을 확인해 주세요.");
			},
			{ enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
		);
		setTracking(true);
	};

	const stopTrackingInternal = () => {
		if (watchIdRef.current !== null) {
			navigator.geolocation.clearWatch(watchIdRef.current);
			watchIdRef.current = null;
		}
		setTracking(false);
	};

	const togglePause = () => {
		setPaused(p => !p);
		setTracking(false);
	};

	// === 수동 모드 토글 ===
	const toggleManualMode = () => {
		if (tracking) return; // GPS가 켜져 있으면 금지(충돌 방지)
		setManualMode(prev => {
			const next = !prev;
			if (next) {
				// 시작: 최근 위치(경로 마지막) 또는 DEFAULT_CENTER에서 시작
				const start = pathRef.current.length > 0 ? pathRef.current[pathRef.current.length - 1] : DEFAULT_CENTER;
				setManualLatLng(start);
				pathRef.current = [start];
				marker.current?.setPosition(start);
				map.current?.setCenter(start);
				poly.current?.setPath([start]);
			} else {
				// 종료는 "종료" 버튼에서 일괄 처리
				setManualLatLng(null);
			}
			return next;
		});
	};

	// === 새 점 반영(공통) ===
	const handleNewPoint = (p: google.maps.LatLngLiteral) => {
		// GPS 트래킹 중일 때만 일시정지 적용, 수동 모드에서는 항상 반영
		if (tracking && paused) return;
		// 거리 누적
		const last = pathRef.current[pathRef.current.length - 1];
		if (last) setDistance(prev => prev + haversine(last, p));
		// 지도 반영
		pathRef.current.push(p);
		marker.current?.setPosition(p);
		map.current?.setCenter(p);
		poly.current?.setPath(pathRef.current);
	};

	// === 종료: 세션 저장 + 부모 stopWalking() 호출(라우팅 X) ===
	const finishAndNotifyParent = () => {
		// GPS 정지
		stopTrackingInternal();

		// 세션 데이터 구성(요약/공유에서 지도 표시용)
		const durationSec = Math.max(1, Math.round(elapsedMs / 1000));
		const distanceKm = +(distance / 1000).toFixed(3);
		const now = Date.now();
		const route = pathRef.current.map((p, i) => ({
			lat: p.lat,
			lng: p.lng,
			timestamp: new Date(now + i * 1000).toISOString(),
		}));

		// sessionStorage에 최신 세션 보관(요약/공유 페이지들이 즉시 사용)
		const latest = {
			id: crypto.randomUUID(),
			startTime: new Date(startedAt).toISOString(),
			endTime: new Date().toISOString(),
			durationSec,
			distanceKm,
			route,
		};
		try {
			sessionStorage.setItem("walking:latest", JSON.stringify(latest));
		} catch {}

		// 예제 호환: manualPath / savedRoutes 도 저장해 두면 네가 준 RoutePage/RoutesPage와도 바로 호환됨
		// (원치 않으면 이 블록 삭제 가능)
		try {
			if (pathRef.current.length > 1) {
				localStorage.setItem("manualPath", JSON.stringify(pathRef.current));
				const existing = JSON.parse(localStorage.getItem("savedRoutes") || "[]");
				const newRoute = {
					id: `route_${Date.now()}`,
					name: `측정 경로 ${existing.length + 1}`,
					createdAt: new Date().toISOString(),
					path: pathRef.current,
					pointCount: pathRef.current.length,
				};
				existing.push(newRoute);
				localStorage.setItem("savedRoutes", JSON.stringify(existing));
			}
		} catch {}

		// 🔔 라우팅하지 않고 부모 /walk 페이지의 stopWalking() 실행
		onStop();
	};

	// === 수동 이동(키보드) 콜백 ===
	const handleManualMove = (next: { lat: number; lng: number }) => {
		if (!manualMode || !manualLatLng) return;
		handleNewPoint(next);
	};

	// === 보조: 거리 계산(Haversine, m) ===
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

	// === 타이머 ===
	useEffect(() => {
		if ((tracking || manualMode) && !paused) {
			const id = window.setInterval(() => setElapsedMs(v => v + 1000), 1000);
			return () => clearInterval(id);
		}
	}, [tracking, manualMode, paused]);

	// === GPS 시작 ===
	useEffect(() => {
		// 자동 시작
		startTracking();
		// 구글 맵 API가 이미 로드된 경우에도 지도 초기화
		if (window.google && mapRef.current) {
			handleMapLoad();
		}
		return () => {
			if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="space-y-4 p-4">
			{/* 지도 영역만 렌더링, <Script>는 제거됨 */}
			<div ref={mapRef} className="w-full h-[420px] rounded-2xl bg-gray-100" />

			{/* 정보/컨트롤 */}
			<div className="rounded-2xl p-4 bg-white/70 dark:bg-zinc-900/70 shadow">
				<div className="grid grid-cols-3 gap-4 text-center">
					<div>
						<div className="text-sm opacity-75">거리</div>
						<div className="text-2xl font-semibold">{(distance / 1000).toFixed(2)} km</div>
					</div>
					<div>
						<div className="text-sm opacity-75">시간</div>
						<div className="text-2xl font-semibold">
							{minutes}:{seconds.toString().padStart(2, "0")}
						</div>
					</div>
					<div>
						<div className="text-sm opacity-75">평균 페이스</div>
						<div className="text-2xl font-semibold">
							{distance > 0 ? `${Math.round(elapsedMs / 60000 / (distance / 1000))} 분/km` : "-"}
						</div>
					</div>
				</div>

				<div className="mt-4 grid grid-cols-3 gap-2">
					<Button variant="secondary" onClick={togglePause} disabled={!tracking && !manualMode}>
						{paused ? "재개" : "일시정지"}
					</Button>
					<Button variant="destructive" onClick={finishAndNotifyParent}>
						종료
					</Button>
					{/* 수동 모드: GPS 중엔 전환 불가 */}
					<Button variant="outline" onClick={toggleManualMode}>
						{manualMode ? "수동 종료" : "수동 측정"}
					</Button>
				</div>
			</div>

			{/* 수동 모드일 때만 키보드 컨트롤 */}
			{manualMode && manualLatLng && (
				<ManualGpsControl
					manualLatLng={manualLatLng}
					setManualLatLng={setManualLatLng}
					setLocation={() => {}}
					DELTA={DELTA}
					onMove={handleManualMove}
				/>
			)}
		</div>
	);
}
