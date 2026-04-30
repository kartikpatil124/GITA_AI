import { motion } from 'framer-motion';
import { Sparkles, BookOpen } from 'lucide-react';
import { getDailyVerse } from '../data/mockResponses';

const topics = [
  { label: 'Career', query: 'I feel confused about my career path' },
  { label: 'Anxiety', query: 'How do I deal with constant anxiety?' },
  { label: 'Relationships', query: 'I am struggling in my relationships' },
  { label: 'Discipline', query: 'I lack self-discipline and focus' },
  { label: 'Anger', query: 'How to control my anger?' },
  { label: 'Purpose', query: 'I feel lost and without purpose' },
  { label: 'Fear', query: 'I am afraid of failure' },
  { label: 'Study', query: 'How to stay focused while studying?' },
];

export default function EmptyState({ onSend }) {
  const dailyVerse = getDailyVerse();

  return (
    <div className="flex flex-col items-center justify-center h-full py-12 px-4">
      {/* Greeting */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Sparkles className="w-8 h-8 text-gold-500/40 mx-auto mb-4" />
        <h2 className="font-cinzel text-2xl sm:text-3xl text-gray-200 tracking-wide mb-3">
          Namaste, Seeker
        </h2>
        <p className="text-gray-500 text-sm font-light max-w-md mx-auto leading-relaxed">
          Share what weighs on your heart. Receive timeless wisdom from the Bhagavad Gita — shlokas, meaning, and practical guidance for your life.
        </p>
      </motion.div>

      {/* Topic Chips */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 max-w-lg mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {topics.map((topic, i) => (
          <motion.button
            key={topic.label}
            onClick={() => onSend(topic.query)}
            className="px-4 py-2 rounded-full text-[13px] text-gray-400 hover:text-gray-200 hover:bg-white/[0.05] transition-all duration-300"
            style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {topic.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Daily Shloka Card */}
      <motion.div
        className="w-full max-w-md rounded-2xl p-5 glass-light divine-glow text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-gold-500/60" />
          <span className="text-[10px] text-gold-500/60 uppercase tracking-[0.15em] font-semibold">Today's Wisdom</span>
        </div>
        <p className="shloka-text text-sm mb-3 whitespace-pre-line leading-loose">
          {dailyVerse.sanskrit}
        </p>
        <p className="text-gray-500 text-xs italic font-light leading-relaxed mb-2">
          "{dailyVerse.translation}"
        </p>
        <p className="text-[10px] text-gray-700">
          — Chapter {dailyVerse.chapter}, Verse {dailyVerse.verse}
        </p>
      </motion.div>
    </div>
  );
}
