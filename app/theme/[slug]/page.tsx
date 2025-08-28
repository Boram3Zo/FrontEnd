import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { CatCharacter } from "@/components/cat-character"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Course {
  id: string
  title: string
  description: string
  location: string
  duration: string
  distance: string
  difficulty: "쉬움" | "보통" | "어려움"
  participants: number
  rating: number
  tags: string[]
  image: string
  author: string
}

const THEME_COURSES: Record<string, Course[]> = {
  nature: [
    {
      id: "nature-1",
      title: "한강공원 숨은 길",
      description: "한강공원의 숨겨진 산책로를 따라 걷는 힐링 코스",
      location: "마포구 망원동",
      duration: "45분",
      distance: "2.1km",
      difficulty: "쉬움",
      participants: 128,
      rating: 4.8,
      tags: ["강변", "공원", "힐링"],
      image: "/nature-path.png",
      author: "자연러버",
    },
    {
      id: "nature-2",
      title: "남산 둘레길 탐방",
      description: "남산의 아름다운 자연을 만끽할 수 있는 코스",
      location: "중구 남산공원길",
      duration: "60분",
      distance: "3.2km",
      difficulty: "보통",
      participants: 89,
      rating: 4.7,
      tags: ["산", "전망", "자연"],
      image: "/mountain-trail.png",
      author: "산책왕",
    },
  ],
  history: [
    {
      id: "history-1",
      title: "북촌 한옥마을 둘러보기",
      description: "전통 한옥의 아름다움을 느낄 수 있는 문화 코스",
      location: "종로구 계동길",
      duration: "60분",
      distance: "1.8km",
      difficulty: "보통",
      participants: 156,
      rating: 4.9,
      tags: ["한옥", "전통", "문화"],
      image: "/historic-street.png",
      author: "역사탐험가",
    },
  ],
  cafe: [
    {
      id: "cafe-1",
      title: "홍대 숨은 카페 탐방",
      description: "홍대 골목 속 특별한 카페들을 찾아가는 여행",
      location: "마포구 홍익로",
      duration: "90분",
      distance: "2.5km",
      difficulty: "쉬움",
      participants: 203,
      rating: 4.6,
      tags: ["카페", "디저트", "힙스터"],
      image: "/cozy-cafe.png",
      author: "카페마니아",
    },
  ],
}

const THEME_INFO: Record<string, { name: string; emoji: string; color: string; description: string }> = {
  nature: {
    name: "자연 힐링",
    emoji: "🌳",
    color: "from-green-400 to-emerald-500",
    description: "도심 속 자연을 만나는 힐링 코스",
  },
  history: {
    name: "역사 탐방",
    emoji: "🏛️",
    color: "from-amber-400 to-orange-500",
    description: "서울의 역사와 문화를 느끼는 코스",
  },
  cafe: {
    name: "카페 투어",
    emoji: "☕",
    color: "from-orange-400 to-red-500",
    description: "특별한 카페들을 찾아가는 여행",
  },
}

type PageParams = Promise<{ slug: string }>

export default async function ThemeCoursesPage({ params }: { params: PageParams }) {
  const { slug } = await params
  const themeInfo = THEME_INFO[slug]
  const courses = THEME_COURSES[slug] || []

  if (!themeInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
        <Header />
        <main className="pb-20 px-4 py-8">
          <div className="text-center">
            <CatCharacter size="lg" animation="wiggle" />
            <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">테마를 찾을 수 없어요</h2>
            <p className="text-gray-600 mb-6">다른 테마를 둘러보시겠어요?</p>
            <Link href="/theme">
              <Button>테마 목록으로 돌아가기</Button>
            </Link>
          </div>
        </main>
        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Header />

      <main className="pb-20">
        {/* Theme header */}
        <div className={`bg-gradient-to-r ${themeInfo.color} text-white`}>
          <div className="px-4 py-6">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/theme">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <span className="text-sm text-white/90">테마별 코스</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{themeInfo.emoji}</span>
              <div>
                <h1 className="text-2xl font-bold">{themeInfo.name}</h1>
                <p className="text-white/90">{themeInfo.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-white/90">{courses.length}개의 코스</span>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm">평균 4.7점</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course list */}
        <div className="px-4 py-6">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <CatCharacter size="lg" animation="wiggle" />
              <h3 className="text-lg font-bold text-gray-800 mt-4 mb-2">아직 코스가 없어요</h3>
              <p className="text-gray-600 mb-6">첫 번째 코스를 만들어보시겠어요?</p>
              <Button>코스 만들기</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex">
                    <div className="w-24 h-24 bg-gray-200 overflow-hidden">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-800 text-lg">{course.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-orange-600">
                          <Star className="h-4 w-4 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>

                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{course.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{course.participants}명</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {course.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <Link href={`/course/${course.id}`}>
                          <Button size="sm" className="bg-gray-800 hover:bg-gray-900 text-white">
                            자세히 보기
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
