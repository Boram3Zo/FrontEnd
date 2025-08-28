"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface CourseSpot {
  id: string
  name: string
  image: string
}

interface Course {
  id: string
  title: string
  location: string
  duration: string
  distance: string
  spots: CourseSpot[]
}

const ALL_COURSES: Course[] = [
  {
    id: "1",
    title: "oo의 산책길",
    location: "강남구 압구정로 14-2",
    duration: "n분",
    distance: "1.2km",
    spots: [
      {
        id: "spot1",
        name: "제목",
        image: "/sunny-city-park.png",
      },
      {
        id: "spot2",
        name: "지도",
        image: "/quiet-city-street.png",
      },
    ],
  },
  {
    id: "2",
    title: "북촌 한옥마을 둘러보기",
    location: "종로구 계동길 37",
    duration: "45분",
    distance: "2.1km",
    spots: [
      {
        id: "spot3",
        name: "한옥카페",
        image: "/traditional-house.png",
      },
    ],
  },
  {
    id: "3",
    title: "한강 야경 산책로",
    location: "마포구 여의도동",
    duration: "60분",
    distance: "3.5km",
    spots: [
      {
        id: "spot4",
        name: "한강공원",
        image: "/sunny-city-park.png",
      },
    ],
  },
  {
    id: "4",
    title: "경복궁 주변 역사 탐방",
    location: "종로구 사직로 161",
    duration: "90분",
    distance: "2.8km",
    spots: [
      {
        id: "spot5",
        name: "경복궁",
        image: "/traditional-house.png",
      },
    ],
  },
  {
    id: "5",
    title: "홍대 문화거리 탐방",
    location: "마포구 와우산로",
    duration: "75분",
    distance: "2.3km",
    spots: [
      {
        id: "spot6",
        name: "홍대거리",
        image: "/quiet-city-street.png",
      },
    ],
  },
]

export default function AllCoursesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">이 지역의 산책 코스</h1>
            <p className="text-sm text-gray-500">{ALL_COURSES.length}개의 코스</p>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="px-4 py-6">
        <div className="space-y-4">
          {ALL_COURSES.map((course) => (
            <Card key={course.id} className="p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                {/* Course image on the left */}
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  {course.spots[0]?.image ? (
                    <img
                      src={course.spots[0].image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                </div>

                {/* Course information on the right */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">{course.title}</h3>
                    <div className="text-right">
                      <div className="text-sm font-medium text-orange-600 flex items-center gap-1">
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="h-3 w-3" />
                      <span>{course.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{course.duration}</span>
                      </div>
                      <span>거리: {course.distance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
