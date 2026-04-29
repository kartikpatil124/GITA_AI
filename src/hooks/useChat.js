import { useState, useCallback } from 'react';
import { getResponse } from '../data/mockResponses';
import { generateId } from '../utils/helpers';
import { useAppContext } from '../context/AppContext';

export function useChat() {
  const { state, addMessage } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isStarPulse, setIsStarPulse] = useState(false);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: generateId(),
      type: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };
    addMessage(userMessage);

    // Simulate AI thinking
    setIsLoading(true);
    setIsStarPulse(true);

    // Simulate response delay (1.5 – 3 seconds)
    const delay = 1500 + Math.random() * 1500;
    
    await new Promise(resolve => setTimeout(resolve, delay));

    // Get mock response
    const response = getResponse(text);
    const aiMessage = {
      id: generateId(),
      type: 'ai',
      text: response.summary,
      response: response,
      timestamp: new Date().toISOString(),
    };
    addMessage(aiMessage);

    setIsLoading(false);
    // Keep stars pulsing a bit longer after response
    setTimeout(() => setIsStarPulse(false), 2000);

    return aiMessage;
  }, [isLoading, addMessage]);

  const clearHistory = useCallback(() => {
    const { clearChat } = useAppContext();
    clearChat();
  }, []);

  return {
    messages: state.chatHistory,
    isLoading,
    isStarPulse,
    sendMessage,
  };
}

export default useChat;
