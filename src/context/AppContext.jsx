import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext(null);

const STORAGE_KEY = 'gita-ai-state';

const initialState = {
  chatHistory: [],
  savedAnswers: [],
  activeVerse: null,
  settings: {
    theme: 'dark',
    language: 'en',
    animationsEnabled: true,
    notifications: true,
  },
  splashCompleted: false,
};

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...initialState, ...parsed, splashCompleted: false, activeVerse: null };
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e);
  }
  return initialState;
}

function saveState(state) {
  try {
    const toSave = {
      chatHistory: state.chatHistory,
      savedAnswers: state.savedAnswers,
      settings: state.settings,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save state to localStorage:', e);
  }
}

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload],
        // Automatically set active verse if AI responds with one
        activeVerse: action.payload.type === 'ai' && action.payload.response.verse ? action.payload.response.verse : state.activeVerse
      };
    
    case 'CLEAR_CHAT':
      return {
        ...state,
        chatHistory: [],
        activeVerse: null,
      };

    case 'SET_ACTIVE_VERSE':
      return {
        ...state,
        activeVerse: action.payload
      };

    case 'SAVE_ANSWER': {
      const exists = state.savedAnswers.some(a => a.id === action.payload.id);
      if (exists) return state;
      return {
        ...state,
        savedAnswers: [action.payload, ...state.savedAnswers],
      };
    }

    case 'REMOVE_SAVED_ANSWER':
      return {
        ...state,
        savedAnswers: state.savedAnswers.filter(a => a.id !== action.payload),
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };

    case 'SET_SPLASH_COMPLETED':
      return {
        ...state,
        splashCompleted: true,
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, null, loadState);

  // Persist state changes to localStorage
  useEffect(() => {
    saveState(state);
  }, [state.chatHistory, state.savedAnswers, state.settings]);

  const value = {
    state,
    dispatch,
    // Convenience methods
    addMessage: (message) => dispatch({ type: 'ADD_MESSAGE', payload: message }),
    clearChat: () => dispatch({ type: 'CLEAR_CHAT' }),
    setActiveVerse: (verse) => dispatch({ type: 'SET_ACTIVE_VERSE', payload: verse }),
    saveAnswer: (answer) => dispatch({ type: 'SAVE_ANSWER', payload: answer }),
    removeSavedAnswer: (id) => dispatch({ type: 'REMOVE_SAVED_ANSWER', payload: id }),
    updateSettings: (settings) => dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
    completeSplash: () => dispatch({ type: 'SET_SPLASH_COMPLETED' }),
    isSaved: (id) => state.savedAnswers.some(a => a.id === id),
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
