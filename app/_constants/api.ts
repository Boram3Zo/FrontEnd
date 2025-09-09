// API Base URL
export const API_BASE_URL = "http://localhost:9988";

// API Endpoints
export const API_ENDPOINTS = {
	SIGNUP: "/signup",
	LOGIN: "/login",
	LOGOUT: "/logout",
} as const;

// API Helper function
export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
