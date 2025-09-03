// __tests__/components/photo/PhotoUploader.test.tsx
import { render, screen } from "@testing-library/react";
import { PhotoUploader } from "@/app/_components/photo/PhotoUploader";

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => "mocked-url");
global.URL.revokeObjectURL = jest.fn();

// Mock crypto.randomUUID
Object.defineProperty(global, "crypto", {
	value: {
		randomUUID: jest.fn(() => "mocked-uuid"),
	},
});

describe("PhotoUploader", () => {
	const defaultProps = {
		onPhotosChange: jest.fn(),
		maxPhotos: 6,
		gridColumns: 3,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render with default props", () => {
		render(<PhotoUploader {...defaultProps} />);

		expect(screen.getByText("스팟 사진")).toBeInTheDocument();
		expect(screen.getByText("사진 추가")).toBeInTheDocument();
		expect(screen.getByText("스팟 사진을 추가하고 설명을 작성해주세요")).toBeInTheDocument();
	});

	it("should render with custom title and message", () => {
		render(<PhotoUploader {...defaultProps} title="커스텀 제목" emptyMessage="커스텀 메시지" />);

		expect(screen.getByText("커스텀 제목")).toBeInTheDocument();
		expect(screen.getByText("커스텀 메시지")).toBeInTheDocument();
	});

	it("should render file input with correct attributes", () => {
		render(<PhotoUploader {...defaultProps} />);

		const fileInput = screen.getByLabelText("사진 파일 선택");
		expect(fileInput).toHaveAttribute("type", "file");
		expect(fileInput).toHaveAttribute("accept", "image/*");
		expect(fileInput).toHaveAttribute("multiple");
	});

	it("should call onPhotosChange on mount", () => {
		render(<PhotoUploader {...defaultProps} />);

		expect(defaultProps.onPhotosChange).toHaveBeenCalledWith([]);
	});

	it("should render with custom grid columns", () => {
		const { container } = render(<PhotoUploader {...defaultProps} gridColumns={4} />);

		const gridContainer = container.querySelector(".grid-cols-4");
		expect(gridContainer).toBeInTheDocument();
	});
});
