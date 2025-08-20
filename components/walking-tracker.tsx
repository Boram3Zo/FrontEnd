"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Square, MapPin } from "lucide-react"

interface WalkingSession {
  id: string
  startTime: Date
  duration: number
  distance: number
  route: { lat: number; lng: number; timestamp: Date }[]
  isActive: boolean
  isPaused: boolean
}

interface WalkingTrackerProps {
  session: WalkingSession
  onStop: () => void
  onPause: () => void
  onUpdateSession: (session: WalkingSession) => void
}

export function WalkingTracker({ session, onStop, onPause, onUpdateSession }: WalkingTrackerProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [currentDistance, setCurrentDistance] = useState(0)

  // Update timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (session.isActive && !session.isPaused) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - session.startTime.getTime()) / 1000)
        setCurrentTime(elapsed)

        // Simulate distance increase
        setCurrentDistance((prev) => prev + 0.01)

        // Update session
        onUpdateSession({
          ...session,
          duration: elapsed,
          distance: currentDistance,
        })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [session]) // Updated to use the entire session object as a dependency

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const formatDistance = (km: number) => {
    if (km < 1) {
      return `${Math.round(km * 1000)}m`
    }
    return `${km.toFixed(2)}km`
  }

  const calculatePace = () => {
    if (currentDistance === 0) return "0'00\""
    const paceMinutes = currentTime / 60 / currentDistance
    const minutes = Math.floor(paceMinutes)
    const seconds = Math.round((paceMinutes - minutes) * 60)
    return `${minutes}'${seconds.toString().padStart(2, "0")}"`
  }

  return (
    <div className="px-4 py-6">
      {/* Status indicator */}
      <div className="text-center mb-6">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            session.isPaused ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${session.isPaused ? "bg-yellow-500" : "bg-green-500 animate-pulse"}`}
          ></div>
          {session.isPaused ? "일시정지됨" : "기록 중"}
        </div>
      </div>

      {/* Main stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 text-center bg-white shadow-lg">
          <div className="text-2xl font-bold text-blue-600 mb-1">{formatTime(currentTime)}</div>
          <div className="text-xs text-gray-600">시간</div>
        </Card>

        <Card className="p-4 text-center bg-white shadow-lg">
          <div className="text-2xl font-bold text-green-600 mb-1">{formatDistance(currentDistance)}</div>
          <div className="text-xs text-gray-600">거리</div>
        </Card>

        <Card className="p-4 text-center bg-white shadow-lg">
          <div className="text-2xl font-bold text-orange-600 mb-1">{calculatePace()}</div>
          <div className="text-xs text-gray-600">페이스</div>
        </Card>
      </div>

      {/* Map placeholder */}
      <Card className="mb-6 overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 relative">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* Background */}
            <rect x="0" y="0" width="400" height="200" fill="url(#walkingMapGradient)" />
            <defs>
              <linearGradient id="walkingMapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dcfce7" />
                <stop offset="100%" stopColor="#dbeafe" />
              </linearGradient>
            </defs>

            {/* Walking path */}
            <path
              d="M 50 150 Q 120 130 200 140 Q 280 150 350 130"
              stroke="#22c55e"
              strokeWidth="4"
              fill="none"
              strokeDasharray="0,8"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,400;200,200;400,0"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>

            {/* Current position */}
            <circle cx="200" cy="140" r="8" fill="#ef4444" stroke="white" strokeWidth="3">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-gray-800">실시간 위치 추적</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Control buttons */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <Button
            onClick={onPause}
            className={`flex-1 py-4 text-lg font-medium rounded-xl ${
              session.isPaused
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            {session.isPaused ? (
              <>
                <Play className="h-5 w-5 mr-2" />
                재시작
              </>
            ) : (
              <>
                <Pause className="h-5 w-5 mr-2" />
                일시정지
              </>
            )}
          </Button>

          <Button onClick={onStop} variant="destructive" className="flex-1 py-4 text-lg font-medium rounded-xl">
            <Square className="h-5 w-5 mr-2" />
            종료
          </Button>
        </div>

        {/* Quick stats */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">평균 속도</span>
              <span className="font-medium">
                {currentDistance > 0 ? `${(currentDistance / (currentTime / 3600) || 0).toFixed(1)}km/h` : "0km/h"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">칼로리</span>
              <span className="font-medium">{Math.round(currentDistance * 50)}kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">걸음 수</span>
              <span className="font-medium">{Math.round(currentDistance * 1300)}걸음</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">발견한 고양이</span>
              <span className="font-medium">1마리</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
