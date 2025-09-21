import React from "react";
import { LucideIcon } from "lucide-react";

export interface StatCardProps {
	/** 통계 제목 */
	title: string;
	/** 메인 값 (크게 표시되는 값) */
	value: string;
	/** 아이콘 컴포넌트 */
	icon: LucideIcon;
	/** 아이콘 색상 클래스 */
	iconColor?: string;
	/** 배경색 클래스 */
	backgroundColor?: string;
	/** 추가 정보나 부제목 */
	subtitle?: string;
	/** 클릭 핸들러 */
	onClick?: () => void;
	/** 로딩 상태 */
	loading?: boolean;
}

/**
 * 산책 통계를 표시하는 재사용 가능한 카드 컴포넌트
 */
export function StatCard({
	title,
	value,
	icon: Icon,
	iconColor = "text-blue-500",
	backgroundColor = "bg-white",
	subtitle,
	onClick,
	loading = false,
}: StatCardProps) {
	const cardClasses = [
		"p-4 rounded-xl shadow-lg border border-gray-100 transition-all duration-200",
		backgroundColor,
		onClick ? "cursor-pointer hover:shadow-xl hover:scale-105 active:scale-95" : "",
	]
		.filter(Boolean)
		.join(" ");

	if (loading) {
		return (
			<div className={cardClasses}>
				<div className="animate-pulse">
					<div className="flex justify-center mb-3">
						<div className="w-6 h-6 bg-gray-200 rounded"></div>
					</div>
					<div className="h-6 bg-gray-200 rounded mb-2"></div>
					<div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
				</div>
			</div>
		);
	}

	return (
		<div className={cardClasses} onClick={onClick}>
			<div className="text-center">
				{/* 아이콘 */}
				<div className="flex justify-center mb-3">
					<div className={`p-2 rounded-full bg-opacity-10 ${iconColor.replace("text-", "bg-")}`}>
						<Icon className={`h-5 w-5 ${iconColor}`} />
					</div>
				</div>

				{/* 메인 값 */}
				<div className="text-xl font-bold text-gray-800 mb-1 leading-tight">{value}</div>

				{/* 제목 */}
				<div className="text-xs text-gray-600 font-medium">{title}</div>

				{/* 부제목 */}
				{subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
			</div>
		</div>
	);
}

/**
 * 컴팩트한 가로형 StatCard 컴포넌트
 */
export function StatCardHorizontal({
	title,
	value,
	icon: Icon,
	iconColor = "text-blue-500",
	backgroundColor = "bg-white",
	subtitle,
	onClick,
	loading = false,
}: StatCardProps) {
	const cardClasses = [
		"p-3 rounded-lg shadow-md border border-gray-100 transition-all duration-200",
		backgroundColor,
		onClick ? "cursor-pointer hover:shadow-lg hover:scale-102 active:scale-98" : "",
	]
		.filter(Boolean)
		.join(" ");

	if (loading) {
		return (
			<div className={cardClasses}>
				<div className="animate-pulse flex items-center space-x-3">
					<div className="w-8 h-8 bg-gray-200 rounded-full"></div>
					<div className="flex-1">
						<div className="h-4 bg-gray-200 rounded mb-1"></div>
						<div className="h-3 bg-gray-200 rounded w-2/3"></div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={cardClasses} onClick={onClick}>
			<div className="flex items-center space-x-3">
				{/* 아이콘 */}
				<div className={`p-1.5 rounded-full bg-opacity-10 ${iconColor.replace("text-", "bg-")}`}>
					<Icon className={`h-4 w-4 ${iconColor}`} />
				</div>

				{/* 텍스트 정보 */}
				<div className="flex-1 min-w-0">
					<div className="text-lg font-semibold text-gray-800 truncate">{value}</div>
					<div className="text-xs text-gray-600">{title}</div>
					{subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
				</div>
			</div>
		</div>
	);
}
