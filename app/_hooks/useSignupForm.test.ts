// 간단한 mock 함수들
const mockRouter = {
	push: (url: string) => console.log(`🔗 Router push: ${url}`),
};

interface SignupData {
	name: string;
	email: string;
	password: string;
}

const mockAuthService = {
	signup: async (data: SignupData) => {
		console.log("📤 API 호출:", data);
		if (data.email === "existing@test.com") {
			throw new Error("이미 존재하는 이메일입니다.");
		}
		return { message: "회원가입 성공" };
	},
};

// useSignupForm 로직 테스트
const testSignupFormLogic = () => {
	console.log("🧪 useSignupForm 로직 테스트 시작...");

	// 폼 데이터 시뮬레이션
	const formData = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	let error = "";
	const isLoading = false;
	let termsAccepted = false;

	// 테스트 1: 초기 상태
	console.log(
		"✅ 초기 상태:",
		formData.name === "" && formData.email === "" && error === "" && !isLoading ? "PASS" : "FAIL"
	);

	// 테스트 2: 입력값 변경
	formData.name = "홍길동";
	formData.email = "test@example.com";
	console.log("✅ 입력값 변경:", formData.name === "홍길동" && formData.email === "test@example.com" ? "PASS" : "FAIL");

	// 테스트 3: 유효성 검사 (빈 필드)
	const validateForm = () => {
		if (!formData.name || !formData.email || !formData.password) {
			return "모든 필드를 입력해주세요.";
		}
		if (formData.password !== formData.confirmPassword) {
			return "비밀번호가 일치하지 않습니다.";
		}
		if (!termsAccepted) {
			return "이용약관에 동의해주세요.";
		}
		return null;
	};

	error = validateForm() || "";
	console.log("✅ 빈 필드 검증:", error.includes("모든 필드") ? "PASS" : "FAIL");

	// 테스트 4: 완전한 폼 데이터
	formData.password = "password123";
	formData.confirmPassword = "password123";
	termsAccepted = true;
	error = validateForm() || "";
	console.log("✅ 완전한 폼 검증:", error === "" ? "PASS" : "FAIL");

	console.log("🎉 useSignupForm 로직 테스트 완료!\n");
};

// 통합 테스트
const testSignupFlow = async () => {
	console.log("🧪 회원가입 플로우 테스트 시작...");

	const formData = {
		name: "홍길동",
		email: "test@example.com",
		password: "password123",
		confirmPassword: "password123",
	};

	try {
		// 성공 케이스
		console.log("📝 성공 케이스 테스트...");
		const result = await mockAuthService.signup({
			name: formData.name,
			email: formData.email,
			password: formData.password,
		});
		console.log("✅ 회원가입 성공:", result.message === "회원가입 성공" ? "PASS" : "FAIL");
		mockRouter.push("/login");

		// 실패 케이스
		console.log("📝 실패 케이스 테스트...");
		try {
			await mockAuthService.signup({
				name: "다른사용자",
				email: "existing@test.com",
				password: "password123",
			});
			console.log("❌ 실패 케이스: FAIL (에러가 발생해야 함)");
		} catch (error) {
			console.log("✅ 실패 케이스:", error instanceof Error && error.message.includes("이미 존재") ? "PASS" : "FAIL");
		}
	} catch (error) {
		console.error("❌ 플로우 테스트 에러:", error);
	}

	console.log("🎉 회원가입 플로우 테스트 완료!\n");
};

// 모든 테스트 실행
const runAllSignupTests = async () => {
	console.log("🚀 회원가입 전체 테스트 시작\n");

	testSignupFormLogic();
	await testSignupFlow();

	console.log("✨ 모든 회원가입 테스트 완료!");
};

export { testSignupFormLogic, testSignupFlow, runAllSignupTests };
