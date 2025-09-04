import { Theme } from "@/app/_types/theme";

export const MOCK_THEMES: Theme[] = [
	{
		id: "nature",
		name: "자연 힐링",
		emoji: "🌳",
		description: "도심 속 자연을 만나는 힐링 코스",
		color: "from-green-400 to-emerald-500",
		courseCount: 24,
		popularCourse: {
			title: "한강공원 숨은 길",
			location: "마포구 망원동",
			duration: "45분",
			participants: 128,
			rating: 4.8,
			image: "/nature-path.png",
		},
	},
	{
		id: "history",
		name: "역사 탐방",
		emoji: "🏛️",
		description: "서울의 역사와 문화를 느끼는 코스",
		color: "from-amber-400 to-orange-500",
		courseCount: 18,
		popularCourse: {
			title: "북촌 한옥마을 둘러보기",
			location: "종로구 계동길",
			duration: "60분",
			participants: 89,
			rating: 4.9,
			image: "/historic-street.png",
		},
	},
	{
		id: "cafe",
		name: "카페 투어",
		emoji: "☕",
		description: "특별한 카페들을 찾아가는 여행",
		color: "from-orange-400 to-red-500",
		courseCount: 31,
		popularCourse: {
			title: "홍대 숨은 카페 탐방",
			location: "마포구 홍익로",
			duration: "90분",
			participants: 156,
			rating: 4.7,
			image: "/cozy-cafe.png",
		},
	},
];
