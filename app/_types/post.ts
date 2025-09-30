/**
 * 게시글 관련 타입 정의
 */

// ===== 기본 타입 =====
export interface PostPhoto {
	photoId: number;
	originalName: string;
	fileName: string;
	latitude: string;
	longitude: string;
	imageDescription: string;
	filePath: string;
	file: null;
}

export interface PostMap {
	startLatitude: string;
	startLongitude: string;
	endLatitude: string;
	endLongitude: string;
	spots: string | null;
}

export interface Post {
	postId: number;
	memberId: number;
	title: string;
	region: string;
	duration: string; // "HH:mm:ss" 형식
	distance: number; // km 단위
	content: string;
	theme: string;
	hashtagList: string[];
	map: PostMap;
	photoList: PostPhoto[];
}

// ===== API 요청 타입 =====
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

// ===== API 응답 타입 =====
export interface CreatePostResponse {
	success: boolean;
	data?: number; // 실제 API는 data 필드에 postId를 반환
	message?: string;
}

export interface SharePostResponse {
	success: boolean;
	data?: number; // 업데이트된 게시글 ID
	message?: string;
}

export interface PageInfo {
	pageNumber: number;
	pageSize: number;
	sort: {
		unsorted: boolean;
		sorted: boolean;
		empty: boolean;
	};
	offset: number;
	unpaged: boolean;
	paged: boolean;
}

export interface BoardPage {
	content: Post[];
	pageable: PageInfo;
	totalElements: number;
	totalPages: number;
	last: boolean;
	numberOfElements: number;
	first: boolean;
	size: number;
	number: number;
	sort: {
		unsorted: boolean;
		sorted: boolean;
		empty: boolean;
	};
	empty: boolean;
}

export interface PostListResponse {
	success: boolean;
	message: string;
	data: {
		boardPage: BoardPage;
		page: number;
		searchType: string;
		searchWord: string;
		linkSize: number;
	};
}

export interface MyCourseResponse {
	success: boolean;
	message: string;
	data: Post[];
}

export interface PostReadResponse {
	success: boolean;
	message: string;
	data: Post;
}

// ===== 산책 세션 타입 =====
export interface WalkingSession {
	durationSec: number;
	distanceKm: number;
	route: { lat: number; lng: number }[];
	pins?: Array<{ lat: number; lng: number; type: string }>;
}

export interface PostCreateOptions {
	memberId: number;
	title?: string;
	region?: string;
	content?: string;
	theme?: string;
	hashtags?: string[];
}

export interface PostShareOptions {
	memberId: number;
	title: string;
	region?: string;
	content: string;
	theme?: string;
	hashtags?: string[];
}

// ===== UI 표시용 타입 =====
export interface PopularCourse {
	id: number;
	title: string;
	region: string;
	duration: string;
	distance: string | number; // 문자열 또는 숫자 모두 허용
	theme: string;
	imageUrl: string; // 대표 이미지 URL
	likeCount: number;
}
