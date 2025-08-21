"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share, Save, Trophy, MapPin, Clock, Route, Camera, X } from "lucide-react"
import { useRouter } from "next/navigation"

import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

interface WalkingSession {
  id: string
  startTime: Date
  endTime?: Date
  duration: number
  distance: number
  route: { lat: number; lng: number; timestamp: Date }[]
}

interface WalkingSummaryProps {
  session: WalkingSession
  onClose: () => void
}

export function WalkingSummary({ session, onClose }: WalkingSummaryProps) {
  const [showShareForm, setShowShareForm] = useState(false)
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [hashtags, setHashtags] = useState<string[]>(["#산책", "#고양이", "#힐링"])
  const [hashtagInput, setHashtagInput] = useState("")
  const router = useRouter()

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}시간 ${minutes}분 ${secs}초`
    }
    return `${minutes}분 ${secs}초`
  }

  const formatDistance = (km: number) => {
    if (km < 1) {
      return `${Math.round(km * 1000)}m`
    }
    return `${km.toFixed(2)}km`
  }

  const calculatePace = () => {
    if (session.distance === 0) return "0'00\""
    const paceMinutes = session.duration / 60 / session.distance
    const minutes = Math.floor(paceMinutes)
    const seconds = Math.round((paceMinutes - minutes) * 60)
    return `${minutes}'${seconds.toString().padStart(2, "0")}"`
  }

  const handleThemeSelect = (themeText: string) => {
    if (selectedThemes.includes(themeText)) {
      setSelectedThemes(selectedThemes.filter((theme) => theme !== themeText))
    } else if (selectedThemes.length < 2) {
      setSelectedThemes([...selectedThemes, themeText])
    }
  }

  const handleHashtagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && hashtagInput.trim()) {
      const newTag = hashtagInput.trim().startsWith("#") ? hashtagInput.trim() : `#${hashtagInput.trim()}`
      if (!hashtags.includes(newTag)) {
        setHashtags([...hashtags, newTag])
      }
      setHashtagInput("")
    }
  }

  const removeHashtag = (tagToRemove: string) => {
    alert('here');
    setHashtags(hashtags.filter((tag) => tag !== tagToRemove))
  }

  if (showShareForm) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <div className="px-4 py-4 pb-20">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-gray-600" />
              <h3 className="font-medium text-gray-800">산책 루트</h3>
            </div>
            <Card className="p-6 bg-gray-50">
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <MapPin className="h-8 w-8 mb-2" />
                <p className="text-sm">트래킹한 산책 루트가 표시됩니다</p>
              </div>
            </Card>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-3">게시글 제목</h3>
            <input
              type="text"
              placeholder="산책 코스의 제목을 입력해주세요"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-3">산책 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">소요 시간</span>
                <span className="font-medium">{formatTime(session.duration)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Route className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">산책 거리</span>
                <span className="font-medium">{formatDistance(session.distance)}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Camera className="h-5 w-5 text-gray-600" />
              <h3 className="font-medium text-gray-800">스팟 사진</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
                >
                  <Camera className="h-6 w-6 text-gray-400" />
                </div>
              ))}
            </div>
            <br />
            <textarea
              placeholder="스팟 사진에 대한 설명을 작성해주세요"
              rows={4}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-3">본문</h3>
            <textarea
              placeholder="산책 코스에 대한 자세한 설명을 작성해주세요"
              rows={4}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Camera className="h-5 w-5 text-gray-600" />
              <h3 className="font-medium text-gray-800">테마 선택 (최대 2개)</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                { emoji: "🐱", text: "고양이" },
                { emoji: "🏠", text: "한옥" },
                { emoji: "🌊", text: "바다" },
                { emoji: "🌲", text: "숲길" },
                { emoji: "🌅", text: "일출" },
              ].map((theme) => (
                <Badge
                  key={theme.text}
                  variant={selectedThemes.includes(theme.text) ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-1 ${
                    selectedThemes.includes(theme.text)
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "hover:bg-orange-50"
                  } ${
                    !selectedThemes.includes(theme.text) && selectedThemes.length >= 2
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handleThemeSelect(theme.text)}
                >
                  {theme.emoji} {theme.text}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-medium text-gray-800 mb-3"># 해시태그</h3>
            <input
              type="text"
              placeholder="#해시태그를 입력하고 엔터를 눌러주세요"
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              onKeyPress={handleHashtagKeyPress}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {hashtags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs flex items-center gap-1 cursor-pointer hover:bg-gray-200"
                >
                  {tag}
                  <X className="h-3 w-3" onClick={() => removeHashtag(tag)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => router.push("/course/1")}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-medium rounded-xl"
            >
              게시글 등록
            </Button>
          </div>
        </div>

        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Header />

      <div className="px-4 py-6 pb-20">
        {/* Celebration header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">산책 완료!</h1>
          <p className="text-gray-600">수고하셨어요! 멋진 산책이었네요</p>
        </div>

        {/* Main stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center bg-white shadow-lg">
            <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-800 mb-1">{formatTime(session.duration)}</div>
            <div className="text-xs text-gray-600">총 시간</div>
          </Card>

          <Card className="p-4 text-center bg-white shadow-lg">
            <Route className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-800 mb-1">{formatDistance(session.distance)}</div>
            <div className="text-xs text-gray-600">총 거리</div>
          </Card>

          <Card className="p-4 text-center bg-white shadow-lg">
            <Trophy className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-800 mb-1">{calculatePace()}</div>
            <div className="text-xs text-gray-600">평균 페이스</div>
          </Card>
        </div>

        {/* Route map */}
        <Card className="mb-6 overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              내가 걸은 경로
            </h3>
          </div>
          <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 relative">
            <svg viewBox="0 0 400 150" className="w-full h-full">
              {/* Background */}
              <rect x="0" y="0" width="400" height="150" fill="url(#summaryMapGradient)" />
              <defs>
                <linearGradient id="summaryMapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dcfce7" />
                  <stop offset="100%" stopColor="#dbeafe" />
                </linearGradient>
              </defs>

              {/* Completed route */}
              <path
                d="M 50 100 Q 120 80 200 90 Q 280 100 350 80"
                stroke="#22c55e"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />

              {/* Start point */}
              <circle cx="50" cy="100" r="8" fill="#22c55e" stroke="white" strokeWidth="3" />
              <text x="50" y="125" textAnchor="middle" className="text-xs fill-gray-700 font-medium">
                시작
              </text>

              {/* End point */}
              <circle cx="350" cy="80" r="8" fill="#ef4444" stroke="white" strokeWidth="3" />
              <text x="350" y="105" textAnchor="middle" className="text-xs fill-gray-700 font-medium">
                도착
              </text>
            </svg>
          </div>
        </Card>

        {/* Additional stats */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">상세 기록</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">평균 속도</span>
              <span className="font-medium">
                {session.distance > 0
                  ? `${(session.distance / (session.duration / 3600) || 0).toFixed(1)}km/h`
                  : "0km/h"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">소모 칼로리</span>
              <span className="font-medium">{Math.round(session.distance * 50)}kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">예상 걸음 수</span>
              <span className="font-medium">{Math.round(session.distance * 1300)}걸음</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">발견한 고양이</span>
              <span className="font-medium">1마리 🐱</span>
            </div>
          </div>
        </Card>

        {/* Action buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-lg font-medium rounded-xl"
              onClick={() => {
                console.log("[v0] Walking record saved")
                // Save walking record logic here
              }}
            >
              <Save className="h-4 w-4 mr-2" />
              저장하기
            </Button>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-lg font-medium rounded-xl"
              onClick={() => setShowShareForm(true)}
            >
              <Share className="h-5 w-5 mr-2" />
              공유하기
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
