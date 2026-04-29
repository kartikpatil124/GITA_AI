import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSavedAnswers } from '../hooks/useSavedAnswers';
import { truncateText, formatDate } from '../utils/helpers';

export default function SavedAnswersPanel({ isOpen, onClose }) {
  const { savedAnswers, remove } = useSavedAnswers();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-96 z-[70] flex flex-col"
            style={{
              background: 'rgba(8, 11, 26, 0.95)',
              backdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(212, 168, 67, 0.1)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gold-400/10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold-400" />
                <h2 className="font-cinzel text-lg text-gold-400">Saved Wisdom</h2>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-500 hover:text-gold-400 hover:bg-gold-400/10 transition-all"
                whileTap={{ scale: 0.9 }}
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {savedAnswers.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gold-400/20 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">No saved answers yet</p>
                  <p className="text-gray-600 text-xs mt-1">
                    Save responses to revisit divine wisdom anytime
                  </p>
                </div>
              ) : (
                savedAnswers.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="glass-light p-4 rounded-xl group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <p className="text-gold-400/80 text-sm font-medium mb-2">
                      "{truncateText(item.question, 60)}"
                    </p>
                    <p className="text-gray-400 text-xs leading-relaxed mb-2">
                      {truncateText(item.response.summary, 100)}
                    </p>
                    <p className="shloka-text text-xs opacity-50 mb-3">
                      {item.response.shloka?.reference}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-xs">
                        {formatDate(item.savedAt)}
                      </span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/chat?q=${encodeURIComponent(item.question)}`}
                          className="p-1.5 rounded-lg text-gold-400/60 hover:text-gold-400 hover:bg-gold-400/10 transition-all"
                          onClick={onClose}
                          aria-label="View full answer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => remove(item.id)}
                          className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                          aria-label="Delete saved answer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
