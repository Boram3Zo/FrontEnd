"use client";

import { Button } from "@/app/_components/ui/Button";
import { FormField } from "@/app/_components/ui/FormField";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/Card";
import { Label } from "@/app/_components/ui/Label";
import { Checkbox } from "@/app/_components/ui/Checkbox";
import { useSignupForm } from "@/app/_hooks/useSignupForm";
import Link from "next/link";

export function SignupForm() {
	const { formData, isLoading, error, termsAccepted, setTermsAccepted, handleInputChange, handleSubmit } =
		useSignupForm();

	return (
		<div className="max-w-md mx-auto">
			<Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
				<CardHeader className="text-center pb-6">
					<div className="mx-auto mb-4 text-6xl">🐾</div>
					<CardTitle className="text-2xl font-bold text-gray-800">회원가입</CardTitle>
					<p className="text-gray-600">치카쿠와 함께 산책을 시작해보세요</p>
				</CardHeader>

				<CardContent className="space-y-6">
					<form onSubmit={handleSubmit} className="space-y-6">
						{error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

						<div className="space-y-4">
							<FormField
								id="name"
								label="이름"
								type="text"
								placeholder="이름을 입력하세요"
								value={formData.name}
								onChange={handleInputChange}
								disabled={isLoading}
								required
							/>

							<FormField
								id="email"
								label="이메일"
								type="email"
								placeholder="이메일을 입력하세요"
								value={formData.email}
								onChange={handleInputChange}
								disabled={isLoading}
								required
							/>

							<FormField
								id="password"
								label="비밀번호"
								type="password"
								placeholder="비밀번호를 입력하세요"
								value={formData.password}
								onChange={handleInputChange}
								disabled={isLoading}
								required
							/>

							<FormField
								id="confirmPassword"
								label="비밀번호 확인"
								type="password"
								placeholder="비밀번호를 다시 입력하세요"
								value={formData.confirmPassword}
								onChange={handleInputChange}
								disabled={isLoading}
								required
							/>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox
								id="terms"
								checked={termsAccepted}
								onCheckedChange={checked => setTermsAccepted(checked as boolean)}
								disabled={isLoading}
							/>
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

						<Button
							type="submit"
							className="w-full h-12 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-semibold"
							disabled={isLoading}
						>
							{isLoading ? "회원가입 중..." : "회원가입"}
						</Button>
					</form>

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
	);
}
