// __tests__/hooks/usePhotoManager.test.tsx
import { renderHook, act } from "@testing-library/react";
import { usePhotoManager } from "@/hooks/usePhotoManager";

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

describe("usePhotoManager", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should initialize with empty photos array", () => {
		const { result } = renderHook(() => usePhotoManager());

		expect(result.current.photos).toEqual([]);
	});

	it("should add photos when addPhotos is called", () => {
		const { result } = renderHook(() => usePhotoManager({ maxPhotos: 3 }));

		const mockFile = new File([""], "test.jpg", { type: "image/jpeg" });
		const mockFileList = {
			0: mockFile,
			length: 1,
			item: (index: number) => (index === 0 ? mockFile : null),
			[Symbol.iterator]: function* () {
				yield mockFile;
			},
		} as FileList;

		act(() => {
			result.current.addPhotos(mockFileList);
		});

		expect(result.current.photos).toHaveLength(1);
		expect(result.current.photos[0]).toEqual({
			id: "mock-uuid-123",
			file: mockFile,
			preview: "mock-object-url",
			description: "",
		});
	});

	it("should not exceed maxPhotos limit", () => {
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

		act(() => {
			result.current.addPhotos(mockFileList);
		});

		expect(result.current.photos).toHaveLength(2);
	});

	it("should remove photo by id", () => {
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
		act(() => {
			result.current.addPhotos(mockFileList);
		});

		expect(result.current.photos).toHaveLength(1);

		// Remove photo
		act(() => {
			result.current.removePhoto("mock-uuid-123");
		});

		expect(result.current.photos).toHaveLength(0);
		expect(URL.revokeObjectURL).toHaveBeenCalledWith("mock-object-url");
	});

	it("should update photo description", () => {
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
		act(() => {
			result.current.addPhotos(mockFileList);
		});

		// Update description
		act(() => {
			result.current.updateDescription("mock-uuid-123", "New description");
		});

		expect(result.current.photos[0].description).toBe("New description");
	});

	it("should filter non-image files", () => {
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

		act(() => {
			result.current.addPhotos(mockFileList);
		});

		expect(result.current.photos).toHaveLength(1);
		expect(result.current.photos[0].file).toBe(imageFile);
	});
});
