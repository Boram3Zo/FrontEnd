import { API_BASE_URL } from "@/app/_constants/api";

export interface ApiError extends Error {
	status?: number;
	originalMessage?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiResponse = any;

export class ApiClient {
	private static baseUrl = API_BASE_URL;

	/**
	 * 안전한 JSON 파싱을 수행합니다.
	 * JSON 파싱에 실패하면 텍스트에서 한글 에러 메시지를 추출합니다.
	 */
	private static async safeJsonParse(response: Response): Promise<ApiResponse> {
		try {
			const text = await response.text();

			// 빈 응답 처리
			if (!text.trim()) {
				return {};
			}

			try {
				return JSON.parse(text);
			} catch {
				// JSON 파싱 실패시 텍스트에서 한글 메시지 추출
				return this.extractErrorMessage(text);
			}
		} catch {
			return {};
		}
	}

	/**
	 * 텍스트에서 한글 에러 메시지를 추출합니다.
	 */
	private static extractErrorMessage(text: string): { message: string } {
		// 알려진 에러 메시지들
		const knownErrors = [
			"이미 사용 중인 이메일입니다",
			"회원가입이 완료되었습니다",
			"로그인에 실패했습니다",
			"비밀번호가 일치하지 않습니다",
			"존재하지 않는 사용자입니다",
		];

		for (const error of knownErrors) {
			if (text.includes(error)) {
				return { message: error };
			}
		}

		// 기본 에러 메시지
		return { message: "서버에서 오류가 발생했습니다." };
	}

	/**
	 * HTTP 요청을 수행합니다.
	 */
	static async request<T = ApiResponse>(endpoint: string, options: RequestInit = {}): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;

		// 기본 헤더 설정
		const defaultHeaders: Record<string, string> = {
			Accept: "application/json",
		};

		// body가 있는 경우 Content-Type 처리
		if (options.body) {
			if (options.body instanceof FormData) {
				// FormData인 경우 브라우저가 자동으로 Content-Type 설정하도록 함
				// Content-Type을 설정하지 않음
			} else {
				// JSON 데이터인 경우 명시적으로 설정
				defaultHeaders["Content-Type"] = "application/json; charset=utf-8";
			}
		}

		const config: RequestInit = {
			headers: {
				...defaultHeaders,
				...options.headers,
			},
			...options,
		};

		try {
			// 디버깅용 로깅
			console.log("🚀 API Request:", {
				url,
				method: config.method || "GET",
				headers: config.headers,
				body: config.body,
			});

			const response = await fetch(url, config);
			const data = await this.safeJsonParse(response);

			if (!response.ok) {
				const error: ApiError = new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
				error.status = response.status;
				error.originalMessage = data.message;
				throw error;
			}

			return data;
		} catch (error) {
			if (error instanceof Error && "status" in error) {
				throw error; // API 에러는 그대로 전달
			}

			// 네트워크 에러 등
			const networkError: ApiError = new Error("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
			throw networkError;
		}
	}

	/**
	 * GET 요청을 수행합니다.
	 */
	static async get<T = ApiResponse>(endpoint: string, headers?: Record<string, string>): Promise<T> {
		return this.request<T>(endpoint, {
			method: "GET",
			headers,
		});
	}

	/**
	 * POST 요청을 수행합니다.
	 */
	static async post<T = ApiResponse>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
		// 명시적으로 Content-Type을 설정하고 JSON 문자열로 변환
		const postHeaders: Record<string, string> = {
			"Content-Type": "application/json; charset=utf-8",
			Accept: "application/json",
			...headers,
		};

		const body = data ? JSON.stringify(data) : undefined;

		return this.request<T>(endpoint, {
			method: "POST",
			body,
			headers: postHeaders,
		});
	}

	/**
	 * PUT 요청을 수행합니다.
	 */
	static async put<T = ApiResponse>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
		const putHeaders: Record<string, string> = {
			"Content-Type": "application/json; charset=utf-8",
			Accept: "application/json",
			...headers,
		};

		const body = data ? JSON.stringify(data) : undefined;

		return this.request<T>(endpoint, {
			method: "PUT",
			body,
			headers: putHeaders,
		});
	}

	/**
	 * DELETE 요청을 수행합니다.
	 */
	static async delete<T = ApiResponse>(endpoint: string, headers?: Record<string, string>): Promise<T> {
		return this.request<T>(endpoint, {
			method: "DELETE",
			headers,
		});
	}
}
