import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import ChatInput from '../components/ChatInput';
import MessageBubble from '../components/MessageBubble';
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
    const intent = searchParams.get('intent');
    if (q && !processed.current) {
      processed.current = true;
      setSearchParams({}, { replace: true });
      handleSend(q, intent);
    }
  }, [searchParams]);

  useEffect(() => { scroll(); }, [state.chatHistory, isLoading, scroll]);

  const handleSend = async (text, intent = null) => {
    if (!text.trim() || isLoading) return;
    
    addMessage({ 
      id: generateId(), 
      type: 'user', 
      text: text.trim(), 
      timestamp: new Date().toISOString() 
    });
    
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));
    
    const response = getResponse(text, intent);
    
    addMessage({ 
      id: generateId(), 
      type: 'ai', 
      response, 
      question: text.trim(), 
      timestamp: new Date().toISOString() 
    });
    
    setIsLoading(false);
  };

  const empty = state.chatHistory.length === 0;

  return (
    <div className="relative h-full flex flex-col">
      {/* Header */}
      <div className="px-4 md:px-8 py-4 flex items-center justify-between border-b border-white/[0.02]">
        <h1 className="font-sans text-sm text-gray-400 font-medium tracking-wide">Workspace</h1>
        {!empty && (
          <button
            onClick={() => dispatch({ type: 'CLEAR_CHAT' })}
            className="text-gray-600 hover:text-red-400/80 transition-colors flex items-center gap-2 text-xs"
            aria-label="Clear workspace"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear History</span>
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-32 pt-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {empty && !isLoading && (
            <motion.div
              className="flex flex-col items-center justify-center h-full pt-12 md:pt-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-500 text-[15px] font-light mb-8 text-center max-w-sm">
                How can I assist your spiritual reflection today?
              </p>
              <PromptChips onSelect={(text) => handleSend(text)} />
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            {state.chatHistory.map((msg, index) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <MessageBubble 
                  message={msg} 
                  isLatest={index === state.chatHistory.length - 1} 
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gold-500/10 border border-gold-500/20 text-gold-400">
                    <ThinkingIndicator />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} className="h-4" />
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 py-6 bg-gradient-to-t from-surface via-surface to-transparent">
        <div className="max-w-2xl mx-auto relative">
          <ChatInput onSubmit={(text) => handleSend(text)} disabled={isLoading} />
          <p className="text-center mt-3 text-[10px] text-gray-600 font-light hidden md:block">
            AI can make mistakes. Consider consulting verified texts or mentors for profound matters.
          </p>
        </div>
      </div>
    </div>
  );
}
