import type React from "react";
import Script from "next/script";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

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
				{/* Google Maps API는 앱 전체에서 한 번만 로드 */}
				<Script
					src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
					strategy="afterInteractive"
				/>
				{children}
			</body>
		</html>
	);
}
