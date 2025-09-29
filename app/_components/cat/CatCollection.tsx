"use client";

import { useState } from "react";
import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { Badge } from "@/app/_components/ui/Badge";
import { CatDiscoveryModal } from "@/app/_components/cat/CatDiscoveryModal";
import { CollectedCat } from "@/app/_components/cat/CollectedCat";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { Cat, SortType, SortOrder } from "@/app/_types/cat";
import { MOCK_CATS, RARITY_COLORS, RARITY_LABELS, GRADE_ORDER } from "@/app/_mocks/cats";

export function CatCollection() {
	const [cats, setCats] = useState<Cat[]>(MOCK_CATS);
	const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
	const [showDiscoveryModal, setShowDiscoveryModal] = useState(false);
	const [sortType, setSortType] = useState<SortType>("discovery");
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

	const discoveredCats = cats.filter(cat => cat.isDiscovered);
	const undiscoveredCats = cats.filter(cat => !cat.isDiscovered);

	const sortCats = (catsToSort: Cat[], type: SortType, order: SortOrder) => {
		return [...catsToSort].sort((a, b) => {
			if (type === "discovery") {
				const dateA = new Date(a.discoveredDate.replace(/\./g, "-"));
				const dateB = new Date(b.discoveredDate.replace(/\./g, "-"));
				return order === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
			} else {
				const gradeA = GRADE_ORDER[a.rarity];
				const gradeB = GRADE_ORDER[b.rarity];
				return order === "asc" ? gradeA - gradeB : gradeB - gradeA;
			}
		});
	};

	const handleSort = (type: SortType) => {
		if (sortType === type) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortType(type);
			setSortOrder("asc");
		}
	};

	const sortedDiscoveredCats = sortCats(discoveredCats, sortType, sortOrder);
	const sortedUndiscoveredCats = sortCats(undiscoveredCats, "grade", "asc");

	const handleCatClick = (cat: Cat) => {
		if (cat.isDiscovered) {
			setSelectedCat(cat);
		}
	};

	// const simulateDiscovery = () => {
	// 	setShowDiscoveryModal(true);
	// };

	const handleCatDiscovered = (catId: string) => {
		setCats(prevCats =>
			prevCats.map(cat =>
				cat.id === catId ? { ...cat, isDiscovered: true, discoveredDate: new Date().toLocaleDateString("ko-KR") } : cat
			)
		);
	};

	return (
		<div className="px-4">
			{/* Collection progress */}
			<div className="mb-6">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-lg font-bold text-gray-800">컬렉션 진행도</h3>
					<span className="text-sm text-gray-600">
						{discoveredCats.length}/{cats.length}
					</span>
				</div>
				<div className="w-full bg-gray-200 rounded-full h-3">
					<div
						className="bg-gradient-to-r from-orange-400 to-yellow-400 h-3 rounded-full transition-all duration-500"
						style={{ width: `${(discoveredCats.length / cats.length) * 100}%` }}
					></div>
				</div>
				<p className="text-xs text-gray-500 mt-1">{Math.round((discoveredCats.length / cats.length) * 100)}% 완성</p>
			</div>

			{/* Discovered cats */}
			<div className="mb-8">
				<div className="flex items-center justify-between mb-4">
					<h4 className="text-md font-bold text-gray-800 flex items-center gap-2">
						<span>✨</span>
						발견한 고양이들
					</h4>
					<div className="flex gap-2">
						<Button
							variant={sortType === "discovery" ? "default" : "outline"}
							size="sm"
							onClick={() => handleSort("discovery")}
							className="text-xs px-3 py-1 h-7"
						>
							발견순
							{sortType === "discovery" &&
								(sortOrder === "asc" ? (
									<ChevronUp className="w-3 h-3 ml-1" />
								) : (
									<ChevronDown className="w-3 h-3 ml-1" />
								))}
						</Button>
						<Button
							variant={sortType === "grade" ? "default" : "outline"}
							size="sm"
							onClick={() => handleSort("grade")}
							className="text-xs px-3 py-1 h-7"
						>
							등급순
							{sortType === "grade" &&
								(sortOrder === "asc" ? (
									<ChevronUp className="w-3 h-3 ml-1" />
								) : (
									<ChevronDown className="w-3 h-3 ml-1" />
								))}
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3">
					{sortedDiscoveredCats.map(cat => (
						<Card
							key={cat.id}
							className="p-4 cursor-pointer hover:shadow-lg transition-shadow bg-white"
							onClick={() => handleCatClick(cat)}
						>
							<div className="text-center">
								<div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full flex items-center justify-center">
									<CollectedCat breed={cat.breed} size="md" />
								</div>
								<h5 className="font-bold text-gray-800 mb-1">{cat.name}</h5>
								<p className="text-xs text-gray-600 mb-2">{cat.breed}</p>
								<Badge className={`text-xs ${RARITY_COLORS[cat.rarity]}`}>{RARITY_LABELS[cat.rarity]}</Badge>
								<p className="text-xs text-gray-500 mt-2">{cat.discoveredDate}</p>
							</div>
						</Card>
					))}
				</div>
			</div>

			{/* Undiscovered cats */}
			<div className="mb-8">
				<h4 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
					<span>🔍</span>
					아직 만나지 못한 고양이들
				</h4>
				<div className="grid grid-cols-2 gap-3">
					{sortedUndiscoveredCats.map(cat => (
						<Card key={cat.id} className="p-4 bg-gray-50 border-dashed border-2 border-gray-300">
							<div className="text-center">
								<div className="w-16 h-16 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
									<span className="text-2xl text-gray-400">?</span>
								</div>
								<h5 className="font-bold text-gray-400 mb-1">???</h5>
								<p className="text-xs text-gray-400 mb-2">???</p>
								<Badge className={`text-xs ${RARITY_COLORS[cat.rarity]} opacity-50`}>{RARITY_LABELS[cat.rarity]}</Badge>
								<p className="text-xs text-gray-400 mt-2">산책하며 발견해보세요!</p>
							</div>
						</Card>
					))}
				</div>
			</div>

			{/* Demo button */}
			{/* <div className="text-center mb-6">
				<Button
					onClick={simulateDiscovery}
					className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white px-8 py-3 rounded-full shadow-lg"
				>
					새로운 고양이 발견 체험하기 🐱
				</Button>
			</div> */}

			{/* Cat detail modal */}
			{selectedCat && (
				<CatDiscoveryModal
					cat={selectedCat}
					isOpen={!!selectedCat}
					onClose={() => setSelectedCat(null)}
					isDetailView={true}
				/>
			)}

			{/* Discovery simulation modal */}
			<CatDiscoveryModal
				cat={{
					id: "5",
					name: "별이",
					breed: "스코티시 폴드",
					personality: "장난꾸러기",
					discoveredAt: "남산 전망대",
					discoveredDate: "방금 전",
					rarity: "rare" as const,
					description: "별처럼 반짝이는 눈을 가진 귀여운 고양이예요. 높은 곳을 좋아해요.",
					favoriteFood: "츄르",
					hobby: "별보기",
					isDiscovered: true,
				}}
				isOpen={showDiscoveryModal}
				onClose={() => setShowDiscoveryModal(false)}
				onCatDiscovered={handleCatDiscovered}
				isDetailView={false}
			/>
		</div>
	);
}
