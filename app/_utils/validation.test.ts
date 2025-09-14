import { validateSignupForm } from "./validation";
import { SignupFormData } from "@/app/_types/auth";

describe("validateSignupForm", () => {
	const validData: SignupFormData = {
		name: "홍길동",
		email: "test@example.com",
		password: "password123",
		confirmPassword: "password123",
	};

	it("should return null for valid data", () => {
		const result = validateSignupForm(validData, true);
		expect(result).toBeNull();
	});

	it("should return error for empty name", () => {
		const result = validateSignupForm({ ...validData, name: "" }, true);
		expect(result).toContain("모든 필드");
	});

	it("should return error for password mismatch", () => {
		const result = validateSignupForm({ ...validData, confirmPassword: "different" }, true);
		expect(result).toContain("일치하지 않습니다");
	});

	it("should return error for terms not accepted", () => {
		const result = validateSignupForm(validData, false);
		expect(result).toContain("이용약관");
	});

	it("should return error for invalid email", () => {
		const result = validateSignupForm({ ...validData, email: "invalid-email" }, true);
		expect(result).toContain("이메일 형식");
	});
});
