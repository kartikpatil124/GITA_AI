import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AnimatedStars from '../components/AnimatedStars';
import { useAppContext } from '../context/AppContext';

export default function AppLayout() {
  const { state, dispatch } = useAppContext();
  const location = useLocation();
  const isChat = location.pathname === '/chat';

  return (
    <div className="h-screen flex overflow-hidden bg-surface relative">
      {/* Star Background */}
      <AnimatedStars />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Header */}
        <header className="h-12 flex items-center justify-between px-4 border-b border-white/[0.03] flex-shrink-0 bg-surface/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <button
              onClick={() => dispatch({ type: 'SET_SIDEBAR', payload: true })}
              className="md:hidden p-1.5 rounded-lg hover:bg-white/[0.04] text-gray-500"
              aria-label="Open menu"
            >
              <Menu className="w-4.5 h-4.5" />
            </button>

            <h1 className="text-sm text-gray-400 font-light">
              {isChat ? (
                <span className="text-gray-500">Ask Krishna-inspired guidance</span>
              ) : (
                <span className="text-gray-500">Gita AI · Digital Sanctuary</span>
              )}
            </h1>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-hidden relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
