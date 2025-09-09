import { AuthService } from "../authService";
import { SignupRequest } from "@/app/_types/auth";

// fetch 모킹
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("AuthService", () => {
	beforeEach(() => {
		mockFetch.mockClear();
	});

	describe("signup", () => {
		const validSignupData: SignupRequest = {
			name: "홍길동",
			email: "test@example.com",
			password: "password123",
		};

		it("회원가입이 성공할 때 응답 데이터를 반환해야 한다", async () => {
			const mockResponse = { message: "회원가입 성공" };
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			} as Response);

			const result = await AuthService.signup(validSignupData);

			expect(mockFetch).toHaveBeenCalledWith("http://localhost:9988/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(validSignupData),
			});
			expect(result).toEqual(mockResponse);
		});

		it("서버 에러 응답일 때 에러를 던져야 한다", async () => {
			const errorMessage = "이미 존재하는 이메일입니다.";
			mockFetch.mockResolvedValueOnce({
				ok: false,
				json: async () => ({ message: errorMessage }),
			} as Response);

			await expect(AuthService.signup(validSignupData)).rejects.toThrow(errorMessage);
		});

		it("네트워크 에러일 때 에러를 던져야 한다", async () => {
			mockFetch.mockRejectedValueOnce(new Error("Network error"));

			await expect(AuthService.signup(validSignupData)).rejects.toThrow("Network error");
		});

		it("서버 응답에 메시지가 없을 때 기본 에러 메시지를 사용해야 한다", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				json: async () => ({}),
			} as Response);

			await expect(AuthService.signup(validSignupData)).rejects.toThrow("회원가입에 실패했습니다.");
		});
	});

	describe("login", () => {
		it("로그인이 성공할 때 응답 데이터를 반환해야 한다", async () => {
			const mockResponse = {
				message: "로그인 성공",
				token: "jwt-token",
				user: { id: "1", name: "홍길동", email: "test@example.com" },
			};
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			} as Response);

			const result = await AuthService.login("test@example.com", "password123");

			expect(mockFetch).toHaveBeenCalledWith("http://localhost:9988/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: "test@example.com",
					password: "password123",
				}),
			});
			expect(result).toEqual(mockResponse);
		});

		it("로그인 실패 시 에러를 던져야 한다", async () => {
			const errorMessage = "이메일 또는 비밀번호가 잘못되었습니다.";
			mockFetch.mockResolvedValueOnce({
				ok: false,
				json: async () => ({ message: errorMessage }),
			} as Response);

			await expect(AuthService.login("test@example.com", "wrongpassword")).rejects.toThrow(errorMessage);
		});
	});
});
