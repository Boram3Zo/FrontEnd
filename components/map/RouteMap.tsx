// components/map/RouteMap.tsx
"use client";

import { useRef } from "react";
import { GoogleMap, LatLng } from "./GoogleMap";

export default function RouteMap({
  route,
  height = "h-[220px]",
}: {
  route: LatLng[];
  height?: string;
}) {
  const mapRef = useRef<google.maps.Map | null>(null);

  const onReady = (map: google.maps.Map) => {
    mapRef.current = map;
    if (!route?.length) return;

    const poly = new google.maps.Polyline({
      path: route, // 리터럴 배열은 바로 사용 가능
      map,
      strokeColor: "#22C55E",
      strokeOpacity: 0.95,
      strokeWeight: 5,
    });

    new google.maps.Marker({ map, position: route[0], label: "S", title: "시작" });
    new google.maps.Marker({ map, position: route[route.length - 1], label: "E", title: "도착" });

    const b = new google.maps.LatLngBounds();
    route.forEach((p) => b.extend(p));
    map.fitBounds(b);
  };

  return (
    <GoogleMap
      center={route?.[0] ?? { lat: 37.5665, lng: 126.978 }}
      heightClassName={height}
      onMapReady={onReady}
    />
  );
}
