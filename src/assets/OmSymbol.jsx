import { motion } from 'framer-motion';

export default function OmSymbol({ className = '', size = 60, color = '#D4A843', animate = false }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={animate ? { rotate: 360 } : {}}
      transition={animate ? { duration: 20, repeat: Infinity, ease: "linear" } : {}}
    >
      <defs>
        <linearGradient id="omGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      {/* Om character rendered as path */}
      <text
        x="50"
        y="70"
        textAnchor="middle"
        fill="url(#omGrad)"
        fontSize="72"
        fontFamily="serif"
        opacity="0.8"
      >
        ॐ
      </text>
    </motion.svg>
  );
}
