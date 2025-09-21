import { API_BASE_URL } from "@/app/_constants/api";

/**
 * 게시글 생성 API 관련 타입 정의
 */
export interface CreatePostRequest {
	postId: null;
	memberId: number;
	title: string;
	region: string;
	duration: string; // "HH:mm:ss" 형식
	distance: number; // km 단위
	content: string;
	theme: string;
	hashtagList: string[] | null;
	map: {
		startLatitude: string;
		startLongitude: string;
		endLatitude: string;
		endLongitude: string;
		spots: string;
	};
}

export interface CreatePostResponse {
	success: boolean;
	postId?: number;
	message?: string;
}

/**
 * 게시글 공유 완료 API 요청 타입
 */
export interface SharePostRequest {
	postId: number; // 이미 생성된 게시글 ID
	memberId: number;
	title: string;
	region?: string;
	duration?: string; // "HH:mm:ss" 형식
	distance?: number; // 미터 단위
	content?: string;
	theme?: string;
	hashtagList?: string[];
	map?: {
		startLatitude: string;
		startLongitude: string;
		endLatitude: string;
		endLongitude: string;
		spots: string;
	};
}

export interface SharePostResponse {
	success: boolean;
	data?: number; // 업데이트된 게시글 ID
	message?: string;
}

/**
 * 초를 HH:mm:ss 형식으로 변환하는 유틸리티 함수
 */
function formatDuration(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
		.toString()
		.padStart(2, "0")}`;
}

/**
 * 산책 세션 데이터를 게시글 생성 요청으로 변환하는 함수
 */
export function convertWalkingSessionToPostRequest(
	session: {
		durationSec: number;
		distanceKm: number;
		route: { lat: number; lng: number }[];
		pins?: Array<{ lat: number; lng: number; type: string }>;
	},
	options: {
		memberId: number;
		title?: string;
		region?: string;
		content?: string;
		theme?: string;
		hashtags?: string[];
	}
): CreatePostRequest {
	// 시작점과 종료점 추출
	const startPoint = session.route[0] || { lat: 0, lng: 0 };
	const endPoint = session.route[session.route.length - 1] || startPoint;

	// 지나간 지점들을 문자열로 변환 (spots)
	const spots = session.route
		.filter((_, index) => index % 10 === 0) // 10개마다 하나씩 샘플링
		.map(point => `${point.lat},${point.lng}`)
		.join(";");

	// formatDuration 함수는 이제 전역으로 정의됨

	return {
		postId: null,
		memberId: options.memberId,
		title: options.title || `${new Date().toLocaleDateString()} 산책`,
		region: options.region || "알 수 없는 지역",
		duration: formatDuration(session.durationSec),
		distance: session.distanceKm,
		content: options.content || "",
		theme: options.theme || "",
		hashtagList: options.hashtags || null,
		map: {
			startLatitude: startPoint.lat.toString(),
			startLongitude: startPoint.lng.toString(),
			endLatitude: endPoint.lat.toString(),
			endLongitude: endPoint.lng.toString(),
			spots: spots,
		},
	};
}

/**
 * 게시글 생성 API 호출
 */
export async function createPost(postData: CreatePostRequest): Promise<CreatePostResponse> {
	try {
		const response = await fetch(`${API_BASE_URL}/post/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		console.log("API 응답 원본:", result);

		// 다양한 필드명 시도
		const postId = result.data;
		console.log("추출된 postId:", postId);
		console.log("postId 타입:", typeof postId);

		return {
			success: true,
			postId: postId,
			message: result.message,
		};
	} catch (error) {
		console.error("게시글 생성 실패:", error);
		return {
			success: false,
			message: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
		};
	}
}

/**
 * 게시글 공유 완료 API 호출
 */
export async function sharePost(postData: SharePostRequest): Promise<SharePostResponse> {
	try {
		const response = await fetch(`${API_BASE_URL}/post/share`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // 세션 쿠키 전송
			body: JSON.stringify(postData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		console.log("공유 API 응답:", result);

		return {
			success: result.success,
			data: result.data,
			message: result.message,
		};
	} catch (error) {
		console.error("게시글 공유 실패:", error);
		return {
			success: false,
			message: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
		};
	}
}

/**
 * 산책 세션 데이터를 게시글 공유 요청으로 변환하는 함수
 */
export function convertWalkingSessionToShareRequest(
	postId: number,
	session: {
		durationSec: number;
		distanceKm: number;
		route: { lat: number; lng: number }[];
		pins?: Array<{ lat: number; lng: number; type: string }>;
	},
	options: {
		memberId: number;
		title: string;
		region?: string;
		content: string;
		theme?: string;
		hashtags?: string[];
	}
): SharePostRequest {
	// 시작점과 종료점 추출
	const startPoint = session.route[0] || { lat: 0, lng: 0 };
	const endPoint = session.route[session.route.length - 1] || startPoint;

	// spots 데이터 생성 (전체 경로의 주요 포인트들)
	const routePoints = session.route.map(point => ({
		lat: point.lat.toString(),
		lng: point.lng.toString(),
	}));
	const spots = JSON.stringify(routePoints);

	return {
		postId: postId,
		memberId: options.memberId,
		title: options.title,
		region: options.region || "알 수 없는 지역",
		duration: formatDuration(session.durationSec),
		distance: Math.round(session.distanceKm * 1000), // km를 미터로 변환
		content: options.content,
		theme: options.theme || "",
		hashtagList: options.hashtags || [],
		map: {
			startLatitude: startPoint.lat.toString(),
			startLongitude: startPoint.lng.toString(),
			endLatitude: endPoint.lat.toString(),
			endLongitude: endPoint.lng.toString(),
			spots: spots,
		},
	};
}
