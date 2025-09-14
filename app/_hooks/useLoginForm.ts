import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginFormData } from "@/app/_types/auth";
import { AuthService } from "@/app/_libs/authService";
import { validateLoginForm } from "@/app/_utils/validation";
import { useAuth } from "@/app/_providers";

export function useLoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { checkAuthStatus, login } = useAuth();
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
		console.log("🔄 Input Change:", { id, value }); // 디버깅용 로그
		setFormData(prev => {
			const newData = {
				...prev,
				[id]: value,
			};
			console.log("📝 Updated Form Data:", newData); // 디버깅용 로그
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

		console.log("📤 Login Attempt:", {
			email: formData.email,
			password: formData.password,
			emailLength: formData.email?.length || 0,
			passwordLength: formData.password?.length || 0,
		}); // 디버깅용 로그

		try {
			const response = await AuthService.login(formData.email, formData.password);

			// 세션 기반 인증: JSESSIONID 쿠키가 자동으로 설정됨 (credentials: 'include'로 처리)
			console.log("✅ 로그인 성공:", response);

			// 로그인 성공 후 상태를 즉시 업데이트
			login(); // 먼저 상태를 true로 설정

			// 디버깅용: LocalStorage에 수동 로그인 플래그 설정
			localStorage.setItem("manualLogin", "true");
			console.log("🔧 수동 로그인 플래그 설정됨");

			// 그 다음 쿠키 상태도 다시 확인
			setTimeout(() => {
				checkAuthStatus();
			}, 100); // 쿠키 설정이 완료될 시간을 주기 위해 약간의 지연

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
		successMessage,
		handleInputChange,
		handleSubmit,
	};
}
