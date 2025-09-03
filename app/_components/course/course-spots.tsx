"use client";

import { useState } from "react";
import { Card } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { MapPin, Camera, MessageCircle } from "lucide-react";
import Image from "next/image";

interface CourseSpot {
	id: string;
	name: string;
	description: string;
	image: string;
	comment: string;
	coordinates: { lat: number; lng: number };
	order: number;
}

interface CourseSpotsProps {
	spots: CourseSpot[];
}

export function CourseSpots({ spots }: CourseSpotsProps) {
	const [selectedSpot, setSelectedSpot] = useState<CourseSpot | null>(null);

	return (
		<div className="px-4 py-6">
			<h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
				<Camera className="h-5 w-5 text-blue-500" />
				코스 스팟 ({spots.length}개)
			</h2>

			<div className="space-y-4">
				{spots.map((spot, index) => (
					<Card key={spot.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
						<div className="flex">
							{/* Spot image */}
							<div className="w-24 h-24 bg-gray-200 overflow-hidden flex-shrink-0">
								<Image
									src={spot.image || "/placeholder.svg"}
									alt={spot.name}
									width={96}
									height={96}
									className="w-full h-full object-cover"
								/>
							</div>

							{/* Spot info */}
							<div className="flex-1 p-4">
								<div className="flex items-start justify-between mb-2">
									<div className="flex items-center gap-2">
										<div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
											{spot.order}
										</div>
										<h3 className="font-semibold text-gray-800">{spot.name}</h3>
									</div>
								</div>

								<p className="text-sm text-gray-600 mb-2">{spot.description}</p>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-1 text-xs text-gray-500">
										<MapPin className="h-3 w-3" />
										<span>스팟 {spot.order}</span>
									</div>
									<Button
										variant="outline"
										size="sm"
										onClick={() => setSelectedSpot(spot)}
										className="bg-transparent text-xs"
									>
										자세히 보기
									</Button>
								</div>
							</div>
						</div>

						{/* Connection line to next spot */}
						{index < spots.length - 1 && (
							<div className="flex justify-center py-2">
								<div className="w-0.5 h-4 bg-blue-300"></div>
							</div>
						)}
					</Card>
				))}
			</div>

			{/* Spot detail modal */}
			{selectedSpot && (
				<Dialog open={!!selectedSpot} onOpenChange={() => setSelectedSpot(null)}>
					<DialogContent className="max-w-sm mx-auto bg-white border-0 rounded-2xl">
						<div className="py-4">
							{/* Spot image */}
							<div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
								<Image
									src={selectedSpot.image || "/placeholder.svg"}
									alt={selectedSpot.name}
									width={400}
									height={192}
									className="w-full h-full object-cover"
								/>
							</div>

							{/* Spot info */}
							<div className="space-y-4">
								<div className="text-center">
									<div className="flex items-center justify-center gap-2 mb-2">
										<div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
											{selectedSpot.order}
										</div>
										<h3 className="text-xl font-bold text-gray-800">{selectedSpot.name}</h3>
									</div>
									<p className="text-gray-600">{selectedSpot.description}</p>
								</div>

								{/* Comment section */}
								<div className="bg-blue-50 rounded-lg p-4">
									<div className="flex items-center gap-2 mb-2">
										<MessageCircle className="h-4 w-4 text-blue-500" />
										<span className="text-sm font-medium text-gray-800">코스 제작자의 한마디</span>
									</div>
									<p className="text-sm text-gray-700 leading-relaxed">&quot;{selectedSpot.comment}&quot;</p>
								</div>

								{/* Location info */}
								<div className="bg-gray-50 rounded-lg p-4">
									<div className="flex items-center gap-2 mb-2">
										<MapPin className="h-4 w-4 text-gray-500" />
										<span className="text-sm font-medium text-gray-800">위치 정보</span>
									</div>
									<p className="text-sm text-gray-600">
										위도: {selectedSpot.coordinates.lat.toFixed(4)}
										<br />
										경도: {selectedSpot.coordinates.lng.toFixed(4)}
									</p>
								</div>
							</div>

							<div className="mt-6">
								<Button
									onClick={() => setSelectedSpot(null)}
									className="w-full bg-gray-800 hover:bg-gray-900 text-white"
								>
									닫기
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
