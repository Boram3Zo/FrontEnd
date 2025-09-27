import { WalkingPin } from "@/app/_types/walking";

/**
 * 커스텀 핀 아이콘을 생성하는 함수
 */
export function createPinIcon(type: "start" | "end" | "spot" | "photo") {
	const isStart = type === "start";
	const isEnd = type === "end";

	const color = isStart ? "#22c55e" : isEnd ? "#ef4444" : "#f59e0b"; // spot/photo = yellow
	const letter = isStart ? "S" : isEnd ? "E" : "P";

	return {
		url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
			<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
				<circle cx="16" cy="16" r="15" fill="${color}" stroke="white" stroke-width="2"/>
				<text x="16" y="21" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
					${letter}
				</text>
			</svg>
		`)}`,
		scaledSize: new google.maps.Size(32, 32),
		anchor: new google.maps.Point(16, 16),
	};
}

/**
 * 핀 정보창 HTML을 생성하는 함수
 */
export function createPinInfoWindowContent(
	type: "start" | "end" | "spot" | "photo",
	position: { lat: number; lng: number },
	timestamp?: string
) {
	const isStart = type === "start";
	const isEnd = type === "end";
	const isSpot = type === "spot" || type === "photo";
	const emoji = isStart ? "🟢" : isEnd ? "🔴" : "📸";
	const title = isStart ? "시작 지점" : isEnd ? "종료 지점" : isSpot ? "사진 지점" : "스팟";
	const colorClass = isStart ? "text-green-600" : isEnd ? "text-red-600" : "text-yellow-600";

	return `
		<div class="p-2">
			<h3 class="font-bold text-sm ${colorClass}">
				${emoji} ${title}
			</h3>
			${
				timestamp
					? `
					<p class="text-xs text-gray-600">
						${new Date(timestamp).toLocaleString("ko-KR")}
					</p>
					`
					: ""
			}
			<p class="text-xs text-gray-500">
				위도: ${position.lat.toFixed(6)}<br/>
				경도: ${position.lng.toFixed(6)}
			</p>
		</div>
	`;
}

/**
 * 지도에 핀 마커를 생성하는 함수
 */
export function createPinMarker(
	map: google.maps.Map,
	type: "start" | "end" | "spot" | "photo",
	position: { lat: number; lng: number },
	timestamp?: string
) {
	const isStart = type === "start";
	const isEnd = type === "end";
	const icon = createPinIcon(type);

	const marker = new google.maps.Marker({
		position,
		map,
		icon,
		title: isStart ? "시작 지점" : isEnd ? "종료 지점" : "사진 지점",
		zIndex: isStart ? 1000 : isEnd ? 1001 : 1002,
	});

	const infoWindow = new google.maps.InfoWindow({
		content: createPinInfoWindowContent(type, position, timestamp),
	});

	marker.addListener("click", () => {
		infoWindow.open(map, marker);
	});

	return { marker, infoWindow };
}

/**
 * 경로의 시작점과 종료점에 핀을 추가하는 함수
 */
export function addRoutePins(map: google.maps.Map, route: { lat: number; lng: number }[], pins?: WalkingPin[]) {
	if (!route.length) return [];

	const startPosition = route[0];
	const endPosition = route[route.length - 1];

	const startPin = pins?.find(p => p.type === "start");
	const endPin = pins?.find(p => p.type === "end");

	const markers: Array<{ marker: google.maps.Marker; infoWindow: google.maps.InfoWindow }> = [];

	// 시작점 마커
	const startMarkerInfo = createPinMarker(map, "start", startPosition, startPin?.timestamp);
	markers.push(startMarkerInfo);

	// 종료점 마커 (시작점과 다른 경우에만)
	if (route.length > 1) {
		const endMarkerInfo = createPinMarker(map, "end", endPosition, endPin?.timestamp);
		markers.push(endMarkerInfo);
	}

	// photo/spot 핀 추가 (노란색)
	if (pins && pins.length > 0) {
		for (const p of pins) {
			if (p.type === "photo" || p.type === "spot") {
				// 사진 핀은 좌표가 있어야 함
				if (typeof p.lat === "number" && typeof p.lng === "number") {
					const info = createPinMarker(map, "photo", { lat: p.lat, lng: p.lng }, p.timestamp);
					markers.push(info);
				}
			}
		}
	}

	return markers;
}
