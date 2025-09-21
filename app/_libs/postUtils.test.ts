/**
 * getImageUrl 함수 테스트
 */

import { getImageUrl } from "./postUtils";
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";

// 환경 변수 모킹
const originalEnv = process.env.NEXT_PUBLIC_API_BASE_URL;

describe("getImageUrl", () => {
	beforeEach(() => {
		process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:9988";
	});

	afterEach(() => {
		process.env.NEXT_PUBLIC_API_BASE_URL = originalEnv;
	});

	it("null/undefined filePath에 대해 기본 이미지를 반환해야 함", () => {
		expect(getImageUrl(null)).toBe("/hangang-park-walkway.png");
		expect(getImageUrl(undefined)).toBe("/hangang-park-walkway.png");
		expect(getImageUrl("")).toBe("/hangang-park-walkway.png");
	});

	it("이미 완전한 URL인 경우 그대로 반환해야 함", () => {
		const httpUrl = "http://example.com/image.jpg";
		const httpsUrl = "https://example.com/image.jpg";

		expect(getImageUrl(httpUrl)).toBe(httpUrl);
		expect(getImageUrl(httpsUrl)).toBe(httpsUrl);
	});

	it("상대 경로를 API 베이스 URL과 결합해야 함", () => {
		const filePath = "photo123.jpg";
		const expected = "http://localhost:9988/static/photo123.jpg";

		expect(getImageUrl(filePath)).toBe(expected);
	});

	it("절대 경로에서 파일명만 추출해야 함", () => {
		const filePath = "/Users/mjki/goinfre/chikaku-backend/uploads/eb55833f-7f3f-414c-a816-6a2dcf8189a4.jpeg";
		const expected = "http://localhost:9988/static/eb55833f-7f3f-414c-a816-6a2dcf8189a4.jpeg";

		expect(getImageUrl(filePath)).toBe(expected);
	});

	it("resources/static 경로에서 파일명만 추출해야 함", () => {
		const filePath = "/Users/mjki/goinfre/chikaku-backend/resources/static/4b28ea7e-cdeb-4120-856d-e31c01d6f4ef.jpeg";
		const expected = "http://localhost:9988/static/4b28ea7e-cdeb-4120-856d-e31c01d6f4ef.jpeg";

		expect(getImageUrl(filePath)).toBe(expected);
	});

	it("환경변수가 없을 때 기본 베이스 URL을 사용해야 함", () => {
		delete process.env.NEXT_PUBLIC_API_BASE_URL;

		const filePath = "photo123.jpg";
		const expected = "http://localhost:9988/static/photo123.jpg";

		expect(getImageUrl(filePath)).toBe(expected);
	});
});
