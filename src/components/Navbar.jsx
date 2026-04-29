import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bookmark, Home, MessageCircle, Info, Settings, Sparkles } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/chat', label: 'Ask Krishna', icon: MessageCircle },
  { path: '/saved', label: 'Saved', icon: Bookmark },
  { path: '/about', label: 'About', icon: Info },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6"
        style={{
          background: 'rgba(8, 11, 26, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212, 168, 67, 0.1)',
        }}
      >
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Sparkles className="w-6 h-6 text-gold-400" />
            </motion.div>
            <span className="font-cinzel text-xl md:text-2xl font-bold text-gold-gradient tracking-wider">
              Gita AI
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                    ${isActive
                      ? 'text-gold-400'
                      : 'text-gray-400 hover:text-gold-300'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: 'rgba(212, 168, 67, 0.1)',
                        border: '1px solid rgba(212, 168, 67, 0.2)',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 rounded-xl text-gold-400 hover:bg-gold-400/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(8, 11, 26, 0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(212, 168, 67, 0.1)',
            }}
          >
            <div className="px-4 py-4 space-y-1 max-w-7xl mx-auto">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                        ${isActive
                          ? 'text-gold-400 bg-gold-400/10 border border-gold-400/20'
                          : 'text-gray-400 hover:text-gold-300 hover:bg-gold-400/5'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
