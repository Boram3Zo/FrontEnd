// components/map/RouteMap.tsx
"use client";

import { useRef } from "react";
import { GoogleMap, LatLng } from "./GoogleMap";

/**
 * 산책 경로를 지도에 표시하는 컴포넌트
 * @param route - 경로 좌표 배열
 * @param height - 지도 높이 클래스명
 */
export default function RouteMap({ route, height = "h-[220px]" }: { route: LatLng[]; height?: string }) {
	const mapRef = useRef<google.maps.Map | null>(null);

	/**
	 * 지도 로딩 완료 시 경로와 마커 표시
	 * @param map - Google Maps 인스턴스
	 */
	const onReady = (map: google.maps.Map) => {
		mapRef.current = map;
		if (!route?.length) return;

		// 경로선(폴리라인) 생성: route 배열을 지도에 표시
		new google.maps.Polyline({
			path: route, // 경로 좌표 배열
			map,
			strokeColor: "#22C55E",
			strokeOpacity: 0.95,
			strokeWeight: 5,
		});

		new google.maps.Marker({ map, position: route[0], label: "S", title: "시작" });
		new google.maps.Marker({ map, position: route[route.length - 1], label: "E", title: "도착" });

		const b = new google.maps.LatLngBounds();
		route.forEach(p => b.extend(p));
		map.fitBounds(b);
	};

	return (
		<GoogleMap center={route?.[0] ?? { lat: 37.5665, lng: 126.978 }} heightClassName={height} onMapReady={onReady} />
	);
}
