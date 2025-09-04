"use client";

import { Header } from "@/app/_components/layout/CHeader";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { CatDiscoveryModal } from "@/app/_components/cat/CatDiscoveryModal";
import { WalkStartSection } from "@/app/_components/walk/WalkStartSection";
import WalkingTracker from "@/app/_components/walk/WalkTracker";
import WalkingSummary from "@/app/_components/walk/WalkSummary";
import { useWalkingSession } from "@/app/_hooks/useWalkingSession";

export default function WalkPage() {
	const { session, showSummary, discoveredCat, startWalking, stopWalking, setDiscoveredCat } = useWalkingSession();

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
