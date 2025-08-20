import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users, ChevronRight } from "lucide-react"

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
  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">이 지역의 산책 코스</h2>
        <span className="text-sm text-gray-500">{SAMPLE_COURSES.length}개 코스</span>
      </div>

      <div className="space-y-4">
        {SAMPLE_COURSES.map((course) => (
          <Card key={course.id} className="p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
            {/* Course header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">{course.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{course.location}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>소요시간: {course.duration}</span>
                  </div>
                  <span>거리: {course.distance}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-orange-600">⭐ {course.rating}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {course.participants}명
                </div>
              </div>
            </div>

            {/* Course spots preview */}
            <div className="border rounded-lg p-3 mb-3">
              <div className="space-y-3">
                {course.spots.map((spot, index) => (
                  <div key={spot.id} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {index < course.spots.length - 1 && (
                      <div className="absolute left-[21px] mt-3 w-0.5 h-6 bg-blue-300"></div>
                    )}
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded p-2 text-center text-sm text-gray-600">{spot.name}</div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded p-2 text-center text-sm text-gray-500">지도</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded text-center">
                <div className="text-sm text-gray-600 mb-2">사진( 텍스트첨부)</div>
                <div className="bg-white rounded p-4 text-sm text-gray-700 border-2 border-dashed border-gray-300">
                  "{course.spots[0]?.comment || "특별한 산책 경험을 만나보세요"}"
                </div>
              </div>
            </div>

            {/* Action button */}
            <Button className="w-full justify-between bg-gray-100 hover:bg-gray-200 text-gray-800">
              <span>사진( 텍스트첨부)</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>

      {/* Load more button */}
      <div className="text-center mt-6">
        <Button variant="outline" className="px-8 bg-transparent">
          더 많은 코스 보기
        </Button>
      </div>
    </div>
  )
}
