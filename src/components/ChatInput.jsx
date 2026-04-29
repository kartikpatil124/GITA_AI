import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';

export default function ChatInput({ onSubmit, placeholder = "Ask your question... What troubles your heart?", large = false, disabled = false }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (large && inputRef.current) {
      inputRef.current.focus();
    }
  }, [large]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSubmit(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative w-full max-w-2xl mx-auto ${large ? 'px-2' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Glow effect behind input */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(212, 168, 67, 0.3), rgba(255, 153, 51, 0.2), rgba(212, 168, 67, 0.3))',
          filter: 'blur(12px)',
        }}
        animate={{ opacity: isFocused ? 0.6 : 0 }}
      />

      <div
        className={`relative flex items-center gap-3 rounded-2xl transition-all duration-500 ${
          large ? 'p-2 sm:p-3' : 'p-1.5 sm:p-2'
        }`}
        style={{
          background: 'rgba(15, 21, 53, 0.7)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${isFocused ? 'rgba(212, 168, 67, 0.4)' : 'rgba(212, 168, 67, 0.15)'}`,
          boxShadow: isFocused
            ? '0 0 30px rgba(255, 215, 0, 0.15), inset 0 0 30px rgba(255, 215, 0, 0.03)'
            : '0 4px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Sparkles className={`w-5 h-5 ml-2 flex-shrink-0 transition-colors duration-300 ${
          isFocused ? 'text-gold-400' : 'text-gold-400/40'
        }`} />

        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`flex-1 bg-transparent border-none outline-none text-gray-200 placeholder-gray-500 font-light ${
            large ? 'text-base sm:text-lg py-3 sm:py-4' : 'text-sm sm:text-base py-2 sm:py-3'
          }`}
          aria-label="Type your question"
          id="chat-input"
        />

        <motion.button
          type="submit"
          disabled={!text.trim() || disabled}
          className={`flex items-center gap-2 rounded-xl font-semibold transition-all duration-300 flex-shrink-0 ${
            large ? 'px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base' : 'px-3 sm:px-5 py-2 sm:py-2.5 text-sm'
          } ${
            text.trim() && !disabled
              ? 'bg-gold-gradient text-primary-400 hover:shadow-divine-lg'
              : 'bg-gray-800 text-gray-600 cursor-not-allowed'
          }`}
          whileHover={text.trim() && !disabled ? { scale: 1.05 } : {}}
          whileTap={text.trim() && !disabled ? { scale: 0.95 } : {}}
          aria-label="Send message"
        >
          <span className="hidden sm:inline">Ask Krishna</span>
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.form>
  );
}
