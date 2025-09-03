"use client";

import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { CatCharacter } from "@/app/_components/cat/CatCharacter";
import { Card } from "@/app/_components/ui/Card";
import { MapPin, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
			<Header />

			<main className="pb-20">
				{/* Hero section with animated cat */}
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

					<div className="grid grid-cols-3 gap-2 px-2 mb-6">
						<div className="text-center bg-white/80 backdrop-blur-sm border border-orange-200 rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300">
							<div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
								<MapPin className="h-6 w-6 text-white" />
							</div>
							<h3 className="text-xs font-bold text-gray-800 mb-1">골목길 발견</h3>
							<br />
							<p className="text-xs text-gray-600 leading-relaxed">
								특별한 골목길
								<br />
								산책 코스를
								<br />
								탐험해보세요
							</p>
						</div>

						<div className="text-center bg-white/80 backdrop-blur-sm border border-orange-200 rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300">
							<div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
								<Image
									src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8OoGoNMUxzU7yiICEAflhx5bWAWV8h.png"
									alt="고양이 아이콘"
									width={32}
									height={32}
									className="object-contain"
									style={{
										filter: "invert(1)",
										mixBlendMode: "screen",
									}}
								/>
							</div>
							<h3 className="text-xs font-bold text-gray-800 mb-1">고양이 친구들</h3>
							<br />
							<p className="text-xs text-gray-600 leading-relaxed">
								귀여운 고양이
								<br />
								캐릭터들을
								<br />
								수집해보세요
							</p>
						</div>

						<div className="text-center bg-white/80 backdrop-blur-sm border border-orange-200 rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300">
							<div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
								<Heart className="h-6 w-6 text-white" />
							</div>
							<h3 className="text-xs font-bold text-gray-800 mb-1">나만의 코스</h3>
							<br />
							<p className="text-xs text-gray-600 leading-relaxed">
								특별한 장소를
								<br />
								다른 사람들과
								<br />
								공유해보세요
							</p>
						</div>
					</div>

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

					<div className="flex justify-between items-center px-6 mb-6">
						<div className="flex flex-col items-center">
							<CatCharacter animation="wiggle" size="sm" />
							<div className="text-xs text-gray-500 mt-1 text-center">
								<p>길고양이처럼</p>
								<p>자유롭게</p>
							</div>
						</div>

						<div className="text-center px-2">
							<div className="text-base mb-1">🌟</div>
							<p className="text-xs text-gray-600 font-medium">새로운 길을</p>
							<p className="text-xs text-gray-600 font-medium">발견해보세요</p>
						</div>

						<div className="flex flex-col items-center">
							<CatCharacter animation="bounce" size="sm" />
							<div className="text-xs text-gray-500 mt-1 text-center">
								<p>골목길을</p>
								<p>탐험해요</p>
							</div>
						</div>
					</div>

					<div className="px-4 mb-6">
						<h2 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
							<span>🔥</span>
							인기 산책 코스
						</h2>

						<div className="space-y-2">
							<Link href="/course/1">
								<Card className="p-3 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
									<div className="flex items-center gap-3">
										<div className="w-16 h-16 bg-gradient-to-br from-green-200 to-green-400 rounded-lg overflow-hidden">
											<Image
												src="/hangang-park-walkway.png"
												alt="한강공원 숨은 길"
												width={64}
												height={64}
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="flex-1">
											<h3 className="text-sm font-semibold text-gray-800 mb-1 text-left">한강공원 숨은 길</h3>
											<div className="flex items-center gap-3 text-xs text-gray-600 mb-1">
												<div className="flex items-center gap-1">
													<MapPin className="h-3 w-3" />
													<span>강남구</span>
												</div>
												<div className="flex items-center gap-1">
													<span>⏱️</span>
													<span>25분</span>
												</div>
											</div>
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-1">
													<span className="text-blue-500">📏</span>
													<span className="text-xs font-medium text-gray-800">2.1km</span>
												</div>
												<div className="flex items-center gap-1">
													<Heart className="h-3 w-3 text-gray-400" />
													<span className="text-xs text-gray-500">234</span>
												</div>
											</div>
										</div>
									</div>
								</Card>
							</Link>
							<br />
							<Link href="/course/2">
								<Card className="p-3 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
									<div className="flex items-center gap-3">
										<div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-purple-400 rounded-lg overflow-hidden">
											<Image
												src="/placeholder-tfony.png"
												alt="북촌 골목길 탐방"
												width={64}
												height={64}
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="flex-1">
											<h3 className="text-sm font-semibold text-gray-800 mb-1 text-left">북촌 골목길 탐방</h3>
											<div className="flex items-center gap-3 text-xs text-gray-600 mb-1">
												<div className="flex items-center gap-1">
													<MapPin className="h-3 w-3" />
													<span>종로구</span>
												</div>
												<div className="flex items-center gap-1">
													<span>⏱️</span>
													<span>20분</span>
												</div>
											</div>
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-1">
													<span className="text-blue-500">📏</span>
													<span className="text-xs font-medium text-gray-800">1.8km</span>
												</div>
												<div className="flex items-center gap-1">
													<Heart className="h-3 w-3 text-gray-400" />
													<span className="text-xs text-gray-500">156</span>
												</div>
											</div>
										</div>
									</div>
								</Card>
							</Link>
						</div>
					</div>
				</div>
			</main>

			<BottomNavigation />
		</div>
	);
}
