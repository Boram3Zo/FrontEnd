"use client";

import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { SignupForm } from "@/app/_components/auth/SignupForm";
import { withGuestOnlyGuard } from "@/app/_components/auth/AuthGuard";

function SignupPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
			<Header />

			<main className="pb-20 px-4 pt-8">
				<SignupForm />
			</main>

			<BottomNavigation />
		</div>
	);
}

// 게스트 전용 가드로 보호된 회원가입 페이지 export
export default withGuestOnlyGuard(SignupPage);
