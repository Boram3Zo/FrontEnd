import type { LatLng } from "@/app/_types/geo";

export type CourseSpot = {
	name: string;
	position: LatLng;
};

export type Course = {
	id: string;
	title: string;
	start: LatLng; // 시작점(추천 기준)
	spots: CourseSpot[]; // 경유지/포인트들
	distanceMeters?: number; // 사전 계산값이 있으면 표시
	durationMinutes?: number;
};
