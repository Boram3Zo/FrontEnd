import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { Card } from "@/app/_components/ui/Card";

export default function CourseDetailLoading() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Header />

			<main className="pb-20">
				{/* Course Title and Location Skeleton */}
				<div className="bg-white px-4 py-4">
					<div className="flex items-center justify-between mb-2">
						<div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
						<div className="flex items-center gap-2">
							<div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
						</div>
					</div>

					<div className="flex items-center gap-1 mb-3">
						<div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
						<div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
					</div>

					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2">
							<div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
							<div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
						</div>
						<div className="flex items-center gap-2">
							<div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
							<div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
						</div>
					</div>
				</div>

				{/* Map and Route Visualization Skeleton */}
				<div className="px-4 py-4">
					<Card className="border border-gray-300 overflow-hidden">
						{/* Map Section */}
						<div className="bg-gray-200 h-32 animate-pulse"></div>
						{/* Photo Section */}
						<div className="bg-gray-100 h-48 animate-pulse"></div>
					</Card>
				</div>

				{/* Review and Description Skeleton */}
				<div className="px-4 py-4">
					<Card className="p-4 border border-gray-300">
						<div className="space-y-2 mb-4">
							<div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
							<div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
							<div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
							<div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
						</div>

						<div className="flex flex-wrap gap-2">
							<div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
							<div className="h-6 w-12 bg-gray-200 rounded animate-pulse"></div>
							<div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
						</div>
					</Card>
				</div>
			</main>

			<BottomNavigation />
		</div>
	);
}
