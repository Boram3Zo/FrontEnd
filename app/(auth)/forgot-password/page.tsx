"use client"

import { Header } from "@/app/_components/layout/CHeader";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { Button } from "@/app/_components/ui/CButton";
import { Input } from "@/app/_components/ui/CInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/CCard";
import { Label } from "@/app/_components/ui/CLabel";
import { useState } from 'react';
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "password">("email")
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleFindPassword = () => {
    // 이메일 조회 로직 실행

    // 조회 성공 시 호출
    setStep("password")
  }

  const handleChangePassword = () => {
    if ( newPassword !== '' && newPassword === confirmPassword) {
      alert("비밀번호가 성공적으로 변경되었습니다.")
      // 로그인 페이지로 리다이렉트하거나 추가 로직 구현
    } else {
      alert("비밀번호가 일치하지 않습니다.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Header />

      <main className="pb-20 px-4 pt-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 text-6xl">🐾</div>
              {step === "email" ? (
                <>
                  <CardTitle className="text-2xl font-bold text-gray-800">비밀번호 찾기</CardTitle>
                  <p className="text-gray-600">가입하신 이메일을 입력해주세요</p>
                </>
              ) : (
                <>
                  <CardTitle className="text-2xl font-bold text-gray-800">새 비밀번호 설정</CardTitle>
                  <p className="text-gray-600">새로운 비밀번호를 입력해주세요</p>
                </>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                {step === "email" ? (
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      className="h-12"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">새 비밀번호</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="새 비밀번호를 입력하세요"
                        className="h-12"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="비밀번호를 다시 입력하세요"
                        className="h-12"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>

              {step === "email" ? (
                <Button
                  className="w-full h-12 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-semibold"
                  onClick={handleFindPassword}
                >
                  비밀번호 찾기
                </Button>
              ) : (
                <Button
                  className="w-full h-12 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-semibold"
                  onClick={handleChangePassword}
                >
                  비밀번호 변경
                </Button>
              )}

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  로그인 페이지로 돌아가기{" "}
                  <Link href="/login" className="text-orange-600 hover:text-orange-700 font-semibold">
                    로그인
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
