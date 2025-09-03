"use client";

import { ArrowLeft, Menu, Search } from "lucide-react";
import { Button } from "@/app/_components/ui/Button";
import { Input } from "@/app/_components/ui/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
	const router = useRouter();

	const handleBackClick = () => {
		router.back();
	};

	return (
		<header className="bg-white border-b border-border sticky top-0 z-50">
			{/* First row: Back button, Logo, Menu */}
			<div className="flex items-center justify-between px-4 py-3">
				<Button variant="ghost" size="icon" className="text-muted-foreground" onClick={handleBackClick}>
					<ArrowLeft className="h-5 w-5" />
				</Button>

				<Link href="/" className="flex items-center gap-2">
					<span className="text-lg">🐾</span>
					<span className="text-lg font-bold text-primary">치카쿠</span>
					<span className="text-lg">🐾</span>
				</Link>

				<Link href="/menu">
					<Button variant="ghost" size="icon" className="text-muted-foreground">
						<Menu className="h-5 w-5" />
					</Button>
				</Link>
			</div>

			{/* Second row: Search bar */}
			<div className="px-4 pb-3">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input placeholder="키워드로 산책 코스를 찾아보세요" className="pl-10 bg-muted/50 border-0 rounded-full" />
				</div>
			</div>

			{/* Third row: Navigation buttons */}
			<div className="flex items-center justify-around px-4 pb-3">
				<Link href="/region">
					<Button variant="ghost" className="flex-1 text-sm font-medium">
						지역
					</Button>
				</Link>
				<Link href="/theme">
					<Button variant="ghost" className="flex-1 text-sm font-medium">
						테마
					</Button>
				</Link>
				<Link href="/cat-tower">
					<Button variant="ghost" className="flex-1 text-sm font-medium">
						캣타워
					</Button>
				</Link>
			</div>
		</header>
	);
}
