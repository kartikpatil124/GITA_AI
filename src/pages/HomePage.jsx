import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Compass, Shield, Wind, Anchor, Brain, BookOpen } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getDailyVerse } from '../data/mockResponses';

const intents = [
  { id: 'purpose', title: 'Searching for Purpose', desc: 'Find direction when life feels meaningless.', icon: Compass, query: 'I feel lost and without purpose in life' },
  { id: 'conflict', title: 'Facing Conflict', desc: 'Navigate difficult relationships and inner battles.', icon: Shield, query: 'I am facing a painful conflict in my life' },
  { id: 'peace', title: 'Seeking Peace', desc: 'Calm your anxious mind and find stillness.', icon: Wind, query: 'How do I find inner peace when everything feels chaotic?' },
  { id: 'stress', title: 'Handling Stress', desc: 'Build resilience during hard times.', icon: Anchor, query: 'I feel overwhelmed by stress and problems' },
  { id: 'clarity', title: 'Seeking Clarity', desc: 'Gain wisdom for difficult decisions.', icon: Brain, query: 'I am confused and cannot decide what to do' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { newConversation } = useAppContext();
  const dailyVerse = getDailyVerse();

  const handleIntent = (query) => {
    newConversation();
    navigate('/chat');
    // We use a small delay to let the conversation get created, then we'll need to handle this in ChatPage
    setTimeout(() => {
      // Trigger a custom event that ChatPage can listen to
      window.dispatchEvent(new CustomEvent('gita-initial-prompt', { detail: query }));
    }, 100);
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="flex items-center justify-center gap-2 mb-5">
          <Sparkles className="w-6 h-6 text-gold-500" />
          <span className="font-cinzel text-lg text-gold-gradient font-semibold tracking-wider">Gita AI</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl text-gray-100 font-normal leading-tight tracking-wide mb-5">
          What brings you <br className="hidden sm:block" />
          <span className="text-gold-gradient">here today?</span>
        </h1>
        <p className="text-gray-500 text-sm sm:text-[15px] font-light max-w-md mx-auto leading-relaxed">
          Select your state of mind, or start a free conversation to receive wisdom from the Bhagavad Gita.
        </p>
      </motion.div>

      {/* Intent Grid */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {intents.map((intent, i) => (
          <motion.button
            key={intent.id}
            onClick={() => handleIntent(intent.query)}
            className="group text-left p-5 rounded-2xl glass-light hover:bg-white/[0.04] transition-all duration-500"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gold-500/10 border border-gold-500/15 text-gold-400 mb-3 group-hover:border-gold-500/30 transition-colors">
              <intent.icon className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-gray-200 text-[15px] font-medium mb-1.5 flex items-center gap-2">
              {intent.title}
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity -translate-x-1 group-hover:translate-x-0" />
            </h3>
            <p className="text-gray-500 text-sm font-light leading-relaxed">{intent.desc}</p>
          </motion.button>
        ))}
      </div>

      {/* Daily Verse */}
      <motion.div
        className="w-full max-w-md rounded-2xl p-5 glass-light text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-gold-500/50" />
          <span className="text-[10px] text-gold-500/50 uppercase tracking-[0.15em] font-semibold">Daily Wisdom</span>
        </div>
        <p className="text-gray-500 text-xs italic font-light leading-relaxed mb-1">
          "{dailyVerse.translation}"
        </p>
        <p className="text-[10px] text-gray-700">— Ch.{dailyVerse.chapter}, V.{dailyVerse.verse}</p>
      </motion.div>

      {/* Disclaimer */}
      <motion.p
        className="text-gray-700 text-[10px] text-center mt-10 max-w-sm font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Gita AI is an AI-guided philosophical tool. It is not a replacement for professional counsel or divine authority.
      </motion.p>
    </div>
  );
}
