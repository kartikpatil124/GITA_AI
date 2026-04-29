import { motion } from 'framer-motion';
import OmSymbol from '../assets/OmSymbol';

export default function ThinkingIndicator() {
  return (
    <motion.div
      className="flex items-center gap-4 p-5 rounded-2xl max-w-md"
      style={{
        background: 'rgba(15, 21, 53, 0.5)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(212, 168, 67, 0.1)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Spinning Om */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="flex-shrink-0"
      >
        <OmSymbol size={32} animate={false} />
      </motion.div>

      <div className="flex flex-col gap-2">
        <span className="text-gold-400/70 text-sm font-medium">Krishna is contemplating...</span>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gold-400"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
