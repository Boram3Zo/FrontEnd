"use client"

import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Hash, Tag, Clock, Route, Camera } from "lucide-react"

export default function ShareCoursePage() {
  const themeEmojis = [
    { emoji: "🐱", label: "고양이" },
    { emoji: "🌸", label: "벚꽃" },
    { emoji: "🏠", label: "한옥" },
    { emoji: "🌊", label: "바다" },
    { emoji: "🌲", label: "숲길" },
    { emoji: "🌅", label: "일출" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20">
        {/* Search Section */}
        <div className="bg-white px-4 py-4">
          <div className="relative mb-4">
            <Input placeholder="산책 코스를 검색해보세요" className="pl-4 pr-10 bg-gray-100 border-0 rounded-lg" />
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <span className="text-gray-400">🔍</span>
            </Button>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
              <MapPin className="h-4 w-4" />
              지역
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
              <Hash className="h-4 w-4" />
              테마
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
              <Tag className="h-4 w-4" />
              캣타워
            </Button>
          </div>
        </div>

        {/* Walking Route Section */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">산책 루트</h2>
          </div>

          <Card className="bg-gray-200 h-32 flex items-center justify-center mb-4">
            <span className="text-gray-500">트래킹한 산책 루트가 표시됩니다</span>
          </Card>
        </div>

        {/* Course Details Section */}
        <div className="px-4 py-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3">게시글 제목</h3>
          <Input placeholder="산책 코스의 제목을 입력해주세요" className="mb-4" />

          <h3 className="text-base font-semibold text-gray-800 mb-3">산책 정보</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">소요 시간</span>
            </div>
            <div className="flex items-center gap-2">
              <Route className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">산책 거리</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <span className="text-lg font-semibold">45분</span>
            <span className="text-lg font-semibold">2.3km</span>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="h-5 w-5 text-gray-600" />
            <h3 className="text-base font-semibold text-gray-800">스팟 사진</h3>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {[1, 2, 3].map((index) => (
              <Card
                key={index}
                className="aspect-square bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center"
              >
                <Camera className="h-8 w-8 text-gray-400" />
              </Card>
            ))}
          </div>

          <p className="text-sm text-gray-500">스팟 사진에 대한 설명을 작성해주세요</p>
        </div>

        {/* Review Section */}
        <div className="px-4 py-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3">본문</h3>
          <Textarea placeholder="산책 코스에 대한 자세한 설명을 작성해주세요" className="min-h-24 mb-4" />
        </div>

        {/* Theme Selection */}
        <div className="px-4 py-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3">테마 선택</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {themeEmojis.map((theme, index) => (
              <Button key={index} variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                <span>{theme.emoji}</span>
                <span>{theme.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Hashtag Section */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="h-5 w-5 text-gray-600" />
            <h3 className="text-base font-semibold text-gray-800">해시태그</h3>
          </div>

          <Input placeholder="#해시태그를 입력해주세요" className="mb-3" />

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              #산책
            </Button>
            <Button variant="outline" size="sm">
              #고양이
            </Button>
            <Button variant="outline" size="sm">
              #힐링
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-4 py-6">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg">
            코스 공유하기
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
