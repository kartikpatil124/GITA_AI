import { useRef, useEffect, useCallback } from 'react';

export default function AnimatedStars({ pulseMode = false }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const particlesRef = useRef([]);
  const animRef = useRef(null);
  const pulseRef = useRef(pulseMode);

  useEffect(() => { pulseRef.current = pulseMode; }, [pulseMode]);

  const init = useCallback((w, h) => {
    const starCount = Math.min(250, Math.floor((w * h) / 6000));
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.3 + 0.2,
      baseOpacity: Math.random() * 0.6 + 0.1,
      twinkleSpeed: Math.random() * 0.01 + 0.002,
      phase: Math.random() * Math.PI * 2,
      dx: (Math.random() - 0.5) * 0.06,
      dy: -Math.random() * 0.03 - 0.005,
      color: Math.random() > 0.85 ? `hsl(${40 + Math.random() * 20}, 60%, 75%)` : '#fff',
    }));

    // Floating soft particles
    const particleCount = Math.min(30, Math.floor((w * h) / 50000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.03 + 0.01,
      dx: (Math.random() - 0.5) * 0.15,
      dy: -Math.random() * 0.08 - 0.02,
      phase: Math.random() * Math.PI * 2,
    }));

    starsRef.current = stars;
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w; canvas.height = h;
      init(w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, w, h);

      // Draw particles (soft glowing orbs)
      for (const p of particlesRef.current) {
        p.x += p.dx; p.y += p.dy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;

        const breath = Math.sin(t * 0.005 + p.phase) * 0.5 + 0.5;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grad.addColorStop(0, `rgba(212,168,67,${p.opacity * (0.5 + 0.5 * breath)})`);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw stars
      for (const s of starsRef.current) {
        s.x += s.dx; s.y += s.dy;
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0; if (s.y < 0) s.y = h;

        const twinkle = Math.sin(t * s.twinkleSpeed + s.phase);
        let opacity = s.baseOpacity * (0.65 + 0.35 * twinkle);

        if (pulseRef.current) {
          opacity *= 0.5 + 0.5 * Math.sin(t * 0.03);
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = typeof s.color === 'string' && s.color !== '#fff'
          ? s.color.replace(')', `,${opacity})`)
          : `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [init]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true" />;
}
