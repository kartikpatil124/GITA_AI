import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles, Copy, Check, Bookmark, BookmarkCheck, RefreshCw, Share2 } from 'lucide-react';
import TypingEffect from './TypingEffect';
import { useAppContext } from '../context/AppContext';

export default function MessageBubble({ message, isLatest, onRegenerate }) {
  const isUser = message.type === 'user';
  const { toggleBookmark, isBookmarked } = useAppContext();
  const [typingDone, setTypingDone] = useState(!isLatest || isUser);
  const [copied, setCopied] = useState(false);
  const bookmarked = !isUser && message.response ? isBookmarked(message.id) : false;

  const handleCopy = async () => {
    const text = isUser ? message.text : (message.response?.summary || '');
    await navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = isUser ? message.text : `${message.response?.summary}\n\n— Bhagavad Gita Ch.${message.response?.verse?.chapter}, V.${message.response?.verse?.verse}`;
    if (navigator.share) {
      navigator.share({ title: 'Gita AI Wisdom', text });
    } else {
      navigator.clipboard?.writeText(text);
    }
  };

  const onComplete = useCallback(() => setTypingDone(true), []);

  return (
    <motion.div
      className={`flex gap-3 w-full ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gold-500/10 border border-gold-500/15 flex-shrink-0 mt-1">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
        </div>
      )}

      <div className={`flex flex-col max-w-[80%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Message Content */}
        <div className={`rounded-2xl ${isUser
          ? 'bg-surface-300 border border-white/[0.06] px-4 py-3 rounded-tr-sm'
          : 'px-1'
        }`}>
          {isUser ? (
            <p className="text-[15px] text-gray-200 font-light leading-relaxed">{message.text}</p>
          ) : (
            <div className="space-y-4">
              {/* Summary */}
              <div className="text-[15px] text-gray-300 font-light leading-[1.8]">
                {!typingDone ? (
                  <TypingEffect text={message.response.summary} speed={10} onComplete={onComplete} />
                ) : (
                  <p>{message.response.summary}</p>
                )}
              </div>

              {/* Shloka Card */}
              {typingDone && message.response.verse && (
                <motion.div
                  className="rounded-xl p-4 sm:p-5 glass-light divine-glow"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1 h-1 rounded-full bg-gold-500" />
                    <span className="text-[10px] text-gold-500/70 uppercase tracking-[0.15em] font-semibold">
                      Chapter {message.response.verse.chapter} · Verse {message.response.verse.verse}
                    </span>
                  </div>
                  <p className="shloka-text text-sm text-center whitespace-pre-line mb-3">
                    {message.response.verse.sanskrit}
                  </p>
                  <div className="w-10 h-px mx-auto bg-gold-500/15 mb-3" />
                  <p className="text-gray-400 text-sm italic font-light text-center leading-relaxed">
                    "{message.response.verse.translation}"
                  </p>
                </motion.div>
              )}

              {/* Mindset Shift */}
              {typingDone && message.response.mindsetShift && (
                <motion.div
                  className="flex gap-3 items-start"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                >
                  <span className="text-gold-500/50 text-lg mt-0.5">💡</span>
                  <div>
                    <p className="text-[10px] text-gold-500/50 uppercase tracking-widest font-semibold mb-1">Mindset Shift</p>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">{message.response.mindsetShift}</p>
                  </div>
                </motion.div>
              )}

              {/* Practical Step */}
              {typingDone && message.response.verse?.practicalStep && (
                <motion.div
                  className="flex gap-3 items-start"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                >
                  <span className="text-gold-500/50 text-lg mt-0.5">🎯</span>
                  <div>
                    <p className="text-[10px] text-gold-500/50 uppercase tracking-widest font-semibold mb-1">Action Step</p>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">{message.response.verse.practicalStep}</p>
                  </div>
                </motion.div>
              )}

              {/* Closing */}
              {typingDone && message.response.closing && (
                <motion.p
                  className="text-gray-500 text-sm font-light italic leading-relaxed pt-1 border-t border-white/[0.03] mt-2"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                >
                  🙏 {message.response.closing}
                </motion.p>
              )}
            </div>
          )}
        </div>

        {/* Actions Row */}
        {!isUser && typingDone && (
          <motion.div
            className="flex items-center gap-1 mt-1.5 px-1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          >
            <ActionBtn icon={copied ? Check : Copy} label={copied ? 'Copied' : 'Copy'} onClick={handleCopy} active={copied} />
            <ActionBtn icon={bookmarked ? BookmarkCheck : Bookmark} label={bookmarked ? 'Saved' : 'Save'} onClick={() => toggleBookmark(message)} active={bookmarked} />
            <ActionBtn icon={Share2} label="Share" onClick={handleShare} />
            {onRegenerate && <ActionBtn icon={RefreshCw} label="Regenerate" onClick={onRegenerate} />}
          </motion.div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-gray-700 mt-1 px-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-surface-300 border border-white/[0.06] flex-shrink-0 mt-1">
          <User className="w-3.5 h-3.5 text-gray-500" />
        </div>
      )}
    </motion.div>
  );
}

function ActionBtn({ icon: Icon, label, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] transition-colors ${
        active ? 'text-gold-400' : 'text-gray-600 hover:text-gray-400 hover:bg-white/[0.03]'
      }`}
      aria-label={label}
    >
      <Icon className="w-3 h-3" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
