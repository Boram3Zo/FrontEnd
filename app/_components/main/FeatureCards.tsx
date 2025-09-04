import { MapPin, Heart } from "lucide-react";
import Image from "next/image";

export function FeatureCards() {
	return (
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
	);
}
