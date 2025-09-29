import { Card } from "@/app/_components/ui/Card";
import { Trophy, MapPin, Clock, Search, Cat } from "lucide-react";

export function CatStats() {
	const stats = {
		discoveredCats: 13, // Actual number of discovered cats
		remainingCats: 9, // total - discovered = remaining
		recentDiscovery: "2024.01.15", // Most recent discovery date from the data
		recentSpot: "한강공원", // Most frequent discovery location
	};

	return (
		<div className="px-4 mb-6">
			<h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
				<Trophy className="h-5 w-5 text-yellow-500" />
				나의 고양이 컬렉션
			</h3>

			<div className="grid grid-cols-2 gap-3">
				<Card className="p-4 text-center bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200">
					<Cat className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
					<div className="text-2xl font-bold text-orange-600 mb-1">{stats.discoveredCats}</div>
					<div className="text-xs text-gray-600">발견한 고양이</div>
				</Card>

				<Card className="p-4 text-center bg-gradient-to-br from-pink-100 to-rose-100 border-pink-200">
					<Search className="h-5 w-5 text-pink-500 mx-auto mb-1" />
					<div className="text-2xl font-bold text-rose-600 mb-1">{stats.remainingCats}</div>
					<div className="text-xs text-gray-600">남은 고양이</div>
				</Card>

				<Card className="p-4 text-center bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200">
					<Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
					<div className="text-xs text-gray-600">최근 발견</div>
					<div className="text-sm font-medium text-blue-600">{stats.recentDiscovery}</div>
				</Card>

				<Card className="p-4 text-center bg-gradient-to-br from-green-100 to-emerald-100 border-green-200">
					<MapPin className="h-5 w-5 text-green-500 mx-auto mb-1" />
					<div className="text-xs text-gray-600">최근 만난 곳</div>
					<div className="text-sm font-medium text-green-600">{stats.recentSpot}</div>
				</Card>
			</div>
		</div>
	);
}
