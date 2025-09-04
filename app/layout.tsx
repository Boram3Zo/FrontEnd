import type React from "react";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { GoogleMapsProvider } from "./_providers";

const notoSansKR = Noto_Sans_KR({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	display: "swap",
	variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
	title: "치카쿠 - 숨겨진 골목길 산책",
	description: "나만 알고 있는 숨겨진 골목길 산책 코스를 기록하고 공유하세요",
	generator: "v0.app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko" className={notoSansKR.variable}>
			<body className="font-sans antialiased">
				<GoogleMapsProvider>{children}</GoogleMapsProvider>
			</body>
		</html>
	);
}
