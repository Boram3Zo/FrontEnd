// jest.setup.ts
import "@testing-library/jest-dom";

// Configure React Testing Library to work with React 19
import { configure } from "@testing-library/react";

// Configure testing library
configure({
	testIdAttribute: "data-testid",
	// Disable automatic cleanup if needed
	// asyncUtilTimeout: 1000,
});

// ResizeObserver mock for Radix UI components
global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));
