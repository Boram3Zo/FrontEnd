"use client";

import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { Card } from "@/app/_components/ui/Card";
import { Input } from "@/app/_components/ui/Input";
import { Button } from "@/app/_components/ui/Button";
import { Search, MapPin, Clock, Heart, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SafeImage } from "@/app/_components/ui/SafeImage";

interface MapDTO {
  [key: string]: unknown;
}

interface PhotoDTO {
  url?: string;
  [key: string]: unknown;
}

interface PostReadDTO {
  postId: number;
  memberId: number;
  title: string;
  region: string;
  duration: string;
  distance: number;
  content: string;
  theme: string;
  likeCount: number;
  hashtagList: string[];
  map: MapDTO;
  photoList: PhotoDTO[];
}

interface SearchResponse {
  success: boolean;
  data: {
    boardPage: {
      content: PostReadDTO[];
      totalElements: number;
      totalPages: number;
      size: number;
      number: number;
    };
    searchWord: string;
    searchType: string;
  };
}

export default function SearchPage() {
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<PostReadDTO[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const [recentSearches, setRecentSearches] = useState<string[]>([]);
	const [searchKeyword, setSearchKeyword] = useState("");

	// 세션 스토리지에서 최근 검색어 불러오기
	useEffect(() => {
		const stored = sessionStorage.getItem("recentSearches");
		if (stored) {
			setRecentSearches(JSON.parse(stored));
		}
	}, []);  // 최근 검색어를 세션 스토리지에 저장
  const saveRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;

    const trimmedQuery = query.trim();
    setRecentSearches(prevSearches => {
      const updated = [
        trimmedQuery,
        ...prevSearches.filter((item) => item !== trimmedQuery),
      ].slice(0, 5);
      sessionStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 최근 검색어 삭제
  const removeRecentSearch = useCallback((query: string) => {
    setRecentSearches(prevSearches => {
      const updated = prevSearches.filter((item) => item !== query);
      sessionStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 검색 API 호출
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchKeyword(query.trim());

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/post/search?page=0&title=${encodeURIComponent(query.trim())}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`검색 API 호출 실패: ${response.status}`);
      }

      const result: SearchResponse = await response.json();

      if (result.success) {
        setSearchResults(result.data.boardPage.content);
        saveRecentSearch(query.trim());
        setHasSearched(true);
      } else {
        console.error("검색 실패:", result);
        setSearchResults([]);
        setHasSearched(true);
      }
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  }, [saveRecentSearch]);

  // URL 쿼리 파라미터에서 검색어 가져오기 및 자동 검색
  useEffect(() => {
    const queryFromUrl = searchParams.get("q");
    if (queryFromUrl && queryFromUrl !== searchKeyword) {
      setSearchQuery(queryFromUrl);
      performSearch(queryFromUrl);
    }
  }, [searchParams, performSearch, searchKeyword]);

  // 엔터 키 검색
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      performSearch(searchQuery);
    }
  };

  // 검색 버튼 클릭
  const handleSearchClick = () => {
    performSearch(searchQuery);
  };

  // 최근 검색어 클릭
  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    performSearch(query);
  };

  // 시간 포맷팅 함수
  const formatDuration = (duration: string) => {
    if (!duration) return "정보 없음";
    const parts = duration.split(":");
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);

    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    return `${minutes}분`;
  };

  // 거리 포맷팅 함수
  const formatDistance = (distance: number) => {
    if (!distance) return "정보 없음";
    if (distance >= 1) {
      return `${distance.toFixed(1)}km`;
    }
    return `${(distance * 1000).toFixed(0)}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <Header />

      <main className="pb-20 px-4">
        {/* Search Header */}
        <div className="py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            산책 코스 검색 🔍
          </h1>

          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="검색할 제목을 입력해주세요"
                className="pl-10 py-3 text-base rounded-xl border-2 border-gray-200 focus:border-orange-400"
                disabled={isSearching}
              />
            </div>
            <Button
              onClick={handleSearchClick}
              disabled={isSearching || !searchQuery.trim()}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
            >
              {isSearching ? "검색중..." : "검색"}
            </Button>
          </div>
        </div>

        {/* 검색 결과 */}
        {hasSearched && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              &ldquo;{searchKeyword}&rdquo;로 검색된 결과 (
              {searchResults.length}개)
            </h2>

            {searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((post) => (
                  <Link key={post.postId} href={`/course/${post.postId}`}>
                    <Card className="p-4 bg-white hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-green-400 rounded-lg overflow-hidden">
                          <SafeImage
                            src={
                              post.photoList?.[0]?.url ||
                              "/placeholder-course.png"
                            }
                            alt={post.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-800 mb-1 text-left">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-600 mb-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{post.region}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatDuration(post.duration)}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <span className="text-blue-500">📏</span>
                              <span className="text-xs font-medium text-gray-800">
                                {formatDistance(post.distance)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {post.likeCount}
                              </span>
                            </div>
                          </div>
                          {post.hashtagList && post.hashtagList.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {post.hashtagList
                                .slice(0, 3)
                                .map((tag, index) => (
                                  <span
                                    key={index}
                                    className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-gray-50">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-sm text-gray-500">
                  다른 키워드로 검색해보세요
                </p>
              </Card>
            )}
          </div>
        )}

        {/* Recent Searches - 검색하지 않았을 때만 표시 */}
        {!hasSearched && recentSearches.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              최근 검색
            </h2>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <Card
                  key={index}
                  className="p-3 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-gray-700 flex-1"
                      onClick={() => handleRecentSearchClick(search)}
                    >
                      {search}
                    </span>
                    <button
                      onClick={() => removeRecentSearch(search)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 검색 안내 메시지 - 검색하지 않았고 최근 검색어가 없을 때 */}
        {!hasSearched && recentSearches.length === 0 && (
          <Card className="p-8 text-center bg-gray-50">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              검색어를 입력해주세요
            </h3>
            <p className="text-sm text-gray-500">
              원하는 산책 코스를 찾아보세요
            </p>
          </Card>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
