interface CatCharacterProps {
  className?: string
  animation?: "bounce" | "wiggle" | "none"
  size?: "sm" | "md" | "lg"
}

export function CatCharacter({ className = "", animation = "none", size = "md" }: CatCharacterProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  }

  const animationClasses = {
    bounce: "cat-bounce",
    wiggle: "cat-wiggle",
    none: "",
  }

  return (
    <div className={`${sizeClasses[size]} ${animationClasses[animation]} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        {/* Cat body */}
        <ellipse cx="50" cy="70" rx="25" ry="20" fill="#f8f8f8" stroke="#e0e0e0" strokeWidth="2" />

        {/* Cat head */}
        <circle cx="50" cy="35" r="20" fill="#f8f8f8" stroke="#e0e0e0" strokeWidth="2" />

        {/* Cat ears */}
        <polygon points="35,20 40,5 45,20" fill="#f8f8f8" stroke="#e0e0e0" strokeWidth="2" />
        <polygon points="55,20 60,5 65,20" fill="#f8f8f8" stroke="#e0e0e0" strokeWidth="2" />

        {/* Inner ears */}
        <polygon points="37,18 40,10 43,18" fill="#ffb3d1" />
        <polygon points="57,18 60,10 63,18" fill="#ffb3d1" />

        {/* Eyes */}
        <circle cx="43" cy="32" r="4" fill="#87ceeb" />
        <circle cx="57" cy="32" r="4" fill="#87ceeb" />
        <circle cx="44" cy="31" r="1.5" fill="white" />
        <circle cx="58" cy="31" r="1.5" fill="white" />

        {/* Nose */}
        <polygon points="50,38 48,42 52,42" fill="#ff9eb5" />

        {/* Mouth */}
        <path d="M 50 42 Q 45 45 40 42" stroke="#d0d0d0" strokeWidth="1.5" fill="none" />
        <path d="M 50 42 Q 55 45 60 42" stroke="#d0d0d0" strokeWidth="1.5" fill="none" />

        {/* Whiskers */}
        <line x1="25" y1="35" x2="35" y2="33" stroke="#d0d0d0" strokeWidth="1.5" />
        <line x1="25" y1="40" x2="35" y2="40" stroke="#d0d0d0" strokeWidth="1.5" />
        <line x1="65" y1="33" x2="75" y2="35" stroke="#d0d0d0" strokeWidth="1.5" />
        <line x1="65" y1="40" x2="75" y2="40" stroke="#d0d0d0" strokeWidth="1.5" />

        {/* Tail */}
        <path d="M 75 65 Q 85 50 80 35" stroke="#e0e0e0" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Cute blush */}
        <circle cx="35" cy="40" r="3" fill="#ffb3d1" opacity="0.6" />
        <circle cx="65" cy="40" r="3" fill="#ffb3d1" opacity="0.6" />
      </svg>
    </div>
  )
}
