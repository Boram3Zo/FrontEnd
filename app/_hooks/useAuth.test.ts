import { renderHook, act } from "@testing-library/react";
import { useAuth } from "./useAuth";

// Mock AuthService
jest.mock("@/app/_libs/authService", () => ({
	AuthService: {
		logout: jest.fn(),
	},
}));

// Mock document.cookie
Object.defineProperty(document, "cookie", {
	writable: true,
	value: "",
});

describe("useAuth", () => {
	beforeEach(() => {
		// Reset cookie
		document.cookie = "";
		jest.clearAllMocks();
	});

	it("초기 로딩 상태가 올바르게 설정된다", () => {
		const { result } = renderHook(() => useAuth());

		expect(result.current.isLoading).toBe(true);
		expect(result.current.isLoggedIn).toBe(null);
	});

	it("JSESSIONID 쿠키가 있으면 로그인 상태로 인식한다", async () => {
		// JSESSIONID 쿠키 설정
		document.cookie = "JSESSIONID=abc123";

		const { result } = renderHook(() => useAuth());

		// 비동기 상태 변경 대기
		await act(async () => {
			await new Promise(resolve => setTimeout(resolve, 0));
		});

		expect(result.current.isLoggedIn).toBe(true);
		expect(result.current.isLoading).toBe(false);
	});

	it("JSESSIONID 쿠키가 없으면 로그아웃 상태로 인식한다", async () => {
		const { result } = renderHook(() => useAuth());

		// 비동기 상태 변경 대기
		await act(async () => {
			await new Promise(resolve => setTimeout(resolve, 0));
		});

		expect(result.current.isLoggedIn).toBe(false);
		expect(result.current.isLoading).toBe(false);
	});

	it("login 함수가 상태를 업데이트한다", () => {
		const { result } = renderHook(() => useAuth());

		act(() => {
			result.current.login();
		});

		expect(result.current.isLoggedIn).toBe(true);
	});

	it("logout 함수가 AuthService를 호출하고 상태를 업데이트한다", async () => {
		const { AuthService } = await import("@/app/_libs/authService");
		const { result } = renderHook(() => useAuth());

		await act(async () => {
			await result.current.logout();
		});

		expect(AuthService.logout).toHaveBeenCalledTimes(1);
		expect(result.current.isLoggedIn).toBe(false);
	});

	it("checkAuthStatus 함수가 세션 상태를 재확인한다", async () => {
		document.cookie = "JSESSIONID=xyz789";
		const { result } = renderHook(() => useAuth());

		await act(async () => {
			await result.current.checkAuthStatus();
		});

		expect(result.current.isLoggedIn).toBe(true);
	});
});
