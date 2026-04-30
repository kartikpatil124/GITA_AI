import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function ActiveVersePanel({ onClose }) {
  const { state } = useAppContext();
  const verse = state.activeVerse;
  const [activeTab, setActiveTab] = useState('meaning'); // 'sanskrit', 'transliteration', 'meaning', 'explanation'

  if (!verse) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-50">
        <BookOpen className="w-12 h-12 text-gold-500/30 mb-4" />
        <p className="text-gray-400 font-light">Select a message to study its verse context</p>
      </div>
    );
  }

  const tabs = [
    { id: 'sanskrit', label: 'Sanskrit' },
    { id: 'transliteration', label: 'Transliteration' },
    { id: 'meaning', label: 'Meaning' },
    { id: 'explanation', label: 'Explanation' },
  ];

  return (
    <div className="h-full flex flex-col bg-surface-100/40 backdrop-blur-md rounded-2xl border border-white/[0.04] overflow-hidden relative">
      {/* Mobile Close Button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-300 z-10"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="p-6 border-b border-white/[0.04]">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500/80" />
          <span className="text-xs uppercase tracking-widest text-gold-500/60 font-semibold">
            Bhagavad Gita
          </span>
        </div>
        <h2 className="font-cinzel text-2xl text-gray-100">
          Chapter {verse.chapter}, Verse {verse.verse}
        </h2>
        <p className="text-sm text-gray-500 mt-1 font-light">{verse.theme}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.04] px-4 pt-2 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-3 text-sm transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'text-gold-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="verse-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-gray-300 font-light leading-relaxed"
          >
            {activeTab === 'sanskrit' && (
              <p className="font-cinzel text-lg sm:text-xl text-gold-200 text-center whitespace-pre-line leading-loose py-4">
                {verse.sanskrit}
              </p>
            )}
            
            {activeTab === 'transliteration' && (
              <p className="text-base text-gray-400 text-center whitespace-pre-line italic leading-loose py-4">
                {verse.transliteration}
              </p>
            )}

            {activeTab === 'meaning' && (
              <p className="text-[15px] leading-8">
                {verse.translation}
              </p>
            )}

            {activeTab === 'explanation' && (
              <div className="space-y-6">
                <p className="text-[15px] leading-8">{verse.explanation}</p>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-gold-500/10">
                  <h4 className="text-xs uppercase tracking-wider text-gold-500/60 mb-2 font-medium">Practical Action</h4>
                  <p className="text-sm text-gray-400">{verse.practicalStep}</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
