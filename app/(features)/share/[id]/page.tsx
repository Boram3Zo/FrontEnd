"use client";

import { use } from "react";
import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { ShareForm } from "@/app/_components/share/ShareForm";
import { withAuthGuard } from "@/app/_components/auth/AuthGuard";

interface ShareCourseDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

function ShareCourseDetailPage({ params }: ShareCourseDetailPageProps) {
	const { id } = use(params);

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<ShareForm postId={id} />
			<BottomNavigation />
		</div>
	);
}

// 인증 가드로 보호된 공유 상세 페이지 export
export default withAuthGuard(ShareCourseDetailPage);
