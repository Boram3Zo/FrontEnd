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
	message?: string;
	token?: string;
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
