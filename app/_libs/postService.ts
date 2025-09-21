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

	// 시간을 HH:mm:ss 형식으로 변환
	const formatDuration = (seconds: number): string => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}`;
	};

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
		return {
			success: true,
			postId: result.postId,
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
