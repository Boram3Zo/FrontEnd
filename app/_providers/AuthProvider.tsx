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
  name?: string;
  email?: string;
  // 필요에 따라 다른 사용자 정보 추가
}

interface AuthContextType {
  isLoggedIn: boolean | null;
  isLoading: boolean;
  user: UserProfile | null;
  login: (profile?: UserProfile | null) => Promise<void> | void;
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
      const res = await fetch(`${API_BASE_URL}/member/profile`, {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        setIsLoggedIn(false);
        setUser(null);
        return;
      }

      const json: UserProfile = await res.json();
      console.log("[AuthProvider.checkAuthStatus] 응답 JSON:", json);

      if (json.memberId) {
        setUser({
          memberId: json.memberId,
          name: json.name,
          email: json.email,
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (e) {
      console.error("인증 상태 확인 중 오류:", e);
      setIsLoggedIn(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (profile?: UserProfile | null) => {
    console.log("[AuthProvider.login] 로그인 성공, 프로필:", profile);
    if (profile && profile.memberId) {
      setUser({
        memberId: profile.memberId,
        name: profile.name,
        email: profile.email,
      });
      setIsLoggedIn(true);
      return;
    }
    // 프로필을 못 받았으면 서버에서 다시 확인
    await checkAuthStatus();
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
    console.log("[Auth] mount");
    checkAuthStatus();
  }, []); // 컴포넌트 마운트 시에만 실행

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
