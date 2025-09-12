"use client";

import { Button } from "@/app/_components/ui/Button";
import { FormField } from "@/app/_components/ui/FormField";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/Card";
import { useLoginForm } from "@/app/_hooks/useLoginForm";
import Link from "next/link";

export function LoginForm() {
	const { formData, isLoading, error, handleInputChange, handleSubmit } = useLoginForm();

	return (
		<div className="max-w-md mx-auto">
			<Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
				<CardHeader className="text-center pb-6">
					<div className="mx-auto mb-4 text-6xl">🐾</div>
					<CardTitle className="text-2xl font-bold text-gray-800">로그인</CardTitle>
					<p className="text-gray-600">치카쿠에 오신 것을 환영합니다</p>
				</CardHeader>

				<CardContent className="space-y-6">
					<form onSubmit={handleSubmit} className="space-y-6">
						{error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

						<div className="space-y-4">
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
						</div>

						<Button
							type="submit"
							className="w-full h-12 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-semibold"
							disabled={isLoading}
						>
							{isLoading ? "로그인 중..." : "로그인"}
						</Button>
					</form>

					<div className="text-center space-y-2">
						<p className="text-sm text-gray-600">
							계정이 없으신가요?{" "}
							<Link href="/signup" className="text-orange-600 hover:text-orange-700 font-semibold">
								회원가입
							</Link>
						</p>
						<Link href="/forgot-password" className="text-sm text-gray-500 hover:text-gray-700">
							비밀번호를 잊으셨나요?
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
