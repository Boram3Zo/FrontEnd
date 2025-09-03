import { Header } from "@/app/_components/layout/header";
import { BottomNavigation } from "@/app/_components/layout/bottom-navigation";
import { CatCharacter } from "@/app/_components/cat/cat-character";
import { ThemeRecommendations } from "@/app/_components/theme-recommendations";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

export default function ThemePage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
			<Header />

			<main className="pb-20">
				{/* Page title with cute cat */}
				<div className="bg-white border-b border-gray-200 px-4 py-4">
					<div className="flex items-center justify-center gap-3">
						<CatCharacter size="sm" animation="bounce" />
						<h1 className="text-lg font-bold text-gray-800">테마별 산책 코스</h1>
						<CatCharacter size="sm" animation="wiggle" />
					</div>
				</div>

				{/* Hero section */}
				<div className="text-center py-8 px-4">
					<div className="flex justify-center mb-4">
						<CatCharacter animation="wiggle" size="lg" />
					</div>
					<h2 className="text-xl font-bold text-gray-800 mb-2">오늘은 어떤 테마로</h2>
					<h2 className="text-xl font-bold text-gray-800 mb-4">산책해볼까요?</h2>
					<p className="text-sm text-gray-600">
						다양한 테마의 산책 코스를 둘러보고
						<br />
						새로운 경험을 만나보세요
					</p>
				</div>

				{/* Theme recommendations */}
				<ThemeRecommendations />

				{/* View all themes button */}
				<div className="px-4 mt-8">
					<Link href="/theme/all">
						<Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg font-medium rounded-xl shadow-lg">
							모든 테마 보기 ✨
						</Button>
					</Link>
				</div>

				{/* Popular themes quick access */}
				<div className="px-4 mt-8">
					<h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
						<span>🔥</span>
						인기 테마
					</h3>
					<div className="grid grid-cols-2 gap-3">
						<Link href="/theme/nature">
							<Button
								variant="outline"
								className="h-20 flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 border-green-200"
							>
								<span className="text-2xl mb-1">🌳</span>
								<span className="text-sm font-medium">자연 힐링</span>
							</Button>
						</Link>
						<Link href="/theme/history">
							<Button
								variant="outline"
								className="h-20 flex flex-col items-center justify-center bg-amber-50 hover:bg-amber-100 border-amber-200"
							>
								<span className="text-2xl mb-1">🏛️</span>
								<span className="text-sm font-medium">역사 탐방</span>
							</Button>
						</Link>
						<Link href="/theme/cafe">
							<Button
								variant="outline"
								className="h-20 flex flex-col items-center justify-center bg-orange-50 hover:bg-orange-100 border-orange-200"
							>
								<span className="text-2xl mb-1">☕</span>
								<span className="text-sm font-medium">카페 투어</span>
							</Button>
						</Link>
						<Link href="/theme/night">
							<Button
								variant="outline"
								className="h-20 flex flex-col items-center justify-center bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
							>
								<span className="text-2xl mb-1">🌙</span>
								<span className="text-sm font-medium">야경 명소</span>
							</Button>
						</Link>
					</div>
				</div>
			</main>

			<BottomNavigation />
		</div>
	);
}
