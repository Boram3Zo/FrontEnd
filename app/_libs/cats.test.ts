import {
	getCatById,
	getCatsByRarity,
	getDiscoveredCats,
	getUndiscoveredCats,
	getCatsByLocation,
	getRandomUndiscoveredCat,
	getWeightedRandomCat,
	MOCK_CATS,
} from "@/app/_libs/cats";

describe("고양이 유틸리티 함수들", () => {
	describe("getCatById", () => {
		it("유효한 ID로 고양이를 찾을 수 있다", () => {
			const cat = getCatById("2");
			expect(cat).toBeDefined();
			expect(cat?.id).toBe("2");
			expect(cat?.name).toBe("루나");
		});

		it("존재하지 않는 ID로는 undefined를 반환한다", () => {
			const cat = getCatById("nonexistent-cat");
			expect(cat).toBeUndefined();
		});

		it("빈 문자열 ID로는 undefined를 반환한다", () => {
			const cat = getCatById("");
			expect(cat).toBeUndefined();
		});
	});

	describe("getCatsByRarity", () => {
		it("일반 등급 고양이들을 필터링할 수 있다", () => {
			const commonCats = getCatsByRarity("common");
			expect(commonCats).toHaveLength(7);
			expect(commonCats[0].rarity).toBe("common");
		});

		it("희귀 등급 고양이들을 필터링할 수 있다", () => {
			const rareCats = getCatsByRarity("rare");
			expect(rareCats).toHaveLength(7);
			expect(rareCats[0].rarity).toBe("rare");
		});

		it("에픽 등급 고양이들을 필터링할 수 있다", () => {
			const epicCats = getCatsByRarity("epic");
			expect(epicCats).toHaveLength(5);
			expect(epicCats[0].rarity).toBe("epic");
		});

		it("전설 등급 고양이들을 필터링할 수 있다", () => {
			const legendaryCats = getCatsByRarity("legendary");
			expect(legendaryCats).toHaveLength(2);
			expect(legendaryCats[0].rarity).toBe("legendary");
		});

		it("존재하지 않는 등급으로는 빈 배열을 반환한다", () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const nonExistentCats = getCatsByRarity("nonexistent" as any);
			expect(nonExistentCats).toHaveLength(0);
		});

		it("각 등급별로 올바른 고양이들을 반환한다", () => {
			const commonCats = getCatsByRarity("common");
			const rareCats = getCatsByRarity("rare");
			const epicCats = getCatsByRarity("epic");

			commonCats.forEach(cat => expect(cat.rarity).toBe("common"));
			rareCats.forEach(cat => expect(cat.rarity).toBe("rare"));
			epicCats.forEach(cat => expect(cat.rarity).toBe("epic"));
		});
	});

	describe("getDiscoveredCats", () => {
		it("현재 발견된 고양이는 11마리다", () => {
			const discoveredCats = getDiscoveredCats();
			expect(discoveredCats).toHaveLength(11);
			expect(discoveredCats[0].name).toBe("치즈");
			expect(discoveredCats[1].name).toBe("루나");
		});

		it("모든 발견된 고양이는 isDiscovered가 true이다", () => {
			const discoveredCats = getDiscoveredCats();
			discoveredCats.forEach(cat => {
				expect(cat.isDiscovered).toBe(true);
			});
		});
	});

	describe("getUndiscoveredCats", () => {
		it("현재 미발견 고양이는 11마리다", () => {
			const undiscoveredCats = getUndiscoveredCats();
			expect(undiscoveredCats).toHaveLength(11);
		});

		it("미발견 고양이들만 반환한다", () => {
			const undiscoveredCats = getUndiscoveredCats();
			undiscoveredCats.forEach(cat => {
				expect(cat.isDiscovered).toBe(false);
			});
		});
	});

	describe("getCatsByLocation", () => {
		it("한강공원에서 발견된 고양이들을 찾을 수 있다", () => {
			const cats = getCatsByLocation("한강공원");
			expect(cats).toHaveLength(1);
			cats.forEach(cat => {
				expect(cat.discoveredAt).toContain("한강공원");
			});
		});

		it("강남에서 발견된 고양이를 찾을 수 있다", () => {
			const cats = getCatsByLocation("강남");
			expect(cats).toHaveLength(1);
			cats.forEach(cat => {
				expect(cat.discoveredAt).toContain("강남");
			});
		});

		it("대소문자를 구분하지 않고 검색할 수 있다", () => {
			const cats = getCatsByLocation("한강공원");
			const catsUpperCase = getCatsByLocation("한강공원");
			expect(cats).toEqual(catsUpperCase);
		});

		it("존재하지 않는 위치로는 빈 배열을 반환한다", () => {
			const cats = getCatsByLocation("존재하지않는장소");
			expect(cats).toHaveLength(0);
		});

		it("빈 문자열로는 모든 고양이를 반환한다", () => {
			const cats = getCatsByLocation("");
			expect(cats).toHaveLength(MOCK_CATS.length);
		});
	});

	describe("getRandomUndiscoveredCat", () => {
		it("미발견 고양이 중 하나를 반환한다", () => {
			const randomCat = getRandomUndiscoveredCat();
			expect(randomCat).toBeDefined();
			expect(randomCat?.isDiscovered).toBe(false);
		});

		it("여러 번 호출해도 유효한 고양이를 반환한다", () => {
			for (let i = 0; i < 5; i++) {
				const randomCat = getRandomUndiscoveredCat();
				expect(randomCat).toBeDefined();
				expect(randomCat?.isDiscovered).toBe(false);
			}
		});

		it("미발견 고양이 목록에 포함된 고양이를 반환한다", () => {
			const randomCat = getRandomUndiscoveredCat();
			const undiscoveredCats = getUndiscoveredCats();
			expect(undiscoveredCats).toContain(randomCat);
		});

		it("모든 고양이가 발견된 경우 null을 반환한다", () => {
			const originalFilter = Array.prototype.filter;
			Array.prototype.filter = jest.fn().mockReturnValue([]);

			const randomCat = getRandomUndiscoveredCat();
			expect(randomCat).toBeNull();

			Array.prototype.filter = originalFilter;
		});
	});

	describe("getWeightedRandomCat", () => {
		it("가중치가 적용된 랜덤 고양이를 반환한다", () => {
			const weightedCat = getWeightedRandomCat();
			expect(weightedCat).toBeDefined();
			expect(weightedCat?.isDiscovered).toBe(false);
		});

		it("미발견 고양이 목록에 포함된 고양이를 반환한다", () => {
			const weightedCat = getWeightedRandomCat();
			const undiscoveredCats = getUndiscoveredCats();
			expect(undiscoveredCats).toContain(weightedCat);
		});

		it("여러 번 호출해도 유효한 고양이를 반환한다", () => {
			for (let i = 0; i < 10; i++) {
				const weightedCat = getWeightedRandomCat();
				expect(weightedCat).toBeDefined();
				expect(weightedCat?.isDiscovered).toBe(false);
			}
		});

		it("모든 고양이가 발견된 경우 null을 반환한다", () => {
			const originalFilter = Array.prototype.filter;
			Array.prototype.filter = jest.fn().mockReturnValue([]);

			const weightedCat = getWeightedRandomCat();
			expect(weightedCat).toBeNull();

			Array.prototype.filter = originalFilter;
		});
	});
});
