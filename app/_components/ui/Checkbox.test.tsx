import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Checkbox } from "@/app/_components/ui/Checkbox";

describe("Checkbox 컴포넌트", () => {
	describe("렌더링", () => {
		it("체크박스가 정상적으로 렌더링된다", () => {
			render(<Checkbox data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toBeInTheDocument();
		});

		it("button role을 가진다", () => {
			render(<Checkbox data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveAttribute("role", "checkbox");
		});

		it("data-slot 속성이 설정된다", () => {
			render(<Checkbox data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveAttribute("data-slot", "checkbox");
		});
	});

	describe("기본 스타일링", () => {
		it("기본 스타일 클래스가 적용된다", () => {
			render(<Checkbox data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");

			expect(checkbox).toHaveClass("peer");
			expect(checkbox).toHaveClass("border-input");
			expect(checkbox).toHaveClass("size-4");
			expect(checkbox).toHaveClass("shrink-0");
			expect(checkbox).toHaveClass("rounded-[4px]");
			expect(checkbox).toHaveClass("border");
			expect(checkbox).toHaveClass("shadow-xs");
			expect(checkbox).toHaveClass("transition-shadow");
			expect(checkbox).toHaveClass("outline-none");
		});

		it("포커스 스타일 클래스가 포함된다", () => {
			render(<Checkbox data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");

			expect(checkbox).toHaveClass("focus-visible:border-ring");
			expect(checkbox).toHaveClass("focus-visible:ring-ring/50");
			expect(checkbox).toHaveClass("focus-visible:ring-[3px]");
		});

		it("disabled 스타일 클래스가 포함된다", () => {
			render(<Checkbox data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");

			expect(checkbox).toHaveClass("disabled:cursor-not-allowed");
			expect(checkbox).toHaveClass("disabled:opacity-50");
		});

		it("체크 상태 스타일 클래스가 포함된다", () => {
			render(<Checkbox data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");

			expect(checkbox).toHaveClass("data-[state=checked]:bg-primary");
			expect(checkbox).toHaveClass("data-[state=checked]:text-primary-foreground");
			expect(checkbox).toHaveClass("data-[state=checked]:border-primary");
		});

		it("유효성 검사 오류 스타일 클래스가 포함된다", () => {
			render(<Checkbox data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");

			expect(checkbox).toHaveClass("aria-invalid:ring-destructive/20");
			expect(checkbox).toHaveClass("dark:aria-invalid:ring-destructive/40");
			expect(checkbox).toHaveClass("aria-invalid:border-destructive");
		});
	});

	describe("상태 관리", () => {
		it("체크되지 않은 상태로 시작한다", () => {
			render(<Checkbox data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveAttribute("data-state", "unchecked");
			expect(checkbox).toHaveAttribute("aria-checked", "false");
		});

		it("체크 상태로 초기화할 수 있다", () => {
			render(<Checkbox checked data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveAttribute("data-state", "checked");
			expect(checkbox).toHaveAttribute("aria-checked", "true");
		});

		it("defaultChecked로 초기 체크 상태를 설정할 수 있다", () => {
			render(<Checkbox defaultChecked data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveAttribute("data-state", "checked");
			expect(checkbox).toHaveAttribute("aria-checked", "true");
		});

		it("indeterminate 상태를 가질 수 있다", () => {
			render(<Checkbox checked="indeterminate" data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveAttribute("data-state", "indeterminate");
			expect(checkbox).toHaveAttribute("aria-checked", "mixed");
		});

		it("disabled 상태로 설정할 수 있다", () => {
			render(<Checkbox disabled data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toBeDisabled();
			expect(checkbox).toHaveAttribute("data-disabled", "");
		});
	});

	describe("사용자 상호작용", () => {
		it("클릭으로 체크 상태를 변경할 수 있다", async () => {
			const user = userEvent.setup();
			render(<Checkbox data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");

			expect(checkbox).toHaveAttribute("aria-checked", "false");

			await user.click(checkbox);
			expect(checkbox).toHaveAttribute("aria-checked", "true");

			await user.click(checkbox);
			expect(checkbox).toHaveAttribute("aria-checked", "false");
		});

		it("스페이스바로 체크 상태를 변경할 수 있다", async () => {
			const user = userEvent.setup();
			render(<Checkbox data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");

			checkbox.focus();
			expect(checkbox).toHaveAttribute("aria-checked", "false");

			await user.keyboard(" ");
			expect(checkbox).toHaveAttribute("aria-checked", "true");

			await user.keyboard(" ");
			expect(checkbox).toHaveAttribute("aria-checked", "false");
		});
		it("disabled 상태에서는 상호작용이 불가능하다", async () => {
			const user = userEvent.setup();
			render(<Checkbox disabled data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");

			expect(checkbox).toHaveAttribute("aria-checked", "false");

			await user.click(checkbox);
			expect(checkbox).toHaveAttribute("aria-checked", "false");
		});
	});

	describe("이벤트 처리", () => {
		it("onCheckedChange 이벤트가 올바르게 호출된다", async () => {
			const handleCheckedChange = jest.fn();
			const user = userEvent.setup();

			render(<Checkbox onCheckedChange={handleCheckedChange} data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");

			await user.click(checkbox);
			expect(handleCheckedChange).toHaveBeenCalledWith(true);

			await user.click(checkbox);
			expect(handleCheckedChange).toHaveBeenCalledWith(false);
		});

		it("onFocus 이벤트가 올바르게 호출된다", async () => {
			const handleFocus = jest.fn();
			const user = userEvent.setup();

			render(<Checkbox onFocus={handleFocus} data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");

			await user.click(checkbox);
			expect(handleFocus).toHaveBeenCalled();
		});

		it("onBlur 이벤트가 올바르게 호출된다", async () => {
			const handleBlur = jest.fn();
			const user = userEvent.setup();

			render(<Checkbox onBlur={handleBlur} data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");

			await user.click(checkbox);
			await user.tab();
			expect(handleBlur).toHaveBeenCalled();
		});
	});

	describe("속성 전달", () => {
		it("id 속성이 올바르게 설정된다", () => {
			render(<Checkbox id="terms-checkbox" data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveAttribute("id", "terms-checkbox");
		});
	});

	describe("CSS 클래스 커스터마이제이션", () => {
		it("추가 className이 적용된다", () => {
			render(<Checkbox className="custom-class" data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveClass("custom-class");
			expect(checkbox).toHaveClass("peer"); // 기본 클래스도 유지
		});

		it("기본 클래스를 오버라이드할 수 있다", () => {
			render(<Checkbox className="size-6 border-red-500" data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveClass("size-6");
			expect(checkbox).toHaveClass("border-red-500");
		});
	});

	describe("접근성", () => {
		it("aria-label이 올바르게 설정된다", () => {
			render(<Checkbox aria-label="이용약관 동의" data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveAttribute("aria-label", "이용약관 동의");
		});

		it("aria-labelledby가 올바르게 설정된다", () => {
			render(
				<div>
					<label id="terms-label">이용약관 동의</label>
					<Checkbox aria-labelledby="terms-label" data-testid="checkbox" />
				</div>
			);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveAttribute("aria-labelledby", "terms-label");
		});

		it("aria-describedby가 올바르게 설정된다", () => {
			render(
				<div>
					<Checkbox aria-describedby="terms-description" data-testid="checkbox" />
					<div id="terms-description">서비스 이용약관에 동의합니다</div>
				</div>
			);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveAttribute("aria-describedby", "terms-description");
		});

		it("aria-invalid가 올바르게 설정된다", () => {
			render(<Checkbox aria-invalid="true" data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveAttribute("aria-invalid", "true");
		});

		it("키보드로 접근할 수 있다", async () => {
			const user = userEvent.setup();
			render(
				<div>
					<button>이전 요소</button>
					<Checkbox data-testid="checkbox" />
					<button>다음 요소</button>
				</div>
			);

			await user.tab();
			await user.tab();

			const checkbox = screen.getByTestId("checkbox");
			expect(checkbox).toHaveFocus();
		});
	});

	describe("제어 및 비제어 모드", () => {
		it("제어 컴포넌트로 사용할 수 있다", async () => {
			const ControlledCheckbox = () => {
				const [checked, setChecked] = useState(false);
				const handleCheckedChange = (value: boolean | "indeterminate") => {
					if (typeof value === "boolean") {
						setChecked(value);
					}
				};
				return <Checkbox checked={checked} onCheckedChange={handleCheckedChange} data-testid="controlled-checkbox" />;
			};

			const user = userEvent.setup();
			render(<ControlledCheckbox />);
			const checkbox = screen.getByTestId("controlled-checkbox");

			expect(checkbox).toHaveAttribute("aria-checked", "false");

			await user.click(checkbox);
			expect(checkbox).toHaveAttribute("aria-checked", "true");
		});

		it("비제어 컴포넌트로 사용할 수 있다", async () => {
			const user = userEvent.setup();
			render(<Checkbox defaultChecked={false} data-testid="uncontrolled-checkbox" />);
			const checkbox = screen.getByTestId("uncontrolled-checkbox");

			expect(checkbox).toHaveAttribute("aria-checked", "false");

			await user.click(checkbox);
			expect(checkbox).toHaveAttribute("aria-checked", "true");
		});
	});

	describe("다양한 사용 시나리오", () => {
		it("약관 동의 체크박스로 사용할 수 있다", () => {
			render(
				<div>
					<Checkbox id="terms-agreement" aria-label="이용약관 동의" data-testid="terms-checkbox" />
					<label htmlFor="terms-agreement">이용약관에 동의합니다 (필수)</label>
				</div>
			);

			const checkbox = screen.getByTestId("terms-checkbox");
			expect(checkbox).toHaveAttribute("id", "terms-agreement");
			expect(screen.getByText("이용약관에 동의합니다 (필수)")).toBeInTheDocument();
		});

		it("설정 옵션 체크박스로 사용할 수 있다", () => {
			render(
				<div>
					<Checkbox
						id="notifications"
						name="settings"
						value="notifications"
						defaultChecked
						aria-describedby="notifications-desc"
						data-testid="notifications-checkbox"
					/>
					<label htmlFor="notifications">알림 받기</label>
					<div id="notifications-desc">새로운 소식과 업데이트를 이메일로 받아보세요</div>
				</div>
			);

			const checkbox = screen.getByTestId("notifications-checkbox");
			expect(checkbox).toHaveAttribute("aria-checked", "true");
			expect(checkbox).toHaveAttribute("aria-describedby", "notifications-desc");
		});

		it("할 일 목록 체크박스로 사용할 수 있다", async () => {
			const user = userEvent.setup();
			const handleToggle = jest.fn();

			render(
				<div>
					<Checkbox
						checked={false}
						onCheckedChange={handleToggle}
						aria-label="할 일 완료 표시"
						data-testid="todo-checkbox"
					/>
					<span>프로젝트 문서 작성</span>
				</div>
			);

			const checkbox = screen.getByTestId("todo-checkbox");
			await user.click(checkbox);

			expect(handleToggle).toHaveBeenCalledWith(true);
		});

		it("그룹 선택 체크박스로 사용할 수 있다", () => {
			render(
				<fieldset>
					<legend>관심 분야 선택</legend>
					<div>
						<Checkbox id="frontend" name="interests" value="frontend" />
						<label htmlFor="frontend">프론트엔드</label>
					</div>
					<div>
						<Checkbox id="backend" name="interests" value="backend" />
						<label htmlFor="backend">백엔드</label>
					</div>
					<div>
						<Checkbox id="mobile" name="interests" value="mobile" />
						<label htmlFor="mobile">모바일</label>
					</div>
				</fieldset>
			);

			expect(screen.getByText("관심 분야 선택")).toBeInTheDocument();
			expect(screen.getByLabelText("프론트엔드")).toBeInTheDocument();
			expect(screen.getByLabelText("백엔드")).toBeInTheDocument();
			expect(screen.getByLabelText("모바일")).toBeInTheDocument();
		});
	});

	describe("체크박스 기본 기능", () => {
		it("체크박스가 올바른 스타일을 가진다", () => {
			render(<Checkbox data-testid="checkbox" />);
			const checkbox = screen.getByTestId("checkbox");

			expect(checkbox).toHaveClass("peer");
			expect(checkbox).toHaveClass("border-input");
			expect(checkbox).toHaveClass("size-4");
		});
	});
});
