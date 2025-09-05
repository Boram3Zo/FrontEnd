"use client";

import { useEffect, useRef } from "react";
import { WalkingPin } from "@/app/_types/walking";
import { createPinMarker } from "./pinUtils";

interface WalkingPinsProps {
	map: google.maps.Map | null;
	pins: WalkingPin[];
}

/**
 * 산책 경로의 시작점과 종료점 핀을 지도에 표시하는 컴포넌트
 */
export function WalkingPins({ map, pins }: WalkingPinsProps) {
	const markersRef = useRef<google.maps.Marker[]>([]);

	useEffect(() => {
		if (!map || !pins.length) {
			// 기존 마커들 제거
			markersRef.current.forEach(marker => marker.setMap(null));
			markersRef.current = [];
			return;
		}

		// 기존 마커들 제거
		markersRef.current.forEach(marker => marker.setMap(null));
		markersRef.current = [];

		// 새로운 핀들을 마커로 생성 (유틸리티 함수 사용)
		pins.forEach(pin => {
			const { marker } = createPinMarker(map, pin.type, { lat: pin.lat, lng: pin.lng }, pin.timestamp);
			markersRef.current.push(marker);
		});

		// 컴포넌트 언마운트 시 마커들 정리
		return () => {
			markersRef.current.forEach(marker => marker.setMap(null));
			markersRef.current = [];
		};
	}, [map, pins]);

	// 컴포넌트 자체는 아무것도 렌더링하지 않음 (지도에 직접 마커 추가)
	return null;
}
