import { Card } from "@/app/_components/ui/CCard";
import { MapPin, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function PopularCourses() {
	return (
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
	);
}
