import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInput from '../components/ChatInput';
import MessageBubble from '../components/MessageBubble';
import ThinkingIndicator from '../components/ThinkingIndicator';
import EmptyState from '../components/EmptyState';
import { useAppContext } from '../context/AppContext';
import { getResponse } from '../data/mockResponses';

export default function ChatPage() {
  const { state, activeConversation, addMessage, newConversation } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  const scroll = useCallback(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, []);

  useEffect(() => { scroll(); }, [activeConversation?.messages?.length, isLoading, scroll]);

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;

    let convId = activeConversation?.id;
    if (!convId) {
      // Create new conversation on first message
      newConversation();
      // Need to wait for state update — use a ref pattern
    }

    // If no active conversation, we need to create one first
    if (!convId) {
      // The newConversation() dispatches and sets activeConversationId
      // We rely on the next render cycle. For now, use a small timeout.
      await new Promise(r => setTimeout(r, 50));
    }

    // Re-read after potential state update
    convId = state.activeConversationId || state.conversations[0]?.id;
    if (!convId) return;

    const msgId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    addMessage(convId, {
      id: msgId,
      type: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    });

    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 1200));

    const response = getResponse(text);
    const aiMsgId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    addMessage(convId, {
      id: aiMsgId,
      type: 'ai',
      response,
      question: text.trim(),
      timestamp: new Date().toISOString(),
    });

    setIsLoading(false);
  };

  const messages = activeConversation?.messages || [];
  const isEmpty = messages.length === 0 && !isLoading;

  return (
    <div className="relative h-full flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-36">
        {isEmpty ? (
          <EmptyState onSend={handleSend} />
        ) : (
          <div className="max-w-3xl mx-auto pt-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isLatest={i === messages.length - 1 && msg.type === 'ai'}
                />
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {isLoading && <ThinkingIndicator />}
            </AnimatePresence>

            <div ref={bottomRef} className="h-4" />
          </div>
        )}
      </div>

      {/* Fixed Input */}
      <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 py-4" style={{ background: 'linear-gradient(to top, var(--surface) 60%, transparent)' }}>
        <div className="max-w-3xl mx-auto">
          <ChatInput onSubmit={handleSend} disabled={isLoading} />
          <p className="text-center mt-2 text-[10px] text-gray-700 font-light">
            Gita AI provides philosophical guidance, not professional advice. Always use your own judgment.
          </p>
        </div>
      </div>
    </div>
  );
}
