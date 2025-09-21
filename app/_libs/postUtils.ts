/**
 * 게시글 관련 유틸리티 함수들
 */

/**
 * 초를 HH:mm:ss 형식으로 변환하는 유틸리티 함수
 */
export function formatDuration(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
		.toString()
		.padStart(2, "0")}`;
}

/**
 * 산책 경로에서 시작점과 종료점 추출
 */
export function getRouteEndpoints(route: { lat: number; lng: number }[]) {
	const startPoint = route[0] || { lat: 0, lng: 0 };
	const endPoint = route[route.length - 1] || startPoint;
	return { startPoint, endPoint };
}

/**
 * 산책 경로를 spots 문자열로 변환 (샘플링)
 */
export function convertRouteToSpots(route: { lat: number; lng: number }[]): string {
	return route
		.filter((_, index) => index % 10 === 0) // 10개마다 하나씩 샘플링
		.map(point => `${point.lat},${point.lng}`)
		.join(";");
}

/**
 * 산책 경로를 JSON 형태의 spots로 변환 (전체 포인트)
 */
export function convertRouteToJsonSpots(route: { lat: number; lng: number }[]): string {
	const routePoints = route.map(point => ({
		lat: point.lat.toString(),
		lng: point.lng.toString(),
	}));
	return JSON.stringify(routePoints);
}

/**
 * 게시글 데이터를 PopularCourse 형태로 변환
 */
export function convertPostToPopularCourse(
	post: import("@/app/_types/post").Post
): import("@/app/_types/post").PopularCourse {
	// 거리를 km 단위로 표시
	const distanceKm =
		typeof post.distance === "number" ? (post.distance / 1000).toFixed(1) + "km" : post.distance || "0km";

	// 대표 이미지 URL 결정
	const imageUrl = post.photoList?.[0]?.filePath || "/hangang-park-walkway.png";

	return {
		id: post.postId,
		title: post.title,
		region: post.region,
		duration: post.duration,
		distance: distanceKm,
		theme: post.theme,
		imageUrl: imageUrl,
		likeCount: Math.floor(Math.random() * 500) + 50, // 임시 좋아요 수 (추후 실제 데이터로 교체)
	};
}
