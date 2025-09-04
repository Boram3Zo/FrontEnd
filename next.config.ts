import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
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
		],
	},
};

export default nextConfig;
