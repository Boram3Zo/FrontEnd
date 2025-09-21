"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/Button";
import { ChevronRight } from "lucide-react";
import { gangnamGu } from "../../_constants/map/gangnam";
import { seochoGu } from "../../_constants/map/seocho";
import { songpaGu } from "../../_constants/map/songpa";
import { jongnoGu } from "../../_constants/map/jongno";
import { dongdaemunGu } from "../../_constants/map/dongdaemun";
import { gwangjinGu } from "../../_constants/map/gwangjin";
import { seongdongGu } from "../../_constants/map/seongdong";
import { yongsanGu } from "../../_constants/map/yongsan";
import { jungGu } from "../../_constants/map/jung";
import { seongbukGu } from "../../_constants/map/seongbuk";
import { jungnangGu } from "../../_constants/map/jungnang";
import { DISTRICT_POSITIONS } from "../../_constants/map/positions";
import { Region, District } from "../../_types/map";

const SEOUL_DISTRICTS: Region[] = [gangnamGu, seochoGu, songpaGu, jongnoGu, seongbukGu, jungGu, dongdaemunGu, gwangjinGu, seongdongGu, yongsanGu, jungnangGu];

export function KoreanMap() {
	const [selectedLevel, setSelectedLevel] = useState<"city" | "district" | "neighborhood">("city");
	const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
	const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

	const handleRegionClick = (region: Region) => {
		setSelectedRegion(region);
		setSelectedLevel("district");
	};

	const handleDistrictClick = (district: District) => {
		setSelectedDistrict(district);
		setSelectedLevel("neighborhood");
	};

	const handleBackToCity = () => {
		setSelectedLevel("city");
		setSelectedRegion(null);
		setSelectedDistrict(null);
	};

	const handleBackToDistrict = () => {
		setSelectedLevel("district");
		setSelectedDistrict(null);
	};

	if (selectedLevel === "city") {
		return (
			<div className="bg-white rounded-lg p-6 shadow-lg">
				<h2 className="text-lg font-bold text-center mb-6 text-gray-800">대한민국 지도</h2>

				{/* Simplified Seoul Map */}
				<div className="relative w-full max-w-md mx-auto">
					<svg viewBox="0 0 400 300" className="w-full h-auto">
						{/* Seoul regions */}
						{SEOUL_DISTRICTS.map((region, index) => {
							if (region.id === "jongno") {
								return (
									<g key={region.id}>
										{region.districts?.map(district => {
											let pathD = "";
											switch (district.id) {
												case "sajik":
													pathD = "M 140 70 L 155 70 L 165 73 L 168 77 L 167 82 L 162 85 L 155 87 L 145 85 L 140 80 Z";
													break;
												case "samcheong":
													pathD = "M 170 65 L 182 63 L 188 65 L 190 68 L 189 72 L 185 75 L 180 77 L 175 76 L 172 73 L 170 68 Z";
													break;
												case "buam":
													pathD = "M 130 60 L 135 62 L 140 65 L 142 70 L 145 75 L 147 80 L 145 85 L 140 88 L 135 90 L 130 88 L 125 85 L 122 80 L 120 75 L 122 70 L 125 65 L 130 60";
													break;
												case "pyeongchang":
													pathD = "M 150 40 L 155 42 L 160 45 L 165 48 L 170 50 L 175 53 L 177 56 L 175 60 L 172 63 L 170 65 L 165 67 L 160 65 L 155 62 L 150 60 L 145 55 L 143 50 L 145 45 L 150 40";
													break;
												case "muak":
													pathD = "M 135 95 L 140 93 L 145 92 L 150 93 L 153 95 L 155 98 L 153 101 L 150 103 L 145 104 L 140 103 L 137 101 L 135 98 Z";
													break;
												case "gyonam":
													pathD = "M 145 105 L 150 104 L 155 105 L 158 107 L 160 110 L 158 113 L 155 115 L 150 116 L 145 115 L 142 113 L 140 110 L 142 107 L 145 105 Z";
													break;
												case "gahoe":
													pathD = "M 190 75 L 195 73 L 200 72 L 205 73 L 208 75 L 210 78 L 209 82 L 207 85 L 205 87 L 200 88 L 195 87 L 192 85 L 190 82 L 189 79 L 190 75 Z";
													break;
												case "jongno1234":
													pathD = "M 215 80 L 220 78 L 225 77 L 230 78 L 235 80 L 238 83 L 240 86 L 238 89 L 235 91 L 230 92 L 225 91 L 220 89 L 217 86 L 215 83 L 215 80 Z";
													break;
												case "jongno56":
													pathD = "M 245 83 L 250 81 L 255 80 L 260 81 L 263 83 L 265 86 L 263 89 L 260 91 L 255 92 L 250 91 L 247 89 L 245 86 Z";
													break;
												case "ehwa":
													pathD = "M 250 70 L 255 69 L 260 70 L 263 72 L 265 75 L 263 78 L 260 80 L 255 81 L 250 80 L 247 78 L 245 75 L 247 72 Z";
													break;
												case "changsin1":
													pathD = "M 270 75 L 275 74 L 280 75 L 282 77 L 283 80 L 282 83 L 280 85 L 275 86 L 270 85 L 268 83 L 267 80 L 268 77 Z";
													break;
												case "changsin2":
													pathD = "M 267 85 L 272 84 L 277 85 L 279 87 L 280 90 L 279 93 L 277 95 L 272 96 L 267 95 L 265 93 L 264 90 L 265 87 Z";
													break;
												case "changsin3":
													pathD = "M 275 90 L 280 89 L 285 90 L 287 92 L 288 95 L 287 98 L 285 100 L 280 101 L 275 100 L 273 98 L 272 95 L 273 92 Z";
													break;
												case "sungin1":
													pathD = "M 282 80 L 287 79 L 292 80 L 294 82 L 295 85 L 294 88 L 292 90 L 287 91 L 282 90 L 280 88 L 279 85 L 280 82 Z";
													break;
												case "sungin2":
													pathD = "M 290 85 L 295 84 L 300 85 L 302 87 L 303 90 L 302 93 L 300 95 L 295 96 L 290 95 L 288 93 L 287 90 L 288 87 Z";
													break;
												case "cheongwunhyoja":
													pathD = "M 120 45 L 125 44 L 130 45 L 132 47 L 133 50 L 132 53 L 130 55 L 125 56 L 120 55 L 118 53 L 117 50 L 118 47 Z";
													break;
												case "hyehwa":
													pathD = "M 235 60 L 240 59 L 245 60 L 247 62 L 248 65 L 247 68 L 245 70 L 240 71 L 235 70 L 233 68 L 232 65 L 233 62 Z";
													break;
												case "sogong":
													pathD = "M 190 85 L 195 84 L 200 85 L 202 87 L 203 90 L 202 93 L 200 95 L 195 96 L 190 95 L 188 93 L 187 90 L 188 87 Z";
													break;
												case "hoehyeon":
													pathD = "M 185 95 L 190 94 L 195 95 L 197 97 L 198 100 L 197 103 L 195 105 L 190 106 L 185 105 L 183 103 L 182 100 L 183 97 Z";
													break;
												case "myeongdong":
													pathD = "M 195 90 L 200 89 L 205 90 L 207 92 L 208 95 L 207 98 L 205 100 L 200 101 L 195 100 L 193 98 L 192 95 L 193 92 Z";
													break;
												case "pildong":
													pathD = "M 200 95 L 205 94 L 210 95 L 212 97 L 213 100 L 212 103 L 210 105 L 205 106 L 200 105 L 198 103 L 197 100 L 198 97 Z";
													break;
												case "jangchung":
													pathD = "M 205 85 L 210 84 L 215 85 L 217 87 L 218 90 L 217 93 L 215 95 L 210 96 L 205 95 L 203 93 L 202 90 L 203 87 Z";
													break;
												case "gwanghee":
													pathD = "M 210 90 L 215 89 L 220 90 L 222 92 L 223 95 L 222 98 L 220 100 L 215 101 L 210 100 L 208 98 L 207 95 L 208 92 Z";
													break;
												case "eulji":
													pathD = "M 215 85 L 220 84 L 225 85 L 227 87 L 228 90 L 227 93 L 225 95 L 220 96 L 215 95 L 213 93 L 212 90 L 213 87 Z";
													break;
												case "sindang5":
													pathD = "M 220 90 L 225 89 L 230 90 L 232 92 L 233 95 L 232 98 L 230 100 L 225 101 L 220 100 L 218 98 L 217 95 L 218 92 Z";
													break;
												case "hwanghak":
													pathD = "M 225 85 L 230 84 L 235 85 L 237 87 L 238 90 L 237 93 L 235 95 L 230 96 L 225 95 L 223 93 L 222 90 L 223 87 Z";
													break;
												case "junglim":
													pathD = "M 180 80 L 185 79 L 190 80 L 192 82 L 193 85 L 192 88 L 190 90 L 185 91 L 180 90 L 178 88 L 177 85 L 178 82 Z";
													break;
												case "sindang":
													pathD = "M 230 85 L 235 84 L 240 85 L 242 87 L 243 90 L 242 93 L 240 95 L 235 96 L 230 95 L 228 93 L 227 90 L 228 87 Z";
													break;
												case "dasan":
													pathD = "M 235 80 L 240 79 L 245 80 L 247 82 L 248 85 L 247 88 L 245 90 L 240 91 L 235 90 L 233 88 L 232 85 L 233 82 Z";
													break;
												case "yaksu":
													pathD = "M 240 85 L 245 84 L 250 85 L 252 87 L 253 90 L 252 93 L 250 95 L 245 96 L 240 95 L 238 93 L 237 90 L 238 87 Z";
													break;
												case "cheonggu":
													pathD = "M 245 80 L 250 79 L 255 80 L 257 82 L 258 85 L 257 88 L 255 90 L 250 91 L 245 90 L 243 88 L 242 85 L 243 82 Z";
													break;
												case "donghwa":
													pathD = "M 250 85 L 255 84 L 260 85 L 262 87 L 263 90 L 262 93 L 260 95 L 255 96 L 250 95 L 248 93 L 247 90 L 248 87 Z";
													break;
												case "huam":
													pathD = "M 175 100 L 180 99 L 185 100 L 187 102 L 188 105 L 187 108 L 185 110 L 180 111 L 175 110 L 173 108 L 172 105 L 173 102 Z";
													break;
												case "yongsan2":
													pathD = "M 165 95 L 170 94 L 175 95 L 177 97 L 178 100 L 177 103 L 175 105 L 170 106 L 165 105 L 163 103 L 162 100 L 163 97 Z";
													break;
												case "namyoung":
													pathD = "M 155 90 L 160 89 L 165 90 L 167 92 L 168 95 L 167 98 L 165 100 L 160 101 L 155 100 L 153 98 L 152 95 L 153 92 Z";
													break;
												case "wonhyoro1":
													pathD = "M 145 85 L 150 84 L 155 85 L 157 87 L 158 90 L 157 93 L 155 95 L 150 96 L 145 95 L 143 93 L 142 90 L 143 87 Z";
													break;
												case "wonhyoro2":
													pathD = "M 135 80 L 140 79 L 145 80 L 147 82 L 148 85 L 147 88 L 145 90 L 140 91 L 135 90 L 133 88 L 132 85 L 133 82 Z";
													break;
												case "hyochang":
													pathD = "M 165 105 L 170 104 L 175 105 L 177 107 L 178 110 L 177 113 L 175 115 L 170 116 L 165 115 L 163 113 L 162 110 L 163 107 Z";
													break;
												case "yongmun":
													pathD = "M 155 100 L 160 99 L 165 100 L 167 102 L 168 105 L 167 108 L 165 110 L 160 111 L 155 110 L 153 108 L 152 105 L 153 102 Z";
													break;
												case "ichon1":
													pathD = "M 185 110 L 190 109 L 195 110 L 197 112 L 198 115 L 197 118 L 195 120 L 190 121 L 185 120 L 183 118 L 182 115 L 183 112 Z";
													break;
												case "ichon2":
													pathD = "M 175 115 L 180 114 L 185 115 L 187 117 L 188 120 L 187 123 L 185 125 L 180 126 L 175 125 L 173 123 L 172 120 L 173 117 Z";
													break;
												case "seobinggo":
													pathD = "M 195 115 L 200 114 L 205 115 L 207 117 L 208 120 L 207 123 L 205 125 L 200 126 L 195 125 L 193 123 L 192 120 L 193 117 Z";
													break;
												case "itaewon1":
													pathD = "M 205 105 L 210 104 L 215 105 L 217 107 L 218 110 L 217 113 L 215 115 L 210 116 L 205 115 L 203 113 L 202 110 L 203 107 Z";
													break;
												case "itaewon2":
													pathD = "M 215 110 L 220 109 L 225 110 L 227 112 L 228 115 L 227 118 L 225 120 L 220 121 L 215 120 L 213 118 L 212 115 L 213 112 Z";
													break;
												case "hannam":
													pathD = "M 225 115 L 230 114 L 235 115 L 237 117 L 238 120 L 237 123 L 235 125 L 230 126 L 225 125 L 223 123 L 222 120 L 223 117 Z";
													break;
												case "wangsimni2":
													pathD = "M 250 95 L 255 94 L 260 95 L 262 97 L 263 100 L 262 103 L 260 105 L 255 106 L 250 105 L 248 103 L 247 100 L 248 97 Z";
													break;
												case "majang":
													pathD = "M 265 100 L 270 99 L 275 100 L 277 102 L 278 105 L 277 108 L 275 110 L 270 111 L 265 110 L 263 108 L 262 105 L 263 102 Z";
													break;
												case "sageun":
													pathD = "M 255 105 L 260 104 L 265 105 L 267 107 L 268 110 L 267 113 L 265 115 L 260 116 L 255 115 L 253 113 L 252 110 L 253 107 Z";
													break;
												case "haengdang1":
													pathD = "M 245 105 L 250 104 L 255 105 L 257 107 L 258 110 L 257 113 L 255 115 L 250 116 L 245 115 L 243 113 L 242 110 L 243 107 Z";
													break;
												case "haengdang2":
													pathD = "M 235 110 L 240 109 L 245 110 L 247 112 L 248 115 L 247 118 L 245 120 L 240 121 L 235 120 L 233 118 L 232 115 L 233 112 Z";
													break;
												case "eungbong":
													pathD = "M 240 100 L 245 99 L 250 100 L 252 102 L 253 105 L 252 108 L 250 110 L 245 111 L 240 110 L 238 108 L 237 105 L 238 102 Z";
													break;
												case "geumho1":
													pathD = "M 230 105 L 235 104 L 240 105 L 242 107 L 243 110 L 242 113 L 240 115 L 235 116 L 230 115 L 228 113 L 227 110 L 228 107 Z";
													break;
												case "geumho23":
													pathD = "M 225 110 L 230 109 L 235 110 L 237 112 L 238 115 L 237 118 L 235 120 L 230 121 L 225 120 L 223 118 L 222 115 L 223 112 Z";
													break;
												case "geumho4":
													pathD = "M 220 115 L 225 114 L 230 115 L 232 117 L 233 120 L 232 123 L 230 125 L 225 126 L 220 125 L 218 123 L 217 120 L 218 117 Z";
													break;
												case "oksu":
													pathD = "M 215 120 L 220 119 L 225 120 L 227 122 L 228 125 L 227 128 L 225 130 L 220 131 L 215 130 L 213 128 L 212 125 L 213 122 Z";
													break;
												case "seongsu":
													pathD = "M 275 105 L 280 104 L 285 105 L 287 107 L 288 110 L 287 113 L 285 115 L 280 116 L 275 115 L 273 113 L 272 110 L 273 107 Z";
													break;
												case "songjeong":
													pathD = "M 285 110 L 290 109 L 295 110 L 297 112 L 298 115 L 297 118 L 295 120 L 290 121 L 285 120 L 283 118 L 282 115 L 283 112 Z";
													break;
												case "wangsimni":
													pathD = "M 255 90 L 260 89 L 265 90 L 267 92 L 268 95 L 267 98 L 265 100 L 260 101 L 255 100 L 253 98 L 252 95 L 253 92 Z";
													break;
												case "hwayang":
													pathD = "M 267 95 L 274 94 L 277 94 L 278 94 L 279 94 L 280 94 L 281 94 L 282 94 L 282 93 L 282 92 L 281 92 L 280 91 L 279 91 L 277 91 L 276 90 L 275 90 L 273 90 L 272 91 L 271 91 L 270 91 L 269 91 L 268 92 L 267 93 L 266 93 L 265 94 L 264 95 L 264 96 L 264 97 L 265 98 L 266 98 L 267 97 L 267 96 Z";
													break;
												case "gunja":
													pathD = "M 276 97 L 279 96 L 282 97 L 284 99 L 285 102 L 284 105 L 282 107 L 279 108 L 276 107 L 274 105 L 273 102 L 274 99 Z";
													break;
												case "junggok1":
													pathD = "M 285 102 L 288 101 L 291 102 L 293 104 L 294 107 L 293 110 L 291 112 L 288 113 L 285 112 L 283 110 L 282 107 L 283 104 Z";
													break;
												case "junggok2":
													pathD = "M 294 97 L 297 96 L 300 97 L 302 99 L 303 102 L 302 105 L 300 107 L 297 108 L 294 107 L 292 105 L 291 102 L 292 99 Z";
													break;
												case "junggok3":
													pathD = "M 285 112 L 288 111 L 291 112 L 293 114 L 294 117 L 293 120 L 291 122 L 288 123 L 285 122 L 283 120 L 282 117 L 283 114 Z";
													break;
												case "junggok4":
													pathD = "M 294 107 L 297 106 L 300 107 L 302 109 L 303 112 L 302 115 L 300 117 L 297 118 L 294 117 L 292 115 L 291 112 L 292 109 Z";
													break;
												case "neungdong":
													pathD = "M 285 92 L 288 91 L 291 92 L 293 94 L 294 97 L 293 100 L 291 102 L 288 103 L 285 102 L 283 100 L 282 97 L 283 94 Z";
													break;
												case "guui1":
													pathD = "M 282 87 L 285 86 L 288 87 L 290 89 L 291 92 L 290 95 L 288 97 L 285 98 L 282 97 L 280 95 L 279 92 L 280 89 Z";
													break;
												case "guui2":
													pathD = "M 291 82 L 294 81 L 297 82 L 299 84 L 300 87 L 299 90 L 297 92 L 294 93 L 291 92 L 289 90 L 288 87 L 289 84 Z";
													break;
												case "guui3":
													pathD = "M 300 77 L 303 76 L 306 77 L 308 79 L 309 82 L 308 85 L 306 87 L 303 88 L 300 87 L 298 85 L 297 82 L 298 79 Z";
													break;
												case "jayang1":
													pathD = "M 288 82 L 291 81 L 294 82 L 296 84 L 297 87 L 296 90 L 294 92 L 291 93 L 288 92 L 286 90 L 285 87 L 286 84 Z";
													break;
												case "jayang2":
													pathD = "M 279 77 L 282 76 L 285 77 L 287 79 L 288 82 L 287 85 L 285 87 L 282 88 L 279 87 L 277 85 L 276 82 L 277 79 Z";
													break;
												case "jayang3":
													pathD = "M 273 82 L 276 81 L 279 82 L 281 84 L 282 87 L 281 90 L 279 92 L 276 93 L 273 92 L 271 90 L 270 87 L 271 84 Z";
													break;
												case "jayang4":
													pathD = "M 267 77 L 270 76 L 273 77 L 275 79 L 276 82 L 275 85 L 273 87 L 270 88 L 267 87 L 265 85 L 264 82 L 265 79 Z";
													break;
												case "gwangjang":
													pathD = "M 306 72 L 309 71 L 312 72 L 314 74 L 315 77 L 314 80 L 312 82 L 309 83 L 306 82 L 304 80 L 303 77 L 304 74 Z";
													break;
												case "hoegi":
													pathD = "M 230 65 L 233 64 L 236 65 L 238 67 L 239 70 L 238 73 L 236 75 L 233 76 L 230 75 L 228 73 L 227 70 L 228 67 Z";
													break;
												case "cheongnyangri":
													pathD = "M 220 70 L 223 69 L 226 70 L 228 72 L 229 75 L 228 78 L 226 80 L 223 81 L 220 80 L 218 78 L 217 75 L 218 72 Z";
													break;
												case "hwigyeong1":
													pathD = "M 235 75 L 238 74 L 241 75 L 243 77 L 244 80 L 243 83 L 241 85 L 238 86 L 235 85 L 233 83 L 232 80 L 233 77 Z";
													break;
												case "hwigyeong2":
													pathD = "M 240 70 L 243 69 L 246 70 L 248 72 L 249 75 L 248 78 L 246 80 L 243 81 L 240 80 L 238 78 L 237 75 L 238 72 Z";
													break;
												case "yongsin":
													pathD = "M 215 80 L 218 79 L 221 80 L 223 82 L 224 85 L 223 88 L 221 90 L 218 91 L 215 90 L 213 88 L 212 85 L 213 82 Z";
													break;
												case "jegi":
													pathD = "M 220 85 L 223 84 L 226 85 L 228 87 L 229 90 L 228 93 L 226 95 L 223 96 L 220 95 L 218 93 L 217 90 L 218 87 Z";
													break;
												case "jeonnong1":
													pathD = "M 225 90 L 228 89 L 231 90 L 233 92 L 234 95 L 233 98 L 231 100 L 228 101 L 225 100 L 223 98 L 222 95 L 223 92 Z";
													break;
												case "jeonnong2":
													pathD = "M 230 85 L 233 84 L 236 85 L 238 87 L 239 90 L 238 93 L 236 95 L 233 96 L 230 95 L 228 93 L 227 90 L 228 87 Z";
													break;
												case "dapsimni1":
													pathD = "M 220 95 L 223 94 L 226 95 L 228 97 L 229 100 L 228 103 L 226 105 L 223 106 L 220 105 L 218 103 L 217 100 L 218 97 Z";
													break;
												case "dapsimni2":
													pathD = "M 225 95 L 228 94 L 231 95 L 233 97 L 234 100 L 233 103 L 231 105 L 228 106 L 225 105 L 223 103 L 222 100 L 223 97 Z";
													break;
												case "jangan1":
													pathD = "M 235 95 L 238 94 L 241 95 L 243 97 L 244 100 L 243 103 L 241 105 L 238 106 L 235 105 L 233 103 L 232 100 L 233 97 Z";
													break;
												case "jangan2":
													pathD = "M 240 90 L 243 89 L 246 90 L 248 92 L 249 95 L 248 98 L 246 100 L 243 101 L 240 100 L 238 98 L 237 95 L 238 92 Z";
													break;
												case "imun1":
													pathD = "M 245 85 L 248 84 L 251 85 L 253 87 L 254 90 L 253 93 L 251 95 L 248 96 L 245 95 L 243 93 L 242 90 L 243 87 Z";
													break;
												case "imun2":
													pathD = "M 250 80 L 253 79 L 256 80 L 258 82 L 259 85 L 258 88 L 256 90 L 253 91 L 250 90 L 248 88 L 247 85 L 248 82 Z";
													break;
											}
											return pathD ? (
												<path
													key={district.id}
													d={pathD}
													fill={region.color}
													stroke="#666"
													strokeWidth="1"
													className="cursor-pointer hover:opacity-80 transition-opacity"
													onClick={() => handleRegionClick(region)}
												/>
											) : null;
										})}
										<text
											x={DISTRICT_POSITIONS[3].x + DISTRICT_POSITIONS[3].width / 2}
											y={DISTRICT_POSITIONS[3].y + DISTRICT_POSITIONS[3].height / 2}
											textAnchor="middle"
											className="text-xs font-medium fill-gray-700 pointer-events-none"
										>
											{region.name}
										</text>
									</g>
								);
							}

							const pos = DISTRICT_POSITIONS[index];
							return (
								<g key={region.id}>
									<rect
										x={pos.x}
										y={pos.y}
										width={pos.width}
										height={pos.height}
										fill={region.color}
										stroke="#666"
										strokeWidth="1"
										rx="4"
										className="cursor-pointer hover:opacity-80 transition-opacity"
										onClick={() => handleRegionClick(region)}
									/>
									<text
										x={pos.x + pos.width / 2}
										y={pos.y + pos.height / 2 + 4}
										textAnchor="middle"
										className="text-xs font-medium fill-gray-700 pointer-events-none"
									>
										{region.name}
									</text>
								</g>
							);
						})}
						<text x="200" y="50" textAnchor="middle" className="text-sm font-bold fill-gray-800">
							서울특별시
						</text>
					</svg>
				</div>

				<p className="text-center text-sm text-gray-600 mt-4">지역을 선택해주세요</p>
			</div>
		);
	}

	if (selectedLevel === "district" && selectedRegion) {
		return (
			<div className="bg-white rounded-lg p-6 shadow-lg">
				<div className="flex items-center justify-between mb-6">
					<Button variant="ghost" onClick={handleBackToCity} className="text-sm">
						← 지역 선택으로
					</Button>
					<h2 className="text-lg font-bold text-gray-800">{selectedRegion.name}</h2>
					<div></div>
				</div>

				<div className="grid grid-cols-2 gap-3">
					{selectedRegion.districts?.map((district: District) => (
						<Button
							key={district.id}
							variant="outline"
							className="h-16 flex flex-col items-center justify-center hover:bg-gray-50 bg-transparent"
							onClick={() => handleDistrictClick(district)}
						>
							<span className="font-medium">{district.name}</span>
							<ChevronRight className="h-4 w-4 mt-1" />
						</Button>
					))}
				</div>
			</div>
		);
	}

	if (selectedLevel === "neighborhood" && selectedDistrict) {
		return (
			<div className="bg-white rounded-lg p-6 shadow-lg">
				<div className="flex items-center justify-between mb-6">
					<Button variant="ghost" onClick={handleBackToDistrict} className="text-sm">
						← {selectedRegion?.name}로
					</Button>
					<h2 className="text-lg font-bold text-gray-800">{selectedDistrict.name}</h2>
					<div></div>
				</div>

				<div className="grid grid-cols-1 gap-3">
					{selectedDistrict.neighborhoods?.map((neighborhood: string) => (
						<Button
							key={neighborhood}
							variant="outline"
							className="h-12 justify-between hover:bg-gray-50 bg-transparent"
						>
							<span className="font-medium">{neighborhood}</span>
							<span className="text-xs text-gray-500">산책 코스 보기</span>
						</Button>
					))}
				</div>
			</div>
		);
	}

	return null;
}
