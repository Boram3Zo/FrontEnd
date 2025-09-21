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
		const response = await ApiClient.get<PostListResponse>(`/post/list?page=${page}&size=${size}`);
		return response;
	} catch (error) {
		console.error("게시글 목록 조회 실패:", error);
		throw new Error("게시글 목록을 불러오는데 실패했습니다.");
	}
}

/**
 * 특정 게시글 조회 API 호출
 */
export async function getPostById(postId: number) {
	try {
		const response = await ApiClient.get(`/post/${postId}`);
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
