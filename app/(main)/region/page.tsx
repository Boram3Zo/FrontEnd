"use client";

import { useState } from "react";
import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import KoreanMap from "@/app/_components/map/KoreanMap";
import { RegionCourseList } from "@/app/_components/course/RegionCourseList";
import { CatCharacter } from "@/app/_components/cat/CatCharacter";

export default function RegionPage() {
	const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
			<Header />

			<main className="pb-20">
				{/* Page title with cute cat */}
				<div className="bg-white border-b border-gray-200 px-4 py-4">
					<div className="flex items-center justify-center gap-3">
						<CatCharacter size="sm" animation="wiggle" />
						<h1 className="text-lg font-bold text-gray-800">지역별 산책 코스</h1>
						<CatCharacter size="sm" animation="bounce" />
					</div>
				</div>

				{/* Korean Map Section */}
				<div className="px-4 py-6">
					<KoreanMap onRegionSelect={setSelectedRegion} />
				</div>

				{/* Course List Section */}
				<RegionCourseList selectedRegion={selectedRegion} limit={5} />
			</main>

			<BottomNavigation />
		</div>
	);
}
