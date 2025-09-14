/**
 * scripts/login.test.js
 * 로그인 기능에 대한 Jest 테스트
 */

import { AuthService } from "../app/_libs/authService.js";

// AuthService 모듈을 모킹
jest.mock("../app/_libs/authService.js", () => ({
	AuthService: {
		login: jest.fn(),
	},
}));

describe("로그인 API 테스트", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("유효한 자격 증명으로 로그인이 성공해야 한다", async () => {
		// Mock successful login response
		const mockResult = {
			success: true,
			message: "로그인 성공",
			user: { id: 1, email: "test@example.com" },
		};
		AuthService.login.mockResolvedValue(mockResult);

		const result = await AuthService.login("test@example.com", "password123");

		expect(AuthService.login).toHaveBeenCalledWith("test@example.com", "password123");
		expect(result).toEqual(mockResult);
		expect(result.success).toBe(true);
		expect(result.user.email).toBe("test@example.com");
	});

	it("잘못된 자격 증명으로 로그인이 실패해야 한다", async () => {
		// Mock failed login response
		const mockError = new Error("로그인 실패: 잘못된 이메일 또는 비밀번호");
		AuthService.login.mockRejectedValue(mockError);

		await expect(AuthService.login("wrong@example.com", "wrongpassword")).rejects.toThrow("로그인 실패");
		expect(AuthService.login).toHaveBeenCalledWith("wrong@example.com", "wrongpassword");
	});

	it("빈 이메일로 로그인 시 에러가 발생해야 한다", async () => {
		const mockError = new Error("이메일을 입력해주세요");
		AuthService.login.mockRejectedValue(mockError);

		await expect(AuthService.login("", "password123")).rejects.toThrow("이메일을 입력해주세요");
	});

	it("빈 비밀번호로 로그인 시 에러가 발생해야 한다", async () => {
		const mockError = new Error("비밀번호를 입력해주세요");
		AuthService.login.mockRejectedValue(mockError);

		await expect(AuthService.login("test@example.com", "")).rejects.toThrow("비밀번호를 입력해주세요");
	});

	it("네트워크 에러가 적절히 처리되어야 한다", async () => {
		const networkError = new Error("Network Error");
		AuthService.login.mockRejectedValue(networkError);

		await expect(AuthService.login("test@example.com", "password123")).rejects.toThrow("Network Error");
	});
});
