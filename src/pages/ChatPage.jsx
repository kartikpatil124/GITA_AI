import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, User, Sparkles } from 'lucide-react';
import ChatInput from '../components/ChatInput';
import ResponseCard from '../components/ResponseCard';
import ThinkingIndicator from '../components/ThinkingIndicator';
import PromptChips from '../components/PromptChips';
import { useAppContext } from '../context/AppContext';
import { getResponse } from '../data/mockResponses';
import { generateId } from '../utils/helpers';

export default function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, addMessage, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const processedQuery = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query && !processedQuery.current) {
      processedQuery.current = true;
      setSearchParams({}, { replace: true });
      handleSend(query);
    }
  }, [searchParams]);

  useEffect(() => { scrollToBottom(); }, [state.chatHistory, isLoading, scrollToBottom]);

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;
    addMessage({ id: generateId(), type: 'user', text: text.trim(), timestamp: new Date().toISOString() });
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1500));
    const response = getResponse(text);
    addMessage({ id: generateId(), type: 'ai', text: response.summary, response, question: text.trim(), timestamp: new Date().toISOString() });
    setIsLoading(false);
  };

  const hasMessages = state.chatHistory.length > 0;

  return (
    <div className="relative min-h-screen flex flex-col pt-20 pb-4">
      <div className="relative z-10 px-4 py-3 flex items-center justify-between max-w-3xl mx-auto w-full">
        <h1 className="font-cinzel text-lg sm:text-xl text-gold-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> Ask Krishna
        </h1>
        {hasMessages && (
          <motion.button onClick={() => dispatch({ type: 'CLEAR_CHAT' })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
            whileTap={{ scale: 0.9 }} aria-label="Clear chat history">
            <Trash2 className="w-3.5 h-3.5" /><span className="hidden sm:inline">Clear</span>
          </motion.button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-32">
        <div className="max-w-3xl mx-auto space-y-6">
          {!hasMessages && !isLoading && (
            <motion.div className="text-center py-16 sm:py-24" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <motion.div className="text-6xl sm:text-7xl mb-6" animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🙏</motion.div>
              <h2 className="font-cinzel text-xl sm:text-2xl text-gold-400/80 mb-3">What troubles your heart?</h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-8">Share your concern and receive guidance from the Bhagavad Gita.</p>
              <PromptChips onSelect={handleSend} maxItems={6} />
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            {state.chatHistory.map((msg) => (
              <motion.div key={msg.id} layout initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.type === 'user' ? (
                  <div className="flex items-start gap-3 max-w-lg">
                    <div className="glass p-4 rounded-2xl rounded-tr-md"><p className="text-gray-200 text-sm sm:text-base">{msg.text}</p></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cosmic-400 to-cosmic-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <ResponseCard response={msg.response} question={msg.question}
                      animate={msg.id === state.chatHistory[state.chatHistory.length - 1]?.id} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isLoading && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><ThinkingIndicator /></motion.div>)}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 sm:p-5" style={{ background: 'linear-gradient(to top, rgba(8, 11, 26, 0.95) 60%, transparent)' }}>
        <div className="max-w-3xl mx-auto"><ChatInput onSubmit={handleSend} disabled={isLoading} /></div>
      </div>
    </div>
  );
}
