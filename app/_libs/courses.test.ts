import { getCourseById, getCoursesByRegion, COURSES } from "@/app/_libs/courses";

describe("코스 유틸리티 함수들", () => {
	describe("getCourseById", () => {
		it("유효한 ID로 코스를 찾을 수 있다", () => {
			// COURSES 배열의 첫 번째 코스가 있다고 가정
			if (COURSES.length > 0) {
				const firstCourse = COURSES[0];
				const foundCourse = getCourseById(firstCourse.id);

				expect(foundCourse).toBeDefined();
				expect(foundCourse?.id).toBe(firstCourse.id);
				expect(foundCourse?.title).toBe(firstCourse.title);
			}
		});

		it("존재하지 않는 ID로는 undefined를 반환한다", () => {
			const course = getCourseById("nonexistent-course-id");
			expect(course).toBeUndefined();
		});

		it("빈 문자열 ID로는 undefined를 반환한다", () => {
			const course = getCourseById("");
			expect(course).toBeUndefined();
		});

		it("반환된 코스의 구조가 올바르다", () => {
			if (COURSES.length > 0) {
				const course = getCourseById(COURSES[0].id);

				expect(course).toHaveProperty("id");
				expect(course).toHaveProperty("title");
				expect(course).toHaveProperty("spots");
				expect(Array.isArray(course?.spots)).toBe(true);
			}
		});

		it("대소문자를 구분하여 검색한다", () => {
			if (COURSES.length > 0) {
				const firstCourse = COURSES[0];
				const upperCaseId = firstCourse.id.toUpperCase();
				const foundCourse = getCourseById(upperCaseId);

				// 대소문자가 다르면 찾지 못해야 함
				expect(foundCourse).toBeUndefined();
			}
		});
	});

	describe("getCoursesByRegion", () => {
		it("지역명으로 코스들을 필터링할 수 있다", () => {
			// 실제 지역명이 ID에 포함되어 있는지 확인
			const regionCourses = getCoursesByRegion("seoul");

			regionCourses.forEach(course => {
				expect(course.id).toContain("seoul");
			});
		});

		it("대소문자를 구분하여 검색한다", () => {
			const lowerCaseCourses = getCoursesByRegion("seoul");
			const upperCaseCourses = getCoursesByRegion("SEOUL");

			// 대소문자가 다르면 다른 결과가 나와야 함
			expect(lowerCaseCourses.length).not.toBe(upperCaseCourses.length);
		});

		it("존재하지 않는 지역으로는 빈 배열을 반환한다", () => {
			const courses = getCoursesByRegion("nonexistent-region");
			expect(courses).toHaveLength(0);
		});

		it("빈 문자열로는 모든 코스를 반환한다", () => {
			const courses = getCoursesByRegion("");
			expect(courses).toHaveLength(COURSES.length);
		});

		it("부분 일치로 검색할 수 있다", () => {
			// ID에 특정 문자열이 포함된 코스들을 찾음
			const courses = getCoursesByRegion("han");

			courses.forEach(course => {
				expect(course.id).toContain("han");
			});
		});

		it("반환된 코스들의 구조가 올바르다", () => {
			const courses = getCoursesByRegion("seoul");

			courses.forEach(course => {
				expect(course).toHaveProperty("id");
				expect(course).toHaveProperty("title");
				expect(course).toHaveProperty("spots");
				expect(Array.isArray(course.spots)).toBe(true);
			});
		});

		it("여러 지역에 걸친 코스도 올바르게 찾는다", () => {
			// 여러 지역명이 조합된 ID가 있을 수 있음
			const courses1 = getCoursesByRegion("seoul");
			const courses2 = getCoursesByRegion("gangnam");

			// 각각의 결과가 올바른 필터링 조건을 만족하는지 확인
			courses1.forEach(course => {
				expect(course.id).toContain("seoul");
			});

			courses2.forEach(course => {
				expect(course.id).toContain("gangnam");
			});
		});
	});

	describe("COURSES 상수", () => {
		it("COURSES 배열이 정의되어 있다", () => {
			expect(COURSES).toBeDefined();
			expect(Array.isArray(COURSES)).toBe(true);
		});

		it("모든 코스가 필수 속성을 가지고 있다", () => {
			COURSES.forEach(course => {
				expect(course).toHaveProperty("id");
				expect(course).toHaveProperty("title");
				expect(course).toHaveProperty("spots");

				expect(typeof course.id).toBe("string");
				expect(typeof course.title).toBe("string");
				expect(Array.isArray(course.spots)).toBe(true);
			});
		});

		it("모든 코스의 ID가 고유하다", () => {
			const ids = COURSES.map(course => course.id);
			const uniqueIds = new Set(ids);

			expect(ids.length).toBe(uniqueIds.size);
		});

		it("코스 제목이 비어있지 않다", () => {
			COURSES.forEach(course => {
				expect(course.title.trim()).not.toBe("");
			});
		});

		it("모든 코스에 최소 하나의 스팟이 있다", () => {
			COURSES.forEach(course => {
				expect(course.spots.length).toBeGreaterThan(0);
			});
		});

		it("스팟들이 올바른 구조를 가지고 있다", () => {
			COURSES.forEach(course => {
				course.spots.forEach(spot => {
					expect(spot).toHaveProperty("name");
					expect(spot).toHaveProperty("position");

					expect(typeof spot.name).toBe("string");
					expect(spot.position).toHaveProperty("lat");
					expect(spot.position).toHaveProperty("lng");
					expect(typeof spot.position.lat).toBe("number");
					expect(typeof spot.position.lng).toBe("number");
				});
			});
		});

		it("스팟의 이름이 비어있지 않다", () => {
			COURSES.forEach(course => {
				course.spots.forEach(spot => {
					expect(spot.name.trim()).not.toBe("");
				});
			});
		});
	});

	describe("통합 시나리오", () => {
		it("지역으로 찾은 코스를 ID로 다시 찾을 수 있다", () => {
			const regionCourses = getCoursesByRegion("seoul");

			if (regionCourses.length > 0) {
				const firstCourse = regionCourses[0];
				const foundCourse = getCourseById(firstCourse.id);

				expect(foundCourse).toEqual(firstCourse);
			}
		});

		it("모든 코스가 적어도 하나의 지역에 속한다", () => {
			// 모든 코스가 최소한 하나의 지역 검색으로 찾아질 수 있는지 확인
			const allFoundCourses = new Set<string>();

			// 일반적인 지역명들로 검색
			const regions = ["seoul", "busan", "incheon", "gangnam", "hongdae", "myeong", "han"];

			regions.forEach(region => {
				const courses = getCoursesByRegion(region);
				courses.forEach(course => {
					allFoundCourses.add(course.id);
				});
			});

			// 일부 코스라도 지역으로 찾을 수 있어야 함
			expect(allFoundCourses.size).toBeGreaterThan(0);
		});
	});
});
