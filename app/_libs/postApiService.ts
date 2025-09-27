/**
 * 게시글 API 서비스
 */

import { ApiClient } from "./apiClient";
import {
	CreatePostRequest,
	CreatePostResponse,
	SharePostRequest,
	SharePostResponse,
	PostListResponse,
	MyCourseResponse,
	PostReadResponse,
} from "@/app/_types/post";

/**
 * 게시글 생성 API 호출
 */
export async function createPost(postData: CreatePostRequest): Promise<CreatePostResponse> {
	try {
		const response = await ApiClient.post<CreatePostResponse>("/post/create", postData);
		return response;
	} catch (error) {
		console.error("게시글 생성 실패:", error);
		throw new Error("게시글 생성에 실패했습니다.");
	}
}

/**
 * 게시글 공유 API 호출
 */
export async function sharePost(postData: SharePostRequest): Promise<SharePostResponse> {
	try {
		const response = await ApiClient.post<SharePostResponse>("/post/share", postData);
		return response;
	} catch (error) {
		console.error("게시글 공유 실패:", error);
		throw new Error("게시글 공유에 실패했습니다.");
	}
}

/**
 * 게시글 목록 조회 API 호출
 */
export async function getPostList(page: number = 0, size: number = 10): Promise<PostListResponse> {
	try {
		// 전체 목록 조회를 위해 "전체" 검색어로 region API 사용
		const response = await ApiClient.get<PostListResponse>(`/post/region?page=${page}&size=${size}&searchWord=전체`);
		return response;
	} catch (error) {
		console.error("게시글 목록 조회 실패:", error);
		throw new Error("게시글 목록을 불러오는데 실패했습니다.");
	}
}

/**
 * 특정 게시글 조회 API 호출 (Query Parameter 방식)
 */
export async function getPostById(postId: number): Promise<PostReadResponse> {
	try {
		const response = await ApiClient.get<PostReadResponse>(`/post/read?postId=${postId}`);
		return response;
	} catch (error) {
		console.error("게시글 조회 실패:", error);
		throw new Error("게시글을 불러오는데 실패했습니다.");
	}
}

/**
 * 내 코스 목록 조회 API 호출
 */
export async function getMyCourses(memberId: number): Promise<MyCourseResponse> {
	try {
		const response = await ApiClient.get<MyCourseResponse>(`/member/myCourse?memberId=${memberId}`);
		return response;
	} catch (error) {
		console.error("내 코스 목록 조회 실패:", error);
		throw new Error("내 코스 목록을 불러오는데 실패했습니다.");
	}
}

/**
 * 게시글 좋아요 처리
 * @param postId - 게시글 ID
 * @param memberId - 회원 ID
 * @returns 좋아요 처리 결과
 */
export async function likePost(
	postId: number,
	memberId: number
): Promise<{ success: boolean; message?: string; data?: string }> {
	try {
		const response = await ApiClient.get<{ success: boolean; message?: string; data?: string }>(
			`/post/like?postId=${postId}&memberId=${memberId}`
		);
		return response;
	} catch (error) {
		console.error("좋아요 처리 실패:", error);
		throw new Error("좋아요 처리에 실패했습니다.");
	}
}
