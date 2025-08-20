"use client"

import { Home, Search, Map, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BottomNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg">
      <div className="flex items-center justify-around py-2">
        <Link href="/">
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 py-3 px-4 ${
              isActive("/") ? "text-orange-500" : "text-gray-600"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">홈</span>
          </Button>
        </Link>

        <Link href="/search">
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 py-3 px-4 ${
              isActive("/search") ? "text-orange-500" : "text-gray-600"
            }`}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs">검색</span>
          </Button>
        </Link>

        <Link href="/map">
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 py-3 px-4 ${
              isActive("/map") ? "text-orange-500" : "text-gray-600"
            }`}
          >
            <Map className="h-5 w-5" />
            <span className="text-xs">지도</span>
          </Button>
        </Link>

        <Link href="/my">
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 py-3 px-4 ${
              isActive("/my") ? "text-orange-500" : "text-gray-600"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">마이</span>
          </Button>
        </Link>
      </div>
    </nav>
  )
}
