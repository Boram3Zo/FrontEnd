"use client";

import Script from "next/script";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface GoogleMapsContextType {
	isLoaded: boolean;
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
	isLoaded: false,
});

export const useGoogleMaps = () => {
	return useContext(GoogleMapsContext);
};

interface GoogleMapsProviderProps {
	children: ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [scriptAdded, setScriptAdded] = useState(false);
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

	// API가 이미 로드되었는지 확인
	React.useEffect(() => {
		// Google Maps API가 이미 로드되어 있는지 확인
		if (window.google?.maps) {
			setIsLoaded(true);
			return;
		}

		// 이미 스크립트가 DOM에 있는지 확인
		const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
		if (existingScript) {
			setScriptAdded(true);
			// 기존 스크립트의 로드 완료를 기다림
			const checkLoaded = () => {
				if (window.google?.maps) {
					setIsLoaded(true);
				} else {
					setTimeout(checkLoaded, 100);
				}
			};
			checkLoaded();
		}
	}, []);

	const handleScriptLoad = () => {
		setIsLoaded(true);
	};

	return (
		<GoogleMapsContext.Provider value={{ isLoaded }}>
			{!isLoaded && !scriptAdded && (
				<Script
					src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry&language=ko&region=KR`}
					strategy="afterInteractive"
					onLoad={handleScriptLoad}
				/>
			)}
			{children}
		</GoogleMapsContext.Provider>
	);
}
