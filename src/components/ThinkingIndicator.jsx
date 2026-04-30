import { motion } from 'framer-motion';

export default function ThinkingIndicator() {
  return (
    <motion.div
      className="flex items-start gap-3 w-full"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gold-500/10 border border-gold-500/15 flex-shrink-0 mt-1">
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-gold-400"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
      <div className="pt-1.5">
        <div className="flex items-center gap-2">
          <div className="shimmer-loading w-48 h-3 rounded-full" />
        </div>
        <div className="shimmer-loading w-32 h-3 rounded-full mt-2" />
      </div>
    </motion.div>
  );
}
