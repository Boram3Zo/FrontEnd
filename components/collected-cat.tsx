interface CollectedCatProps {
  breed: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const breedStyles = {
  "코리안 숏헤어": {
    bodyColor: "#f0f0f0",
    earColor: "#ffb3d1",
    eyeColor: "#87ceeb",
    pattern: "solid",
  },
  "러시안 블루": {
    bodyColor: "#9ca3af",
    earColor: "#f3f4f6",
    eyeColor: "#10b981",
    pattern: "solid",
  },
  페르시안: {
    bodyColor: "#d4a574",
    earColor: "#fbbf24",
    eyeColor: "#3b82f6",
    pattern: "fluffy",
  },
  "스코티시 폴드": {
    bodyColor: "#fbbf24",
    earColor: "#f59e0b",
    eyeColor: "#8b5cf6",
    pattern: "folded",
  },
  "브리티시 숏헤어": {
    bodyColor: "#a8a8a8",
    earColor: "#d1d5db",
    eyeColor: "#f59e0b",
    pattern: "round",
  },
  "아메리칸 숏헤어": {
    bodyColor: "#fbbf24",
    earColor: "#f59e0b",
    eyeColor: "#10b981",
    pattern: "striped",
  },
  메인쿤: {
    bodyColor: "#8b4513",
    earColor: "#a0522d",
    eyeColor: "#dc2626",
    pattern: "large",
  },
  "터키시 앙고라": {
    bodyColor: "#ffffff",
    earColor: "#f8fafc",
    eyeColor: "#3b82f6",
    pattern: "fluffy_white",
  },
  랙돌: {
    bodyColor: "#f5f5dc",
    earColor: "#deb887",
    eyeColor: "#4169e1",
    pattern: "ragdoll",
  },
  턱시도: {
    bodyColor: "#000000",
    earColor: "#2d2d2d",
    eyeColor: "#32cd32",
    pattern: "tuxedo",
  },
  샴: {
    bodyColor: "#f5deb3",
    earColor: "#8b4513",
    eyeColor: "#4169e1",
    pattern: "siamese",
  },
  "노르웨이 숲": {
    bodyColor: "#f5f5dc",
    earColor: "#deb887",
    eyeColor: "#228b22",
    pattern: "norwegian_forest",
  },
  먼치킨: {
    bodyColor: "#daa520",
    earColor: "#b8860b",
    eyeColor: "#4169e1",
    pattern: "munchkin",
  },
}

export function CollectedCat({ breed, size = "md", className = "" }: CollectedCatProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const style = breedStyles[breed as keyof typeof breedStyles] || breedStyles["코리안 숏헤어"]

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        {/* Cat body - larger for Maine Coon */}
        <ellipse
          cx="50"
          cy="70"
          rx={style.pattern === "large" || style.pattern === "norwegian_forest" ? "30" : "25"}
          ry={
            style.pattern === "large" || style.pattern === "norwegian_forest"
              ? "25"
              : style.pattern === "munchkin"
                ? "18"
                : "20"
          }
          fill={style.bodyColor}
          stroke="#d1d5db"
          strokeWidth="1.5"
        />

        {/* Cat head - rounder for British Shorthair */}
        <circle
          cx="50"
          cy="35"
          r={
            style.pattern === "round" || style.pattern === "large" || style.pattern === "norwegian_forest" ? "24" : "20"
          }
          fill={style.bodyColor}
          stroke="#d1d5db"
          strokeWidth="1.5"
        />

        {/* Cat ears - different styles based on breed */}
        {style.pattern === "folded" ? (
          // Folded ears for Scottish Fold
          <>
            <ellipse cx="40" cy="22" rx="6" ry="8" fill={style.bodyColor} stroke="#d1d5db" strokeWidth="1.5" />
            <ellipse cx="60" cy="22" rx="6" ry="8" fill={style.bodyColor} stroke="#d1d5db" strokeWidth="1.5" />
            <ellipse cx="40" cy="22" rx="3" ry="4" fill={style.earColor} />
            <ellipse cx="60" cy="22" rx="3" ry="4" fill={style.earColor} />
          </>
        ) : style.pattern === "large" || style.pattern === "norwegian_forest" ? (
          // Larger ears for Maine Coon and Norwegian Forest
          <>
            <polygon points="32,18 38,2 44,18" fill={style.bodyColor} stroke="#d1d5db" strokeWidth="1.5" />
            <polygon points="56,18 62,2 68,18" fill={style.bodyColor} stroke="#d1d5db" strokeWidth="1.5" />
            <polygon points="34,16 38,8 42,16" fill={style.earColor} />
            <polygon points="58,16 62,8 66,16" fill={style.earColor} />
            {/* Ear tufts for Maine Coon and Norwegian Forest */}
            <line x1="38" y1="2" x2="38" y2="-2" stroke={style.bodyColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="62" y1="2" x2="62" y2="-2" stroke={style.bodyColor} strokeWidth="2" strokeLinecap="round" />
          </>
        ) : style.pattern === "munchkin" ? (
          // Smaller ears for Munchkin
          <>
            <polygon points="37,22 40,8 43,22" fill={style.bodyColor} stroke="#d1d5db" strokeWidth="1.5" />
            <polygon points="57,22 60,8 63,22" fill={style.bodyColor} stroke="#d1d5db" strokeWidth="1.5" />
            <polygon points="38,20 40,12 42,20" fill={style.earColor} />
            <polygon points="58,20 60,12 62,20" fill={style.earColor} />
          </>
        ) : style.pattern === "ragdoll" ? (
          // Ragdoll ears
          <>
            <polygon points="35,20 40,5 45,20" fill={style.bodyColor} stroke="#d1d5db" strokeWidth="1.5" />
            <polygon points="55,20 60,5 65,20" fill={style.bodyColor} stroke="#d1d5db" strokeWidth="1.5" />
            <polygon points="37,18 40,10 43,18" fill={style.earColor} />
            <polygon points="57,18 60,10 63,18" fill={style.earColor} />
          </>
        ) : style.pattern === "siamese" ? (
          // Siamese ears
          <>
            <polygon points="35,20 40,5 45,20" fill={style.bodyColor} stroke="#d1d5db" strokeWidth="1.5" />
            <polygon points="55,20 60,5 65,20" fill={style.bodyColor} stroke="#d1d5db" strokeWidth="1.5" />
            <polygon points="37,18 40,10 43,18" fill={style.earColor} />
            <polygon points="57,18 60,10 63,18" fill={style.earColor} />
          </>
        ) : (
          // Normal pointed ears
          <>
            <polygon points="35,20 40,5 45,20" fill={style.bodyColor} stroke="#d1d5db" strokeWidth="1.5" />
            <polygon points="55,20 60,5 65,20" fill={style.bodyColor} stroke="#d1d5db" strokeWidth="1.5" />
            <polygon points="37,18 40,10 43,18" fill={style.earColor} />
            <polygon points="57,18 60,10 63,18" fill={style.earColor} />
          </>
        )}

        {/* Eyes */}
        <circle cx="43" cy="32" r="4" fill={style.eyeColor} />
        <circle cx="57" cy="32" r="4" fill={style.eyeColor} />
        <circle cx="44" cy="31" r="1.5" fill="white" />
        <circle cx="58" cy="31" r="1.5" fill="white" />

        {/* Nose */}
        <polygon points="50,38 48,42 52,42" fill="#ff9eb5" />

        {/* Mouth */}
        <path d="M 50 42 Q 45 45 40 42" stroke="#d1d5db" strokeWidth="1.5" fill="none" />
        <path d="M 50 42 Q 55 45 60 42" stroke="#d1d5db" strokeWidth="1.5" fill="none" />

        {/* Whiskers */}
        <line x1="25" y1="35" x2="35" y2="33" stroke="#d1d5db" strokeWidth="1" />
        <line x1="25" y1="40" x2="35" y2="40" stroke="#d1d5db" strokeWidth="1" />
        <line x1="65" y1="33" x2="75" y2="35" stroke="#d1d5db" strokeWidth="1" />
        <line x1="65" y1="40" x2="75" y2="40" stroke="#d1d5db" strokeWidth="1" />

        {/* Tail - longer for Maine Coon */}
        <path
          d={
            style.pattern === "large" || style.pattern === "norwegian_forest"
              ? "M 80 65 Q 90 45 85 25"
              : "M 75 65 Q 85 50 80 35"
          }
          stroke="#d1d5db"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Breed-specific patterns */}
        {style.pattern === "fluffy" && (
          // Fluffy texture for Persian
          <>
            <circle cx="35" cy="30" r="2" fill={style.bodyColor} opacity="0.7" />
            <circle cx="65" cy="30" r="2" fill={style.bodyColor} opacity="0.7" />
            <circle cx="30" cy="65" r="3" fill={style.bodyColor} opacity="0.7" />
            <circle cx="70" cy="65" r="3" fill={style.bodyColor} opacity="0.7" />
          </>
        )}

        {/* Striped pattern for American Shorthair (망고) */}
        {style.pattern === "striped" && (
          <>
            <path d="M 30 25 Q 50 20 70 25" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 28 35 Q 50 30 72 35" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 25 60 Q 50 55 75 60" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 27 75 Q 50 70 73 75" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.6" />
          </>
        )}

        {/* Extra fluffy texture for Turkish Angora (구름) */}
        {style.pattern === "fluffy_white" && (
          <>
            <circle cx="32" cy="28" r="3" fill="white" opacity="0.8" />
            <circle cx="68" cy="28" r="3" fill="white" opacity="0.8" />
            <circle cx="28" cy="62" r="4" fill="white" opacity="0.8" />
            <circle cx="72" cy="62" r="4" fill="white" opacity="0.8" />
            <circle cx="50" cy="75" r="3" fill="white" opacity="0.8" />
            {/* Extra fluffy chest */}
            <ellipse cx="50" cy="55" rx="8" ry="5" fill="white" opacity="0.6" />
          </>
        )}

        {/* Round cheeks for British Shorthair (코코) */}
        {style.pattern === "round" && (
          <>
            <circle cx="32" cy="42" r="4" fill={style.bodyColor} opacity="0.8" />
            <circle cx="68" cy="42" r="4" fill={style.bodyColor} opacity="0.8" />
          </>
        )}

        {/* Ragdoll pattern - extra fluffy with color points */}
        {style.pattern === "ragdoll" && (
          <>
            <circle cx="30" cy="25" r="3" fill="#deb887" opacity="0.7" />
            <circle cx="70" cy="25" r="3" fill="#deb887" opacity="0.7" />
            <ellipse cx="50" cy="55" rx="10" ry="6" fill="white" opacity="0.8" />
            <circle cx="25" cy="65" r="4" fill="white" opacity="0.6" />
            <circle cx="75" cy="65" r="4" fill="white" opacity="0.6" />
          </>
        )}

        {/* Tuxedo pattern - black and white markings */}
        {style.pattern === "tuxedo" && (
          <>
            <ellipse cx="50" cy="55" rx="8" ry="12" fill="white" />
            <circle cx="50" cy="40" r="6" fill="white" />
            <polygon points="45,48 50,45 55,48 55,65 45,65" fill="white" />
          </>
        )}

        {/* Siamese pattern - color points on ears, face, and tail */}
        {style.pattern === "siamese" && (
          <>
            <circle cx="40" cy="22" r="8" fill="#8b4513" opacity="0.6" />
            <circle cx="60" cy="22" r="8" fill="#8b4513" opacity="0.6" />
            <ellipse cx="50" cy="45" rx="12" ry="8" fill="#8b4513" opacity="0.4" />
            <path d="M 75 65 Q 85 50 80 35" stroke="#8b4513" strokeWidth="4" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* Norwegian Forest pattern - extra fluffy with long coat */}
        {style.pattern === "norwegian_forest" && (
          <>
            {/* Extra fluffy chest and body */}
            <ellipse cx="50" cy="55" rx="12" ry="8" fill={style.bodyColor} opacity="0.8" />
            <circle cx="28" cy="60" r="5" fill={style.bodyColor} opacity="0.7" />
            <circle cx="72" cy="60" r="5" fill={style.bodyColor} opacity="0.7" />
            <circle cx="35" cy="75" r="4" fill={style.bodyColor} opacity="0.6" />
            <circle cx="65" cy="75" r="4" fill={style.bodyColor} opacity="0.6" />
            {/* Fluffy neck ruff */}
            <ellipse cx="50" cy="48" rx="15" ry="6" fill={style.bodyColor} opacity="0.5" />
            {/* Fluffy leg fur */}
            <circle cx="40" cy="85" r="3" fill={style.bodyColor} opacity="0.6" />
            <circle cx="60" cy="85" r="3" fill={style.bodyColor} opacity="0.6" />
          </>
        )}

        {/* Munchkin pattern - shorter legs and compact body */}
        {style.pattern === "munchkin" && (
          <>
            {/* Shorter, stubby legs */}
            <ellipse cx="40" cy="85" rx="3" ry="6" fill={style.bodyColor} />
            <ellipse cx="60" cy="85" rx="3" ry="6" fill={style.bodyColor} />
            {/* Compact, round body shape */}
            <circle cx="50" cy="65" r="8" fill={style.bodyColor} opacity="0.6" />
            {/* Cute round cheeks */}
            <circle cx="38" cy="38" r="3" fill={style.bodyColor} opacity="0.7" />
            <circle cx="62" cy="38" r="3" fill={style.bodyColor} opacity="0.7" />
          </>
        )}

        {/* Cute blush */}
        <circle cx="35" cy="40" r="3" fill="#ffb3d1" opacity="0.4" />
        <circle cx="65" cy="40" r="3" fill="#ffb3d1" opacity="0.4" />
      </svg>
    </div>
  )
}

