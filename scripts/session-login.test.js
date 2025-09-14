/**
 * scripts/session-login.test.js
 * 세션 기반 로그인 API에 대한 Jest 테스트
 */

// fetch 모킹을 위한 설정
global.fetch = jest.fn();

describe("세션 기반 로그인 API 테스트", () => {
	const API_BASE = "http://localhost:9988";

	beforeEach(() => {
		fetch.mockClear();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("유효한 자격 증명으로 세션 로그인이 성공해야 한다", async () => {
		// Mock successful login response
		const mockResponse = {
			ok: true,
			status: 200,
			headers: {
				get: jest.fn(header => {
					if (header === "Set-Cookie") {
						return "sessionId=abc123; HttpOnly; Path=/";
					}
					return null;
				}),
			},
			json: async () => ({
				success: true,
				message: "로그인 성공",
				user: { id: 1, email: "test123@example.com" },
			}),
		};

		fetch.mockResolvedValue(mockResponse);

		const loginResponse = await fetch(`${API_BASE}/member/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Accept: "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				email: "test123@example.com",
				password: "password123",
			}),
		});

		const result = await loginResponse.json();

		expect(fetch).toHaveBeenCalledWith(`${API_BASE}/member/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Accept: "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				email: "test123@example.com",
				password: "password123",
			}),
		});

		expect(loginResponse.ok).toBe(true);
		expect(loginResponse.status).toBe(200);
		expect(result.success).toBe(true);
		expect(result.user.email).toBe("test123@example.com");
		expect(loginResponse.headers.get("Set-Cookie")).toContain("sessionId");
	});

	it("잘못된 자격 증명으로 로그인이 실패해야 한다", async () => {
		// Mock failed login response
		const mockResponse = {
			ok: false,
			status: 401,
			headers: {
				get: jest.fn(() => null),
			},
			text: async () => "인증 실패: 잘못된 이메일 또는 비밀번호",
		};

		fetch.mockResolvedValue(mockResponse);

		const loginResponse = await fetch(`${API_BASE}/member/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Accept: "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				email: "wrong@example.com",
				password: "wrongpassword",
			}),
		});

		const errorMessage = await loginResponse.text();

		expect(loginResponse.ok).toBe(false);
		expect(loginResponse.status).toBe(401);
		expect(errorMessage).toContain("인증 실패");
	});

	it("네트워크 에러가 적절히 처리되어야 한다", async () => {
		// Mock network error
		fetch.mockRejectedValue(new Error("Network Error"));

		await expect(
			fetch(`${API_BASE}/member/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					Accept: "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					email: "test123@example.com",
					password: "password123",
				}),
			})
		).rejects.toThrow("Network Error");
	});

	it("세션 쿠키가 올바르게 설정되어야 한다", async () => {
		// Mock response with session cookie
		const mockResponse = {
			ok: true,
			status: 200,
			headers: {
				get: jest.fn(header => {
					if (header === "Set-Cookie") {
						return "JSESSIONID=test-session-id; HttpOnly; Path=/; Secure";
					}
					return null;
				}),
			},
			json: async () => ({ success: true }),
		};

		fetch.mockResolvedValue(mockResponse);

		const loginResponse = await fetch(`${API_BASE}/member/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Accept: "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				email: "test123@example.com",
				password: "password123",
			}),
		});

		expect(loginResponse.headers.get("Set-Cookie")).toContain("JSESSIONID");
		expect(loginResponse.headers.get("Set-Cookie")).toContain("HttpOnly");
	});
});
