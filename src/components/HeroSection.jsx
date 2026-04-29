import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, BookOpen, Heart } from 'lucide-react';
import OmSymbol from '../assets/OmSymbol';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-20">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-28 left-8 sm:left-20 opacity-10"
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <OmSymbol size={50} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-8 sm:right-24 opacity-10"
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <OmSymbol size={35} />
      </motion.div>

      {/* Main heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-6"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 sm:mb-8"
          style={{
            background: 'rgba(212, 168, 67, 0.08)',
            border: '1px solid rgba(212, 168, 67, 0.15)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-gold-400/80 text-xs sm:text-sm font-medium tracking-wider">
            AI-Powered Spiritual Guidance
          </span>
        </motion.div>

        <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-wide">
          <span className="text-gold-gradient">Find Divine</span>
          <br />
          <motion.span
            className="text-gold-gradient"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Guidance
          </motion.span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-gray-400 text-base sm:text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed mb-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Ask your questions. Receive timeless wisdom from the
        <span className="text-gold-400/80 font-medium"> Bhagavad Gita</span> — 
        shlokas, meaning, and practical advice for modern life.
      </motion.p>

      {/* Feature chips */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {[
          { icon: BookOpen, text: 'Sacred Shlokas' },
          { icon: Sparkles, text: 'AI Guidance' },
          { icon: Heart, text: 'Emotional Support' },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm text-gray-400"
            style={{
              background: 'rgba(15, 21, 53, 0.4)',
              border: '1px solid rgba(212, 168, 67, 0.08)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            <item.icon className="w-3.5 h-3.5 text-gold-400/60" />
            <span>{item.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-6 h-6 text-gold-400/30" />
      </motion.div>
    </section>
  );
}
