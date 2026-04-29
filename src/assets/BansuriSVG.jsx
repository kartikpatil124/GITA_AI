import { motion } from 'framer-motion';

export default function BansuriSVG({ className = '', animate = false }) {
  return (
    <motion.svg
      viewBox="0 0 400 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animate ? { rotate: 0 } : {}}
      animate={animate ? { rotate: 360 } : {}}
      transition={animate ? { duration: 4, repeat: Infinity, ease: "linear" } : {}}
    >
      <defs>
        <linearGradient id="bansuriGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B6914" />
          <stop offset="25%" stopColor="#D4A843" />
          <stop offset="50%" stopColor="#F5D77A" />
          <stop offset="75%" stopColor="#D4A843" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        <linearGradient id="bansuriDark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6B4F1D" />
          <stop offset="50%" stopColor="#8B6914" />
          <stop offset="100%" stopColor="#6B4F1D" />
        </linearGradient>
        <filter id="bansuriGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="holeGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#1a0f00" />
          <stop offset="100%" stopColor="#3d2800" />
        </radialGradient>
      </defs>

      {/* Glow behind flute */}
      <ellipse cx="200" cy="40" rx="190" ry="25" fill="rgba(255, 215, 0, 0.06)" />

      {/* Main flute body */}
      <rect x="20" y="25" width="360" height="30" rx="15" ry="15" fill="url(#bansuriGold)" filter="url(#bansuriGlow)" />

      {/* Top highlight */}
      <rect x="25" y="27" width="350" height="8" rx="4" fill="rgba(255, 255, 255, 0.15)" />
      
      {/* Bottom shadow */}
      <rect x="25" y="45" width="350" height="6" rx="3" fill="rgba(0, 0, 0, 0.15)" />

      {/* Finger holes */}
      {[100, 140, 180, 220, 260, 300].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="40" r="7" fill="url(#holeGrad)" stroke="#6B4F1D" strokeWidth="1.5" />
          <circle cx={x} cy="38" r="3" fill="rgba(255, 255, 255, 0.06)" />
        </g>
      ))}

      {/* Blow hole */}
      <ellipse cx="55" cy="40" rx="10" ry="8" fill="url(#holeGrad)" stroke="#6B4F1D" strokeWidth="1.5" />

      {/* Decorative bands */}
      {[80, 330, 350].map((x, i) => (
        <rect key={i} x={x} y="26" width="4" height="28" rx="2" fill="url(#bansuriDark)" opacity="0.6" />
      ))}

      {/* Thread wrapping decoration */}
      <rect x="335" y="26" width="20" height="28" rx="4" fill="none" stroke="#FF9933" strokeWidth="1" opacity="0.5" />
      
      {/* Peacock feather attachment point */}
      <circle cx="370" cy="30" r="4" fill="#FF9933" opacity="0.6" />
    </motion.svg>
  );
}
