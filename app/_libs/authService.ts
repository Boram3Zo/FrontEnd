import { getApiUrl, API_ENDPOINTS } from "@/app/_constants/api";
import { SignupRequest, AuthResponse } from "@/app/_types/auth";

export class AuthService {
	static async signup(data: SignupRequest): Promise<AuthResponse> {
		const response = await fetch(getApiUrl(API_ENDPOINTS.SIGNUP), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "회원가입에 실패했습니다.");
		}

		return response.json();
	}

	static async login(email: string, password: string): Promise<AuthResponse> {
		const response = await fetch(getApiUrl(API_ENDPOINTS.LOGIN), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "로그인에 실패했습니다.");
		}

		return response.json();
	}
}
