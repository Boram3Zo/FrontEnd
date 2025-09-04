interface WalkStartSectionProps {
	onStartWalking: () => void;
}

export function WalkStartSection({ onStartWalking }: WalkStartSectionProps) {
	return (
		<div className="px-4 py-8">
			<div className="text-center mb-8">
				<h1 className="text-2xl font-bold text-gray-800 mb-4">새로운 산책을 시작해보세요!</h1>
				<p className="text-gray-600 mb-8">
					실시간으로 경로를 기록하고
					<br />
					새로운 고양이 친구들을 만나보세요
				</p>
			</div>

			<div className="space-y-4">
				<button
					onClick={onStartWalking}
					className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white py-6 rounded-2xl shadow-lg text-xl font-bold"
				>
					🚶‍♀️ 산책 시작하기
				</button>

				<div className="grid grid-cols-2 gap-4 text-center">
					<div className="bg-white rounded-lg p-4 shadow-sm">
						<div className="text-2xl mb-2">🎯</div>
						<div className="text-sm text-gray-600">목표 거리</div>
						<div className="font-bold text-gray-800">2.0km</div>
					</div>
					<div className="bg-white rounded-lg p-4 shadow-sm">
						<div className="text-2xl mb-2">⏱️</div>
						<div className="text-sm text-gray-600">예상 시간</div>
						<div className="font-bold text-gray-800">30분</div>
					</div>
				</div>
			</div>
		</div>
	);
}
