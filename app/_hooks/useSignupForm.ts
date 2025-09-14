import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupFormData } from "@/app/_types/auth";
import { AuthService } from "@/app/_libs/authService";
import { validateSignupForm } from "@/app/_utils/validation";
import { useAuth } from "@/app/_providers/AuthProvider";

export function useSignupForm() {
	const router = useRouter();
	const { login } = useAuth();
	const [formData, setFormData] = useState<SignupFormData>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [termsAccepted, setTermsAccepted] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData(prev => ({
			...prev,
			[id]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validationError = validateSignupForm(formData, termsAccepted);
		if (validationError) {
			setError(validationError);
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			// 회원가입 API 호출
			await AuthService.signup({
				name: formData.name,
				email: formData.email,
				password: formData.password,
			});

			console.log("✅ 회원가입 성공 - 자동 로그인 처리 중...");

			// 회원가입 성공 후 자동으로 로그인 시도
			try {
				await AuthService.login(formData.email, formData.password);

				// 로그인 성공 시 AuthProvider 상태 업데이트
				login();

				console.log("🔑 자동 로그인 완료 - 메인 페이지로 이동");

				// 메인 페이지로 리디렉션
				router.push("/");
			} catch (loginError) {
				console.warn("⚠️ 자동 로그인 실패 - 수동 로그인 필요:", loginError);

				// 자동 로그인 실패 시 로그인 페이지로 안내
				router.push("/auth/login?message=회원가입 완료! 로그인해주세요");
			}
		} catch (err) {
			console.error("회원가입 에러:", err);
			if (err instanceof Error) {
				// 특정 에러 메시지들을 정확히 표시
				if (err.message.includes("이미 사용 중인 이메일입니다")) {
					setError("이미 사용 중인 이메일입니다.");
				} else {
					setError(err.message);
				}
			} else {
				setError("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return {
		formData,
		isLoading,
		error,
		termsAccepted,
		setTermsAccepted,
		handleInputChange,
		handleSubmit,
	};
}
