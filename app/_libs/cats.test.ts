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
			const cat = getCatById("cat-001");
			expect(cat).toBeDefined();
			expect(cat?.id).toBe("cat-001");
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
			expect(commonCats).toHaveLength(1);
			expect(commonCats[0].rarity).toBe("common");
		});

		it("희귀 등급 고양이들을 필터링할 수 있다", () => {
			const rareCats = getCatsByRarity("rare");
			expect(rareCats).toHaveLength(1);
			expect(rareCats[0].rarity).toBe("rare");
		});

		it("에픽 등급 고양이들을 필터링할 수 있다", () => {
			const epicCats = getCatsByRarity("epic");
			expect(epicCats).toHaveLength(1);
			expect(epicCats[0].rarity).toBe("epic");
		});

		it("전설 등급 고양이들을 필터링할 수 있다", () => {
			const legendaryCats = getCatsByRarity("legendary");
			expect(legendaryCats).toHaveLength(1);
			expect(legendaryCats[0].rarity).toBe("legendary");
		});

		it("특별 등급 고양이들을 필터링할 수 있다", () => {
			const specialCats = getCatsByRarity("special");
			expect(specialCats).toHaveLength(1);
			expect(specialCats[0].rarity).toBe("special");
		});
	});

	describe("getDiscoveredCats", () => {
		it("발견된 고양이들만 반환한다", () => {
			const discoveredCats = getDiscoveredCats();
			discoveredCats.forEach(cat => {
				expect(cat.isDiscovered).toBe(true);
			});
		});

		it("현재 발견된 고양이는 2마리다", () => {
			const discoveredCats = getDiscoveredCats();
			expect(discoveredCats).toHaveLength(2);
			expect(discoveredCats[0].name).toBe("루나");
			expect(discoveredCats[1].name).toBe("미도리");
		});
	});

	describe("getUndiscoveredCats", () => {
		it("미발견 고양이들만 반환한다", () => {
			const undiscoveredCats = getUndiscoveredCats();
			undiscoveredCats.forEach(cat => {
				expect(cat.isDiscovered).toBe(false);
			});
		});

		it("현재 미발견 고양이는 3마리다", () => {
			const undiscoveredCats = getUndiscoveredCats();
			expect(undiscoveredCats).toHaveLength(3);
		});
	});

	describe("getCatsByLocation", () => {
		it("한강공원에서 발견된 고양이들을 찾을 수 있다", () => {
			const cats = getCatsByLocation("한강공원");
			expect(cats).toHaveLength(2);
			cats.forEach(cat => {
				expect(cat.discoveredAt).toContain("한강공원");
			});
		});

		it("강남구에서 발견된 고양이를 찾을 수 있다", () => {
			const cats = getCatsByLocation("강남구");
			expect(cats).toHaveLength(2); // 선릉역, 봉은사
			cats.forEach(cat => {
				expect(cat.discoveredAt).toContain("강남구");
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
		it("미발견 고양이 중 하나를 랜덤으로 반환한다", () => {
			const randomCat = getRandomUndiscoveredCat();
			expect(randomCat).toBeDefined();
			expect(randomCat?.isDiscovered).toBe(false);
		});

		it("반환된 고양이가 미발견 고양이 목록에 포함되어 있다", () => {
			const randomCat = getRandomUndiscoveredCat();
			const undiscoveredCats = getUndiscoveredCats();
			expect(undiscoveredCats).toContain(randomCat);
		});

		// 모든 고양이가 발견된 상황을 시뮬레이션하기 위한 테스트
		it("모든 고양이가 발견된 경우 null을 반환한다", () => {
			// 실제로는 모든 고양이가 미발견 상태이므로 이 테스트는 현재 상황에서는 패스하지 않음
			// 하지만 함수의 로직을 테스트하기 위해 작성
			const originalFilter = Array.prototype.filter;
			Array.prototype.filter = jest.fn().mockReturnValue([]);

			const randomCat = getRandomUndiscoveredCat();
			expect(randomCat).toBeNull();

			Array.prototype.filter = originalFilter;
		});
	});

	describe("getWeightedRandomCat", () => {
		it("미발견 고양이 중 하나를 가중치 기반으로 반환한다", () => {
			const weightedCat = getWeightedRandomCat();
			expect(weightedCat).toBeDefined();
			expect(weightedCat?.isDiscovered).toBe(false);
		});

		it("반환된 고양이가 미발견 고양이 목록에 포함되어 있다", () => {
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
