import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Clock, Star, TrendingUp } from "lucide-react"

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <Header />

      <main className="pb-20 px-4">
        {/* Search Header */}
        <div className="py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">산책 코스 검색 🔍</h1>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="지역, 테마, 키워드로 검색해보세요"
              className="pl-10 py-3 text-base rounded-xl border-2 border-gray-200 focus:border-orange-400"
            />
          </div>
        </div>

        {/* Popular Keywords */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            인기 검색어
          </h2>
          <div className="flex flex-wrap gap-2">
            {["한강공원", "북촌", "홍대", "강남", "여의도", "성수동"].map((keyword) => (
              <Button
                key={keyword}
                variant="outline"
                size="sm"
                className="rounded-full bg-white hover:bg-orange-50 hover:border-orange-300"
              >
                {keyword}
              </Button>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">최근 검색</h2>
          <div className="space-y-2">
            {[
              { keyword: "한강공원 산책로", time: "2시간 전" },
              { keyword: "북촌 골목길", time: "1일 전" },
              { keyword: "성수동 카페거리", time: "3일 전" },
            ].map((item, index) => (
              <Card key={index} className="p-3 bg-white hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{item.keyword}</span>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">추천 코스</h2>
          <div className="space-y-3">
            {[
              {
                title: "한강공원 벚꽃길",
                location: "영등포구",
                distance: "1.5km",
                time: "30분",
                rating: 4.8,
                image: "🌸",
              },
              {
                title: "북촌 한옥마을 탐방",
                location: "종로구",
                distance: "0.8km",
                time: "25분",
                rating: 4.9,
                image: "🏛️",
              },
              {
                title: "성수동 카페거리",
                location: "성동구",
                distance: "1.2km",
                time: "35분",
                rating: 4.7,
                image: "☕",
              },
            ].map((course, index) => (
              <Card key={index} className="p-4 bg-white hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-orange-400 rounded-lg flex items-center justify-center text-xl">
                    {course.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{course.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{course.location}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>
                        {course.distance} • {course.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-medium text-orange-600">
                      <Star className="h-4 w-4 fill-current" />
                      {course.rating}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
