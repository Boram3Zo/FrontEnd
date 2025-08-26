// lib/geo.ts
export type LatLng = { lat: number; lng: number };

const R = 6371000; // 지구 반지름(m)

export function haversine(a: LatLng, b: LatLng): number {
	const toRad = (x: number) => (x * Math.PI) / 180;
		const dLat = toRad(b.lat - a.lat);
		const dLng = toRad(b.lng - a.lng);
		const lat1 = toRad(a.lat);
		const lat2 = toRad(b.lat);

		const h =
				Math.sin(dLat / 2) ** 2 +
				Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
		return 2 * R * Math.asin(Math.sqrt(h)); // meters
}

export function nearestBy<T extends { start: LatLng }>(
		origin: LatLng,
		items: T[],
		limit = 3
): { item: T; distance: number }[] {
		return items
				.map((item) => ({ item, distance: haversine(origin, item.start) }))
				.sort((a, b) => a.distance - b.distance)
				.slice(0, limit);
}
