"use client";

import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { MapPin, Navigation } from "lucide-react";

interface CourseSpot {
	id: string;
	name: string;
	coordinates: { lat: number; lng: number };
	order: number;
}

interface Course {
	id: string;
	title: string;
	spots: CourseSpot[];
	route: { lat: number; lng: number }[];
}

interface CourseMapProps {
	course: Course;
}

export function CourseMap({ course }: CourseMapProps) {
	return (
		<div className="px-4 py-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-bold text-gray-800">코스 지도</h2>
				<Button variant="outline" size="sm" className="bg-transparent">
					<Navigation className="h-4 w-4 mr-1" />
					길찾기
				</Button>
			</div>

			<Card className="overflow-hidden">
				{/* Map placeholder - in a real app this would be an interactive map */}
				<div className="relative h-64 bg-gradient-to-br from-green-100 to-blue-100">
					{/* Simulated map with route */}
					<svg viewBox="0 0 400 200" className="w-full h-full">
						{/* Background map elements */}
						<rect x="0" y="0" width="400" height="200" fill="url(#mapGradient)" />
						<defs>
							<linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" stopColor="#dcfce7" />
								<stop offset="100%" stopColor="#dbeafe" />
							</linearGradient>
						</defs>

						{/* River representation */}
						<path
							d="M 0 120 Q 100 100 200 110 Q 300 120 400 100"
							stroke="#3b82f6"
							strokeWidth="8"
							fill="none"
							opacity="0.6"
						/>

						{/* Walking route */}
						<path
							d="M 50 150 Q 120 130 200 140 Q 280 150 350 130"
							stroke="#f59e0b"
							strokeWidth="4"
							fill="none"
							strokeDasharray="5,5"
						/>

						{/* Spots markers */}
						{course.spots.map((spot, index) => {
							const x = 50 + index * 100;
							const y = 150 - (index % 2) * 20;
							return (
								<g key={spot.id}>
									<circle cx={x} cy={y} r="8" fill="#ef4444" stroke="white" strokeWidth="2" />
									<text x={x} y={y + 3} textAnchor="middle" className="text-xs fill-white font-bold">
										{spot.order}
									</text>
								</g>
							);
						})}

						{/* Start and end markers */}
						<circle cx="50" cy="150" r="12" fill="#22c55e" stroke="white" strokeWidth="3" />
						<text x="50" y="155" textAnchor="middle" className="text-xs fill-white font-bold">
							시작
						</text>

						<circle cx="350" cy="130" r="12" fill="#dc2626" stroke="white" strokeWidth="3" />
						<text x="350" y="135" textAnchor="middle" className="text-xs fill-white font-bold">
							도착
						</text>
					</svg>

					{/* Map overlay info */}
					<div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
						<div className="flex items-center gap-2 text-sm">
							<MapPin className="h-4 w-4 text-blue-500" />
							<span className="font-medium text-gray-800">{course.title}</span>
						</div>
					</div>
				</div>

				{/* Map legend */}
				<div className="p-4 bg-gray-50 border-t">
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 bg-green-500 rounded-full"></div>
								<span className="text-gray-600">시작점</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 bg-red-500 rounded-full"></div>
								<span className="text-gray-600">도착점</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-0.5 bg-yellow-500 border-dashed"></div>
								<span className="text-gray-600">산책로</span>
							</div>
						</div>
						<span className="text-gray-500">총 {course.spots.length}개 스팟</span>
					</div>
				</div>
			</Card>
		</div>
	);
}
