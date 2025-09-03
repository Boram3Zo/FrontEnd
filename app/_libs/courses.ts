import type { Course } from "@/app/_types/course";
import { COURSES } from "@/app/_mocks/courses";

export { COURSES };

export function getCourseById(id: string): Course | undefined {
	return COURSES.find(course => course.id === id);
}

export function getCoursesByRegion(region: string): Course[] {
	return COURSES.filter(course => course.id.includes(region));
}
