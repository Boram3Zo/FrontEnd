// jest.setup.ts
import "@testing-library/jest-dom";

// ResizeObserver mock for Radix UI components
global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));
