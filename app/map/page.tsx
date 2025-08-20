import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Layers, Filter } from "lucide-react"

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        {/* Map Controls */}
        <div className="absolute top-20 left-4 right-4 z-10 flex justify-between items-start">
          <div className="space-y-2">
            <Button size="sm" className="bg-white text-gray-700 shadow-lg hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              필터
            </Button>
            <Button size="sm" className="bg-white text-gray-700 shadow-lg hover:bg-gray-50">
              <Layers className="h-4 w-4 mr-2" />
              레이어
            </Button>
          </div>

          <Button size="sm" className="bg-orange-500 text-white shadow-lg hover:bg-orange-600">
            <Navigation className="h-4 w-4 mr-2" />내 위치
          </Button>
        </div>

        {/* Map Container */}
        <div className="h-[calc(100vh-140px)] bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 relative overflow-hidden">
          {/* Simulated Map */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h2 className="text-xl font-bold text-gray-700 mb-2">지도 로딩 중...</h2>
              <p className="text-gray-600">실제 앱에서는 여기에 지도가 표시됩니다</p>
            </div>
          </div>

          {/* Map Markers */}
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-300">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom Sheet */}
        <div className="absolute bottom-20 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-4 max-h-48 overflow-y-auto">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>

          <h3 className="text-lg font-bold text-gray-800 mb-3">근처 산책 코스</h3>

          <div className="space-y-3">
            {[
              {
                title: "한강공원 러닝코스",
                distance: "500m",
                time: "15분",
                difficulty: "쉬움",
                color: "bg-green-500",
              },
              {
                title: "여의도 벚꽃길",
                distance: "1.2km",
                time: "25분",
                difficulty: "보통",
                color: "bg-pink-500",
              },
              {
                title: "반포 한강공원",
                distance: "800m",
                time: "20분",
                difficulty: "쉬움",
                color: "bg-blue-500",
              },
            ].map((course, index) => (
              <Card key={index} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${course.color} rounded-full`}></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-sm">{course.title}</h4>
                    <p className="text-xs text-gray-600">
                      {course.distance} • {course.time} • {course.difficulty}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    보기
                  </Button>
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
