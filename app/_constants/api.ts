// API Base URL - 환경 변수 사용
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://myungjinki.com:9988";

// API Endpoints
export const API_ENDPOINTS = {
	SIGNUP: "/member/signup",
	LOGIN: "/member/login",
	LOGOUT: "/member/logout",
	PROFILE: "/member/profile", // 현재 로그인된 사용자 정보 확인용
	
	// Post/Course related endpoints
	POSTS: "/post/list",
	POST_BY_ID: (id: string) => `/post/${id}`,
	POSTS_BY_REGION: (region: string) => `/post/region?page=1&searchWord=${encodeURIComponent(region)}`,
	POPULAR_POSTS: "/post/popular",
	
	// Theme related endpoints
	THEMES: "/theme/list",
	THEME_BY_ID: (id: string) => `/theme/${id}`,
	POSTS_BY_THEME: (themeId: string) => `/post/list?theme=${themeId}`,
} as const;

// API Helper function
export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
