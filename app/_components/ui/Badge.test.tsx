import { render, screen } from "@testing-library/react";
import { Badge, badgeVariants } from "@/app/_components/ui/Badge";

describe("Badge 컴포넌트", () => {
	describe("렌더링", () => {
		it("기본 배지가 정상적으로 렌더링된다", () => {
			render(<Badge>새로운</Badge>);
			const badge = screen.getByText("새로운");
			expect(badge).toBeInTheDocument();
		});

		it("텍스트 내용이 올바르게 표시된다", () => {
			render(<Badge>할인중</Badge>);
			expect(screen.getByText("할인중")).toBeInTheDocument();
		});

		it("자식 요소를 렌더링할 수 있다", () => {
			render(
				<Badge>
					<span>★</span>
					<span>인기</span>
				</Badge>
			);
			expect(screen.getByText("★")).toBeInTheDocument();
			expect(screen.getByText("인기")).toBeInTheDocument();
		});

		it("span 태그로 렌더링된다", () => {
			render(<Badge>배지</Badge>);
			const badge = screen.getByText("배지");
			expect(badge.tagName).toBe("SPAN");
		});
	});

	describe("variant 속성", () => {
		it("default variant가 적용된다", () => {
			render(<Badge variant="default">기본 배지</Badge>);
			const badge = screen.getByText("기본 배지");
			expect(badge).toHaveClass("bg-primary");
			expect(badge).toHaveClass("text-primary-foreground");
		});

		it("secondary variant가 적용된다", () => {
			render(<Badge variant="secondary">보조 배지</Badge>);
			const badge = screen.getByText("보조 배지");
			expect(badge).toHaveClass("bg-secondary");
			expect(badge).toHaveClass("text-secondary-foreground");
		});

		it("destructive variant가 적용된다", () => {
			render(<Badge variant="destructive">경고 배지</Badge>);
			const badge = screen.getByText("경고 배지");
			expect(badge).toHaveClass("bg-destructive");
			expect(badge).toHaveClass("text-white");
		});

		it("outline variant가 적용된다", () => {
			render(<Badge variant="outline">외곽선 배지</Badge>);
			const badge = screen.getByText("외곽선 배지");
			expect(badge).toHaveClass("text-foreground");
		});
	});

	describe("스타일링", () => {
		it("기본 스타일 클래스가 적용된다", () => {
			render(<Badge>스타일 테스트</Badge>);
			const badge = screen.getByText("스타일 테스트");

			expect(badge).toHaveClass("inline-flex");
			expect(badge).toHaveClass("items-center");
			expect(badge).toHaveClass("justify-center");
			expect(badge).toHaveClass("rounded-md");
			expect(badge).toHaveClass("border");
			expect(badge).toHaveClass("px-2");
			expect(badge).toHaveClass("py-0.5");
			expect(badge).toHaveClass("text-xs");
			expect(badge).toHaveClass("font-medium");
		});

		it("추가 className이 적용된다", () => {
			render(<Badge className="custom-class">커스텀 배지</Badge>);
			const badge = screen.getByText("커스텀 배지");
			expect(badge).toHaveClass("custom-class");
			expect(badge).toHaveClass("inline-flex"); // 기본 클래스도 유지
		});

		it("data-slot 속성이 설정된다", () => {
			render(<Badge>슬롯 테스트</Badge>);
			const badge = screen.getByText("슬롯 테스트");
			expect(badge).toHaveAttribute("data-slot", "badge");
		});
	});

	describe("asChild 속성", () => {
		it("asChild가 true일 때 Slot 컴포넌트를 사용한다", () => {
			render(
				<Badge asChild>
					<a href="/sale">할인 링크</a>
				</Badge>
			);

			const link = screen.getByRole("link");
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute("href", "/sale");
			expect(link).toHaveClass("inline-flex"); // Badge 스타일이 적용됨
		});

		it("asChild가 false일 때 span 엘리먼트를 사용한다", () => {
			render(<Badge asChild={false}>일반 배지</Badge>);
			const badge = screen.getByText("일반 배지");
			expect(badge.tagName).toBe("SPAN");
		});
	});

	describe("속성 전달", () => {
		it("HTML 속성이 올바르게 전달된다", () => {
			render(
				<Badge id="test-badge" title="배지 설명" data-testid="badge-component">
					속성 테스트
				</Badge>
			);

			const badge = screen.getByTestId("badge-component");
			expect(badge).toHaveAttribute("id", "test-badge");
			expect(badge).toHaveAttribute("title", "배지 설명");
		});

		it("aria 속성이 설정된다", () => {
			render(
				<Badge aria-label="새로운 기능" role="status">
					NEW
				</Badge>
			);

			const badge = screen.getByText("NEW");
			expect(badge).toHaveAttribute("aria-label", "새로운 기능");
			expect(badge).toHaveAttribute("role", "status");
		});
	});

	describe("badgeVariants 함수", () => {
		it("기본 variant를 반환한다", () => {
			const className = badgeVariants();
			expect(className).toContain("inline-flex");
			expect(className).toContain("bg-primary");
		});

		it("특정 variant를 반환한다", () => {
			const className = badgeVariants({ variant: "destructive" });
			expect(className).toContain("bg-destructive");
		});

		it("secondary variant를 반환한다", () => {
			const className = badgeVariants({ variant: "secondary" });
			expect(className).toContain("bg-secondary");
		});

		it("outline variant를 반환한다", () => {
			const className = badgeVariants({ variant: "outline" });
			expect(className).toContain("text-foreground");
		});
	});

	describe("다양한 사용 시나리오", () => {
		it("아이콘과 텍스트를 함께 표시할 수 있다", () => {
			render(
				<Badge>
					<svg data-testid="star-icon" width="12" height="12">
						<path d="M6 0l1.5 4.5h4.5l-3.5 2.5 1.5 4.5-3.5-2.5-3.5 2.5 1.5-4.5-3.5-2.5h4.5z" />
					</svg>
					베스트
				</Badge>
			);

			expect(screen.getByTestId("star-icon")).toBeInTheDocument();
			expect(screen.getByText("베스트")).toBeInTheDocument();
		});

		it("숫자 배지로 사용할 수 있다", () => {
			render(<Badge variant="destructive">99+</Badge>);
			const badge = screen.getByText("99+");
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveClass("bg-destructive");
		});

		it("상태 표시 배지로 사용할 수 있다", () => {
			render(
				<Badge variant="secondary" aria-label="온라인 상태">
					● 온라인
				</Badge>
			);

			const badge = screen.getByText("● 온라인");
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveAttribute("aria-label", "온라인 상태");
		});

		it("링크 배지로 사용할 수 있다", () => {
			render(
				<Badge asChild>
					<a href="/category/sale" className="hover:underline">
						할인상품
					</a>
				</Badge>
			);

			const link = screen.getByRole("link");
			expect(link).toHaveAttribute("href", "/category/sale");
			expect(link).toHaveClass("hover:underline");
			expect(link).toHaveClass("inline-flex"); // Badge 기본 스타일
		});

		it("버튼 형태의 배지로 사용할 수 있다", () => {
			const handleClick = jest.fn();
			render(
				<Badge asChild>
					<button onClick={handleClick} type="button">
						닫기 ×
					</button>
				</Badge>
			);

			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();

			// 클릭 이벤트 테스트는 asChild로 감싸진 버튼에서는 제한적
			expect(button).toHaveClass("inline-flex");
		});

		it("카테고리 태그로 사용할 수 있다", () => {
			render(
				<div>
					<Badge variant="outline">React</Badge>
					<Badge variant="outline">TypeScript</Badge>
					<Badge variant="outline">Next.js</Badge>
				</div>
			);

			expect(screen.getByText("React")).toBeInTheDocument();
			expect(screen.getByText("TypeScript")).toBeInTheDocument();
			expect(screen.getByText("Next.js")).toBeInTheDocument();
		});
	});

	describe("접근성", () => {
		it("스크린 리더를 위한 텍스트가 제공된다", () => {
			render(<Badge aria-label="3개의 새로운 알림">3</Badge>);

			const badge = screen.getByLabelText("3개의 새로운 알림");
			expect(badge).toBeInTheDocument();
		});

		it("role 속성으로 의미를 제공할 수 있다", () => {
			render(
				<Badge role="status" aria-live="polite">
					처리중
				</Badge>
			);

			const badge = screen.getByRole("status");
			expect(badge).toHaveAttribute("aria-live", "polite");
		});
	});
});
