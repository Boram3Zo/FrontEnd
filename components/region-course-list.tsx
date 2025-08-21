"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users } from "lucide-react"
import { useRouter } from "next/navigation"

interface CourseSpot {
  id: string
  name: string
  image: string
  comment: string
}

interface Course {
  id: string
  title: string
  location: string
  duration: string
  distance: string
  difficulty: "쉬움" | "보통" | "어려움"
  participants: number
  rating: number
  spots: CourseSpot[]
}

const SAMPLE_COURSES: Course[] = [
  {
    id: "1",
    title: "oo의 산책길",
    location: "서울 강남구 압구정로 14-2",
    duration: "n분",
    distance: "1.2km",
    difficulty: "쉬움",
    participants: 24,
    rating: 4.8,
    spots: [
      {
        id: "spot1",
        name: "제목",
        image: "/sunny-city-park.png",
        comment: "달달한 약수 맛집_최고의 약수터!",
      },
      {
        id: "spot2",
        name: "지도",
        image: "/quiet-city-street.png",
        comment: "숨겨진 골목길의 아름다운 풍경",
      },
    ],
  },
  {
    id: "2",
    title: "북촌 한옥마을 둘러보기",
    location: "서울 종로구 계동길 37",
    duration: "45분",
    distance: "2.1km",
    difficulty: "보통",
    participants: 156,
    rating: 4.9,
    spots: [
      {
        id: "spot3",
        name: "한옥카페",
        image: "/traditional-house.png",
        comment: "전통과 현대가 만나는 특별한 공간",
      },
    ],
  },
]

export function RegionCourseList() {
  const router = useRouter()

  const handleViewMoreCourses = () => {
    router.push("/region/courses")
  }

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">이 지역의 산책 코스</h2>
        <span className="text-sm text-gray-500">{SAMPLE_COURSES.length}개 코스</span>
      </div>

      <div className="space-y-4">
        {SAMPLE_COURSES.map((course) => (
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
                      ⭐ {course.rating} • {course.difficulty}
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
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{course.participants}명</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700">{course.spots[0]?.comment || "특별한 산책 경험을 만나보세요"}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load more button */}
      <div className="text-center mt-6">
        <Button variant="outline" className="px-8 bg-transparent" onClick={handleViewMoreCourses}>
          더 많은 코스 보기
        </Button>
      </div>
    </div>
  )
}
