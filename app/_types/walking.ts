export type RoutePoint = { lat: number; lng: number; timestamp: string }; // ISO

export type WalkingPin = {
	lat: number;
	lng: number;
	type: "start" | "end";
	timestamp: string; // ISO
};

export type WalkingSession = {
	id: string;
	startTime: string; // ISO
	endTime: string; // ISO
	durationSec: number; // 총 시간(초)
	distanceKm: number; // 총 거리(km)
	route: RoutePoint[];
	pins: WalkingPin[]; // 시작 및 종료 지점 핀
	isActive: boolean;
	isPaused: boolean;
};

// 산책 추적 훅 관련 타입들
export interface UseWalkTrackerProps {
	onStop: () => void;
}

export interface UseWalkTrackerReturn {
	// 지도 관련 refs
	mapRef: React.MutableRefObject<HTMLDivElement | null>;
	map: React.MutableRefObject<google.maps.Map | null>;
	marker: React.MutableRefObject<google.maps.Marker | null>;
	poly: React.MutableRefObject<google.maps.Polyline | null>;
	pathRef: React.MutableRefObject<google.maps.LatLngLiteral[]>;

	// 상태
	tracking: boolean;
	paused: boolean;
	manualMode: boolean;
	manualLatLng: { lat: number; lng: number } | null;
	elapsedMs: number;
	distance: number;

	// 함수들
	handleMapLoad: () => void;
	togglePause: () => void;
	toggleManualMode: () => void;
	finishAndNotifyParent: () => void;
	handleManualMove: (next: { lat: number; lng: number }) => void;
	setManualLatLng: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>;

	// 상수
	DEFAULT_CENTER: { lat: number; lng: number };
	DELTA: number;
}
