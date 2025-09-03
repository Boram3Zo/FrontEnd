import type { Course } from "@/app/_types/course";

export const COURSES: Course[] = [
	{
		id: "seoul-gangnam-01",
		title: "선릉 돌담길 산책",
		start: { lat: 37.5053, lng: 127.0497 },
		spots: [
			{ name: "선릉공원 입구", position: { lat: 37.5053, lng: 127.0497 } },
			{ name: "느티나무 쉼터", position: { lat: 37.504, lng: 127.0475 } },
			{ name: "돌담길 포인트", position: { lat: 37.5032, lng: 127.051 } },
		],
		distanceMeters: 1800,
		durationMinutes: 30,
	},
	{
		id: "seoul-mapogu-01",
		title: "망원 한강 산책",
		start: { lat: 37.555, lng: 126.898 },
		spots: [
			{ name: "망원한강공원 진입", position: { lat: 37.555, lng: 126.898 } },
			{ name: "피크닉존", position: { lat: 37.557, lng: 126.893 } },
			{ name: "강변보행로", position: { lat: 37.553, lng: 126.9 } },
		],
		distanceMeters: 2600,
		durationMinutes: 45,
	},
];
