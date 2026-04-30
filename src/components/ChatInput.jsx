import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mic, MicOff, X } from 'lucide-react';

export default function ChatInput({ onSubmit, disabled = false }) {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, [text]);

  // Voice input (Web Speech API)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-US';
      recog.onresult = (e) => {
        const t = e.results[0][0].transcript;
        setText(prev => prev ? prev + ' ' + t : t);
        setListening(false);
      };
      recog.onerror = () => setListening(false);
      recog.onend = () => setListening(false);
      recognitionRef.current = recog;
    }
    return () => { if (recognitionRef.current) try { recognitionRef.current.abort(); } catch {} };
  }, []);

  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.abort();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (text.trim() && !disabled) {
      onSubmit(text.trim());
      setText('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`flex items-end gap-2 rounded-2xl px-4 py-3 transition-all duration-300 glass ${
        listening ? 'ring-1 ring-red-400/30' : ''
      }`}>
        {/* Voice */}
        {recognitionRef.current && (
          <button
            type="button"
            onClick={toggleVoice}
            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all mb-0.5 ${
              listening ? 'bg-red-500/20 text-red-400' : 'text-gray-600 hover:text-gray-400 hover:bg-white/[0.04]'
            }`}
            aria-label={listening ? 'Stop listening' : 'Voice input'}
          >
            {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Share your situation, and receive wisdom from the Gita…"
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-600 text-[15px] font-light resize-none leading-relaxed max-h-40 min-h-[24px]"
          id="chat-input"
          aria-label="Message input"
        />

        {/* Clear */}
        {text && (
          <button onClick={() => setText('')} className="text-gray-600 hover:text-gray-400 p-1 mb-0.5" aria-label="Clear">
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Send */}
        <motion.button
          onClick={handleSubmit}
          disabled={!text.trim() || disabled}
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 mb-0.5 ${
            text.trim() && !disabled
              ? 'bg-gold-500 text-surface hover:bg-gold-400'
              : 'bg-white/[0.04] text-gray-700 cursor-not-allowed'
          }`}
          whileTap={text.trim() ? { scale: 0.9 } : {}}
          aria-label="Send message"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      </div>

      {listening && (
        <motion.p
          className="text-red-400/70 text-xs text-center mt-2 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Listening… speak now
        </motion.p>
      )}
    </motion.div>
  );
}
