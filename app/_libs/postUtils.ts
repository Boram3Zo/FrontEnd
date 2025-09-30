/**
 * 게시글 관련 유틸리티 함수들
 */

/**
 * 이미지 파일 경로를 완전한 URL로 변환하는 함수
 */
export function getImageUrl(filePath: string | null | undefined): string {
	if (!filePath) {
		return "/hangang-park-walkway.png"; // 기본 이미지
	}

	// 이미 완전한 URL인 경우 그대로 반환
	if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
		return filePath;
	}

	// 절대 경로에서 파일명만 추출
	const fileName = filePath.split("/").pop() || filePath;

	// API 베이스 URL + /static/ 경로로 구성
	const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9988";
	const finalUrl = `${apiBaseUrl}/static/${fileName}`;

	return finalUrl;
}

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
	// 거리를 km 단위로 표시 - 안전한 처리
	let distanceKm = "0km";
	if (post.distance !== null && post.distance !== undefined) {
		const numDistance = typeof post.distance === "string" ? parseFloat(post.distance) : post.distance;
		if (!isNaN(numDistance)) {
			distanceKm = numDistance >= 1 ? `${numDistance.toFixed(1)}km` : `${(numDistance * 1000).toFixed(0)}m`;
		}
	}

	// 대표 이미지 URL 결정
	const originalFilePath = post.photoList?.[0]?.filePath;

	const imageUrl = getImageUrl(originalFilePath);

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

/**
 * Post 데이터를 내 코스 UI용 형태로 변환
 */
export function convertPostToMyCourse(post: import("@/app/_types/post").Post) {
	// 거리를 km 단위로 표시
	const distanceKm =
		typeof post.distance === "number" ? (post.distance / 1000).toFixed(1) + "km" : post.distance + "km";

	// 대표 이미지 URL 결정
	const imageUrl = getImageUrl(post.photoList?.[0]?.filePath);

	return {
		id: post.postId.toString(),
		title: post.title,
		location: post.region,
		duration: formatDurationForDisplay(post.duration),
		distance: distanceKm,
		imageUrl: imageUrl,
		theme: post.theme,
		content: post.content,
		photoList: post.photoList,
	};
}

/**
 * HH:mm:ss 형식의 시간을 표시용 형식으로 변환
 */
export function formatDurationForDisplay(duration: string): string {
	const [hours, minutes, seconds] = duration.split(":").map(Number);

	if (hours > 0) {
		return `${hours}시간 ${minutes}분`;
	} else if (minutes > 0) {
		return `${minutes}분`;
	} else {
		return `${seconds}초`;
	}
}
