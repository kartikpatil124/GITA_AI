import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, Lightbulb, Heart, BookOpen } from 'lucide-react';
import ShlokaCard from './ShlokaCard';
import TypingEffect from './TypingEffect';
import LotusDecor from '../assets/LotusDecor';
import { useSavedAnswers } from '../hooks/useSavedAnswers';

export default function ResponseCard({ response, question, animate = true }) {
  const { save, remove, isSaved } = useSavedAnswers();
  const [typingDone, setTypingDone] = useState(!animate);
  const saved = isSaved(response.id);

  const handleSave = () => {
    if (saved) {
      remove(response.id);
    } else {
      save(response, question);
    }
  };

  const onTypingComplete = useCallback(() => {
    setTypingDone(true);
  }, []);

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-5"
      initial={animate ? { opacity: 0, y: 20 } : {}}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Summary Section */}
      <motion.div
        className="glass p-5 sm:p-6 rounded-2xl relative overflow-hidden"
        initial={animate ? { opacity: 0, y: 15 } : {}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Lotus decoration */}
        <div className="absolute top-3 right-3 opacity-20">
          <LotusDecor size={32} />
        </div>

        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-saffron-500 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4 h-4 text-primary-400" />
          </div>
          <h3 className="text-gold-400 font-semibold text-sm uppercase tracking-wider pt-1.5">
            Divine Guidance
          </h3>
        </div>

        <div className="text-gray-300 text-sm sm:text-base leading-relaxed ml-11">
          {animate && !typingDone ? (
            <TypingEffect text={response.summary} speed={18} onComplete={onTypingComplete} />
          ) : (
            <p>{response.summary}</p>
          )}
        </div>
      </motion.div>

      {/* Shloka Section - appears after typing animation */}
      {(typingDone || !animate) && (
        <motion.div
          initial={animate ? { opacity: 0, y: 15 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: animate ? 0.2 : 0 }}
        >
          <ShlokaCard shloka={response.shloka} />
        </motion.div>
      )}

      {/* Practical Guidance */}
      {(typingDone || !animate) && (
        <motion.div
          className="glass p-5 sm:p-6 rounded-2xl"
          initial={animate ? { opacity: 0, y: 15 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: animate ? 0.4 : 0 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-saffron-400" />
            <h3 className="text-saffron-400 font-semibold text-sm uppercase tracking-wider">
              Practical Guidance
            </h3>
          </div>

          <ul className="space-y-3 ml-1">
            {response.guidance.map((tip, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 text-gray-300 text-sm sm:text-base"
                initial={animate ? { opacity: 0, x: -10 } : {}}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: animate ? 0.5 + index * 0.1 : 0 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400/60 mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{tip}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Closing Message */}
      {(typingDone || !animate) && (
        <motion.div
          className="glass-light p-5 rounded-2xl text-center"
          initial={animate ? { opacity: 0, y: 15 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: animate ? 0.8 : 0 }}
        >
          <Heart className="w-5 h-5 text-saffron-400/60 mx-auto mb-3" />
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light italic">
            {response.closing}
          </p>
        </motion.div>
      )}

      {/* Action Buttons */}
      {(typingDone || !animate) && (
        <motion.div
          className="flex justify-end gap-3 px-1"
          initial={animate ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{ delay: animate ? 1 : 0 }}
        >
          <motion.button
            onClick={handleSave}
            className={`btn-glass flex items-center gap-2 text-sm ${
              saved ? 'border-gold-400/40 text-gold-400' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={saved ? 'Remove from saved' : 'Save answer'}
          >
            {saved ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
            <span>{saved ? 'Saved' : 'Save Answer'}</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
