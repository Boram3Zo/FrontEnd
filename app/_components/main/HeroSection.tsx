import { CatCharacter } from "@/app/_components/cat/CatCharacter";
import Link from "next/link";

export function HeroSection() {
	return (
		<div className="text-center py-6 px-4">
			<div className="flex justify-center mb-4 relative">
				<CatCharacter animation="bounce" size="md" />
			</div>

			<div className="mb-3 flex justify-center gap-2">
				<span className="text-2xl animate-pulse">🐾</span>
				<span className="text-2xl animate-pulse delay-300">🐾</span>
			</div>

			<h1 className="text-xl font-bold text-gray-800 mb-1">우리 동네의 숨겨진 골목길을</h1>
			<h1 className="text-xl font-bold text-gray-800 mb-4">함께 발견해보세요! 🚶</h1>

			<p className="text-sm text-gray-600 mb-6 leading-relaxed">
				나만의 특별한 산책 코스를 만들고
				<br />
				다른 사람들과 공유해보세요
			</p>

			<div className="flex justify-center mb-8 px-4">
				<Link href="/walk" className="w-full max-w-xs">
					<button className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 hover:from-orange-500 hover:via-orange-600 hover:to-yellow-500 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/20">
						<div className="flex flex-col items-center gap-2">
							<div className="flex items-center gap-2 text-xl">
								<span>🚶‍♂️</span>
								<span>🐾</span>
							</div>
							<span className="text-xl font-extrabold tracking-wide">산책하기</span>
							<span className="text-xs opacity-90">새로운 길을 발견해보세요!</span>
						</div>
					</button>
				</Link>
			</div>
		</div>
	);
}
