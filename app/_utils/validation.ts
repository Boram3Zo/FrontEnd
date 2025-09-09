import { SignupFormData } from "@/app/_types/auth";

export const validateSignupForm = (formData: SignupFormData, termsAccepted: boolean): string | null => {
	if (!formData.name || !formData.email || !formData.password) {
		return "모든 필드를 입력해주세요.";
	}

	if (formData.password !== formData.confirmPassword) {
		return "비밀번호가 일치하지 않습니다.";
	}

	if (!termsAccepted) {
		return "이용약관에 동의해주세요.";
	}

	// 이메일 유효성 검사
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(formData.email)) {
		return "올바른 이메일 형식을 입력해주세요.";
	}

	// 비밀번호 최소 길이 검사
	if (formData.password.length < 6) {
		return "비밀번호는 최소 6자 이상이어야 합니다.";
	}

	return null;
};

export const validateLoginForm = (email: string, password: string): string | null => {
	if (!email || !password) {
		return "이메일과 비밀번호를 입력해주세요.";
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return "올바른 이메일 형식을 입력해주세요.";
	}

	return null;
};
