/**
 * 코스 관련 API 서비스
 * Mock 데이터 제거 후 순수 DB API 전용으로 변경
 */

import type { Course } from "@/app/_types/course";
import { getPostList, getPostById, convertPostToPopularCourse } from "./postService";
import type { PopularCourse } from "@/app/_types/post";
import { API_ENDPOINTS, getApiUrl } from "@/app/_constants/api";

/**
 * 모든 코스 목록 가져오기 (DB API)
 */
export async function fetchAllCourses(page: number = 0, size: number = 20): Promise<PopularCourse[]> {
	try {
		const response = await getPostList(page, size);
		return response.data.boardPage.content.map(convertPostToPopularCourse);
	} catch (error) {
		console.error('Failed to fetch all courses:', error);
		throw new Error('코스 목록을 불러오는데 실패했습니다.');
	}
}

/**
 * 특정 지역의 코스 가져오기 (DB API)
 */
export async function fetchCoursesByRegion(region: string, limit: number = 50): Promise<PopularCourse[]> {
	try {
		const url = getApiUrl(API_ENDPOINTS.POSTS_BY_REGION(region, limit));
		console.log(`🔍 지역별 코스 요청: ${url} (요청 수량: ${limit}개)`);
		
		const response = await fetch(url);
		
		if (!response.ok) {
			throw new Error(`지역별 코스 API 호출 실패: ${response.status}`);
		}
		
		const data = await response.json();
		console.log(`📊 서버에서 받은 데이터:`, data);
		console.log(`📝 서버에서 받은 게시글 수: ${data.data?.boardPage?.content?.length || 0}개`);
		
		const regionCourses = (data.data?.boardPage?.content || [])
			.map(convertPostToPopularCourse);
		
		console.log(`✅ 최종 변환된 코스 수: ${regionCourses.length}개 (DB에 12개 있다면 이 수치 확인!)`);
		
		return regionCourses;
	} catch (error) {
		console.error('Failed to fetch courses by region:', error);
		throw new Error(`${region} 지역 코스를 불러오는데 실패했습니다.`);
	}
}

/**
 * 특정 코스 상세 정보 가져오기 (DB API)
 */
export async function fetchCourseById(id: number): Promise<import("@/app/_types/post").PostReadResponse> {
	try {
		return await getPostById(id);
	} catch (error) {
		console.error('Failed to fetch course by ID:', error);
		throw new Error('코스 정보를 불러오는데 실패했습니다.');
	}
}

/**
 * 인기 코스 가져오기 (DB API)
 */
export async function fetchPopularCourses(limit: number = 10): Promise<PopularCourse[]> {
	try {
		const response = await getPostList(0, limit);
		return response.data.boardPage.content.map(convertPostToPopularCourse);
	} catch (error) {
		console.error('Failed to fetch popular courses:', error);
		throw new Error('인기 코스를 불러오는데 실패했습니다.');
	}
}

// 기존 함수들 (Deprecated) - 호환성을 위해 유지하되 DB API 사용하도록 변경
export async function getCourseById(id: string): Promise<Course | undefined> {
	console.warn('getCourseById is deprecated. Use fetchCourseById instead.');
	try {
		const numericId = parseInt(id, 10);
		if (isNaN(numericId)) return undefined;
		
		const courseData = await fetchCourseById(numericId);
		
		// Post 데이터를 Course 형태로 변환 (필요한 경우)
		const course: Course = {
			id: courseData.data.postId.toString(),
			title: courseData.data.title,
			start: { 
				lat: parseFloat(courseData.data.map.startLatitude), 
				lng: parseFloat(courseData.data.map.startLongitude) 
			},
			spots: [], // 실제 spots 데이터 파싱이 필요한 경우 구현
			distanceMeters: courseData.data.distance * 1000, // km to meters
			durationMinutes: parseInt(courseData.data.duration.split(':')[1]) || 0, // HH:mm:ss에서 분 추출
		};
		
		return course;
	} catch (error) {
		console.error('getCourseById failed:', error);
		return undefined;
	}
}

export async function getCoursesByRegion(region: string): Promise<Course[]> {
	console.warn('getCoursesByRegion is deprecated. Use fetchCoursesByRegion instead.');
	try {
		const popularCourses = await fetchCoursesByRegion(region);
		
		// PopularCourse를 Course로 변환 (필요한 경우)
		return popularCourses.map((course): Course => ({
			id: course.id.toString(),
			title: course.title,
			start: { lat: 37.5665, lng: 126.9780 }, // 기본 좌표 (실제로는 DB에서 가져와야 함)
			spots: [],
			distanceMeters: typeof course.distance === 'string' 
				? parseFloat(course.distance.replace('km', '')) * 1000
				: course.distance * 1000,
			durationMinutes: parseInt(course.duration.split(':')[1]) || 0,
		}));
	} catch (error) {
		console.error('getCoursesByRegion failed:', error);
		return [];
	}
}
