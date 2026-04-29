import { useRef, useEffect, useCallback } from 'react';

export default function AnimatedStars({ pulseMode = false }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animFrameRef = useRef(null);
  const pulseRef = useRef(pulseMode);

  // Keep pulseRef in sync
  useEffect(() => {
    pulseRef.current = pulseMode;
  }, [pulseMode]);

  const createStars = useCallback((width, height) => {
    const stars = [];
    const count = Math.min(300, Math.floor((width * height) / 4000));
    
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: -Math.random() * 0.1 - 0.02,
        layer: Math.floor(Math.random() * 3), // 0=far, 1=mid, 2=close
      });
    }
    return stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      starsRef.current = createStars(width, height);
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      for (const star of starsRef.current) {
        // Update position (slow drift)
        const layerSpeed = (star.layer + 1) * 0.5;
        star.x += star.driftX * layerSpeed;
        star.y += star.driftY * layerSpeed;

        // Wrap around edges
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Twinkle
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        let opacity = star.opacity * (0.6 + 0.4 * twinkle);

        // Pulse mode — stars blink more intensely
        if (pulseRef.current) {
          const pulse = Math.sin(time * 0.05) * 0.4 + 0.6;
          opacity *= pulse;
          // Some stars get brighter
          if (star.layer === 2) {
            opacity = Math.min(1, opacity * 1.5);
          }
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * (star.layer === 2 ? 1.3 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Draw glow for brighter/closer stars
        if (star.layer === 2 && opacity > 0.6) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 168, 67, ${opacity * 0.15})`;
          ctx.fill();
        }
      }

      // Draw a few golden accent particles
      for (let i = 0; i < 5; i++) {
        const gx = (Math.sin(time * 0.003 + i * 1.5) * 0.5 + 0.5) * width;
        const gy = (Math.cos(time * 0.002 + i * 2.1) * 0.5 + 0.5) * height;
        const gopacity = Math.sin(time * 0.01 + i) * 0.15 + 0.1;
        
        ctx.beginPath();
        ctx.arc(gx, gy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${gopacity})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
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
