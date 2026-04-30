import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ChatInput({ onSubmit, placeholder = "Ask your question...", disabled = false }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative w-full max-w-xl mx-auto"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div
        className={`flex items-center gap-2 rounded-2xl px-4 py-3 transition-all duration-500 ${
          focused ? 'ring-1 ring-gold-500/20' : ''
        }`}
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-600 text-[15px] font-light"
          aria-label="Type your question"
          id="chat-input"
        />

        <motion.button
          type="submit"
          disabled={!text.trim() || disabled}
          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            text.trim() && !disabled
              ? 'bg-gold-500 text-black hover:bg-gold-400'
              : 'bg-white/5 text-gray-600 cursor-not-allowed'
          }`}
          whileTap={text.trim() ? { scale: 0.9 } : {}}
          aria-label="Send"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.form>
  );
}
