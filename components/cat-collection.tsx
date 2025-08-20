"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CatDiscoveryModal } from "@/components/cat-discovery-modal"
import { CollectedCat } from "@/components/collected-cat"

interface Cat {
  id: string
  name: string
  breed: string
  personality: string
  discoveredAt: string
  discoveredDate: string
  rarity: "common" | "rare" | "epic" | "legendary"
  description: string
  favoriteFood: string
  hobby: string
  isDiscovered: boolean
}

const INITIAL_CATS: Cat[] = [
  {
    id: "1",
    name: "치즈",
    breed: "코리안 숏헤어",
    personality: "활발한",
    discoveredAt: "한강공원 벤치",
    discoveredDate: "2024.01.15",
    rarity: "common",
    description: "햇살을 좋아하는 밝은 성격의 고양이예요. 사람들과 놀기를 좋아해요.",
    favoriteFood: "참치",
    hobby: "낮잠자기",
    isDiscovered: true,
  },
  {
    id: "2",
    name: "루나",
    breed: "러시안 블루",
    personality: "신비로운",
    discoveredAt: "북촌 한옥마을",
    discoveredDate: "2024.01.12",
    rarity: "rare",
    description: "달빛처럼 아름다운 회색 털을 가진 우아한 고양이예요.",
    favoriteFood: "연어",
    hobby: "달구경",
    isDiscovered: true,
  },
  {
    id: "3",
    name: "모카",
    breed: "페르시안",
    personality: "우아한",
    discoveredAt: "홍대 카페거리",
    discoveredDate: "2024.01.10",
    rarity: "epic",
    description: "커피색 털이 매력적인 고급스러운 고양이예요. 조용한 곳을 좋아해요.",
    favoriteFood: "크림",
    hobby: "독서",
    isDiscovered: true,
  },
  {
    id: "4",
    name: "코코",
    breed: "브리티시 숏헤어",
    personality: "온순한",
    discoveredAt: "경복궁 돌담길",
    discoveredDate: "2024.01.08",
    rarity: "common",
    description: "둥글둥글한 얼굴이 매력적인 온화한 성격의 고양이예요.",
    favoriteFood: "닭가슴살",
    hobby: "햇볕쬐기",
    isDiscovered: true,
  },
  {
    id: "5",
    name: "별이",
    breed: "스코티시 폴드",
    personality: "장난꾸러기",
    discoveredAt: "남산 전망대",
    discoveredDate: "2024.01.05",
    rarity: "rare",
    description: "별처럼 반짝이는 눈을 가진 귀여운 고양이예요. 높은 곳을 좋아해요.",
    favoriteFood: "츄르",
    hobby: "별보기",
    isDiscovered: true,
  },
  {
    id: "6",
    name: "망고",
    breed: "아메리칸 숏헤어",
    personality: "친근한",
    discoveredAt: "이태원 골목길",
    discoveredDate: "2024.01.03",
    rarity: "common",
    description: "노란 털색이 망고 같아서 망고라는 이름을 얻었어요. 사람을 좋아해요.",
    favoriteFood: "생선",
    hobby: "사람 따라다니기",
    isDiscovered: true,
  },
  {
    id: "7",
    name: "미르",
    breed: "메인쿤",
    personality: "당당한",
    discoveredAt: "청계천 산책로",
    discoveredDate: "2024.01.01",
    rarity: "epic",
    description: "큰 체구와 위엄 있는 모습이 인상적인 고양이예요. 리더십이 강해요.",
    favoriteFood: "소고기",
    hobby: "영역 순찰",
    isDiscovered: true,
  },
  {
    id: "8",
    name: "구름",
    breed: "터키시 앙고라",
    personality: "몽환적인",
    discoveredAt: "서울숲 연못가",
    discoveredDate: "2023.12.28",
    rarity: "rare",
    description: "구름처럼 하얀 털이 아름다운 고양이예요. 물가를 좋아해요.",
    favoriteFood: "우유",
    hobby: "물놀이 구경",
    isDiscovered: true,
  },
  {
    id: "9",
    name: "솜이",
    breed: "랙돌",
    personality: "온화한",
    discoveredAt: "강남 도서관 앞",
    discoveredDate: "2023.12.25",
    rarity: "rare",
    description: "인형처럼 부드러운 털과 온순한 성격을 가진 고양이예요. 안아주는 것을 좋아해요.",
    favoriteFood: "닭고기",
    hobby: "안겨있기",
    isDiscovered: true,
  },
  {
    id: "10",
    name: "턱시",
    breed: "턱시도",
    personality: "신사적인",
    discoveredAt: "명동 성당 계단",
    discoveredDate: "2023.12.22",
    rarity: "epic",
    description: "턱시도를 입은 것처럼 흑백 털색이 멋진 고양이예요. 품격 있는 모습이 인상적이에요.",
    favoriteFood: "고급 사료",
    hobby: "계단 앉아있기",
    isDiscovered: true,
  },
  {
    id: "11",
    name: "샤미",
    breed: "샴",
    personality: "수다쟁이",
    discoveredAt: "인사동 전통찻집",
    discoveredDate: "2023.12.20",
    rarity: "rare",
    description: "아름다운 파란 눈과 포인트 컬러가 매력적인 고양이예요. 말이 많고 사교적이에요.",
    favoriteFood: "생선회",
    hobby: "수다떨기",
    isDiscovered: true,
  },
  {
    id: "12",
    name: "???",
    breed: "???",
    personality: "???",
    discoveredAt: "",
    discoveredDate: "",
    rarity: "legendary",
    description: "",
    favoriteFood: "",
    hobby: "",
    isDiscovered: false,
  },
]

