"use client";

import { useEffect, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_providers/AuthProvider";

/**
 * 로그인이 필요한 페이지를 보호하는 Higher-Order Component
 * 로그인하지 않은 사용자는 /login으로 리다이렉트됩니다.
 */
export function withAuthGuard<P extends object>(Component: ComponentType<P>) {
	return function AuthGuardedComponent(props: P) {
		const router = useRouter();
		const { isLoggedIn, isLoading } = useAuth();

		useEffect(() => {
			// 로딩 중일 때는 대기
			if (isLoading) return;

			// 로그인되지 않은 상태면 로그인 페이지로 리다이렉트
			if (isLoggedIn === false) {
				console.log("🔒 인증되지 않은 사용자 - 로그인 페이지로 리다이렉트");
				router.push("/login");
				return;
			}
		}, [isLoading, isLoggedIn, router]);

		// 로딩 중이거나 인증되지 않은 상태일 때는 로딩 화면 표시
		if (isLoading || isLoggedIn === false) {
			return (
				<div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
						<p className="text-gray-600">로그인 상태를 확인하고 있습니다...</p>
					</div>
				</div>
			);
		}

		// 인증된 사용자만 원본 컴포넌트 렌더링
		return <Component {...props} />;
	};
}

/**
 * 로그인하지 않은 사용자만 접근 가능한 페이지를 보호하는 Higher-Order Component
 * 이미 로그인한 사용자는 메인 페이지(/)로 리다이렉트됩니다.
 */
export function withGuestOnlyGuard<P extends object>(Component: ComponentType<P>) {
	return function GuestOnlyGuardedComponent(props: P) {
		const router = useRouter();
		const { isLoggedIn, isLoading } = useAuth();

		useEffect(() => {
			// 로딩 중일 때는 대기
			if (isLoading) return;

			// 이미 로그인된 상태면 메인 페이지로 리다이렉트
			if (isLoggedIn === true) {
				console.log("🔑 이미 로그인된 사용자 - 메인 페이지로 리다이렉트");
				router.push("/");
				return;
			}
		}, [isLoading, isLoggedIn, router]);

		// 로딩 중일 때는 로딩 화면 표시
		if (isLoading) {
			return (
				<div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
						<p className="text-gray-600">로그인 상태를 확인하고 있습니다...</p>
					</div>
				</div>
			);
		}

		// 로그인되지 않은 사용자나 이미 로그인된 사용자가 리다이렉트 중인 경우
		if (isLoggedIn === true) {
			return null;
		}

		// 로그인하지 않은 사용자만 원본 컴포넌트 렌더링
		return <Component {...props} />;
	};
}
