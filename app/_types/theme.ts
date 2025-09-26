export interface Theme {
	id: string;
	name: string;
	emoji: string;
	description: string;
	color: string;
	courseCount: number;
	popularCourse: {
		title: string;
		location: string;
		duration: string;
		participants: number;
		rating: number;
		image: string;
	};
}

export interface PopularCourse {
	title: string;
	location: string;
	duration: string;
	participants: number;
	rating: number;
	image: string;
}

// API Response Types
export interface ThemeListResponse {
	themes: Theme[];
	total: number;
	page: number;
	limit: number;
}

export interface GetThemesParams {
	page?: number;
	limit?: number;
	category?: string;
	search?: string;
}

export interface ThemeWithCourses extends Theme {
	courses: import("@/app/_types/post").PopularCourse[];
}
