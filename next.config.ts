import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
