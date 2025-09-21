// jest.setup.ts
import "@testing-library/jest-dom";

// Simple and effective React.act setup for all environments
// This approach is recommended for React 18+ with RTL 13+
Object.defineProperty(global, "IS_REACT_ACT_ENVIRONMENT", {
	value: true,
	writable: true,
	configurable: true,
});

// Configure React Testing Library
import { configure } from "@testing-library/react";

configure({
	testIdAttribute: "data-testid",
});

// ResizeObserver mock for Radix UI components
global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));
