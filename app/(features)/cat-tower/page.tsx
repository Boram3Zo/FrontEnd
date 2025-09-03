import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { CatCollection } from "@/app/_components/cat/CatCollection";
import { CatStats } from "@/app/_components/cat/CatStats";
import { CatCharacter } from "@/app/_components/cat/CatCharacter";

export default function CatTowerPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50">
			<Header />

			<main className="pb-20">
				{/* Page title with animated cats */}
				<div className="bg-white border-b border-gray-200 px-4 py-4">
					<div className="flex items-center justify-center gap-3">
						<CatCharacter size="sm" animation="wiggle" />
						<h1 className="text-lg font-bold text-gray-800">캣타워</h1>
						<CatCharacter size="sm" animation="wiggle" />
					</div>
				</div>

				{/* Hero section */}
				<div className="text-center py-8 px-4">
					<div className="flex justify-center mb-4">
						<CatCharacter animation="bounce" size="lg" />
					</div>
					<h2 className="text-xl font-bold text-gray-800 mb-2">발견한 고양이들을</h2>
					<h2 className="text-xl font-bold text-gray-800 mb-4">한 눈에 확인해보세요!</h2>
					<p className="text-sm text-gray-600">
						산책하며 만난 특별한 고양이 친구들
						<br />
						각각의 고유한 성격과 이야기가 있어요
					</p>
				</div>

				{/* Collection stats */}
				<CatStats />

				{/* Cat collection grid */}
				<CatCollection />
			</main>

			<BottomNavigation />
		</div>
	);
}
