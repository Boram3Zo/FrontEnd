"use client";

import { Button } from "@/app/_components/ui/Button";
import { Card, CardContent } from "@/app/_components/ui/Card";
import { User, LogOut, UserPlus, LogIn, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";

interface MenuSidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

export function MenuSidebar({ isOpen, onClose }: MenuSidebarProps) {
	const { isLoggedIn, isLoading, logout } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await logout();
			onClose(); // 사이드바 닫기
			router.push("/"); // 메인 페이지로 이동
		} catch (error) {
			console.error("로그아웃 실패:", error);
		}
	};

	// ESC 키로 메뉴 닫기
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			// 스크롤 방지
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	return (
		<>
			{/* 사이드바 - 전체 화면 */}
			<div
				className={`fixed right-0 top-0 h-full w-full bg-gradient-to-br from-orange-50 to-pink-50 shadow-xl transform transition-transform duration-300 ease-in-out z-[70] ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				{/* 헤더 */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200">
					<h2 className="text-lg font-bold text-gray-800">메뉴</h2>
					<Button variant="ghost" size="icon" onClick={onClose}>
						<X className="h-5 w-5" />
					</Button>
				</div>

				{/* 스크롤 가능한 컨텐츠 */}
				<div className="h-full overflow-y-auto pb-20 px-4 pt-6">
					<div className="space-y-6">
						{/* Profile Section */}
						<Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center gap-4">
									<div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full flex items-center justify-center">
										<User className="h-8 w-8 text-orange-600" />
									</div>
									<div>
										{isLoading ? (
											<>
												<h3 className="text-lg font-bold text-gray-800">로딩중...</h3>
												<p className="text-sm text-gray-600">세션을 확인하고 있습니다</p>
											</>
										) : isLoggedIn ? (
											<>
												<h3 className="text-lg font-bold text-gray-800">환영합니다!</h3>
												<p className="text-sm text-gray-600">치카쿠와 함께 산책을 즐겨보세요</p>
											</>
										) : (
											<>
												<h3 className="text-lg font-bold text-gray-800">게스트</h3>
												<p className="text-sm text-gray-600">로그인하여 더 많은 기능을 이용해보세요</p>
											</>
										)}
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Authentication Section */}
						<Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
							<CardContent className="p-6 space-y-3">
								<h3 className="font-semibold text-gray-800 mb-4">계정</h3>

								{!isLoading && (
									<>
										{isLoggedIn ? (
											// 로그인 상태: 로그아웃 버튼만 표시
											<Button variant="ghost" className="w-full justify-start gap-3 h-12" onClick={handleLogout}>
												<LogOut className="h-5 w-5 text-red-600" />
												<span>로그아웃</span>
											</Button>
										) : (
											// 로그아웃 상태: 로그인, 회원가입 버튼 표시
											<>
												<Link href="/login" onClick={onClose}>
													<Button variant="ghost" className="w-full justify-start gap-3 h-12">
														<LogIn className="h-5 w-5 text-blue-600" />
														<span>로그인</span>
													</Button>
												</Link>

												<Link href="/signup" onClick={onClose}>
													<Button variant="ghost" className="w-full justify-start gap-3 h-12">
														<UserPlus className="h-5 w-5 text-green-600" />
														<span>회원가입</span>
													</Button>
												</Link>
											</>
										)}
									</>
								)}
							</CardContent>
						</Card>

						{/* App Info */}
						<div className="text-center text-sm text-gray-500 pt-4">
							<div className="space-y-1">
								<p>치카쿠 v1.0.0</p>
								<p>우리 동네 숨겨진 길을 함께 발견해보세요</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
