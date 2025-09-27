"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { WalkingSession, WalkingPin } from "@/app/_types/walking";
import { SpotPhoto } from "@/app/_types/photoTypes";
import { loadLatestSession, saveLatestSession } from "@/app/_libs/walkingStorage";

interface WalkingContextType {
	/** 현재 산책 세션 */
	session: WalkingSession | null;
	/** 스팟 사진 목록 */
	spotPhotos: SpotPhoto[];
	/** 세션 업데이트 */
	updateSession: (session: WalkingSession) => void;
	/** 스팟 사진 설정 */
	setSpotPhotos: (photos: SpotPhoto[]) => void;
	/** 사진을 경로에 추가 */
	addPhotoToRoute: (photo: SpotPhoto) => void;
	/** 사진을 경로에서 제거 */
	removePhotoFromRoute: (photoId: string) => void;
	/** 세션 초기화 */
	clearSession: () => void;
}

const WalkingContext = createContext<WalkingContextType | undefined>(undefined);

interface WalkingProviderProps {
	children: ReactNode;
}

/**
 * 산책 관련 전역 상태를 관리하는 Provider
 */
export function WalkingProvider({ children }: WalkingProviderProps) {
	const [session, setSession] = useState<WalkingSession | null>(null);
	const [spotPhotos, setSpotPhotos] = useState<SpotPhoto[]>([]);

	// 초기 세션 로드
	useEffect(() => {
		const loadedSession = loadLatestSession();
		if (loadedSession) {
			setSession(loadedSession);
		}
	}, []);

	// 세션 업데이트 함수
	const updateSession = (newSession: WalkingSession) => {
		setSession(newSession);
		saveLatestSession(newSession);
	};

	// 사진을 경로에 추가하는 함수
	const addPhotoToRoute = (photo: SpotPhoto) => {
		console.debug("[addPhotoToRoute] adding photo to route:", photo);
		if (
			!photo.exifData ||
			typeof photo.exifData.latitude !== "number" ||
			typeof photo.exifData.longitude !== "number"
		) {
			console.warn("사진에 유효한 좌표가 없습니다.", photo);
			// 로컬에만 보관
			setSpotPhotos(prev => [...prev, photo]);
			return;
		}

		setSession(prev => {
			// 중복 체크: 동일 photoClientId 또는 photoId가 이미 존재하면 삽입하지 않음
			const existingPins = prev?.pins ?? [];
			if (
				existingPins.some(
					p =>
						(p.photoClientId && p.photoClientId === photo.id) ||
						(p.photoId && String(p.photoId) === String(photo.photoId))
				)
			) {
				console.debug("[addPhotoToRoute] photo already exists in pins, skipping:", {
					photoId: photo.photoId,
					photoClientId: photo.id,
				});
				return prev;
			}
			const lat = photo.exifData!.latitude!;
			const lng = photo.exifData!.longitude!;
			const timestamp = photo.exifData!.dateTimeOriginal ?? new Date().toISOString();

			const pin = {
				lat,
				lng,
				type: "photo" as const,
				timestamp,
				photoClientId: photo.id,
				photoId: photo.photoId,
			};

			// If there is no session yet, create a minimal session with this pin
			if (!prev) {
				const newSession = {
					id: Date.now().toString(),
					startTime: new Date().toISOString(),
					endTime: "0",
					durationSec: 0,
					distanceKm: 0,
					route: [],
					pins: [pin],
					isActive: false,
					isPaused: false,
				};
				setSpotPhotos(prev => [...prev, photo]);
				saveLatestSession(newSession);
				return newSession;
			}

			// Insert the photo pin between start and end pins according to route order.
			// Strategy:
			// - If session.route has coordinates, find the nearest segment index and insert pin into pins array after start and before end.
			// - Otherwise, append to pins array (after existing pins).

			const newPins: WalkingPin[] = prev.pins ? [...prev.pins] : [];

			if (prev.route && prev.route.length > 0) {
				// find nearest route index by minimal distance to a route point
				let bestIndex = 0;
				let bestDist = Infinity;
				for (let i = 0; i < prev.route.length; i++) {
					const rp = prev.route[i];
					const d = Math.hypot(rp.lat - lat, rp.lng - lng);
					if (d < bestDist) {
						bestDist = d;
						bestIndex = i;
					}
				}

				console.debug("[addPhotoToRoute] photo coords:", { lat, lng });
				console.debug("[addPhotoToRoute] nearest route index:", { bestIndex, bestDist });

				// We will insert the pin in the pins array such that pins remain roughly in route order.
				// Find the first pin whose route index is greater than bestIndex (approximation).
				// To do that, compute for each existing pin the nearest route index and compare.
				const pinRouteIndexes = newPins.map(p => {
					if (!prev.route || prev.route.length === 0) return -1;
					let bi = 0;
					let bd = Infinity;
					for (let j = 0; j < prev.route.length; j++) {
						const rp = prev.route[j];
						const dd = Math.hypot(rp.lat - p.lat, rp.lng - p.lng);
						if (dd < bd) {
							bd = dd;
							bi = j;
						}
					}
					return bi;
				});

				let insertAt = newPins.length; // default append
				for (let k = 0; k < pinRouteIndexes.length; k++) {
					if (pinRouteIndexes[k] > bestIndex) {
						insertAt = k;
						break;
					}
				}

				console.debug("[addPhotoToRoute] pinRouteIndexes:", pinRouteIndexes);
				console.debug("[addPhotoToRoute] insertAt:", insertAt);

				newPins.splice(insertAt, 0, pin);
				console.debug(
					"[addPhotoToRoute] pins after insert:",
					newPins.map(p => ({ type: p.type, lat: p.lat, lng: p.lng, photoClientId: p.photoClientId ?? null }))
				);
			} else {
				// No route -> just append
				newPins.push(pin);
			}

			const updatedSession = { ...prev, pins: newPins };
			setSpotPhotos(prev => [...prev, photo]);
			saveLatestSession(updatedSession);
			return updatedSession;
		});
	};

	// 사진을 경로에서 제거하는 함수
	const removePhotoFromRoute = (photoId: string) => {
		setSession(prev => {
			if (!prev) return prev;
			const filtered = (prev.pins || []).filter(p => p.photoClientId !== photoId && String(p.photoId) !== photoId);
			const updated = { ...prev, pins: filtered };
			saveLatestSession(updated);
			return updated;
		});

		setSpotPhotos(prev => prev.filter(p => p.id !== photoId));
	};

	// 세션 초기화
	const clearSession = () => {
		setSession(null);
		setSpotPhotos([]);
		if (typeof window !== "undefined") {
			sessionStorage.removeItem("walking:latest");
		}
	};

	const value: WalkingContextType = {
		session,
		spotPhotos,
		updateSession,
		setSpotPhotos,
		addPhotoToRoute,
		removePhotoFromRoute,
		clearSession,
	};

	return <WalkingContext.Provider value={value}>{children}</WalkingContext.Provider>;
}

/**
 * WalkingContext를 사용하기 위한 커스텀 훅
 */
export function useWalking() {
	const context = useContext(WalkingContext);
	if (context === undefined) {
		throw new Error("useWalking must be used within a WalkingProvider");
	}
	return context;
}
