import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginFormData } from "@/app/_types/auth";
import { validateLoginForm } from "@/app/_utils/validation";
import { useAuth } from "@/app/_providers";

export function useLoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { login } = useAuth();
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	// URL 쿼리 파라미터에서 메시지 확인
	useEffect(() => {
		const message = searchParams.get("message");
		if (message) {
			setSuccessMessage(decodeURIComponent(message));
		}
	}, [searchParams]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData(prev => {
			const newData = {
				...prev,
				[id]: value,
			};
			return newData;
		});
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
			// 실제 로그인 API 호출
			const { AuthService } = await import("@/app/_libs/authService");
			const response = await AuthService.login(formData.email, formData.password);

			console.log("로그인 응답:", response);

			// 1) 서버가 프로필을 반환하는 경우
			if (response?.data?.memberId) {
				await login({
				memberId: response.data.memberId,
				name: response.data.nickname,
				email: response.data.email,
				});
			} else {
				// 2) 200이지만 프로필을 안 주는 경우
				await login(); // 내부에서 checkAuthStatus 호출
			}
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
		successMessage,
		handleInputChange,
		handleSubmit,
	};
}
