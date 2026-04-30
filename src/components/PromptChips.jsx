import { motion } from 'framer-motion';

const chips = [
  "What should I do in confusion?",
  "How do I control anger?",
  "How do I stay focused?",
  "What is karma?",
];

export default function PromptChips({ onSelect }) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto mt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {chips.map((chip, i) => (
        <motion.button
          key={i}
          onClick={() => onSelect(chip)}
          className="px-4 py-2 rounded-full text-[13px] text-gray-500 transition-all duration-300
                     hover:text-gray-300 hover:bg-white/[0.04] cursor-pointer"
          style={{
            border: '1px solid rgba(255,255,255,0.06)',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
          whileTap={{ scale: 0.96 }}
        >
          {chip}
        </motion.button>
      ))}
    </motion.div>
  );
}
