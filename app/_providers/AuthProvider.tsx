"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_BASE_URL } from "@/app/_constants/api";

interface UserProfile {
	memberId: number;
	nickname?: string;
	email?: string;
	// 필요에 따라 다른 사용자 정보 추가
}

interface AuthContextType {
	isLoggedIn: boolean | null;
	isLoading: boolean;
	user: UserProfile | null;
	login: () => void;
	logout: () => Promise<void>;
	checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = 로딩 중
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<UserProfile | null>(null);

	const checkAuthStatus = async () => {
		try {
			setIsLoading(true);

			// 개발용: LocalStorage 플래그 확인
			const manualLoginFlag = localStorage.getItem("manualLogin");
			if (manualLoginFlag === "true") {
				console.log("🔧 수동 로그인 플래그 감지 - 강제 로그인 상태 설정");
				setIsLoggedIn(true);
				// 개발용 임시 사용자 정보 설정
				setUser({
					memberId: 1,
					nickname: "개발자",
					email: "dev@example.com",
				});
				return;
			}

			// API를 통한 실제 인증 상태 확인
			console.log("🌐 API를 통한 인증 상태 확인 시도...");

			const response = await fetch(`${API_BASE_URL}/member/profile`, {
				method: "GET",
				credentials: "include", // HttpOnly 쿠키를 포함하여 요청
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const userData = await response.json();
				console.log("✅ 인증 상태 확인 성공:", userData);

				// 사용자 정보 저장
				if (userData.success && userData.data) {
					setUser({
						memberId: userData.data.memberId,
						nickname: userData.data.nickname,
						email: userData.data.email,
					});
				}
				setIsLoggedIn(true);
			} else if (response.status === 401) {
				console.log("❌ 인증되지 않은 상태 (401) - 로그아웃 상태로 설정");
				setIsLoggedIn(false);
				setUser(null);
			} else if (response.status === 403) {
				console.log("❌ 권한이 없음 (403) - 로그아웃 상태로 설정");
				setIsLoggedIn(false);
				setUser(null);
			} else {
				console.log("⚠️ 예상치 못한 응답 상태:", response.status);
				setIsLoggedIn(false);
				setUser(null);
			}
		} catch (error) {
			console.error("🚨 인증 상태 확인 실패:", error);

			// 네트워크 에러 등의 경우
			if (error instanceof TypeError && error.message.includes("fetch")) {
				console.log("🌐 네트워크 연결 문제 - 현재 상태 유지");
				setIsLoggedIn(null);
			} else {
				setIsLoggedIn(false);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const login = () => {
		setIsLoggedIn(true);
		console.log("🔑 로그인 상태 업데이트됨");
	};

	const logout = async () => {
		try {
			console.log("🚪 로그아웃 시도 중...");

			// AuthService를 통한 로그아웃 API 호출
			const { AuthService } = await import("@/app/_libs/authService");
			await AuthService.logout();

			console.log("✅ 로그아웃 API 호출 성공");

			// 로그아웃 후 상태 즉시 업데이트
			setIsLoggedIn(false);
			setUser(null);

			// 수동 로그인 플래그 제거
			localStorage.removeItem("manualLogin");

			console.log("🚪 로그아웃 완료 - 모든 상태 초기화됨");
		} catch (error) {
			console.error("❌ 로그아웃 API 실패:", error);

			// 로그아웃 API 실패해도 클라이언트 상태는 로그아웃으로 설정
			setIsLoggedIn(false);
			setUser(null);
			localStorage.removeItem("manualLogin");

			console.log("🚪 로그아웃 강제 완료 - 클라이언트 상태 초기화됨");
		}
	};

	useEffect(() => {
		checkAuthStatus();
	}, []);

	const value: AuthContextType = {
		isLoggedIn,
		isLoading,
		user,
		login,
		logout,
		checkAuthStatus,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
