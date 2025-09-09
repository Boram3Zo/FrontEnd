import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupFormData } from "@/app/_types/auth";
import { AuthService } from "@/app/_libs/authService";
import { validateSignupForm } from "@/app/_utils/validation";

export function useSignupForm() {
	const router = useRouter();
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
			await AuthService.signup({
				name: formData.name,
				email: formData.email,
				password: formData.password,
			});

			alert("회원가입이 완료되었습니다!");
			router.push("/login");
		} catch (err) {
			console.error("회원가입 에러:", err);
			setError(err instanceof Error ? err.message : "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
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
