	import { 
	Theme, 
	ThemeListResponse, 
	GetThemesParams, 
	ThemeWithCourses
} from "@/app/_types/theme";
import { convertPostToPopularCourse, type PopularCourse as PostPopularCourse } from "./postService";
import { API_ENDPOINTS, getApiUrl } from "@/app/_constants/api";

// Mock 데이터 제거 - 순수 DB API 전용

/**
 * 모든 테마 목록을 가져옵니다 (순수 DB API 전용)
 */
export async function fetchThemes(params: GetThemesParams = {}): Promise<ThemeListResponse> {
	const queryParams = new URLSearchParams();
	if (params.page) queryParams.append('page', params.page.toString());
	if (params.limit) queryParams.append('limit', params.limit.toString());
	if (params.category) queryParams.append('category', params.category);
	if (params.search) queryParams.append('search', params.search);

	const url = getApiUrl(`${API_ENDPOINTS.THEMES}${queryParams.toString() ? '?' + queryParams.toString() : ''}`);
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`테마 목록 API 호출 실패: ${response.status}`);
	}

	const data: ThemeListResponse = await response.json();
	return data;
}

/**
 * 특정 테마 정보를 가져옵니다 (순수 DB API 전용)
 */
export async function fetchThemeById(id: string): Promise<Theme | null> {
	const url = getApiUrl(API_ENDPOINTS.THEME_BY_ID(id));
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`테마 정보 API 호출 실패: ${response.status}`);
	}

	return await response.json();
}

/**
 * 특정 테마의 코스들을 가져옵니다 - 새로운 /post/theme API 엔드포인트 사용
 */
export async function fetchCoursesByTheme(themeId: string, limit: number = 100): Promise<PostPopularCourse[]> {
	console.log(`[fetchCoursesByTheme] Starting fetch for theme: "${themeId}" with limit: ${limit}`);
	
	try {
		// 1. 새로운 테마 전용 API 엔드포인트 사용
		const url = getApiUrl(API_ENDPOINTS.POSTS_BY_THEME(themeId, limit));
		console.log(`[fetchCoursesByTheme] API URL: ${url}`);
		
		// 2. API 호출 (10초 타임아웃 포함)
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000);
		
		const response = await fetch(url, {
			signal: controller.signal,
			headers: {
				'Content-Type': 'application/json',
			}
		});
		
		clearTimeout(timeoutId);
		
		if (!response.ok) {
			throw new Error(`테마별 코스 API 호출 실패: ${response.status} ${response.statusText}`);
		}
		
		const data = await response.json();
		console.log(`[fetchCoursesByTheme] API response received:`, {
			success: data?.success,
			hasData: !!data?.data,
			hasBoardPage: !!data?.data?.boardPage,
			hasContent: !!data?.data?.boardPage?.content,
			contentLength: data?.data?.boardPage?.content?.length
		});
		
		// 3. API 응답 구조 처리
		if (data?.success === false) {
			console.warn(`[fetchCoursesByTheme] API returned error for theme ${themeId}:`, data.message);
			return [];
		}
		
		// 4. 응답 구조에서 포스트 배열 추출
		let posts = [];
		
		if (data?.data?.boardPage?.content && Array.isArray(data.data.boardPage.content)) {
			posts = data.data.boardPage.content;
		} else if (data?.boardPage?.content && Array.isArray(data.boardPage.content)) {
			posts = data.boardPage.content;
		} else if (data?.content && Array.isArray(data.content)) {
			posts = data.content;
		} else if (Array.isArray(data)) {
			posts = data;
		} else {
			console.warn(`[fetchCoursesByTheme] Unexpected API response structure for theme ${themeId}:`, data);
			console.warn(`[fetchCoursesByTheme] Response keys:`, Object.keys(data || {}));
			posts = [];
		}
		
		console.log(`[fetchCoursesByTheme] Extracted ${posts.length} posts from API response`);
		
		if (!Array.isArray(posts)) {
			console.error(`[fetchCoursesByTheme] Posts is not an array. Type: ${typeof posts}, Value:`, posts);
			return [];
		}
		
		if (posts.length === 0) {
			console.warn(`[fetchCoursesByTheme] No posts found for theme "${themeId}"`);
			return [];
		}
		
		// 5. PopularCourse 형태로 변환
		const popularCourses = posts.map(convertPostToPopularCourse);
		console.log(`[fetchCoursesByTheme] Successfully converted ${popularCourses.length} posts to PopularCourse format for theme "${themeId}"`);
		
		return popularCourses;
	} catch (error) {
		console.error(`[fetchCoursesByTheme] Error occurred:`, {
			message: error instanceof Error ? error.message : 'Unknown error',
			error: error
		});
		return [];
	}
}





/**
 * 테마와 해당 테마의 코스들을 함께 가져옵니다
 */
export async function fetchThemeWithCourses(themeId: string): Promise<ThemeWithCourses | null> {
	try {
		const [theme, courses] = await Promise.all([
			fetchThemeById(themeId),
			fetchCoursesByTheme(themeId)
		]);

		if (!theme) return null;

		return {
			...theme,
			courses
		};
	} catch (error) {
		console.error('Failed to fetch theme with courses:', error);
		return null;
	}
}

// Legacy functions for backward compatibility (Deprecated - DB API로 전환 권장)
export async function getThemeById(id: string): Promise<Theme | undefined> {
	console.warn('getThemeById is deprecated. Use fetchThemeById instead.');
	try {
		const theme = await fetchThemeById(id);
		return theme || undefined;
	} catch (error) {
		console.error('getThemeById failed:', error);
		return undefined;
	}
}

export async function getThemesByCategory(category: string): Promise<Theme[]> {
	console.warn('getThemesByCategory is deprecated. Use fetchThemes with category parameter instead.');
	try {
		const response = await fetchThemes({ category });
		return response.themes;
	} catch (error) {
		console.error('getThemesByCategory failed:', error);
		return [];
	}
}