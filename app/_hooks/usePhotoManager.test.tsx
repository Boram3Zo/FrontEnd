// __tests__/hooks/usePhotoManager.test.tsx
import { renderHook, act } from "@testing-library/react";
import { usePhotoManager } from "@/app/_hooks/usePhotoManager";

// Mock console.error to suppress EXIF warnings
const originalError = console.error;
beforeAll(() => {
	console.error = jest.fn();
});

afterAll(() => {
	console.error = originalError;
});

// Mock photoUtils to avoid EXIF issues
jest.mock("@/app/_libs/photoUtils", () => ({
	filterImageFiles: jest.fn((files: FileList) => Array.from(files).filter(file => file.type.startsWith("image/"))),
	createPhotoFromFile: jest.fn(async (file: File) => ({
		id: "mock-uuid-123",
		file,
		preview: "mock-object-url",
		title: "",
		description: "",
	})),
	createPhotoFromFileSync: jest.fn((file: File) => ({
		id: "mock-uuid-123",
		file,
		preview: "mock-object-url",
		title: "",
		description: "",
	})),
	revokePhotoPreview: jest.fn(),
	findPhotoById: jest.fn((photos: Array<{ id: string }>, id: string) => photos.find(p => p.id === id)),
}));

// Mock crypto.randomUUID
Object.defineProperty(globalThis, "crypto", {
	value: {
		randomUUID: jest.fn(() => "mock-uuid-123"),
	},
});

// Mock URL.createObjectURL and URL.revokeObjectURL
Object.defineProperty(globalThis, "URL", {
	value: {
		createObjectURL: jest.fn(() => "mock-object-url"),
		revokeObjectURL: jest.fn(),
	},
});

// Import the mocked photoUtils
import * as photoUtils from "@/app/_libs/photoUtils";

describe("usePhotoManager", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should initialize with empty photos array", () => {
		const { result } = renderHook(() => usePhotoManager());

		expect(result.current.photos).toEqual([]);
	});

	it("should add photos when addPhotos is called", async () => {
		const { result } = renderHook(() => usePhotoManager({ maxPhotos: 3 }));

		const mockFile = new File(["test content"], "test.jpg", { type: "image/jpeg" });
		const mockFileList = {
			0: mockFile,
			length: 1,
			item: (index: number) => (index === 0 ? mockFile : null),
			[Symbol.iterator]: function* () {
				yield mockFile;
			},
		} as FileList;

		await act(async () => {
			await result.current.addPhotos(mockFileList);
		});

		expect(result.current.photos).toHaveLength(1);
		expect(result.current.photos[0]).toEqual({
			id: "mock-uuid-123",
			file: mockFile,
			preview: "mock-object-url",
			title: "",
			description: "",
		});
	});

	it("should not exceed maxPhotos limit", async () => {
		const { result } = renderHook(() => usePhotoManager({ maxPhotos: 2 }));

		const mockFiles = [
			new File([""], "test1.jpg", { type: "image/jpeg" }),
			new File([""], "test2.jpg", { type: "image/jpeg" }),
			new File([""], "test3.jpg", { type: "image/jpeg" }),
		];

		const mockFileList = {
			0: mockFiles[0],
			1: mockFiles[1],
			2: mockFiles[2],
			length: 3,
			item: (index: number) => mockFiles[index] || null,
			[Symbol.iterator]: function* () {
				for (const file of mockFiles) {
					yield file;
				}
			},
		} as FileList;

		await act(async () => {
			await result.current.addPhotos(mockFileList);
		});

		expect(result.current.photos).toHaveLength(2);
	});

	it("should remove photo by id", async () => {
		const { result } = renderHook(() => usePhotoManager());

		const mockFile = new File([""], "test.jpg", { type: "image/jpeg" });
		const mockFileList = {
			0: mockFile,
			length: 1,
			item: (index: number) => (index === 0 ? mockFile : null),
			[Symbol.iterator]: function* () {
				yield mockFile;
			},
		} as FileList;

		// Add photo first
		await act(async () => {
			await result.current.addPhotos(mockFileList);
		});

		expect(result.current.photos).toHaveLength(1);

		// Remove photo
		act(() => {
			result.current.removePhoto("mock-uuid-123");
		});

		expect(result.current.photos).toHaveLength(0);
		expect(photoUtils.revokePhotoPreview).toHaveBeenCalled();
	});

	it("should update photo description", async () => {
		const { result } = renderHook(() => usePhotoManager());

		const mockFile = new File([""], "test.jpg", { type: "image/jpeg" });
		const mockFileList = {
			0: mockFile,
			length: 1,
			item: (index: number) => (index === 0 ? mockFile : null),
			[Symbol.iterator]: function* () {
				yield mockFile;
			},
		} as FileList;

		// Add photo first
		await act(async () => {
			await result.current.addPhotos(mockFileList);
		});

		// Update description
		act(() => {
			result.current.updateDescription("mock-uuid-123", "New description");
		});

		expect(result.current.photos[0].description).toBe("New description");
	});

	it("should filter non-image files", async () => {
		const { result } = renderHook(() => usePhotoManager());

		const imageFile = new File([""], "image.jpg", { type: "image/jpeg" });
		const textFile = new File([""], "document.txt", { type: "text/plain" });

		const mockFileList = {
			0: imageFile,
			1: textFile,
			length: 2,
			item: (index: number) => [imageFile, textFile][index] || null,
			[Symbol.iterator]: function* () {
				yield imageFile;
				yield textFile;
			},
		} as FileList;

		await act(async () => {
			await result.current.addPhotos(mockFileList);
		});

		expect(result.current.photos).toHaveLength(1);
		expect(result.current.photos[0].file).toBe(imageFile);
	});
});
