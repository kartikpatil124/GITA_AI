import { useRef, useEffect, useCallback } from 'react';

export default function AnimatedStars({ pulseMode = false }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animRef = useRef(null);
  const pulseRef = useRef(pulseMode);

  useEffect(() => { pulseRef.current = pulseMode; }, [pulseMode]);

  const createStars = useCallback((w, h) => {
    const count = Math.min(180, Math.floor((w * h) / 8000));
    return Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      baseOpacity: Math.random() * 0.5 + 0.15,
      twinkleSpeed: Math.random() * 0.008 + 0.002,
      twinklePhase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.08,
      driftY: -Math.random() * 0.04 - 0.01,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      starsRef.current = createStars(w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, w, h);

      for (const s of starsRef.current) {
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;

        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        let opacity = s.baseOpacity * (0.7 + 0.3 * twinkle);

        if (pulseRef.current) {
          opacity *= 0.6 + 0.4 * Math.sin(t * 0.04);
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [createStars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
