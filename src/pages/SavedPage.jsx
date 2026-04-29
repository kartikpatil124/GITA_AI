import { motion } from 'framer-motion';
import { Bookmark, BookOpen, Trash2, ExternalLink, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSavedAnswers } from '../hooks/useSavedAnswers';
import { truncateText, formatDate } from '../utils/helpers';
import { useState } from 'react';

export default function SavedPage() {
  const { savedAnswers, remove } = useSavedAnswers();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = savedAnswers.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.response.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-cinzel text-2xl sm:text-3xl text-gold-gradient font-bold mb-3 flex items-center justify-center gap-3">
            <Bookmark className="w-7 h-7 text-gold-400" /> Saved Wisdom
          </h1>
          <p className="text-gray-400 text-sm">Your collection of divine guidance</p>
        </motion.div>

        {savedAnswers.length > 0 && (
          <motion.div className="mb-8 max-w-md mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search saved answers..." className="w-full pl-11 pr-4 py-3 rounded-xl bg-glass border border-glass-border text-gray-300 text-sm placeholder-gray-600 outline-none focus:border-gold-400/30 transition-colors" />
            </div>
          </motion.div>
        )}

        {filtered.length === 0 ? (
          <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <BookOpen className="w-16 h-16 text-gold-400/15 mx-auto mb-5" />
            <h3 className="text-gray-400 text-lg font-medium mb-2">
              {savedAnswers.length === 0 ? 'No saved answers yet' : 'No results found'}
            </h3>
            <p className="text-gray-600 text-sm max-w-sm mx-auto mb-6">
              {savedAnswers.length === 0 ? 'When you receive divine guidance that resonates, save it here for future reflection.' : 'Try a different search term.'}
            </p>
            {savedAnswers.length === 0 && (
              <Link to="/chat" className="btn-divine inline-flex items-center gap-2 text-sm">Ask Krishna</Link>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filtered.map((item, index) => (
              <motion.div key={item.id} className="glass p-5 sm:p-6 rounded-2xl group hover:border-gold-400/25 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}
                whileHover={{ y: -3 }}>
                <p className="text-gold-400/80 text-sm font-medium mb-3">"{truncateText(item.question, 80)}"</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">{truncateText(item.response.summary, 120)}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-xs text-saffron-400/80 bg-saffron-400/10 border border-saffron-400/15 shloka-text">
                    {item.response.shloka?.reference}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-xs">{formatDate(item.savedAt)}</span>
                  <div className="flex items-center gap-2">
                    <Link to={`/chat?q=${encodeURIComponent(item.question)}`}
                      className="p-2 rounded-lg text-gold-400/50 hover:text-gold-400 hover:bg-gold-400/10 transition-all" aria-label="View answer">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button onClick={() => remove(item.id)}
                      className="p-2 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-400/10 transition-all" aria-label="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
