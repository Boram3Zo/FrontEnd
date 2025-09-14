import { AuthService } from "./authService";
import { ApiClient } from "./apiClient";

// Mock ApiClient
jest.mock("./apiClient");
const mockedApiClient = ApiClient as jest.Mocked<typeof ApiClient>;

describe("AuthService", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("signup", () => {
		it("성공 시 ApiClient.post를 호출하고 결과를 반환한다", async () => {
			const mockResponse = { message: "회원가입 성공" };
			mockedApiClient.post.mockResolvedValueOnce(mockResponse);

			const result = await AuthService.signup({
				name: "홍길동",
				email: "test@example.com",
				password: "password123",
			});

			expect(mockedApiClient.post).toHaveBeenCalledWith("/member/signup", {
				name: "홍길동",
				email: "test@example.com",
				password: "password123",
			});
			expect(result).toEqual(mockResponse);
		});

		it("실패 시 에러를 던진다", async () => {
			const mockError = new Error("이미 존재하는 이메일");
			mockedApiClient.post.mockRejectedValueOnce(mockError);

			await expect(
				AuthService.signup({
					name: "홍길동",
					email: "test@example.com",
					password: "password123",
				})
			).rejects.toThrow("이미 존재하는 이메일");
		});
	});

	describe("login", () => {
		it("성공 시 ApiClient.post를 호출하고 결과를 반환한다", async () => {
			const mockResponse = { message: "로그인 성공" };
			mockedApiClient.post.mockResolvedValueOnce(mockResponse);

			const result = await AuthService.login("test@example.com", "password123");

			expect(mockedApiClient.post).toHaveBeenCalledWith("/member/login", {
				email: "test@example.com",
				password: "password123",
			});
			expect(result).toEqual(mockResponse);
		});

		it("실패 시 에러를 던진다", async () => {
			const mockError = new Error("잘못된 이메일 또는 비밀번호");
			mockedApiClient.post.mockRejectedValueOnce(mockError);

			await expect(AuthService.login("wrong@example.com", "wrongpassword")).rejects.toThrow(
				"잘못된 이메일 또는 비밀번호"
			);
		});
	});

	describe("logout", () => {
		it("호출 시 ApiClient.post로 로그아웃 엔드포인트를 호출한다", async () => {
			mockedApiClient.post.mockResolvedValueOnce(undefined);

			await AuthService.logout();

			expect(mockedApiClient.post).toHaveBeenCalledWith("/member/logout");
		});
	});
});
