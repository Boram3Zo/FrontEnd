import { useEffect, useRef, useState } from "react";
import { UseWalkTrackerProps, UseWalkTrackerReturn } from "@/app/_types/walking";
import { saveLatestSession } from "@/app/_libs/walkingStorage";
import { WALKING_CONSTANTS } from "@/app/_constants/walking";
import { useWalking } from "@/app/_providers";

/**
 * 산책 추적 커스텀 훅
 * GPS 위치 추적, 거리 측정, 경로 기록 등의 상태와 로직을 관리합니다
 */
export function useWalkTracker({ onStop }: UseWalkTrackerProps): UseWalkTrackerReturn {
	const { updateSession } = useWalking();

	// 지도/트래킹 상태
	const mapRef = useRef<HTMLDivElement | null>(null);
	const map = useRef<google.maps.Map | null>(null);
	const marker = useRef<google.maps.Marker | null>(null);
	const poly = useRef<google.maps.Polyline | null>(null);
	const pathRef = useRef<google.maps.LatLngLiteral[]>([]);

	// GPS
	const watchIdRef = useRef<number | null>(null);
	const [tracking, setTracking] = useState(true);
	const [paused, setPaused] = useState(false);

	// 수동
	const [manualMode, setManualMode] = useState(false);
	const [manualLatLng, setManualLatLng] = useState<{ lat: number; lng: number } | null>(null);

	// 통계
	const [elapsedMs, setElapsedMs] = useState(0);
	const [distance, setDistance] = useState(0);
	const [startedAt] = useState<number>(() => Date.now());

	const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };
	const DELTA = 0.0001;

	/**
	 * 지도 초기화 함수
	 */
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

	/**
	 * GPS 추적 시작
	 */
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

	/**
	 * GPS 추적 중지
	 */
	const stopTrackingInternal = () => {
		if (watchIdRef.current !== null) {
			navigator.geolocation.clearWatch(watchIdRef.current);
			watchIdRef.current = null;
		}
		setTracking(false);
	};

	/**
	 * 일시정지 토글
	 */
	const togglePause = () => {
		setPaused(p => !p);
		setTracking(false);
	};

	/**
	 * 수동 모드 토글
	 */
	const toggleManualMode = () => {
		if (tracking) return;
		setManualMode(prev => {
			const next = !prev;
			if (next) {
				const start = pathRef.current.length > 0 ? pathRef.current[pathRef.current.length - 1] : DEFAULT_CENTER;
				setManualLatLng(start);
				pathRef.current = [start];
				marker.current?.setPosition(start);
				map.current?.setCenter(start);
				poly.current?.setPath([start]);
			} else {
				setManualLatLng(null);
			}
			return next;
		});
	};

	/**
	 * 새 점 반영
	 */
	const handleNewPoint = (p: google.maps.LatLngLiteral) => {
		if (tracking && paused) return;
		const last = pathRef.current[pathRef.current.length - 1];
		if (last) setDistance(prev => prev + haversine(last, p));
		pathRef.current.push(p);
		marker.current?.setPosition(p);
		map.current?.setCenter(p);
		poly.current?.setPath(pathRef.current);
	};

	/**
	 * 종료 처리
	 */
	const finishAndNotifyParent = () => {
		stopTrackingInternal();

		const durationSec = Math.max(1, Math.round(elapsedMs / 1000));
		const distanceKm = +(distance / 1000).toFixed(3);
		const now = Date.now();
		const route = pathRef.current.map((p, i) => ({
			lat: p.lat,
			lng: p.lng,
			timestamp: new Date(now + i * 1000).toISOString(),
		}));

		// 시작점과 종료점 핀 생성
		const pins = [];
		if (pathRef.current.length > 0) {
			const startPoint = pathRef.current[0];
			const endPoint = pathRef.current[pathRef.current.length - 1];

			pins.push({
				lat: startPoint.lat,
				lng: startPoint.lng,
				type: "start" as const,
				timestamp: new Date(startedAt).toISOString(),
			});

			pins.push({
				lat: endPoint.lat,
				lng: endPoint.lng,
				type: "end" as const,
				timestamp: new Date().toISOString(),
			});
		}

		const completedSession = {
			id: crypto.randomUUID(),
			startTime: new Date(startedAt).toISOString(),
			endTime: new Date().toISOString(),
			durationSec,
			distanceKm,
			route,
			pins, // 시작 및 종료 지점 핀 추가
			isActive: false, // 🔴 완료된 세션으로 표시
			isPaused: false,
		};

		// 🔴 통합된 저장 함수 사용
		saveLatestSession(completedSession);

		// 🔴 WalkingProvider 상태도 업데이트
		updateSession(completedSession);

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

		onStop();
	};

	/**
	 * 수동 이동 핸들러
	 */
	const handleManualMove = (next: { lat: number; lng: number }) => {
		if (!manualMode || !manualLatLng) return;
		handleNewPoint(next);
	};

	/**
	 * 거리 계산 (Haversine 공식)
	 */
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

	// 타이머 효과
	useEffect(() => {
		if ((tracking || manualMode) && !paused) {
			const id = window.setInterval(() => setElapsedMs(v => v + 1000), 1000);
			return () => clearInterval(id);
		}
	}, [tracking, manualMode, paused]);

	// 실시간 세션 자동 저장 효과
	useEffect(() => {
		if ((tracking || manualMode) && !paused) {
			const id = window.setInterval(() => {
				// 30초마다 현재 진행 상황을 저장
				const currentSession = {
					id: crypto.randomUUID(),
					startTime: new Date(startedAt).toISOString(),
					endTime: "0", // 아직 진행 중
					durationSec: Math.round(elapsedMs / 1000),
					distanceKm: +(distance / 1000).toFixed(3),
					route: pathRef.current.map((p, i) => ({
						lat: p.lat,
						lng: p.lng,
						timestamp: new Date(startedAt + i * 1000).toISOString(),
					})),
					pins: [], // 진행 중일 때는 빈 배열
					isActive: true, // 진행 중 표시
					isPaused: paused,
				};
				saveLatestSession(currentSession);
				// 🔴 WalkingProvider 상태도 실시간 업데이트
				updateSession(currentSession);
			}, WALKING_CONSTANTS.SESSION_AUTO_SAVE_INTERVAL_MS);

			return () => clearInterval(id);
		}
	}, [tracking, manualMode, paused, elapsedMs, distance, startedAt, updateSession]);

	// GPS 시작 효과
	useEffect(() => {
		startTracking();
		if (window.google && mapRef.current) {
			handleMapLoad();
		}
		return () => {
			if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		// refs
		mapRef,
		map,
		marker,
		poly,
		pathRef,

		// 상태
		tracking,
		paused,
		manualMode,
		manualLatLng,
		elapsedMs,
		distance,

		// 함수들
		handleMapLoad,
		togglePause,
		toggleManualMode,
		finishAndNotifyParent,
		handleManualMove,
		setManualLatLng,

		// 상수
		DEFAULT_CENTER,
		DELTA,
	};
}
