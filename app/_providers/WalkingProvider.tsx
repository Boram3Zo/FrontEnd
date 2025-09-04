"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { WalkingSession } from "@/app/_types/walking";
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

	// 사진을 경로에 추가하는 함수 (추후 구현)
	const addPhotoToRoute = (photo: SpotPhoto) => {
		// TODO: 2단계에서 구현
		console.log("사진을 경로에 추가:", photo);
	};

	// 사진을 경로에서 제거하는 함수 (추후 구현)
	const removePhotoFromRoute = (photoId: string) => {
		// TODO: 2단계에서 구현
		console.log("사진을 경로에서 제거:", photoId);
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
