import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, buttonVariants } from "@/app/_components/ui/Button";

describe("Button 컴포넌트", () => {
	describe("렌더링", () => {
		it("기본 버튼이 정상적으로 렌더링된다", () => {
			render(<Button>클릭하세요</Button>);
			const button = screen.getByRole("button", { name: "클릭하세요" });
			expect(button).toBeInTheDocument();
		});

		it("텍스트 내용이 올바르게 표시된다", () => {
			render(<Button>테스트 버튼</Button>);
			expect(screen.getByText("테스트 버튼")).toBeInTheDocument();
		});

		it("자식 요소를 렌더링할 수 있다", () => {
			render(
				<Button>
					<span>아이콘</span>
					<span>텍스트</span>
				</Button>
			);
			expect(screen.getByText("아이콘")).toBeInTheDocument();
			expect(screen.getByText("텍스트")).toBeInTheDocument();
		});
	});

	describe("variant 속성", () => {
		it("default variant가 적용된다", () => {
			render(<Button variant="default">Default 버튼</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("bg-primary");
		});

		it("destructive variant가 적용된다", () => {
			render(<Button variant="destructive">Destructive 버튼</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("bg-destructive");
		});

		it("outline variant가 적용된다", () => {
			render(<Button variant="outline">Outline 버튼</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("border");
		});

		it("secondary variant가 적용된다", () => {
			render(<Button variant="secondary">Secondary 버튼</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("bg-secondary");
		});

		it("ghost variant가 적용된다", () => {
			render(<Button variant="ghost">Ghost 버튼</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("hover:bg-accent");
		});

		it("link variant가 적용된다", () => {
			render(<Button variant="link">Link 버튼</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("underline-offset-4");
		});
	});

	describe("size 속성", () => {
		it("default size가 적용된다", () => {
			render(<Button size="default">Default 크기</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("h-9");
		});

		it("small size가 적용된다", () => {
			render(<Button size="sm">Small 크기</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("h-8");
		});

		it("large size가 적용된다", () => {
			render(<Button size="lg">Large 크기</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("h-10");
		});

		it("icon size가 적용된다", () => {
			render(<Button size="icon">아이콘</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("size-9");
		});
	});

	describe("이벤트 처리", () => {
		it("클릭 이벤트가 정상적으로 동작한다", () => {
			const handleClick = jest.fn();
			render(<Button onClick={handleClick}>클릭 테스트</Button>);

			const button = screen.getByRole("button");
			fireEvent.click(button);

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("disabled 상태에서는 클릭 이벤트가 실행되지 않는다", () => {
			const handleClick = jest.fn();
			render(
				<Button onClick={handleClick} disabled>
					비활성화된 버튼
				</Button>
			);

			const button = screen.getByRole("button");
			fireEvent.click(button);

			expect(handleClick).not.toHaveBeenCalled();
		});

		it("마우스 이벤트가 정상적으로 동작한다", () => {
			const handleMouseEnter = jest.fn();
			const handleMouseLeave = jest.fn();

			render(
				<Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					마우스 이벤트 테스트
				</Button>
			);

			const button = screen.getByRole("button");
			fireEvent.mouseEnter(button);
			fireEvent.mouseLeave(button);

			expect(handleMouseEnter).toHaveBeenCalledTimes(1);
			expect(handleMouseLeave).toHaveBeenCalledTimes(1);
		});
	});

	describe("속성과 상태", () => {
		it("disabled 속성이 적용된다", () => {
			render(<Button disabled>비활성화된 버튼</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeDisabled();
			expect(button).toHaveClass("disabled:opacity-50");
		});

		it("type 속성이 올바르게 설정된다", () => {
			render(<Button type="submit">제출 버튼</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveAttribute("type", "submit");
		});

		it("aria-label 속성이 설정된다", () => {
			render(<Button aria-label="닫기 버튼">X</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveAttribute("aria-label", "닫기 버튼");
		});

		it("data-testid 속성이 설정된다", () => {
			render(<Button data-testid="test-button">테스트 버튼</Button>);
			const button = screen.getByTestId("test-button");
			expect(button).toBeInTheDocument();
		});
	});

	describe("커스텀 className", () => {
		it("추가 className이 적용된다", () => {
			render(<Button className="custom-class">커스텀 버튼</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("custom-class");
		});

		it("기본 클래스와 커스텀 클래스가 함께 적용된다", () => {
			render(<Button className="custom-class">버튼</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("inline-flex");
			expect(button).toHaveClass("custom-class");
		});
	});

	describe("asChild 속성", () => {
		it("asChild가 true일 때 Slot 컴포넌트를 사용한다", () => {
			render(
				<Button asChild>
					<a href="/test">링크 버튼</a>
				</Button>
			);

			const link = screen.getByRole("link");
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute("href", "/test");
		});

		it("asChild가 false일 때 button 엘리먼트를 사용한다", () => {
			render(<Button asChild={false}>일반 버튼</Button>);
			const button = screen.getByRole("button");
			expect(button.tagName).toBe("BUTTON");
		});
	});

	describe("접근성", () => {
		it("포커스가 가능하다", () => {
			render(<Button>포커스 테스트</Button>);
			const button = screen.getByRole("button");
			button.focus();
			expect(button).toHaveFocus();
		});

		it("Enter 키로 버튼을 활성화할 수 있다", async () => {
			const handleClick = jest.fn();
			const user = userEvent.setup();
			render(<Button onClick={handleClick}>엔터 키 테스트</Button>);

			const button = screen.getByRole("button");
			button.focus();
			await user.keyboard("{Enter}");

			expect(handleClick).toHaveBeenCalled();
		});

		it("Space 키로 버튼을 활성화할 수 있다", async () => {
			const handleClick = jest.fn();
			const user = userEvent.setup();
			render(<Button onClick={handleClick}>스페이스 키 테스트</Button>);

			const button = screen.getByRole("button");
			button.focus();
			await user.keyboard(" ");

			expect(handleClick).toHaveBeenCalled();
		});
	});

	describe("buttonVariants 함수", () => {
		it("기본 variant와 size를 반환한다", () => {
			const className = buttonVariants();
			expect(className).toContain("inline-flex");
			expect(className).toContain("bg-primary");
			expect(className).toContain("h-9");
		});

		it("특정 variant를 반환한다", () => {
			const className = buttonVariants({ variant: "destructive" });
			expect(className).toContain("bg-destructive");
		});

		it("특정 size를 반환한다", () => {
			const className = buttonVariants({ size: "lg" });
			expect(className).toContain("h-10");
		});

		it("variant와 size를 조합한 클래스를 반환한다", () => {
			const className = buttonVariants({ variant: "outline", size: "sm" });
			expect(className).toContain("border");
			expect(className).toContain("h-8");
		});
	});

	describe("다양한 사용 시나리오", () => {
		it("아이콘과 텍스트를 함께 표시할 수 있다", () => {
			render(
				<Button>
					<svg data-testid="icon" width="16" height="16">
						<circle cx="8" cy="8" r="4" />
					</svg>
					저장하기
				</Button>
			);

			expect(screen.getByTestId("icon")).toBeInTheDocument();
			expect(screen.getByText("저장하기")).toBeInTheDocument();
		});

		it("로딩 상태를 표시할 수 있다", () => {
			render(
				<Button disabled>
					<svg data-testid="spinner" className="animate-spin" width="16" height="16">
						<circle cx="8" cy="8" r="4" />
					</svg>
					로딩 중...
				</Button>
			);

			expect(screen.getByTestId("spinner")).toBeInTheDocument();
			expect(screen.getByText("로딩 중...")).toBeInTheDocument();
			expect(screen.getByRole("button")).toBeDisabled();
		});
	});
});
