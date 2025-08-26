// components/map/GoogleMap.tsx
"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export type LatLng = { lat: number; lng: number };

type Props = {
	/** 지도의 중심 좌표 */
	center: LatLng;
	/** 초기 줌 레벨 (기본: 15) */
	zoom?: number;
	/** 지도의 높이 (Tailwind class or style) */
	heightClassName?: string;
	/** 마운트 이후 map 객체를 돌려받고 싶을 때 */
	onMapReady?: (map: google.maps.Map) => void;
};

export function GoogleMap({
	center,
	zoom = 15,
	heightClassName = "h-[360px]",
	onMapReady,
}: Props) {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const mapRef = useRef<google.maps.Map | null>(null);

	useEffect(() => {
		if (!isLoaded || !containerRef.current || mapRef.current) return;
		if (window.google?.maps) {
			mapRef.current = new google.maps.Map(containerRef.current, {
				center,
				zoom,
				mapId: "WALKING_MAP_DEFAULT", // custom mapId를 쓰고 싶으면 콘솔에서 발급
				clickableIcons: false,
				disableDefaultUI: true,
			});
			onMapReady?.(mapRef.current);
		}
	}, [isLoaded, center, zoom, onMapReady]);

	useEffect(() => {
		if (mapRef.current) {
			mapRef.current.setCenter(center);
		}
	}, [center]);

	return (
		<>
			<Script
				src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`}
				strategy="afterInteractive"
				onLoad={() => setIsLoaded(true)}
			/>
			<div
				ref={containerRef}
				className={`w-full rounded-2xl ${heightClassName}`}
			/>
		</>
	);
}
