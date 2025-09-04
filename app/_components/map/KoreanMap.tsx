"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/Button";
import { ChevronRight } from "lucide-react";

interface Region {
	id: string;
	name: string;
	color: string;
	districts?: District[];
}

interface District {
	id: string;
	name: string;
	neighborhoods?: string[];
}

const SEOUL_DISTRICTS: Region[] = [
	{
		id: "gangnam",
		name: "강남구",
		color: "#a7f3d0",
		districts: [
			{
				id: "gangnam-1",
				name: "역삼동",
				neighborhoods: ["역삼1동", "역삼2동"],
			},
			{
				id: "gangnam-2",
				name: "삼성동",
				neighborhoods: ["삼성1동", "삼성2동"],
			},
		],
	},
	{
		id: "seocho",
		name: "서초구",
		color: "#bfdbfe",
		districts: [
			{
				id: "seocho-1",
				name: "서초동",
				neighborhoods: ["서초1동", "서초2동", "서초3동"],
			},
		],
	},
	{
		id: "songpa",
		name: "송파구",
		color: "#fde68a",
		districts: [
			{
				id: "songpa-1",
				name: "잠실동",
				neighborhoods: ["잠실본동", "잠실2동", "잠실3동"],
			},
		],
	},
	{
		id: "jongno",
		name: "종로구",
		color: "#d8b4fe",
		districts: [
			{
				id: "jongno-1",
				name: "종로1가",
				neighborhoods: ["종로1.2.3.4가동"],
			},
		],
	},
	{
		id: "jung",
		name: "중구",
		color: "#fbb6ce",
		districts: [
			{
				id: "jung-1",
				name: "명동",
				neighborhoods: ["명동", "회현동"],
			},
		],
	},
];

export function KoreanMap() {
	const [selectedLevel, setSelectedLevel] = useState<"city" | "district" | "neighborhood">("city");
	const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
	const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

	const handleRegionClick = (region: Region) => {
		setSelectedRegion(region);
		setSelectedLevel("district");
	};

	const handleDistrictClick = (district: District) => {
		setSelectedDistrict(district);
		setSelectedLevel("neighborhood");
	};

	const handleBackToCity = () => {
		setSelectedLevel("city");
		setSelectedRegion(null);
		setSelectedDistrict(null);
	};

	const handleBackToDistrict = () => {
		setSelectedLevel("district");
		setSelectedDistrict(null);
	};

	if (selectedLevel === "city") {
		return (
			<div className="bg-white rounded-lg p-6 shadow-lg">
				<h2 className="text-lg font-bold text-center mb-6 text-gray-800">대한민국 지도</h2>

				{/* Simplified Seoul Map */}
				<div className="relative w-full max-w-md mx-auto">
					<svg viewBox="0 0 400 300" className="w-full h-auto">
						{/* Seoul regions */}
						{SEOUL_DISTRICTS.map((region, index) => {
							const positions = [
								{ x: 180, y: 120, width: 60, height: 40 }, // 강남구
								{ x: 160, y: 160, width: 50, height: 35 }, // 서초구
								{ x: 240, y: 140, width: 55, height: 38 }, // 송파구
								{ x: 150, y: 80, width: 45, height: 35 }, // 종로구
								{ x: 190, y: 85, width: 40, height: 30 }, // 중구
							];

							const pos = positions[index] || { x: 200, y: 150, width: 50, height: 35 };

							return (
								<g key={region.id}>
									<rect
										x={pos.x}
										y={pos.y}
										width={pos.width}
										height={pos.height}
										fill={region.color}
										stroke="#666"
										strokeWidth="1"
										rx="4"
										className="cursor-pointer hover:opacity-80 transition-opacity"
										onClick={() => handleRegionClick(region)}
									/>
									<text
										x={pos.x + pos.width / 2}
										y={pos.y + pos.height / 2 + 4}
										textAnchor="middle"
										className="text-xs font-medium fill-gray-700 pointer-events-none"
									>
										{region.name}
									</text>
								</g>
							);
						})}

						{/* Seoul label */}
						<text x="200" y="50" textAnchor="middle" className="text-sm font-bold fill-gray-800">
							서울특별시
						</text>

						{/* Other regions (simplified) */}
						<rect x="50" y="100" width="80" height="60" fill="#e5e7eb" stroke="#666" strokeWidth="1" rx="4" />
						<text x="90" y="135" textAnchor="middle" className="text-xs fill-gray-600">
							경기도
						</text>

						<rect x="300" y="120" width="70" height="50" fill="#e5e7eb" stroke="#666" strokeWidth="1" rx="4" />
						<text x="335" y="150" textAnchor="middle" className="text-xs fill-gray-600">
							강원도
						</text>

						<rect x="80" y="200" width="90" height="70" fill="#e5e7eb" stroke="#666" strokeWidth="1" rx="4" />
						<text x="125" y="240" textAnchor="middle" className="text-xs fill-gray-600">
							충청남도
						</text>

						<rect x="250" y="200" width="80" height="60" fill="#e5e7eb" stroke="#666" strokeWidth="1" rx="4" />
						<text x="290" y="235" textAnchor="middle" className="text-xs fill-gray-600">
							경상북도
						</text>
					</svg>
				</div>

				<p className="text-center text-sm text-gray-600 mt-4">지역을 선택해주세요</p>
			</div>
		);
	}

	if (selectedLevel === "district" && selectedRegion) {
		return (
			<div className="bg-white rounded-lg p-6 shadow-lg">
				<div className="flex items-center justify-between mb-6">
					<Button variant="ghost" onClick={handleBackToCity} className="text-sm">
						← 지역 선택으로
					</Button>
					<h2 className="text-lg font-bold text-gray-800">{selectedRegion.name}</h2>
					<div></div>
				</div>

				<div className="grid grid-cols-2 gap-3">
					{selectedRegion.districts?.map(district => (
						<Button
							key={district.id}
							variant="outline"
							className="h-16 flex flex-col items-center justify-center hover:bg-gray-50 bg-transparent"
							onClick={() => handleDistrictClick(district)}
						>
							<span className="font-medium">{district.name}</span>
							<ChevronRight className="h-4 w-4 mt-1" />
						</Button>
					))}
				</div>
			</div>
		);
	}

	if (selectedLevel === "neighborhood" && selectedDistrict) {
		return (
			<div className="bg-white rounded-lg p-6 shadow-lg">
				<div className="flex items-center justify-between mb-6">
					<Button variant="ghost" onClick={handleBackToDistrict} className="text-sm">
						← {selectedRegion?.name}로
					</Button>
					<h2 className="text-lg font-bold text-gray-800">{selectedDistrict.name}</h2>
					<div></div>
				</div>

				<div className="grid grid-cols-1 gap-3">
					{selectedDistrict.neighborhoods?.map(neighborhood => (
						<Button
							key={neighborhood}
							variant="outline"
							className="h-12 justify-between hover:bg-gray-50 bg-transparent"
						>
							<span className="font-medium">{neighborhood}</span>
							<span className="text-xs text-gray-500">산책 코스 보기</span>
						</Button>
					))}
				</div>
			</div>
		);
	}

	return null;
}
