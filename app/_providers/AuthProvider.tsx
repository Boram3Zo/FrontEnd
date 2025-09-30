"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
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

      // API를 통한 실제 인증 상태 확인
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

        // 사용자 정보 저장
        if (userData.success && userData.data) {
          setUser({
            memberId: userData.data.memberId,
            nickname: userData.data.nickname,
            email: userData.data.email,
          });
          console.log("✅ 사용자 인증 확인됨:", userData.data.nickname);
        }
        setIsLoggedIn(true);
      } else if (response.status === 401) {
        console.log("🔐 사용자 미인증 상태 (정상)");
        setIsLoggedIn(false);
        setUser(null);
      } else if (response.status === 403) {
        console.log("🚫 접근 권한 없음");
        setIsLoggedIn(false);
        setUser(null);
      } else {
        console.log(`⚠️ 예상치 못한 응답: ${response.status}`);
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.log("인증 상태 확인 중 네트워크 오류:", error);

      // 네트워크 에러 등의 경우
      if (error instanceof TypeError && error.message.includes("fetch")) {
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
  };

  const logout = async () => {
    try {
      // AuthService를 통한 로그아웃 API 호출
      const { AuthService } = await import("@/app/_libs/authService");
      await AuthService.logout();

      // 로그아웃 후 상태 즉시 업데이트
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("❌ 로그아웃 API 실패:", error);

      // 로그아웃 API 실패해도 클라이언트 상태는 로그아웃으로 설정
      setIsLoggedIn(false);
      setUser(null);
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
