export type RoutePoint = { lat: number; lng: number; timestamp: string }; // ISO

export type WalkingSession = {
	id: string;
	startTime: string; // ISO
	endTime: string; // ISO
	durationSec: number; // 총 시간(초)
	distanceKm: number; // 총 거리(km)
	route: RoutePoint[];
	isActive: boolean;
	isPaused: boolean;
};
