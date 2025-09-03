// components/map/ManualGpsControl.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export interface ManualGpsControlProps {
	manualLatLng: { lat: number; lng: number } | null;
	setManualLatLng: (latlng: { lat: number; lng: number }) => void;
	setLocation: (msg: string) => void;
	DELTA?: number;
	onMove?: (latlng: { lat: number; lng: number }) => void;
}

export function ManualGpsControl({
	manualLatLng,
	setManualLatLng,
	setLocation,
	DELTA = 0.0001, // 프로젝트 기본 이동량
	onMove,
}: ManualGpsControlProps) {
	const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
	const animationFrameRef = useRef<number | null>(null);

	// === 방향키 입력을 캡처하기 위한 ref ===
	const controlRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// === 방향키 입력을 캡처하여 지도 이동이 아닌 수동 위치 이동에만 사용 ===
		// controlRef에 포커스가 있을 때만 키 입력을 처리함
		const handleKeyDown = (e: KeyboardEvent) => {
			if (controlRef.current && document.activeElement === controlRef.current) {
				if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
					e.preventDefault(); // 지도 등 기본 동작 방지
					setKeysPressed(prev => new Set(prev).add(e.key));
				}
			}
		};
		const handleKeyUp = (e: KeyboardEvent) => {
			if (controlRef.current && document.activeElement === controlRef.current) {
				if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
					e.preventDefault();
					setKeysPressed(prev => {
						const next = new Set(prev);
						next.delete(e.key);
						return next;
					});
				}
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	useEffect(() => {
		if (!manualLatLng) return;
		const animate = () => {
			let { lat, lng } = manualLatLng;
			let moved = false;

			if (keysPressed.has("w") || keysPressed.has("ArrowUp")) {
				lat += DELTA;
				moved = true;
			}
			if (keysPressed.has("s") || keysPressed.has("ArrowDown")) {
				lat -= DELTA;
				moved = true;
			}
			if (keysPressed.has("a") || keysPressed.has("ArrowLeft")) {
				lng -= DELTA;
				moved = true;
			}
			if (keysPressed.has("d") || keysPressed.has("ArrowRight")) {
				lng += DELTA;
				moved = true;
			}

			if (moved) {
				const next = { lat, lng };
				setManualLatLng(next);
				setLocation(`수동 모드 | 위도: ${lat.toFixed(6)} | 경도: ${lng.toFixed(6)}`);
				onMove?.(next);
			}

			animationFrameRef.current = requestAnimationFrame(animate);
		};
		animationFrameRef.current = requestAnimationFrame(animate);
		return () => {
			if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
		};
	}, [keysPressed, manualLatLng, setManualLatLng, setLocation, DELTA, onMove]);

	// === 방향키 입력을 캡처하는 div ===
	// tabIndex=0으로 포커스 가능하게 하고, 포커스 시 방향키 입력을 받아 위치 이동만 처리함
	// 자세한 안내 문구와 함께 UI를 추가
	return (
		<div
			ref={controlRef}
			tabIndex={0}
			style={{ outline: "none", padding: "12px", borderRadius: "8px", background: "#f8fafc", marginTop: "8px" }}
		>
			{/*
				이 영역이 포커스를 받을 때 방향키(WASD, 화살표) 입력을 감지하여
				지도 이동이 아닌 수동 위치 이동만 처리합니다.
				포커스가 없으면 방향키 입력은 무시됩니다.
			*/}
			<p style={{ fontSize: "14px", marginBottom: "4px" }}>
				<strong>수동 위치 이동:</strong> 이 영역을 클릭한 후 방향키(WASD 또는 화살표)를 누르면 위치가 이동합니다.
				<br />
				지도가 움직이지 않도록 기본 동작을 막고, 위치만 변경됩니다.
			</p>
			<p style={{ fontSize: "13px", color: "#555" }}>
				현재 위치: 위도 {manualLatLng?.lat.toFixed(6)}, 경도 {manualLatLng?.lng.toFixed(6)}
			</p>
		</div>
	);
}
