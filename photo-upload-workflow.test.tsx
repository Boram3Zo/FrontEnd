// __tests__/integration/photo-upload-workflow.test.tsx
import { render, screen } from "@testing-library/react";
import { PhotoUploader } from "@/components/photo/PhotoUploader";

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => "mocked-url");
global.URL.revokeObjectURL = jest.fn();

// Mock crypto.randomUUID with incrementing values
let uuidCounter = 0;
Object.defineProperty(global, "crypto", {
	value: {
		randomUUID: jest.fn(() => `mocked-uuid-${++uuidCounter}`),
	},
});

describe("Photo Upload Workflow Integration", () => {
	const mockOnPhotosChange = jest.fn();
	const defaultProps = {
		onPhotosChange: mockOnPhotosChange,
		maxPhotos: 3,
		gridColumns: 3,
	};

	beforeEach(() => {
		jest.clearAllMocks();
		uuidCounter = 0; // Reset counter
	});

	it("should render PhotoUploader component", () => {
		render(<PhotoUploader {...defaultProps} />);

		expect(screen.getByText("스팟 사진")).toBeInTheDocument();
		expect(screen.getByText("사진 추가")).toBeInTheDocument();
		expect(screen.getByText("스팟 사진을 추가하고 설명을 작성해주세요")).toBeInTheDocument();
	});

	it("should render with custom props", () => {
		render(<PhotoUploader {...defaultProps} title="커스텀 제목" emptyMessage="커스텀 빈 상태 메시지" />);

		expect(screen.getByText("커스텀 제목")).toBeInTheDocument();
		expect(screen.getByText("커스텀 빈 상태 메시지")).toBeInTheDocument();
	});

	it("should have file input with correct attributes", () => {
		render(<PhotoUploader {...defaultProps} />);

		const fileInput = screen.getByLabelText("사진 파일 선택");
		expect(fileInput).toHaveAttribute("type", "file");
		expect(fileInput).toHaveAttribute("accept", "image/*");
		expect(fileInput).toHaveAttribute("multiple");
	});

	it("should render grid with correct columns", () => {
		const { container } = render(<PhotoUploader {...defaultProps} gridColumns={4} />);

		const gridContainer = container.querySelector(".grid-cols-4");
		expect(gridContainer).toBeInTheDocument();
	});

	it("should call onPhotosChange on mount", () => {
		render(<PhotoUploader {...defaultProps} />);

		// Should be called at least once on mount with empty array
		expect(mockOnPhotosChange).toHaveBeenCalledWith([]);
	});
});
