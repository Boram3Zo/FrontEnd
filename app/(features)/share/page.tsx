"use client";

import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { ShareForm } from "@/app/_components/share/ShareForm";
import { withAuthGuard } from "@/app/_components/auth/AuthGuard";

function ShareCoursePage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<ShareForm />
			<BottomNavigation />
		</div>
	);
}

// 인증 가드로 보호된 공유 페이지 export
export default withAuthGuard(ShareCoursePage);
