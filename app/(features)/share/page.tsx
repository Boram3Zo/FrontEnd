"use client";

import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { ShareForm } from "@/app/_components/share/ShareForm";

export default function ShareCoursePage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<ShareForm />
			<BottomNavigation />
		</div>
	);
}
