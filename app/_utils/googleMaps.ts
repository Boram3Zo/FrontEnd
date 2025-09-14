// Utility helpers for Google Maps URLs
export function mapsSearchUrlForLatLng(lat: number, lng: number) {
	// Use the Maps search API with api=1 to open the coordinates
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lng}`)}`;
}

export function mapsQueryUrlForLatLng(lat: number, lng: number) {
	// simpler q=lat,lng pattern used in some places
	return `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}`;
}

export function mapsPlaceUrlForQuery(query: string) {
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
