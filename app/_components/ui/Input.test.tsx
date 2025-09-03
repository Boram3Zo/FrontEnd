import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Input } from "@/app/_components/ui/Input";

describe("Input 컴포넌트", () => {
	describe("렌더링", () => {
		it("입력 필드가 정상적으로 렌더링된다", () => {
			render(<Input data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toBeInTheDocument();
		});

		it("input 태그로 렌더링된다", () => {
			render(<Input data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input.tagName).toBe("INPUT");
		});

		it("data-slot 속성이 설정된다", () => {
			render(<Input data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("data-slot", "input");
		});
	});

	describe("기본 스타일링", () => {
		it("기본 스타일 클래스가 적용된다", () => {
			render(<Input data-testid="input" />);
			const input = screen.getByTestId("input");

			expect(input).toHaveClass("flex");
			expect(input).toHaveClass("h-9");
			expect(input).toHaveClass("w-full");
			expect(input).toHaveClass("min-w-0");
			expect(input).toHaveClass("rounded-md");
			expect(input).toHaveClass("border");
			expect(input).toHaveClass("bg-transparent");
			expect(input).toHaveClass("px-3");
			expect(input).toHaveClass("py-1");
			expect(input).toHaveClass("text-base");
			expect(input).toHaveClass("shadow-xs");
			expect(input).toHaveClass("outline-none");
		});

		it("포커스 스타일 클래스가 포함된다", () => {
			render(<Input data-testid="input" />);
			const input = screen.getByTestId("input");

			expect(input).toHaveClass("focus-visible:border-ring");
			expect(input).toHaveClass("focus-visible:ring-ring/50");
			expect(input).toHaveClass("focus-visible:ring-[3px]");
		});

		it("disabled 스타일 클래스가 포함된다", () => {
			render(<Input data-testid="input" />);
			const input = screen.getByTestId("input");

			expect(input).toHaveClass("disabled:pointer-events-none");
			expect(input).toHaveClass("disabled:cursor-not-allowed");
			expect(input).toHaveClass("disabled:opacity-50");
		});

		it("유효성 검사 오류 스타일 클래스가 포함된다", () => {
			render(<Input data-testid="input" />);
			const input = screen.getByTestId("input");

			expect(input).toHaveClass("aria-invalid:ring-destructive/20");
			expect(input).toHaveClass("dark:aria-invalid:ring-destructive/40");
			expect(input).toHaveClass("aria-invalid:border-destructive");
		});

		it("placeholder 스타일 클래스가 포함된다", () => {
			render(<Input data-testid="input" />);
			const input = screen.getByTestId("input");

			expect(input).toHaveClass("placeholder:text-muted-foreground");
		});

		it("파일 입력 스타일 클래스가 포함된다", () => {
			render(<Input data-testid="input" />);
			const input = screen.getByTestId("input");

			expect(input).toHaveClass("file:text-foreground");
			expect(input).toHaveClass("file:inline-flex");
			expect(input).toHaveClass("file:h-7");
			expect(input).toHaveClass("file:border-0");
			expect(input).toHaveClass("file:bg-transparent");
			expect(input).toHaveClass("file:text-sm");
			expect(input).toHaveClass("file:font-medium");
		});
	});

	describe("type 속성", () => {
		it("기본 type이 설정된다", () => {
			render(<Input data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("type", "text");
		});

		it("text type으로 설정할 수 있다", () => {
			render(<Input type="text" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("type", "text");
		});

		it("password type으로 설정할 수 있다", () => {
			render(<Input type="password" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("type", "password");
		});

		it("email type으로 설정할 수 있다", () => {
			render(<Input type="email" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("type", "email");
		});

		it("number type으로 설정할 수 있다", () => {
			render(<Input type="number" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("type", "number");
		});

		it("tel type으로 설정할 수 있다", () => {
			render(<Input type="tel" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("type", "tel");
		});

		it("url type으로 설정할 수 있다", () => {
			render(<Input type="url" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("type", "url");
		});

		it("search type으로 설정할 수 있다", () => {
			render(<Input type="search" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("type", "search");
		});

		it("file type으로 설정할 수 있다", () => {
			render(<Input type="file" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("type", "file");
		});

		it("date type으로 설정할 수 있다", () => {
			render(<Input type="date" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("type", "date");
		});

		it("time type으로 설정할 수 있다", () => {
			render(<Input type="time" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("type", "time");
		});
	});

	describe("속성 전달", () => {
		it("placeholder가 올바르게 설정된다", () => {
			render(<Input placeholder="이름을 입력하세요" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("placeholder", "이름을 입력하세요");
		});

		it("value가 올바르게 설정된다", () => {
			render(<Input value="테스트 값" data-testid="input" readOnly />);
			const input = screen.getByTestId("input");
			expect(input).toHaveValue("테스트 값");
		});

		it("defaultValue가 올바르게 설정된다", () => {
			render(<Input defaultValue="기본값" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveValue("기본값");
		});

		it("disabled 속성이 올바르게 설정된다", () => {
			render(<Input disabled data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toBeDisabled();
		});

		it("readOnly 속성이 올바르게 설정된다", () => {
			render(<Input readOnly data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("readOnly");
		});

		it("required 속성이 올바르게 설정된다", () => {
			render(<Input required data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toBeRequired();
		});

		it("maxLength 속성이 올바르게 설정된다", () => {
			render(<Input maxLength={10} data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("maxLength", "10");
		});

		it("minLength 속성이 올바르게 설정된다", () => {
			render(<Input minLength={3} data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("minLength", "3");
		});

		it("pattern 속성이 올바르게 설정된다", () => {
			render(<Input pattern="[0-9]*" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("pattern", "[0-9]*");
		});

		it("autoComplete 속성이 올바르게 설정된다", () => {
			render(<Input autoComplete="email" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("autoComplete", "email");
		});

		it("autoFocus 속성이 올바르게 설정된다", () => {
			render(<Input autoFocus data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveFocus();
		});
	});

	describe("CSS 클래스 커스터마이제이션", () => {
		it("추가 className이 적용된다", () => {
			render(<Input className="custom-class" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveClass("custom-class");
			expect(input).toHaveClass("flex"); // 기본 클래스도 유지
		});

		it("기본 클래스를 오버라이드할 수 있다", () => {
			render(<Input className="h-12 bg-red-500" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveClass("h-12");
			expect(input).toHaveClass("bg-red-500");
		});
	});

	describe("이벤트 처리", () => {
		it("onChange 이벤트가 올바르게 호출된다", async () => {
			const handleChange = jest.fn();
			const user = userEvent.setup();

			render(<Input onChange={handleChange} data-testid="input" />);
			const input = screen.getByTestId("input");

			await user.type(input, "test");

			expect(handleChange).toHaveBeenCalled();
			expect(input).toHaveValue("test");
		});

		it("onFocus 이벤트가 올바르게 호출된다", async () => {
			const handleFocus = jest.fn();
			const user = userEvent.setup();

			render(<Input onFocus={handleFocus} data-testid="input" />);
			const input = screen.getByTestId("input");

			await user.click(input);

			expect(handleFocus).toHaveBeenCalled();
		});

		it("onBlur 이벤트가 올바르게 호출된다", async () => {
			const handleBlur = jest.fn();
			const user = userEvent.setup();

			render(<Input onBlur={handleBlur} data-testid="input" />);
			const input = screen.getByTestId("input");

			await user.click(input);
			await user.tab();

			expect(handleBlur).toHaveBeenCalled();
		});

		it("onKeyDown 이벤트가 올바르게 호출된다", async () => {
			const handleKeyDown = jest.fn();
			const user = userEvent.setup();

			render(<Input onKeyDown={handleKeyDown} data-testid="input" />);
			const input = screen.getByTestId("input");

			await user.click(input);
			await user.keyboard("{Enter}");

			expect(handleKeyDown).toHaveBeenCalled();
		});

		it("onKeyUp 이벤트가 올바르게 호출된다", async () => {
			const handleKeyUp = jest.fn();
			const user = userEvent.setup();

			render(<Input onKeyUp={handleKeyUp} data-testid="input" />);
			const input = screen.getByTestId("input");

			await user.click(input);
			await user.keyboard("a");

			expect(handleKeyUp).toHaveBeenCalled();
		});
	});

	describe("number 타입 입력", () => {
		it("min 속성이 올바르게 설정된다", () => {
			render(<Input type="number" min={0} data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("min", "0");
		});

		it("max 속성이 올바르게 설정된다", () => {
			render(<Input type="number" max={100} data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("max", "100");
		});

		it("step 속성이 올바르게 설정된다", () => {
			render(<Input type="number" step={0.1} data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("step", "0.1");
		});
	});

	describe("파일 타입 입력", () => {
		it("accept 속성이 올바르게 설정된다", () => {
			render(<Input type="file" accept="image/*" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("accept", "image/*");
		});

		it("multiple 속성이 올바르게 설정된다", () => {
			render(<Input type="file" multiple data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("multiple");
		});
	});

	describe("접근성", () => {
		it("aria-label이 올바르게 설정된다", () => {
			render(<Input aria-label="사용자 이름 입력" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("aria-label", "사용자 이름 입력");
		});

		it("aria-describedby가 올바르게 설정된다", () => {
			render(
				<div>
					<Input aria-describedby="help-text" data-testid="input" />
					<div id="help-text">도움말 텍스트</div>
				</div>
			);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("aria-describedby", "help-text");
		});

		it("aria-invalid가 올바르게 설정된다", () => {
			render(<Input aria-invalid="true" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("aria-invalid", "true");
		});

		it("role 속성을 설정할 수 있다", () => {
			render(<Input role="searchbox" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("role", "searchbox");
		});
	});

	describe("폼 통합", () => {
		it("name 속성이 올바르게 설정된다", () => {
			render(<Input name="username" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("name", "username");
		});

		it("id 속성이 올바르게 설정된다", () => {
			render(<Input id="user-input" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("id", "user-input");
		});

		it("form 속성이 올바르게 설정된다", () => {
			render(<Input form="my-form" data-testid="input" />);
			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("form", "my-form");
		});
	});

	describe("다양한 사용 시나리오", () => {
		it("검색 입력으로 사용할 수 있다", () => {
			render(
				<Input
					type="search"
					placeholder="검색어를 입력하세요"
					role="searchbox"
					aria-label="사이트 검색"
					data-testid="search-input"
				/>
			);

			const input = screen.getByTestId("search-input");
			expect(input).toHaveAttribute("type", "search");
			expect(input).toHaveAttribute("role", "searchbox");
			expect(input).toHaveAttribute("placeholder", "검색어를 입력하세요");
		});

		it("비밀번호 입력으로 사용할 수 있다", () => {
			render(
				<Input
					type="password"
					placeholder="비밀번호를 입력하세요"
					minLength={8}
					required
					data-testid="password-input"
				/>
			);

			const input = screen.getByTestId("password-input");
			expect(input).toHaveAttribute("type", "password");
			expect(input).toHaveAttribute("minLength", "8");
			expect(input).toBeRequired();
		});

		it("이메일 입력으로 사용할 수 있다", () => {
			render(
				<Input
					type="email"
					placeholder="이메일을 입력하세요"
					autoComplete="email"
					pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
					data-testid="email-input"
				/>
			);

			const input = screen.getByTestId("email-input");
			expect(input).toHaveAttribute("type", "email");
			expect(input).toHaveAttribute("autoComplete", "email");
			expect(input).toHaveAttribute("pattern", "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$");
		});

		it("숫자 입력으로 사용할 수 있다", () => {
			render(
				<Input type="number" placeholder="나이를 입력하세요" min={0} max={120} step={1} data-testid="number-input" />
			);

			const input = screen.getByTestId("number-input");
			expect(input).toHaveAttribute("type", "number");
			expect(input).toHaveAttribute("min", "0");
			expect(input).toHaveAttribute("max", "120");
			expect(input).toHaveAttribute("step", "1");
		});
	});

	describe("상태 변화", () => {
		it("disabled 상태에서는 입력이 불가능하다", async () => {
			const user = userEvent.setup();
			render(<Input disabled data-testid="input" />);
			const input = screen.getByTestId("input");

			await user.type(input, "test");
			expect(input).toHaveValue("");
		});

		it("readOnly 상태에서는 입력이 불가능하다", async () => {
			const user = userEvent.setup();
			render(<Input readOnly value="readonly" data-testid="input" />);
			const input = screen.getByTestId("input");

			await user.type(input, "test");
			expect(input).toHaveValue("readonly");
		});

		it("제어 컴포넌트로 사용할 수 있다", async () => {
			const TestComponent = () => {
				const [value, setValue] = useState("");
				return <Input value={value} onChange={e => setValue(e.target.value)} data-testid="controlled-input" />;
			};

			const user = userEvent.setup();
			render(<TestComponent />);
			const input = screen.getByTestId("controlled-input");

			await user.type(input, "controlled");
			expect(input).toHaveValue("controlled");
		});

		it("비제어 컴포넌트로 사용할 수 있다", async () => {
			const user = userEvent.setup();
			render(<Input defaultValue="uncontrolled" data-testid="input" />);
			const input = screen.getByTestId("input");

			await user.clear(input);
			await user.type(input, "changed");
			expect(input).toHaveValue("changed");
		});
	});
});
