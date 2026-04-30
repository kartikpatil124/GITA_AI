import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import SplashScreen from './components/SplashScreen';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import SavedPage from './pages/SavedPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          {!splashDone && (
            <SplashScreen key="splash" onComplete={handleSplashComplete} />
          )}
        </AnimatePresence>

        {splashDone && (
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </AppProvider>
  );
}
