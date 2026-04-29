import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import splashVideo from '../video/c_c_d_c_c_d_d_final_videomp_.mp4';

export default function SplashScreen({ onComplete }) {
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      // Skip first 3 seconds
      video.currentTime = 3;
      setVideoReady(true);
    };

    const handleSeeked = () => {
      // Play only after seeking to 3s
      video.play().catch(() => {
        // Autoplay blocked — just complete the splash
        onComplete?.();
      });
    };

    const handleEnded = () => {
      setFadeOut(true);
      setTimeout(() => onComplete?.(), 800);
    };

    const handleError = () => {
      // If video fails to load, skip splash
      onComplete?.();
    };

    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Fallback timeout — if video takes too long, skip after 15s
    const fallbackTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onComplete?.(), 800);
    }, 15000);

    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  // Allow user to skip by clicking
  const handleSkip = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setFadeOut(true);
    setTimeout(() => onComplete?.(), 600);
  };

  return (
    <AnimatePresence>
      {!fadeOut ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black cursor-pointer"
          onClick={handleSkip}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Video */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={splashVideo}
            muted
            playsInline
            preload="auto"
          />

          {/* Subtle dark vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
            }}
          />

          {/* Loading shimmer while video loads */}
          {!videoReady && (
            <motion.div
              className="flex flex-col items-center gap-4 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-12 h-12 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
              <p className="text-gold-400/60 text-sm font-light tracking-widest">Loading...</p>
            </motion.div>
          )}

          {/* Skip hint */}
          <motion.div
            className="absolute bottom-8 right-8 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span className="text-white/30 text-xs tracking-wider hover:text-white/60 transition-colors">
              Click anywhere to skip
            </span>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="splash-fade"
          className="fixed inset-0 z-[9999] bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      )}
    </AnimatePresence>
  );
}
