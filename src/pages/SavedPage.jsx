import { motion } from 'framer-motion';
import { Bookmark, Trash2, ExternalLink, Search, BookOpen } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';

export default function SavedPage() {
  const { state, toggleBookmark } = useAppContext();
  const [search, setSearch] = useState('');

  const filtered = state.bookmarkedMessages.filter(msg =>
    (msg.question || msg.response?.summary || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-cinzel text-xl text-gold-gradient font-semibold mb-1">Saved Wisdom</h1>
          <p className="text-gray-600 text-sm font-light">Your bookmarked guidance and shlokas</p>
        </motion.div>

        {state.bookmarkedMessages.length > 0 && (
          <div className="relative mb-6 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search saved..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-gray-300 text-sm placeholder-gray-700 outline-none focus:border-gold-500/20" />
          </div>
        )}

        {filtered.length === 0 ? (
          <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <BookOpen className="w-12 h-12 text-white/[0.04] mx-auto mb-4" />
            <p className="text-gray-600 text-sm font-light mb-2">
              {state.bookmarkedMessages.length === 0 ? 'No saved wisdom yet' : 'No results found'}
            </p>
            <p className="text-gray-700 text-xs font-light">Save answers during chat by clicking the bookmark icon</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filtered.map((msg, i) => (
              <motion.div
                key={msg.id}
                className="group rounded-xl p-4 glass-light hover:bg-white/[0.03] transition-colors"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <p className="text-gray-300 text-sm mb-2 font-light">{msg.question || msg.response?.summary?.slice(0, 80)}</p>
                {msg.response?.verse && (
                  <p className="text-gold-500/50 text-xs mb-2">
                    Ch.{msg.response.verse.chapter}, V.{msg.response.verse.verse} — {msg.response.verse.theme}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-[10px]">{new Date(msg.savedAt).toLocaleDateString()}</span>
                  <button onClick={() => toggleBookmark(msg)} className="text-gray-600 hover:text-red-400/70 transition-colors opacity-0 group-hover:opacity-100" aria-label="Remove">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
