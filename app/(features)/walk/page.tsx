"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { CatDiscoveryModal } from "@/app/_components/cat/CatDiscoveryModal";
import { WalkStartSection } from "@/app/_components/walk/WalkStartSection";
import WalkingTracker from "@/app/_components/walk/WalkTracker";
import WalkingSummary from "@/app/_components/walk/WalkSummary";
import { useWalkingSession } from "@/app/_hooks/useWalkingSession";
import { useAuth } from "@/app/_providers/AuthProvider";

export default function WalkPage() {
	const router = useRouter();
	const { isLoggedIn, isLoading } = useAuth();
	const { session, showSummary, discoveredCat, startWalking, stopWalking, setDiscoveredCat } = useWalkingSession();

	// 인증 상태 확인 및 리다이렉트
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

	// 인증된 사용자만 이 부분에 도달

	if (showSummary && session) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
				<Header />
				<main className="pb-20">
					<WalkingSummary />
				</main>
				<BottomNavigation />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
			<Header />

			<main className="pb-20">
				{session ? <WalkingTracker onStop={stopWalking} /> : <WalkStartSection onStartWalking={startWalking} />}
			</main>

			<BottomNavigation />

			{/* Cat discovery modal */}
			{discoveredCat && (
				<CatDiscoveryModal
					cat={discoveredCat}
					isOpen={!!discoveredCat}
					onClose={() => setDiscoveredCat(null)}
					isDetailView={false}
				/>
			)}
		</div>
	);
}
