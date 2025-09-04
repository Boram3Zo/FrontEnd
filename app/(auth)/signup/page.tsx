import { Header } from "@/app/_components/layout/CHeader";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { Button } from "@/app/_components/ui/CButton";
import { Input } from "@/app/_components/ui/CInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/CCard";
import { Label } from "@/app/_components/ui/CLabel";
import { Checkbox } from "@/app/_components/ui/CCheckbox";
import Link from "next/link";

export default function SignupPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
			<Header />

			<main className="pb-20 px-4 pt-8">
				<div className="max-w-md mx-auto">
					<Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
						<CardHeader className="text-center pb-6">
							<div className="mx-auto mb-4 text-6xl">🐾</div>
							<CardTitle className="text-2xl font-bold text-gray-800">회원가입</CardTitle>
							<p className="text-gray-600">치카쿠와 함께 산책을 시작해보세요</p>
						</CardHeader>

						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">이름</Label>
									<Input id="name" type="text" placeholder="이름을 입력하세요" className="h-12" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">이메일</Label>
									<Input id="email" type="email" placeholder="이메일을 입력하세요" className="h-12" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">비밀번호</Label>
									<Input id="password" type="password" placeholder="비밀번호를 입력하세요" className="h-12" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="confirmPassword">비밀번호 확인</Label>
									<Input
										id="confirmPassword"
										type="password"
										placeholder="비밀번호를 다시 입력하세요"
										className="h-12"
									/>
								</div>
							</div>

							<div className="flex items-center space-x-2">
								<Checkbox id="terms" />
								<Label htmlFor="terms" className="text-sm text-gray-600">
									<Link href="#" className="text-orange-600 hover:text-orange-700">
										이용약관
									</Link>{" "}
									및{" "}
									<Link href="#" className="text-orange-600 hover:text-orange-700">
										개인정보처리방침
									</Link>
									에 동의합니다
								</Label>
							</div>

							<Button className="w-full h-12 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-semibold">
								회원가입
							</Button>

							<div className="text-center">
								<p className="text-sm text-gray-600">
									이미 계정이 있으신가요?{" "}
									<Link href="/login" className="text-orange-600 hover:text-orange-700 font-semibold">
										로그인
									</Link>
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>

			<BottomNavigation />
		</div>
	);
}
