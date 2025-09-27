import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
	// Disable React Strict Mode to avoid double mounting/logs in development
	reactStrictMode: false,
	webpack: config => {
		config.resolve.alias = {
			...config.resolve.alias,
			"@": path.resolve(__dirname),
		};
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "assets.example.com",
				port: "",
				pathname: "/account123/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "9988",
				pathname: "/**",
			},
			{
				protocol: "http",
				hostname: "myungjinki.com",
				port: "9988",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
