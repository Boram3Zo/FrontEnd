import { useState, useEffect } from "react";

export function useAuth() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = 로딩 중
	const [isLoading, setIsLoading] = useState(true);

	const checkAuthStatus = async () => {
		try {
			// 세션 확인을 위해 간단한 API 호출
			// 실제로는 /member/profile 같은 인증이 필요한 API를 호출하면 됨
			// 지금은 임시로 쿠키 존재 여부로 판단
			const hasCookie = document.cookie.includes("JSESSIONID");
			setIsLoggedIn(hasCookie);
		} catch (error) {
			// 네트워크 에러 등의 경우 로그아웃 상태로 간주
			console.error("세션 확인 실패:", error);
			setIsLoggedIn(false);
		} finally {
			setIsLoading(false);
		}
	};

	const login = () => {
		setIsLoggedIn(true);
	};

	const logout = async () => {
		try {
			// AuthService를 통한 로그아웃 API 호출
			const { AuthService } = await import("@/app/_libs/authService");
			await AuthService.logout();
		} catch (error) {
			console.error("로그아웃 실패:", error);
		} finally {
			setIsLoggedIn(false);
		}
	};

	useEffect(() => {
		checkAuthStatus();
	}, []);

	return {
		isLoggedIn,
		isLoading,
		login,
		logout,
		checkAuthStatus,
	};
}
