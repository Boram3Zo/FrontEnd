// Form Data Types
export interface SignupFormData {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface LoginFormData {
	email: string;
	password: string;
}

// API Request/Response Types
export interface SignupRequest {
	name: string;
	email: string;
	password: string;
}

export interface AuthResponse {
	success?: boolean;
	message?: string;
	token?: string;
	data?: {
		memberId: number;
		nickname: string;
		email: string;
	};
	user?: {
		id: string;
		name: string;
		email: string;
	};
}

// Error Types
export interface ApiError {
	message: string;
	code?: string;
}
