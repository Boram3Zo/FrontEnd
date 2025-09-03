import { Header } from "@/app/_components/layout/header";
import { BottomNavigation } from "@/app/_components/layout/bottom-navigation";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { User, Settings, HelpCircle, LogOut, UserPlus, LogIn } from "lucide-react";
import Link from "next/link";

export default function MenuPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
			<Header />

			<main className="pb-20 px-4 pt-6">
				<div className="max-w-md mx-auto space-y-6">
					{/* Profile Section */}
					<Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
						<CardContent className="p-6">
							<div className="flex items-center gap-4">
								<div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full flex items-center justify-center">
									<User className="h-8 w-8 text-orange-600" />
								</div>
								<div>
									<h2 className="text-lg font-bold text-gray-800">게스트</h2>
									<p className="text-sm text-gray-600">로그인하여 더 많은 기능을 이용해보세요</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Authentication Section */}
					<Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
						<CardContent className="p-6 space-y-3">
							<h3 className="font-semibold text-gray-800 mb-4">계정</h3>

							<Link href="/login">
								<Button variant="ghost" className="w-full justify-start gap-3 h-12">
									<LogIn className="h-5 w-5 text-blue-600" />
									<span>로그인</span>
								</Button>
							</Link>

							<Link href="/signup">
								<Button variant="ghost" className="w-full justify-start gap-3 h-12">
									<UserPlus className="h-5 w-5 text-green-600" />
									<span>회원가입</span>
								</Button>
							</Link>
						</CardContent>
					</Card>

					{/* Menu Options */}
					<Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
						<CardContent className="p-6 space-y-3">
							<h3 className="font-semibold text-gray-800 mb-4">메뉴</h3>

							<Button variant="ghost" className="w-full justify-start gap-3 h-12">
								<Settings className="h-5 w-5 text-gray-600" />
								<span>설정</span>
							</Button>

							<Button variant="ghost" className="w-full justify-start gap-3 h-12">
								<HelpCircle className="h-5 w-5 text-purple-600" />
								<span>도움말</span>
							</Button>

							<Button variant="ghost" className="w-full justify-start gap-3 h-12">
								<LogOut className="h-5 w-5 text-red-600" />
								<span>로그아웃</span>
							</Button>
						</CardContent>
					</Card>

					{/* App Info */}
					<div className="text-center text-sm text-gray-500 pt-4">
						<p>치카쿠 v1.0.0</p>
						<p>우리 동네 숨겨진 길을 함께 발견해보세요</p>
					</div>
				</div>
			</main>

			<BottomNavigation />
		</div>
	);
}
