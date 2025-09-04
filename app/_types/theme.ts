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
