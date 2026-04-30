import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import ShlokaCard from './ShlokaCard';
import TypingEffect from './TypingEffect';
import { useSavedAnswers } from '../hooks/useSavedAnswers';

export default function ResponseCard({ response, question, animate = true }) {
  const { save, remove, isSaved } = useSavedAnswers();
  const [typingDone, setTypingDone] = useState(!animate);
  const saved = isSaved(response.id);

  const handleSave = () => {
    saved ? remove(response.id) : save(response, question);
  };

  const onTypingComplete = useCallback(() => setTypingDone(true), []);

  const show = typingDone || !animate;

  return (
    <motion.div
      className="w-full max-w-xl mx-auto space-y-4"
      initial={animate ? { opacity: 0 } : {}}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Summary */}
      <div className="text-gray-300 text-sm sm:text-[15px] leading-relaxed font-light">
        {animate && !typingDone ? (
          <TypingEffect text={response.summary} speed={15} onComplete={onTypingComplete} />
        ) : (
          <p>{response.summary}</p>
        )}
      </div>

      {/* Shloka */}
      {show && (
        <motion.div
          initial={animate ? { opacity: 0, y: 8 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ShlokaCard shloka={response.shloka} />
        </motion.div>
      )}

      {/* Practical Guidance */}
      {show && (
        <motion.div
          initial={animate ? { opacity: 0, y: 8 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="text-[11px] text-gold-500/50 uppercase tracking-wider mb-3 font-medium">Practical Guidance</p>
          <ul className="space-y-2.5">
            {response.guidance.map((tip, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2.5 text-gray-400 text-sm font-light"
                initial={animate ? { opacity: 0, x: -6 } : {}}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <span className="w-1 h-1 rounded-full bg-gold-500/40 mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{tip}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Closing */}
      {show && (
        <motion.p
          className="text-gray-500 text-sm font-light italic leading-relaxed pt-2"
          initial={animate ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {response.closing}
        </motion.p>
      )}

      {/* Save button */}
      {show && (
        <motion.div
          className="flex justify-end pt-1"
          initial={animate ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 text-xs transition-colors duration-300 ${
              saved ? 'text-gold-400' : 'text-gray-600 hover:text-gray-400'
            }`}
            aria-label={saved ? 'Remove from saved' : 'Save answer'}
          >
            {saved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
