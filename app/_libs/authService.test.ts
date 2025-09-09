import { AuthService } from "./authService";

// Mock fetch
const originalFetch = global.fetch;

const runAuthServiceTests = async () => {
	console.log("🧪 AuthService Tests 시작...");

	// Mock fetch 설정
	global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
	const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

	try {
		// 테스트 1: 성공적인 회원가입
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ message: "회원가입 성공" }),
		} as Response);

		const result1 = await AuthService.signup({
			name: "홍길동",
			email: "test@example.com",
			password: "password123",
		});

		console.log("✅ 회원가입 성공:", result1.message === "회원가입 성공" ? "PASS" : "FAIL");

		// 테스트 2: 회원가입 실패
		mockFetch.mockResolvedValueOnce({
			ok: false,
			json: async () => ({ message: "이미 존재하는 이메일" }),
		} as Response);

		try {
			await AuthService.signup({
				name: "홍길동",
				email: "test@example.com",
				password: "password123",
			});
			console.log("❌ 회원가입 실패: FAIL (에러가 발생해야 함)");
		} catch (error) {
			console.log("✅ 회원가입 실패:", error instanceof Error && error.message.includes("이미 존재") ? "PASS" : "FAIL");
		}

		console.log("🎉 AuthService Tests 완료!\n");
	} catch (error) {
		console.error("❌ AuthService Tests 에러:", error);
	} finally {
		// fetch 복원
		global.fetch = originalFetch;
	}
};

// 테스트 실행 함수
const testSignup = async () => {
	console.log("📝 간단한 Signup 테스트 시작\n");

	// Validation 테스트
	const { runValidationTests } = await import("../_utils/validation.test");
	runValidationTests();

	// AuthService 테스트
	await runAuthServiceTests();

	console.log("✨ 모든 테스트 완료!");
};

export { runAuthServiceTests, testSignup };