const rarityColors = {
  common: "bg-gray-100 text-gray-700 border-gray-300",
  rare: "bg-blue-100 text-blue-700 border-blue-300",
  epic: "bg-purple-100 text-purple-700 border-purple-300",
  legendary: "bg-yellow-100 text-yellow-700 border-yellow-300",
}

const rarityLabels = {
  common: "일반",
  rare: "레어", // Changed from "희귀" to "레어"
  epic: "에픽", // Changed from "영웅" to "에픽"
  legendary: "레전드", // Changed from "전설" to "레전드"
}

export function CatCollection() {
  const [cats, setCats] = useState<Cat[]>(INITIAL_CATS)
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null)
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false)

  const discoveredCats = cats.filter((cat) => cat.isDiscovered)
  const undiscoveredCats = cats.filter((cat) => !cat.isDiscovered)

  const handleCatClick = (cat: Cat) => {
    if (cat.isDiscovered) {
      setSelectedCat(cat)
    }
  }

  const simulateDiscovery = () => {
    setShowDiscoveryModal(true)
  }

  const handleCatDiscovered = (catId: string) => {
    setCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === catId ? { ...cat, isDiscovered: true, discoveredDate: new Date().toLocaleDateString("ko-KR") } : cat,
      ),
    )
  }

  return (
    <div className="px-4">
      {/* Collection progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800">컬렉션 진행도</h3>
          <span className="text-sm text-gray-600">
            {discoveredCats.length}/{cats.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-orange-400 to-yellow-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(discoveredCats.length / cats.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{Math.round((discoveredCats.length / cats.length) * 100)}% 완성</p>
      </div>

      {/* Discovered cats */}
      <div className="mb-8">
        <h4 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>✨</span>
          발견한 고양이들
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {discoveredCats.map((cat) => (
            <Card
              key={cat.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow bg-white"
              onClick={() => handleCatClick(cat)}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full flex items-center justify-center">
                  <CollectedCat breed={cat.breed} size="md" />
                </div>
                <h5 className="font-bold text-gray-800 mb-1">{cat.name}</h5>
                <p className="text-xs text-gray-600 mb-2">{cat.breed}</p>
                <Badge className={`text-xs ${rarityColors[cat.rarity]}`}>{rarityLabels[cat.rarity]}</Badge>
                <p className="text-xs text-gray-500 mt-2">{cat.discoveredDate}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Undiscovered cats */}
      <div className="mb-8">
        <h4 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🔍</span>
          아직 만나지 못한 고양이들
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {undiscoveredCats.map((cat) => (
            <Card key={cat.id} className="p-4 bg-gray-50 border-dashed border-2 border-gray-300">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-gray-400">?</span>
                </div>
                <h5 className="font-bold text-gray-400 mb-1">???</h5>
                <p className="text-xs text-gray-400 mb-2">???</p>
                <Badge className={`text-xs ${rarityColors[cat.rarity]} opacity-50`}>{rarityLabels[cat.rarity]}</Badge>
                <p className="text-xs text-gray-400 mt-2">산책하며 발견해보세요!</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Demo button */}
      <div className="text-center mb-6">
        <Button
          onClick={simulateDiscovery}
          className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white px-8 py-3 rounded-full shadow-lg"
        >
          새로운 고양이 발견 체험하기 🐱
        </Button>
      </div>

      {/* Cat detail modal */}
      {selectedCat && (
        <CatDiscoveryModal
          cat={selectedCat}
          isOpen={!!selectedCat}
          onClose={() => setSelectedCat(null)}
          isDetailView={true}
        />
      )}

      {/* Discovery simulation modal */}
      <CatDiscoveryModal
        cat={{
          id: "5",
          name: "별이",
          breed: "스코티시 폴드",
          personality: "장난꾸러기",
          discoveredAt: "남산 전망대",
          discoveredDate: "방금 전",
          rarity: "rare" as const,
          description: "별처럼 반짝이는 눈을 가진 귀여운 고양이예요. 높은 곳을 좋아해요.",
          favoriteFood: "츄르",
          hobby: "별보기",
          isDiscovered: true,
        }}
        isOpen={showDiscoveryModal}
        onClose={() => setShowDiscoveryModal(false)}
        onCatDiscovered={handleCatDiscovered}
        isDetailView={false}
      />
    </div>
  )
}
