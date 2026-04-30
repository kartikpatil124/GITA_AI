import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import SplashScreen from './components/SplashScreen';
import WorkspaceLayout from './layouts/WorkspaceLayout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import SavedPage from './pages/SavedPage';
import AboutPage from './pages/AboutPage';
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
            {/* The new dual-pane layout applies everywhere, but responds to the path */}
            <Route element={<WorkspaceLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </AppProvider>
  );
}
