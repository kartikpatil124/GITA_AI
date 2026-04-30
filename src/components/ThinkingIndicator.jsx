import { motion } from 'framer-motion';

export default function ThinkingIndicator() {
  return (
    <motion.div
      className="flex items-center gap-3 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gold-500/60"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <span className="text-gray-600 text-sm font-light">Krishna is contemplating...</span>
    </motion.div>
  );
}
