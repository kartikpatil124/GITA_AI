import { motion } from 'framer-motion';
import { Bookmark, Trash2, ExternalLink, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSavedAnswers } from '../hooks/useSavedAnswers';
import { truncateText, formatDate } from '../utils/helpers';
import { useState } from 'react';

export default function SavedPage() {
  const { savedAnswers, remove } = useSavedAnswers();
  const [search, setSearch] = useState('');

  const filtered = savedAnswers.filter(item =>
    item.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div className="mb-10" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-cinzel text-2xl text-gold-gradient font-semibold mb-1">Saved</h1>
          <p className="text-gray-600 text-sm font-light">Your bookmarked wisdom</p>
        </motion.div>

        {savedAnswers.length > 0 && (
          <div className="relative mb-8 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-300 text-sm placeholder-gray-700 outline-none focus:border-gold-500/20" />
          </div>
        )}

        {filtered.length === 0 ? (
          <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Bookmark className="w-10 h-10 text-white/[0.06] mx-auto mb-4" />
            <p className="text-gray-600 text-sm">{savedAnswers.length === 0 ? 'No saved answers yet' : 'No results'}</p>
            {savedAnswers.length === 0 && (
              <Link to="/chat" className="inline-block mt-4 text-gold-500 text-sm hover:text-gold-400 transition-colors">
                Start asking →
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                className="group rounded-xl p-4 transition-colors duration-300 hover:bg-white/[0.02]"
                style={{ border: '1px solid rgba(255,255,255,0.04)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <p className="text-gray-300 text-sm mb-1">{truncateText(item.question, 80)}</p>
                <p className="text-gray-600 text-xs mb-2">{item.response.shloka?.reference}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-xs">{formatDate(item.savedAt)}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to={`/chat?q=${encodeURIComponent(item.question)}`} className="text-gray-600 hover:text-gold-400 transition-colors" aria-label="View">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button onClick={() => remove(item.id)} className="text-gray-600 hover:text-red-400 transition-colors" aria-label="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
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
