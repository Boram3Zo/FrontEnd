// lib/walking-storage.ts
import type { WalkingSession } from "@/app/_types/walking";

const KEY = "walking:latest";

export function saveLatestSession(s: WalkingSession) {
	if (typeof window === "undefined") return;
	sessionStorage.setItem(KEY, JSON.stringify(s));
	console.debug("[saveLatestSession] saved:", s);
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
