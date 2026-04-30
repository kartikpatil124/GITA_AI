import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import TypingEffect from './TypingEffect';
import { useState, useCallback } from 'react';

export default function MessageBubble({ message, isLatest, onTypingComplete }) {
  const isUser = message.type === 'user';
  const [typingDone, setTypingDone] = useState(!isLatest || isUser);

  const handleComplete = useCallback(() => {
    setTypingDone(true);
    if (onTypingComplete) onTypingComplete();
  }, [onTypingComplete]);

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} w-full`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
        isUser 
          ? 'bg-surface-200 border-white/10 text-gray-400' 
          : 'bg-gold-500/10 border-gold-500/20 text-gold-400'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
        <div className={`px-5 py-3.5 rounded-2xl ${
          isUser 
            ? 'bg-surface-200 border border-white/5 rounded-tr-sm text-gray-200' 
            : 'bg-transparent text-gray-300'
        }`}>
          {isUser ? (
            <p className="text-[15px] font-light leading-relaxed">{message.text}</p>
          ) : (
            <div className="text-[15px] font-light leading-relaxed">
              {!typingDone ? (
                <TypingEffect text={message.response.summary} speed={12} onComplete={handleComplete} />
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <p>{message.response.summary}</p>
                  
                  {message.response.verse && (
                    <div className="mt-4 p-4 rounded-xl bg-surface-100/50 border border-white/[0.03]">
                      <p className="text-xs text-gold-500/60 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gold-500/60" />
                        Reference
                      </p>
                      <p className="text-sm text-gray-400 italic">
                        "Chapter {message.response.verse.chapter}, Verse {message.response.verse.verse}"
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        (See the right panel for full verse details and meaning)
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>
        
        {/* Timestamp */}
        <span className="text-[10px] text-gray-600 mt-1.5 px-1 uppercase tracking-wider">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
