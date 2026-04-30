import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
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
  const bottomRef = useRef(null);
  const processed = useRef(false);

  const scroll = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q && !processed.current) {
      processed.current = true;
      setSearchParams({}, { replace: true });
      handleSend(q);
    }
  }, [searchParams]);

  useEffect(() => { scroll(); }, [state.chatHistory, isLoading, scroll]);

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;
    addMessage({ id: generateId(), type: 'user', text: text.trim(), timestamp: new Date().toISOString() });
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1500));
    const response = getResponse(text);
    addMessage({ id: generateId(), type: 'ai', response, question: text.trim(), timestamp: new Date().toISOString() });
    setIsLoading(false);
  };

  const empty = state.chatHistory.length === 0;

  return (
    <div className="relative min-h-screen flex flex-col pt-16 pb-4">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between max-w-xl mx-auto w-full">
        <h1 className="font-cinzel text-base text-gold-500/80 tracking-wider">Ask Krishna</h1>
        {!empty && (
          <button
            onClick={() => dispatch({ type: 'CLEAR_CHAT' })}
            className="text-gray-700 hover:text-gray-400 transition-colors"
            aria-label="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-28">
        <div className="max-w-xl mx-auto space-y-8">
          {empty && !isLoading && (
            <motion.div
              className="text-center pt-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-600 text-sm font-light mb-8">What troubles your heart?</p>
              <PromptChips onSelect={handleSend} />
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            {state.chatHistory.map((msg) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {msg.type === 'user' ? (
                  <div className="flex justify-end mb-2">
                    <div className="max-w-sm rounded-2xl rounded-tr-md px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-gray-200 text-sm">{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  <ResponseCard
                    response={msg.response}
                    question={msg.question}
                    animate={msg.id === state.chatHistory[state.chatHistory.length - 1]?.id}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isLoading && <ThinkingIndicator />}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Fixed input */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 px-4 py-4"
        style={{ background: 'linear-gradient(to top, #000 70%, transparent)' }}
      >
        <div className="max-w-xl mx-auto">
          <ChatInput onSubmit={handleSend} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
