import { useState, useEffect, useRef } from 'react';

export default function TypingEffect({ text, speed = 20, onComplete, className = '' }) {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!text) return;
    
    setDisplayed('');
    indexRef.current = 0;
    setIsComplete(false);

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.substring(0, indexRef.current + 1));
        indexRef.current += 1;
      } else {
        setIsComplete(true);
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {!isComplete && (
        <span className="inline-block w-0.5 h-5 bg-gold-400 ml-0.5 align-middle animate-pulse" />
      )}
    </span>
  );
}
