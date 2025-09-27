// components/map/RouteMap.tsx
"use client";

import { useRef, useEffect } from "react";
import { GoogleMap, LatLng } from "./GoogleMap";
import { WalkingPin } from "@/app/_types/walking";
import { addRoutePins } from "./pinUtils";
import { useWalking } from "@/app/_providers";

/**
 * 산책 경로를 지도에 표시하는 컴포넌트
 * @param route - 경로 좌표 배열
 * @param pins - 시작점/종료점 핀 정보 (선택사항)
 * @param height - 지도 높이 클래스명
 */
export default function RouteMap({
	route,
	pins,
	height = "h-[220px]",
}: {
	route: LatLng[];
	pins?: WalkingPin[];
	height?: string;
}) {
	const mapRef = useRef<google.maps.Map | null>(null);
	const markersRef = useRef<Array<{ marker: google.maps.Marker; infoWindow: google.maps.InfoWindow }>>([]);
	const { session } = useWalking();

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

		// 시작점과 종료점 핀 추가 (유틸리티 함수 사용)
		// 초기 렌더링 시는 props.pins를 우선 사용
		markersRef.current = addRoutePins(map, route, pins);

		// 지도 영역을 경로에 맞게 조정
		const bounds = new google.maps.LatLngBounds();
		route.forEach(point => bounds.extend(point));
		map.fitBounds(bounds);
	};

	// session.pins 또는 props.pins가 변경되면 마커를 갱신
	useEffect(() => {
		const map = mapRef.current;
		if (!map || !route?.length) return;

		// clear existing markers
		for (const m of markersRef.current) {
			try {
				m.marker.setMap(null);
			} catch {
				/* noop */
			}
		}
		markersRef.current = [];

		// prefer provider session pins if available, otherwise use props.pins
		const effectivePins = session?.pins && session.pins.length > 0 ? session.pins : pins;
		markersRef.current = addRoutePins(map, route, effectivePins);
	}, [session?.pins, pins, route]);

	return (
		<GoogleMap center={route?.[0] ?? { lat: 37.5665, lng: 126.978 }} heightClassName={height} onMapReady={onReady} />
	);
}
