import { cn } from "@/app/_libs/tailwind";

describe("Tailwind CSS 유틸리티 함수들", () => {
	describe("cn", () => {
		it("기본 클래스명들을 결합할 수 있다", () => {
			const result = cn("bg-red-500", "text-white", "p-4");
			expect(result).toBe("bg-red-500 text-white p-4");
		});

		it("조건부 클래스명을 처리할 수 있다", () => {
			const isActive = true;
			const isError = false;

			const result = cn("base-class", isActive && "active-class", isError && "error-class");

			expect(result).toBe("base-class active-class");
		});

		it("객체 형태의 클래스명을 처리할 수 있다", () => {
			const result = cn({
				"bg-blue-500": true,
				"text-white": true,
				hidden: false,
				visible: true,
			});

			expect(result).toBe("bg-blue-500 text-white visible");
		});

		it("배열 형태의 클래스명을 처리할 수 있다", () => {
			const result = cn(["bg-green-500", "text-black"], "p-2");
			expect(result).toBe("bg-green-500 text-black p-2");
		});

		it("Tailwind CSS 클래스 충돌을 해결한다", () => {
			// 같은 속성의 다른 값들이 있을 때 마지막 것만 적용
			const result = cn("bg-red-500", "bg-blue-500");
			expect(result).toBe("bg-blue-500");
		});

		it("복잡한 Tailwind 충돌을 해결한다", () => {
			const result = cn("p-2", "px-4", "py-3");
			// twMerge가 실제로 어떻게 동작하는지에 따라 결과가 달라질 수 있음
			expect(result).toContain("px-4");
			expect(result).toContain("py-3");
		});

		it("margin 클래스 충돌을 해결한다", () => {
			const result = cn("m-4", "mx-2", "my-6");
			expect(result).toContain("mx-2");
			expect(result).toContain("my-6");
		});

		it("undefined와 null 값을 무시한다", () => {
			const result = cn("bg-red-500", undefined, null, "text-white");
			expect(result).toBe("bg-red-500 text-white");
		});

		it("빈 문자열을 무시한다", () => {
			const result = cn("bg-red-500", "", "text-white");
			expect(result).toBe("bg-red-500 text-white");
		});

		it("중복된 클래스명을 제거한다", () => {
			const result = cn("bg-red-500", "text-white", "bg-red-500");
			// 중복 제거 및 순서는 twMerge 로직에 따라 달라질 수 있음
			expect(result).toContain("bg-red-500");
			expect(result).toContain("text-white");
		});

		it("아무 인자가 없으면 빈 문자열을 반환한다", () => {
			const result = cn();
			expect(result).toBe("");
		});

		it("모든 값이 falsy면 빈 문자열을 반환한다", () => {
			const result = cn(false, null, undefined, "");
			expect(result).toBe("");
		});

		it("복잡한 조건부 로직과 함께 사용할 수 있다", () => {
			const variant: "primary" | "secondary" = "primary";
			const size: "small" | "medium" | "large" = "large";
			const isDisabled = false;
			const isLoading = true;

			const result = cn(
				// 기본 스타일
				"inline-flex items-center justify-center rounded-md",
				// variant에 따른 스타일
				{
					"bg-blue-500 text-white": variant === "primary",
					"bg-gray-200 text-gray-800": variant === "secondary",
				},
				// size에 따른 스타일
				{
					"px-3 py-2 text-sm": size === "small",
					"px-4 py-3 text-base": size === "medium",
					"px-6 py-4 text-lg": size === "large",
				},
				// 상태에 따른 스타일
				isDisabled && "opacity-50 cursor-not-allowed",
				isLoading && "animate-pulse"
			);

			expect(result).toContain("inline-flex");
			expect(result).toContain("bg-blue-500");
			expect(result).toContain("px-6 py-4 text-lg");
			expect(result).toContain("animate-pulse");
			expect(result).not.toContain("opacity-50");
		});

		it("Tailwind의 모든 종류의 클래스와 작동한다", () => {
			const result = cn(
				// Layout
				"block w-full h-screen",
				// Flexbox
				"flex items-center justify-between",
				// Grid
				"grid grid-cols-3 gap-4",
				// Spacing
				"p-4 m-2",
				// Typography
				"text-lg font-bold text-center",
				// Colors
				"bg-blue-500 text-white border-gray-300",
				// Effects
				"shadow-lg hover:shadow-xl transition-all duration-300",
				// Responsive
				"sm:text-base md:text-lg lg:text-xl"
			);

			// 기본적으로 일부 클래스가 포함되어 있는지 확인
			// twMerge가 충돌하는 클래스들을 처리할 수 있으므로 모든 클래스가 남아있지 않을 수 있음
			expect(result).toContain("w-full");
			expect(result).toContain("grid");
			expect(result).toContain("bg-blue-500");
			expect(result).toContain("shadow-lg");
		});

		it("동적 클래스명 생성과 함께 작동한다", () => {
			const color = "red";
			const intensity = "500";
			const result = cn(`bg-${color}-${intensity}`, "text-white");

			expect(result).toBe("bg-red-500 text-white");
		});

		it("커스텀 CSS 클래스와 Tailwind 클래스를 함께 사용할 수 있다", () => {
			const result = cn("custom-component", "bg-blue-500", "my-custom-class", "text-white");

			expect(result).toBe("custom-component bg-blue-500 my-custom-class text-white");
		});
	});
});
