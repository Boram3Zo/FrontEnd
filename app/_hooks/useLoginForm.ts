import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData } from "@/app/_types/auth";
import { AuthService } from "@/app/_libs/authService";
import { validateLoginForm } from "@/app/_utils/validation";

export function useLoginForm() {
	const router = useRouter();
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData(prev => ({
			...prev,
			[id]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validationError = validateLoginForm(formData.email, formData.password);
		if (validationError) {
			setError(validationError);
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			const response = await AuthService.login(formData.email, formData.password);

			// 로그인 성공 시 토큰을 localStorage에 저장 (실제 구현에서는 보안 고려 필요)
			if (response.token) {
				localStorage.setItem("authToken", response.token);
			}

			alert("로그인이 완료되었습니다!");
			router.push("/"); // 메인 페이지로 이동
		} catch (err) {
			console.error("로그인 에러:", err);
			setError(err instanceof Error ? err.message : "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
		} finally {
			setIsLoading(false);
		}
	};

	return {
		formData,
		isLoading,
		error,
		handleInputChange,
		handleSubmit,
	};
}
