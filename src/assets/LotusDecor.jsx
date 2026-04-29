export default function LotusDecor({ className = '', size = 40, color = '#D4A843' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} opacity="0.8" />
          <stop offset="50%" stopColor="#FFD700" opacity="0.9" />
          <stop offset="100%" stopColor={color} opacity="0.8" />
        </linearGradient>
      </defs>
      {/* Center petal */}
      <path d="M50 15 Q55 35 50 55 Q45 35 50 15Z" fill="url(#lotusGrad)" opacity="0.7" />
      {/* Left petals */}
      <path d="M30 30 Q45 40 50 55 Q35 45 30 30Z" fill="url(#lotusGrad)" opacity="0.6" />
      <path d="M15 50 Q35 48 50 55 Q30 55 15 50Z" fill="url(#lotusGrad)" opacity="0.5" />
      {/* Right petals */}
      <path d="M70 30 Q55 40 50 55 Q65 45 70 30Z" fill="url(#lotusGrad)" opacity="0.6" />
      <path d="M85 50 Q65 48 50 55 Q70 55 85 50Z" fill="url(#lotusGrad)" opacity="0.5" />
      {/* Bottom petals */}
      <path d="M30 70 Q40 58 50 55 Q38 65 30 70Z" fill="url(#lotusGrad)" opacity="0.5" />
      <path d="M70 70 Q60 58 50 55 Q62 65 70 70Z" fill="url(#lotusGrad)" opacity="0.5" />
      {/* Center circle */}
      <circle cx="50" cy="55" r="5" fill="#FFD700" opacity="0.8" />
      {/* Base */}
      <path d="M35 75 Q50 65 65 75 Q50 80 35 75Z" fill="url(#lotusGrad)" opacity="0.4" />
    </svg>
  );
}
