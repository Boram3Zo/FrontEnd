"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/app/_components/ui/dialog"
import { Button } from "@/app/_components/ui/button"
import { Badge } from "@/app/_components/ui/badge"
import { MapPin, Heart, Calendar, Utensils, Gamepad2 } from "lucide-react"
import { CollectedCat } from "@/app/_components/cat/collected-cat"
import Link from "next/link"
import { Cat } from "@/app/_types/cat"

// interface Cat {
//   id: string
//   name: string
//   breed: string
//   personality: string
//   discoveredAt: string
//   discoveredDate: string
//   rarity: "common" | "rare" | "epic" | "legendary" | "special" // Added special grade
//   description: string
//   favoriteFood: string
//   hobby: string
//   isDiscovered: boolean
// }

interface CatDiscoveryModalProps {
  cat: Cat
  isOpen: boolean
  onClose: () => void
  onCatDiscovered?: (catId: string) => void // Added callback for when cat is discovered
  isDetailView?: boolean
}

const rarityColors = {
  common: "bg-gray-100 text-gray-700 border-gray-300",
  rare: "bg-blue-100 text-blue-700 border-blue-300",
  epic: "bg-purple-100 text-purple-700 border-purple-300",
  legendary: "bg-yellow-100 text-yellow-700 border-yellow-300",
  special: "bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 border-pink-300",
}

const rarityLabels = {
  common: "일반",
  rare: "레어",
  epic: "에픽",
  legendary: "레전드",
  special: "스페셜",
}

const rarityGradients = {
  common: "from-gray-200 to-gray-300",
  rare: "from-blue-200 to-blue-400",
  epic: "from-purple-200 to-purple-400",
  legendary: "from-yellow-200 to-yellow-400",
  special: "from-pink-200 to-rose-400", // Added special grade gradient
}

export function CatDiscoveryModal({
  cat,
  isOpen,
  onClose,
  onCatDiscovered,
  isDetailView = false,
}: CatDiscoveryModalProps) {
  const [showDetails, setShowDetails] = useState(isDetailView)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isOpen && !isDetailView) {
      setAnimate(true)
      const timer = setTimeout(() => {
        setShowDetails(true)
      }, 2000)
      return () => clearTimeout(timer)
    } else if (isDetailView) {
      setShowDetails(true)
    }
  }, [isOpen, isDetailView])

  const handleClose = () => {
    setShowDetails(false)
    setAnimate(false)
    onClose()
  }

  const handleCatTowerConfirm = () => {
    if (onCatDiscovered && !isDetailView) {
      onCatDiscovered(cat.id)
    }
    // Close the modal first
    handleClose()
    // Navigate to cat tower (handled by Link wrapper)
  }

  if (!showDetails && !isDetailView) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-sm mx-auto bg-gradient-to-b from-orange-100 to-yellow-100 border-0 rounded-2xl">
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="text-6xl mb-4 animate-bounce">✨</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">앗! 새로운 고양이가</h2>
              <h2 className="text-xl font-bold text-gray-800">나타났어요!</h2>
            </div>

            <div
              className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${rarityGradients[cat.rarity]} rounded-full flex items-center justify-center ${animate ? "animate-pulse" : ""}`}
            >
              <CollectedCat breed={cat.breed} size="lg" />
            </div>

            <div className="animate-pulse">
              <div className="text-lg text-gray-600">발견 중...</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm mx-auto bg-white border-0 rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="text-center py-6">
          {!isDetailView && (
            <div className="mb-6">
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="text-lg font-bold text-gray-800 mb-1">{cat.name}를 발견했어요!</h2>
              <p className="text-sm text-gray-600">새로운 친구가 캣타워에 추가되었습니다</p>
            </div>
          )}

          {/* Cat illustration */}
          <div
            className={`w-32 h-32 mx-auto mb-6 bg-gradient-to-br ${rarityGradients[cat.rarity]} rounded-full flex items-center justify-center shadow-lg`}
          >
            <CollectedCat breed={cat.breed} size="lg" />
          </div>

          {/* Cat info */}
          <div className="space-y-4 text-left">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{cat.name}</h3>
              <Badge className={`${rarityColors[cat.rarity]} mb-4`}>{rarityLabels[cat.rarity]}</Badge>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">🐱</span>
                </div>
                <div>
                  <div className="text-xs text-gray-500">품종</div>
                  <div className="font-medium text-gray-800">{cat.breed}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                  <Heart className="h-4 w-4 text-pink-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">성격</div>
                  <div className="font-medium text-gray-800">{cat.personality}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">발견 장소</div>
                  <div className="font-medium text-gray-800">{cat.discoveredAt}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">발견 날짜</div>
                  <div className="font-medium text-gray-800">{cat.discoveredDate}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Utensils className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">좋아하는 음식</div>
                  <div className="font-medium text-gray-800">{cat.favoriteFood}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Gamepad2 className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">취미</div>
                  <div className="font-medium text-gray-800">{cat.hobby}</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">소개</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{cat.description}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {!isDetailView && (
              <Link href="/cat-tower">
                <Button
                  className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white"
                  onClick={handleCatTowerConfirm}
                >
                  캣타워에서 확인하기
                </Button>
              </Link>
            )}
            <br />
            <Button variant="outline" onClick={handleClose} className="w-full bg-transparent">
              {isDetailView ? "닫기" : "계속 산책하기"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}