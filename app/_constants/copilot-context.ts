/**
 * GitHub Copilot Context Comments
 *
 * 이 프로젝트는 Next.js 15 + TypeScript로 구축된 반려동물 산책 앱입니다.
 *
 * 주요 기능:
 * - 사용자 인증 (회원가입/로그인)
 * - 실시간 위치 추적 산책 기록
 * - 사진 업로드 및 공유
 * - 캐릭터 시스템
 *
 * 코딩 스타일:
 * - 함수형 컴포넌트 + 훅 패턴
 * - TypeScript 엄격 모드
 * - Tailwind CSS 사용
 * - 컴포넌트별 테스트 코드 작성
 *
 * 폴더 구조:
 * - _components: 재사용 컴포넌트
 * - _hooks: 커스텀 훅
 * - _libs: 서비스 레이어
 * - _types: TypeScript 타입
 * - _utils: 유틸리티 함수
 */

// 이 파일은 Copilot이 프로젝트 컨텍스트를 이해하도록 돕습니다.
export const COPILOT_CONTEXT = {
	projectName: "Chikaku Pet Walking App",
	techStack: ["Next.js 15", "TypeScript", "Tailwind CSS"],
	architecture: "Component-based with custom hooks",
} as const;
