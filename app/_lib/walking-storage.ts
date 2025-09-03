// lib/walking-storage.ts
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

// export type WalkingSession = {
//   id: string
//   startTime: Date
//   endTime?: Date
//   duration: number
//   distance: number
//   route: { lat: number; lng: number; timestamp: Date }[]
//   isActive: boolean
//   isPaused: boolean
// }

const KEY = "walking:latest";

export function saveLatestSession(s: WalkingSession) {
	if (typeof window === "undefined") return;
	sessionStorage.setItem(KEY, JSON.stringify(s));
}

export function loadLatestSession(): WalkingSession | null {
	if (typeof window === "undefined") return null;
	const raw = sessionStorage.getItem(KEY);
	if (!raw) return null;
	try {
		return JSON.parse(raw) as WalkingSession;
	} catch {
		return null;
	}
}

export function clearLatestSession() {
	if (typeof window === "undefined") return;
	sessionStorage.removeItem(KEY);
}
