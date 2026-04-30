import { useState, useEffect, useRef } from 'react';

export default function TypingEffect({ text, speed = 18, onComplete, className = '' }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    if (!text) return;
    setDisplayed('');
    idx.current = 0;
    setDone(false);

    const interval = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.substring(0, idx.current + 1));
        idx.current++;
      } else {
        setDone(true);
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="inline-block w-px h-4 bg-gold-500/60 ml-0.5 align-middle animate-pulse" />}
    </span>
  );
}
