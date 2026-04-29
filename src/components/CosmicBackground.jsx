import AnimatedStars from './AnimatedStars';

export default function CosmicBackground({ pulseMode = false }) {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      {/* Base cosmic gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(45, 27, 105, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(26, 17, 69, 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(139, 105, 20, 0.08) 0%, transparent 40%),
            linear-gradient(180deg, #060918 0%, #0A0E27 20%, #0F1535 50%, #1A1145 80%, #080B1A 100%)
          `,
        }}
      />

      {/* Nebula glow effects */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(45, 27, 105, 0.6) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'cosmic-pulse 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(212, 168, 67, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'cosmic-pulse 12s ease-in-out infinite 2s',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(255, 153, 51, 0.15) 0%, transparent 60%)',
          filter: 'blur(100px)',
          animation: 'cosmic-pulse 15s ease-in-out infinite 4s',
        }}
      />

      {/* Stars canvas */}
      <AnimatedStars pulseMode={pulseMode} />

      {/* Subtle scan line overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />
    </div>
  );
}
