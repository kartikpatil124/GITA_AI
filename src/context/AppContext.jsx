import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext(null);
const STORAGE_KEY = 'gita-ai-state';

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const initialState = {
  conversations: [],
  activeConversationId: null,
  bookmarkedMessages: [],
  settings: {
    theme: 'dark',
    language: 'en',
    animationsEnabled: true,
    soundEnabled: false,
    textSize: 'normal',
  },
  sidebarOpen: true,
};

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...initialState, ...parsed, sidebarOpen: window.innerWidth > 768 };
    }
  } catch (e) { console.warn('Failed to load state:', e); }
  return { ...initialState, sidebarOpen: window.innerWidth > 768 };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      conversations: state.conversations,
      activeConversationId: state.activeConversationId,
      bookmarkedMessages: state.bookmarkedMessages,
      settings: state.settings,
    }));
  } catch (e) { console.warn('Failed to save state:', e); }
}

function appReducer(state, action) {
  switch (action.type) {
    case 'NEW_CONVERSATION': {
      const conv = {
        id: generateId(),
        title: 'New Conversation',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pinned: false,
      };
      return {
        ...state,
        conversations: [conv, ...state.conversations],
        activeConversationId: conv.id,
      };
    }

    case 'SET_ACTIVE_CONVERSATION':
      return { ...state, activeConversationId: action.payload };

    case 'ADD_MESSAGE': {
      const { conversationId, message } = action.payload;
      return {
        ...state,
        conversations: state.conversations.map(c => {
          if (c.id !== conversationId) return c;
          const updated = {
            ...c,
            messages: [...c.messages, message],
            updatedAt: new Date().toISOString(),
          };
          // Auto-title from first user message
          if (c.title === 'New Conversation' && message.type === 'user') {
            updated.title = message.text.length > 40 ? message.text.slice(0, 40) + '…' : message.text;
          }
          return updated;
        }),
      };
    }

    case 'DELETE_CONVERSATION': {
      const filtered = state.conversations.filter(c => c.id !== action.payload);
      return {
        ...state,
        conversations: filtered,
        activeConversationId: state.activeConversationId === action.payload
          ? (filtered[0]?.id || null) : state.activeConversationId,
      };
    }

    case 'PIN_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.map(c =>
          c.id === action.payload ? { ...c, pinned: !c.pinned } : c
        ),
      };

    case 'CLEAR_ALL_CONVERSATIONS':
      return { ...state, conversations: [], activeConversationId: null };

    case 'TOGGLE_BOOKMARK': {
      const exists = state.bookmarkedMessages.some(b => b.id === action.payload.id);
      return {
        ...state,
        bookmarkedMessages: exists
          ? state.bookmarkedMessages.filter(b => b.id !== action.payload.id)
          : [...state.bookmarkedMessages, { ...action.payload, savedAt: new Date().toISOString() }],
      };
    }

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case 'SET_SIDEBAR':
      return { ...state, sidebarOpen: action.payload };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    default: return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, null, loadState);

  useEffect(() => {
    saveState(state);
  }, [state.conversations, state.activeConversationId, state.bookmarkedMessages, state.settings]);

  const activeConversation = state.conversations.find(c => c.id === state.activeConversationId) || null;

  const value = {
    state,
    dispatch,
    activeConversation,
    // Helpers
    newConversation: () => dispatch({ type: 'NEW_CONVERSATION' }),
    setActiveConversation: (id) => dispatch({ type: 'SET_ACTIVE_CONVERSATION', payload: id }),
    addMessage: (conversationId, message) => dispatch({ type: 'ADD_MESSAGE', payload: { conversationId, message } }),
    deleteConversation: (id) => dispatch({ type: 'DELETE_CONVERSATION', payload: id }),
    pinConversation: (id) => dispatch({ type: 'PIN_CONVERSATION', payload: id }),
    toggleBookmark: (msg) => dispatch({ type: 'TOGGLE_BOOKMARK', payload: msg }),
    isBookmarked: (id) => state.bookmarkedMessages.some(b => b.id === id),
    toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
    updateSettings: (s) => dispatch({ type: 'UPDATE_SETTINGS', payload: s }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

export default AppContext;
