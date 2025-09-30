/**
 * 회원 정보 API 서비스
 */

import { ApiClient } from "./apiClient";
// 실제 백엔드 MemberDTO 타입에 맞게 정의
export interface MemberDTO {
    memberId: number;
    name: string;
    email: string;
    // ... 기타 필요한 필드
}

/**
 * 현재 로그인한 회원 id 조회
 */
export async function getMemberId(): Promise<number> {
    try {
        const response = await ApiClient.get<MemberDTO>("/member/profile");
        return response.memberId;
    } catch (error) {
        console.error("회원 id 조회 실패:", error);
        throw new Error("회원 id를 불러오는데 실패했습니다.");
    }
}

/**
 * 현재 로그인한 회원 이름 조회
 */
export async function getMemberName(): Promise<string> {
    try {
        const response = await ApiClient.get<MemberDTO>("/member/profile");
        return response.name;
    } catch (error) {
        console.error("회원 이름 조회 실패:", error);
        throw new Error("회원 이름을 불러오는데 실패했습니다.");
    }
}
