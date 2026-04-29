import { motion } from 'framer-motion';
import { suggestedPrompts } from '../data/suggestedPrompts';

export default function PromptChips({ onSelect, maxItems = 8 }) {
  const chips = suggestedPrompts.slice(0, maxItems);

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-2xl mx-auto px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {chips.map((chip, index) => (
        <motion.button
          key={chip.id}
          onClick={() => onSelect(chip.text)}
          className="group flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium
                     text-gold-400/70 transition-all duration-300 cursor-pointer"
          style={{
            background: 'rgba(15, 21, 53, 0.5)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(212, 168, 67, 0.12)',
          }}
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.5 + index * 0.07,
            ease: 'easeOut',
          }}
          whileHover={{
            scale: 1.05,
            borderColor: 'rgba(212, 168, 67, 0.35)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.12)',
            backgroundColor: 'rgba(212, 168, 67, 0.08)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-base">{chip.emoji}</span>
          <span className="group-hover:text-gold-300 transition-colors">{chip.text}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
