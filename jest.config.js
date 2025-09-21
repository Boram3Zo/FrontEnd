// jest.config.js
const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files
	dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	// Add more setup options before each test is run
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	// React 19 and Vercel compatibility
	testEnvironmentOptions: {
		customExportConditions: [""],
		url: "http://localhost",
	},
	// Global setup for React.act compatibility
	globals: {
		"ts-jest": {
			tsconfig: {
				jsx: "react-jsx",
			},
		},
	},
	// Transform configuration for better React 19 support
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
	},
	// Module file extensions
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	// Test file patterns - looks for test files alongside source files and in scripts folder
	testMatch: [
		"**/__tests__/**/*.(js|jsx|ts|tsx)",
		"**/*.(test|spec).(js|jsx|ts|tsx)",
		"scripts/**/*.(test|spec).(js|ts)",
	],
	moduleNameMapper: {
		// Handle module aliases (this will be automatically configured for you based on your tsconfig.json paths)
		"^@/(.*)$": "<rootDir>/$1",
	},
	testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
	collectCoverageFrom: [
		"components/**/*.{js,jsx,ts,tsx}",
		"hooks/**/*.{js,jsx,ts,tsx}",
		"lib/**/*.{js,jsx,ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
	],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
