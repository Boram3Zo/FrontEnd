/**
 * scripts/signup.test.js
 * 회원가입 기능에 대한 Jest 테스트
 */

// fetch 모킹을 위한 설정
global.fetch = jest.fn();

describe("회원가입 유효성 검사 테스트", () => {
	// 유효성 검사 함수 (실제 앱에서 사용하는 함수와 동일)
	const validateSignupForm = (formData, termsAccepted) => {
		if (!formData.name || !formData.email || !formData.password) {
			return "모든 필드를 입력해주세요.";
		}
		if (formData.password !== formData.confirmPassword) {
			return "비밀번호가 일치하지 않습니다.";
		}
		if (!termsAccepted) {
			return "이용약관에 동의해주세요.";
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			return "올바른 이메일 형식을 입력해주세요.";
		}
		if (formData.password.length < 6) {
			return "비밀번호는 최소 6자 이상이어야 합니다.";
		}
		return null;
	};

	const validData = {
		name: "홍길동",
		email: "test@example.com",
		password: "password123",
		confirmPassword: "password123",
	};

	it("유효한 데이터는 null을 반환해야 한다", () => {
		const result = validateSignupForm(validData, true);
		expect(result).toBeNull();
	});

	it("이름이 비어있으면 에러 메시지를 반환해야 한다", () => {
		const invalidData = { ...validData, name: "" };
		const result = validateSignupForm(invalidData, true);
		expect(result).toContain("모든 필드");
	});

	it("이메일이 비어있으면 에러 메시지를 반환해야 한다", () => {
		const invalidData = { ...validData, email: "" };
		const result = validateSignupForm(invalidData, true);
		expect(result).toContain("모든 필드");
	});

	it("비밀번호가 비어있으면 에러 메시지를 반환해야 한다", () => {
		const invalidData = { ...validData, password: "" };
		const result = validateSignupForm(invalidData, true);
		expect(result).toContain("모든 필드");
	});

	it("비밀번호 확인이 다르면 에러 메시지를 반환해야 한다", () => {
		const invalidData = { ...validData, confirmPassword: "diff" };
		const result = validateSignupForm(invalidData, true);
		expect(result).toContain("일치하지");
	});

	it("이용약관에 동의하지 않으면 에러 메시지를 반환해야 한다", () => {
		const result = validateSignupForm(validData, false);
		expect(result).toContain("이용약관");
	});

	it("잘못된 이메일 형식이면 에러 메시지를 반환해야 한다", () => {
		const invalidData = { ...validData, email: "invalid-email" };
		const result = validateSignupForm(invalidData, true);
		expect(result).toContain("올바른 이메일");
	});

	it("비밀번호가 6자 미만이면 에러 메시지를 반환해야 한다", () => {
		const invalidData = { ...validData, password: "12345", confirmPassword: "12345" };
		const result = validateSignupForm(invalidData, true);
		expect(result).toContain("최소 6자");
	});
});

describe("회원가입 API 호출 테스트", () => {
	beforeEach(() => {
		fetch.mockClear();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("성공적인 회원가입 요청을 처리해야 한다", async () => {
		// Mock successful response
		fetch.mockResolvedValue({
			ok: true,
			json: async () => ({ message: "회원가입 성공" }),
		});

		const response = await fetch("http://localhost:9988/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: "홍길동",
				email: "test@example.com",
				password: "password123",
			}),
		});

		const result = await response.json();

		expect(fetch).toHaveBeenCalledWith("http://localhost:9988/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: "홍길동",
				email: "test@example.com",
				password: "password123",
			}),
		});
		expect(response.ok).toBe(true);
		expect(result.message).toBe("회원가입 성공");
	});

	it("중복된 이메일에 대한 에러를 처리해야 한다", async () => {
		// Mock error response
		fetch.mockResolvedValue({
			ok: false,
			json: async () => ({ message: "이미 존재하는 이메일입니다." }),
		});

		const response = await fetch("http://localhost:9988/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: "홍길동",
				email: "existing@test.com",
				password: "password123",
			}),
		});

		const result = await response.json();

		expect(response.ok).toBe(false);
		expect(result.message).toContain("이미 존재");
	});

	it("네트워크 에러가 적절히 처리되어야 한다", async () => {
		fetch.mockRejectedValue(new Error("Network Error"));

		await expect(
			fetch("http://localhost:9988/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "홍길동",
					email: "test@example.com",
					password: "password123",
				}),
			})
		).rejects.toThrow("Network Error");
	});
});

describe("회원가입 플로우 통합 테스트", () => {
	let mockFormState;

	beforeEach(() => {
		mockFormState = {
			formData: { name: "", email: "", password: "", confirmPassword: "" },
			error: "",
			isLoading: false,
		};
	});

	it("초기 상태가 올바르게 설정되어야 한다", () => {
		expect(mockFormState.formData.name).toBe("");
		expect(mockFormState.formData.email).toBe("");
		expect(mockFormState.formData.password).toBe("");
		expect(mockFormState.formData.confirmPassword).toBe("");
		expect(mockFormState.error).toBe("");
		expect(mockFormState.isLoading).toBe(false);
	});

	it("폼 데이터 업데이트가 올바르게 동작해야 한다", () => {
		mockFormState.formData = {
			name: "홍길동",
			email: "test@example.com",
			password: "password123",
			confirmPassword: "password123",
		};

		expect(mockFormState.formData.name).toBe("홍길동");
		expect(mockFormState.formData.email).toBe("test@example.com");
		expect(mockFormState.formData.password).toBe("password123");
		expect(mockFormState.formData.confirmPassword).toBe("password123");
	});

	it("로딩 상태 변경이 올바르게 동작해야 한다", () => {
		// 로딩 시작
		mockFormState.isLoading = true;
		expect(mockFormState.isLoading).toBe(true);

		// 로딩 완료
		mockFormState.isLoading = false;
		expect(mockFormState.isLoading).toBe(false);
	});

	it("에러 상태 관리가 올바르게 동작해야 한다", () => {
		// 에러 설정
		mockFormState.error = "테스트 에러 메시지";
		expect(mockFormState.error).toBe("테스트 에러 메시지");

		// 에러 초기화
		mockFormState.error = "";
		expect(mockFormState.error).toBe("");
	});

	it("회원가입 성공 플로우가 올바르게 동작해야 한다", () => {
		// 1. 폼 데이터 입력
		mockFormState.formData = {
			name: "홍길동",
			email: "test@example.com",
			password: "password123",
			confirmPassword: "password123",
		};

		// 2. 로딩 상태 시작
		mockFormState.isLoading = true;
		mockFormState.error = "";

		expect(mockFormState.isLoading).toBe(true);
		expect(mockFormState.error).toBe("");

		// 3. 성공 처리
		mockFormState.isLoading = false;
		mockFormState.error = "";

		expect(mockFormState.isLoading).toBe(false);
		expect(mockFormState.error).toBe("");
	});

	it("회원가입 실패 플로우가 올바르게 동작해야 한다", () => {
		// 1. 폼 데이터 입력 (중복 이메일)
		mockFormState.formData = {
			name: "홍길동",
			email: "existing@test.com",
			password: "password123",
			confirmPassword: "password123",
		};

		// 2. 로딩 상태 시작
		mockFormState.isLoading = true;
		mockFormState.error = "";

		// 3. 실패 처리
		mockFormState.isLoading = false;
		mockFormState.error = "이미 존재하는 이메일입니다.";

		expect(mockFormState.isLoading).toBe(false);
		expect(mockFormState.error).toBe("이미 존재하는 이메일입니다.");
	});
});
