import { Card } from "@/components/ui/card"
import { Trophy, MapPin, Clock } from "lucide-react"

export function CatStats() {
  const stats = {
    totalCats: 45,
    totalBreeds: 12,
    recentDiscovery: "2시간 전",
    favoriteSpot: "한강공원",
  }

  return (
    <div className="px-4 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-500" />
        나의 고양이 컬렉션
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 text-center bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200">
          <div className="text-2xl font-bold text-orange-600 mb-1">{stats.totalCats}</div>
          <div className="text-xs text-gray-600">발견한 고양이</div>
        </Card>

        <Card className="p-4 text-center bg-gradient-to-br from-pink-100 to-rose-100 border-pink-200">
          <div className="text-2xl font-bold text-pink-600 mb-1">{stats.totalBreeds}</div>
          <div className="text-xs text-gray-600">고양이 품종</div>
        </Card>

        <Card className="p-4 text-center bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200">
          <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
          <div className="text-xs text-gray-600">최근 발견</div>
          <div className="text-sm font-medium text-blue-600">{stats.recentDiscovery}</div>
        </Card>

        <Card className="p-4 text-center bg-gradient-to-br from-green-100 to-emerald-100 border-green-200">
          <MapPin className="h-5 w-5 text-green-500 mx-auto mb-1" />
          <div className="text-xs text-gray-600">자주 만나는 곳</div>
          <div className="text-sm font-medium text-green-600">{stats.favoriteSpot}</div>
        </Card>
      </div>
    </div>
  )
}
