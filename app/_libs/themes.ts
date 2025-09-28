import { 
	Theme, 
	ThemeListResponse, 
	GetThemesParams, 
	ThemeWithCourses
} from "@/app/_types/theme";
import { getPostList, convertPostToPopularCourse, type PopularCourse as PostPopularCourse } from "./postService";
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
 * 특정 테마의 코스들을 가져옵니다 (순수 DB API 전용)
 */
export async function fetchCoursesByTheme(themeId: string, limit: number = 10): Promise<PostPopularCourse[]> {
	// 실제 API를 사용하여 테마별 포스트 가져오기
	const response = await getPostList(0, limit);
	
	// 테마별 필터링 (실제 API에서 테마 파라미터를 지원하지 않는 경우)
	const filteredPosts = response.data?.boardPage?.content ? 
		response.data.boardPage.content.filter(post => post.theme === themeId) : [];
	
	return filteredPosts.map(convertPostToPopularCourse);
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