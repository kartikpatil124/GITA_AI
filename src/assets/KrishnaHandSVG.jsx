import { motion } from 'framer-motion';

export default function KrishnaHandSVG({ className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D5AA0" />
          <stop offset="40%" stopColor="#3B6DB5" />
          <stop offset="100%" stopColor="#1E3F73" />
        </linearGradient>
        <linearGradient id="braceletGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4A843" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#D4A843" />
        </linearGradient>
        <filter id="handGlow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="divineAura" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(255, 215, 0, 0.3)" />
          <stop offset="60%" stopColor="rgba(255, 215, 0, 0.1)" />
          <stop offset="100%" stopColor="rgba(255, 215, 0, 0)" />
        </radialGradient>
      </defs>

      {/* Divine aura glow */}
      <ellipse cx="100" cy="160" rx="90" ry="130" fill="url(#divineAura)" />

      {/* Wrist / forearm */}
      <path
        d="M70 280 Q68 250 72 220 Q74 200 80 185"
        stroke="url(#skinGrad)"
        strokeWidth="35"
        strokeLinecap="round"
        fill="none"
        filter="url(#handGlow)"
      />

      {/* Palm */}
      <ellipse cx="95" cy="170" rx="30" ry="35" fill="url(#skinGrad)" filter="url(#handGlow)" />

      {/* Thumb */}
      <path
        d="M65 170 Q55 155 58 140 Q60 130 65 125"
        stroke="url(#skinGrad)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />

      {/* Index finger - curved as if holding bansuri */}
      <path
        d="M85 140 Q82 120 85 100 Q87 85 92 75"
        stroke="url(#skinGrad)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />

      {/* Middle finger */}
      <path
        d="M100 138 Q98 115 100 90 Q102 75 105 65"
        stroke="url(#skinGrad)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />

      {/* Ring finger */}
      <path
        d="M115 140 Q114 120 115 100 Q116 85 118 75"
        stroke="url(#skinGrad)"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />

      {/* Little finger */}
      <path
        d="M128 145 Q128 130 128 115 Q128 100 130 90"
        stroke="url(#skinGrad)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bracelet / Kangan */}
      <ellipse cx="78" cy="220" rx="22" ry="8" fill="none" stroke="url(#braceletGrad)" strokeWidth="4" />
      <ellipse cx="78" cy="228" rx="22" ry="8" fill="none" stroke="url(#braceletGrad)" strokeWidth="3" opacity="0.7" />

      {/* Ring on finger */}
      <ellipse cx="100" cy="115" rx="8" ry="4" fill="none" stroke="#FFD700" strokeWidth="2.5" />

      {/* Subtle finger details - knuckle lines */}
      <line x1="82" y1="115" x2="90" y2="115" stroke="rgba(30, 63, 115, 0.5)" strokeWidth="1" />
      <line x1="97" y1="110" x2="105" y2="110" stroke="rgba(30, 63, 115, 0.5)" strokeWidth="1" />
      <line x1="112" y1="115" x2="120" y2="115" stroke="rgba(30, 63, 115, 0.5)" strokeWidth="1" />
    </motion.svg>
  );
}
