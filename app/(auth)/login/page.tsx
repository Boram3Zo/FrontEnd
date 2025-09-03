import { Header } from "@/app/_components/header";
import { BottomNavigation } from "@/app/_components/bottom-navigation";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Label } from "@/app/_components/ui/label";
import Link from "next/link";

export default function LoginPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
			<Header />

			<main className="pb-20 px-4 pt-8">
				<div className="max-w-md mx-auto">
					<Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
						<CardHeader className="text-center pb-6">
							<div className="mx-auto mb-4 text-6xl">🐾</div>
							<CardTitle className="text-2xl font-bold text-gray-800">로그인</CardTitle>
							<p className="text-gray-600">치카쿠에 오신 것을 환영합니다</p>
						</CardHeader>

						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">이메일</Label>
									<Input id="email" type="email" placeholder="이메일을 입력하세요" className="h-12" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">비밀번호</Label>
									<Input id="password" type="password" placeholder="비밀번호를 입력하세요" className="h-12" />
								</div>
							</div>

							<Button className="w-full h-12 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-semibold">
								로그인
							</Button>

							<div className="text-center space-y-2">
								<p className="text-sm text-gray-600">
									계정이 없으신가요?{" "}
									<Link href="/signup" className="text-orange-600 hover:text-orange-700 font-semibold">
										회원가입
									</Link>
								</p>
								<Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
									비밀번호를 잊으셨나요?
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>

			<BottomNavigation />
		</div>
	);
}
