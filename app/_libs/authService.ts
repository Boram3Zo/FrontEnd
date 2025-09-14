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
			try {
				const errorText = await response.text();

				// JSON 파싱 시도
				try {
					const errorData = JSON.parse(errorText);
					throw new Error(errorData.message || "회원가입에 실패했습니다.");
				} catch {
					// JSON 파싱 실패시 텍스트에서 한글 메시지 추출
					if (errorText.includes("이미 사용 중인 이메일입니다")) {
						throw new Error("이미 사용 중인 이메일입니다.");
					}
					throw new Error("회원가입에 실패했습니다.");
				}
			} catch (error) {
				if (error instanceof Error && error.message !== "회원가입에 실패했습니다.") {
					throw error;
				}
				throw new Error("회원가입에 실패했습니다.");
			}
		}

		// 성공 시에도 JSON 파싱을 안전하게 처리
		try {
			return await response.json();
		} catch {
			// JSON 파싱 실패시 기본 성공 응답 반환
			return { message: "회원가입이 완료되었습니다." };
		}
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
