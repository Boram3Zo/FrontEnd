import { API_ENDPOINTS } from "@/app/_constants/api";
import { SignupRequest, AuthResponse } from "@/app/_types/auth";
import { ApiClient } from "@/app/_libs/apiClient";

export class AuthService {
	static async signup(data: SignupRequest): Promise<AuthResponse> {
		try {
			return await ApiClient.post<AuthResponse>(API_ENDPOINTS.SIGNUP, data);
		} catch (error) {
			// ApiClient에서 이미 안전하게 처리된 에러를 그대로 전달
			throw error;
		}
	}

	static async login(email: string, password: string): Promise<AuthResponse> {
		try {
			return await ApiClient.post<AuthResponse>(API_ENDPOINTS.LOGIN, { email, password });
		} catch (error) {
			// ApiClient에서 이미 안전하게 처리된 에러를 그대로 전달
			throw error;
		}
	}

	static async logout(): Promise<void> {
		try {
			await ApiClient.post(API_ENDPOINTS.LOGOUT);
			// 세션 쿠키는 서버에서 자동으로 삭제됨
		} catch (error) {
			// 로그아웃 실패 시에도 에러를 전달
			throw error;
		}
	}
}
