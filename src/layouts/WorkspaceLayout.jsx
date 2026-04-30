import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import CosmicBackground from '../components/CosmicBackground';
import ActiveVersePanel from '../components/ActiveVersePanel';
import { useAppContext } from '../context/AppContext';

export default function WorkspaceLayout({ starPulse = false }) {
  const location = useLocation();
  const isChat = location.pathname === '/chat';
  const { state } = useAppContext();
  
  // Mobile drawer state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Automatically open drawer on mobile when a verse is set
  useEffect(() => {
    if (state.activeVerse && isChat && window.innerWidth < 768) {
      setMobileDrawerOpen(true);
    }
  }, [state.activeVerse, isChat]);

  return (
    <div className="relative min-h-screen flex flex-col bg-surface overflow-hidden">
      <CosmicBackground pulseMode={starPulse} />
      <Navbar />
      
      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex overflow-hidden pt-14">
        
        {/* Left Pane: Chat / Content */}
        <div className={`flex-1 overflow-y-auto transition-all duration-500 ease-in-out ${isChat ? 'md:w-3/5 lg:w-2/3 md:pr-4 lg:pr-8 md:pl-8' : 'w-full'}`}>
          <div className={`h-full w-full ${isChat ? 'max-w-3xl mx-auto' : ''}`}>
            <Outlet />
          </div>
        </div>

        {/* Right Pane: Verse Study Panel (Desktop) */}
        {isChat && (
          <div className="hidden md:block w-2/5 lg:w-1/3 h-[calc(100vh-3.5rem)] p-4 lg:p-6 pl-0">
            <ActiveVersePanel />
          </div>
        )}

        {/* Right Pane: Mobile Drawer */}
        <AnimatePresence>
          {isChat && mobileDrawerOpen && state.activeVerse && (
            <>
              {/* Backdrop */}
              <motion.div 
                className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileDrawerOpen(false)}
              />
              {/* Bottom Sheet */}
              <motion.div
                className="fixed bottom-0 left-0 right-0 h-[85vh] z-50 md:hidden"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <div className="h-full pt-2">
                  {/* Drag handle hint */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full z-20" />
                  <ActiveVersePanel onClose={() => setMobileDrawerOpen(false)} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
      
      {/* Disclaimer Footer - Only visible when not in chat to avoid crowding */}
      {!isChat && (
        <footer className="relative z-10 py-6 text-center">
          <p className="text-gray-600 text-xs tracking-wide font-light max-w-lg mx-auto px-4">
            This is an AI-generated philosophical interpretation tool based on the Bhagavad Gita. 
            It is not a substitute for personal judgment, professional support, or divine authority.
          </p>
        </footer>
      )}
    </div>
  );
}
