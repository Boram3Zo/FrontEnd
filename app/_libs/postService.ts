/**
 * 게시글 서비스 - 리팩토링된 통합 서비스
 *
 * 이 파일은 기존의 postService.ts를 대체하며,
 * 분리된 모듈들을 통합하여 일관된 API를 제공합니다.
 */

// API 서비스
export { createPost, sharePost, getPostList, getPostById, getMyCourses } from "./postApiService";

// 데이터 변환 매퍼
export { convertWalkingSessionToPostRequest, convertWalkingSessionToShareRequest } from "./postMapper";

// 유틸리티 함수들
export {
	formatDuration,
	getImageUrl,
	getRouteEndpoints,
	convertRouteToSpots,
	convertRouteToJsonSpots,
	convertPostToPopularCourse,
	convertPostToMyCourse,
	formatDurationForDisplay,
} from "./postUtils";

// 타입 정의들
export type {
	Post,
	CreatePostRequest,
	CreatePostResponse,
	SharePostRequest,
	SharePostResponse,
	PostListResponse,
	PostReadResponse,
	MyCourseResponse,
	WalkingSession,
	PostCreateOptions,
	PostShareOptions,
	PopularCourse,
} from "@/app/_types/post";
