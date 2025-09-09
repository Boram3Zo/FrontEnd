import { validateSignupForm, validateLoginForm } from "../validation";
import { SignupFormData } from "@/app/_types/auth";

describe("validateSignupForm", () => {
	const validFormData: SignupFormData = {
		name: "홍길동",
		email: "test@example.com",
		password: "password123",
		confirmPassword: "password123",
	};

	it("유효한 폼 데이터일 때 null을 반환해야 한다", () => {
		const result = validateSignupForm(validFormData, true);
		expect(result).toBeNull();
	});

	it("이름이 비어있을 때 에러 메시지를 반환해야 한다", () => {
		const formData = { ...validFormData, name: "" };
		const result = validateSignupForm(formData, true);
		expect(result).toBe("모든 필드를 입력해주세요.");
	});

	it("이메일이 비어있을 때 에러 메시지를 반환해야 한다", () => {
		const formData = { ...validFormData, email: "" };
		const result = validateSignupForm(formData, true);
		expect(result).toBe("모든 필드를 입력해주세요.");
	});

	it("비밀번호가 비어있을 때 에러 메시지를 반환해야 한다", () => {
		const formData = { ...validFormData, password: "" };
		const result = validateSignupForm(formData, true);
		expect(result).toBe("모든 필드를 입력해주세요.");
	});

	it("비밀번호가 일치하지 않을 때 에러 메시지를 반환해야 한다", () => {
		const formData = { ...validFormData, confirmPassword: "differentPassword" };
		const result = validateSignupForm(formData, true);
		expect(result).toBe("비밀번호가 일치하지 않습니다.");
	});

	it("이용약관에 동의하지 않았을 때 에러 메시지를 반환해야 한다", () => {
		const result = validateSignupForm(validFormData, false);
		expect(result).toBe("이용약관에 동의해주세요.");
	});

	it("유효하지 않은 이메일 형식일 때 에러 메시지를 반환해야 한다", () => {
		const formData = { ...validFormData, email: "invalid-email" };
		const result = validateSignupForm(formData, true);
		expect(result).toBe("올바른 이메일 형식을 입력해주세요.");
	});

	it("비밀번호가 6자 미만일 때 에러 메시지를 반환해야 한다", () => {
		const formData = {
			...validFormData,
			password: "12345",
			confirmPassword: "12345",
		};
		const result = validateSignupForm(formData, true);
		expect(result).toBe("비밀번호는 최소 6자 이상이어야 합니다.");
	});
});

describe("validateLoginForm", () => {
	it("유효한 로그인 데이터일 때 null을 반환해야 한다", () => {
		const result = validateLoginForm("test@example.com", "password123");
		expect(result).toBeNull();
	});

	it("이메일이 비어있을 때 에러 메시지를 반환해야 한다", () => {
		const result = validateLoginForm("", "password123");
		expect(result).toBe("이메일과 비밀번호를 입력해주세요.");
	});

	it("비밀번호가 비어있을 때 에러 메시지를 반환해야 한다", () => {
		const result = validateLoginForm("test@example.com", "");
		expect(result).toBe("이메일과 비밀번호를 입력해주세요.");
	});

	it("유효하지 않은 이메일 형식일 때 에러 메시지를 반환해야 한다", () => {
		const result = validateLoginForm("invalid-email", "password123");
		expect(result).toBe("올바른 이메일 형식을 입력해주세요.");
	});
});
