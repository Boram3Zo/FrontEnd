// API Base URL - 환경 변수 사용
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:9988";

// API Endpoints
export const API_ENDPOINTS = {
	SIGNUP: "/member/signup",
	LOGIN: "/member/login",
	LOGOUT: "/member/logout",
	PROFILE: "/member/profile", // 현재 로그인된 사용자 정보 확인용
} as const;

// API Helper function
export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
