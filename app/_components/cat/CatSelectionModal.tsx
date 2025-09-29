"use client";

import { Dialog, DialogContent } from "@/app/_components/ui/Dialog";
import { Card } from "@/app/_components/ui/Card";
import { CollectedCat } from "@/app/_components/cat/CollectedCat";

interface CatSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onCatSelect: (breed: string) => void;
	currentBreed: string;
}

// 일단 하드코딩으로 현재 보유한 고양이 목록을 만들었습니다.
// 나중에 실제로 데이터베이스랑 연동하는 기능이 필요할 것 같아요.
const DISCOVERED_CATS = [
	{ id: "1", name: "치즈", breed: "코리안 숏헤어" },
	{ id: "2", name: "루나", breed: "러시안 블루" },
	{ id: "3", name: "모카", breed: "페르시안" },
	{ id: "4", name: "코코", breed: "브리티시 숏헤어" },
	{ id: "5", name: "별이", breed: "스코티시 폴드" },
	{ id: "6", name: "망고", breed: "아메리칸 숏헤어" },
	{ id: "7", name: "미르", breed: "메인쿤" },
	{ id: "8", name: "구름", breed: "터키시 앙고라" },
	{ id: "9", name: "솜이", breed: "랙돌" },
	{ id: "10", name: "턱시", breed: "턱시도" },
	{ id: "11", name: "샤미", breed: "샴" },
	{ id: "15", name: "바닐라", breed: "노르웨이 숲" },
	{ id: "16", name: "콩이", breed: "먼치킨" },
];

export function CatSelectionModal({ isOpen, onClose, onCatSelect, currentBreed }: CatSelectionModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-sm mx-auto bg-white border-0 rounded-2xl max-h-[80vh] overflow-y-auto">
				<div className="py-4">
					{/* Header */}
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-lg font-bold text-gray-800">고양이 선택</h2>
					</div>

					{/* Cat grid - 2 columns */}
					<div className="grid grid-cols-2 gap-3">
						{DISCOVERED_CATS.map(cat => (
							<Card
								key={cat.id}
								className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
									currentBreed === cat.breed ? "ring-2 ring-orange-400 bg-orange-50" : "hover:bg-gray-50"
								}`}
								onClick={() => onCatSelect(cat.breed)}
							>
								<div className="text-center">
									<div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full flex items-center justify-center">
										<CollectedCat breed={cat.breed} size="md" />
									</div>
									<h5 className="font-bold text-gray-800 mb-1">{cat.name}</h5>
									<p className="text-xs text-gray-600">{cat.breed}</p>
								</div>
							</Card>
						))}
					</div>

					<p className="text-xs text-gray-500 text-center mt-4">발견한 고양이 중에서 선택할 수 있어요</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
