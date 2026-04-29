import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Palette, Bell, Globe, Trash2, Moon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function SettingsPage() {
  const { state, updateSettings, dispatch } = useAppContext();
  const { settings } = state;

  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
      dispatch({ type: 'CLEAR_CHAT' });
      // Clear saved answers
      state.savedAnswers.forEach(a => dispatch({ type: 'REMOVE_SAVED_ANSWER', payload: a.id }));
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-cinzel text-2xl sm:text-3xl text-gold-gradient font-bold mb-3 flex items-center justify-center gap-3">
            <SettingsIcon className="w-7 h-7 text-gold-400" /> Settings
          </h1>
          <p className="text-gray-400 text-sm">Customize your experience</p>
        </motion.div>

        <div className="space-y-5">
          {/* Profile Section */}
          <motion.div className="glass p-5 sm:p-6 rounded-2xl" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-3 mb-5">
              <User className="w-5 h-5 text-gold-400" />
              <h2 className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Profile</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-saffron-500 flex items-center justify-center text-primary-400 text-2xl font-cinzel font-bold">
                S
              </div>
              <div>
                <p className="text-gray-200 font-medium">Seeker</p>
                <p className="text-gray-500 text-sm">Spiritual Explorer</p>
              </div>
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div className="glass p-5 sm:p-6 rounded-2xl" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-5">
              <Palette className="w-5 h-5 text-gold-400" />
              <h2 className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">Dark Theme</span>
                </div>
                <div className="w-11 h-6 rounded-full bg-gold-500 relative cursor-pointer" aria-label="Dark theme enabled">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-primary-400 transition-all" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Animations</span>
                <button onClick={() => updateSettings({ animationsEnabled: !settings.animationsEnabled })}
                  className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${settings.animationsEnabled ? 'bg-gold-500' : 'bg-gray-700'}`}
                  aria-label="Toggle animations">
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary-400 transition-all ${settings.animationsEnabled ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Language */}
          <motion.div className="glass p-5 sm:p-6 rounded-2xl" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-3 mb-5">
              <Globe className="w-5 h-5 text-gold-400" />
              <h2 className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Language</h2>
            </div>
            <select className="w-full p-3 rounded-xl bg-primary-50 border border-glass-border text-gray-300 text-sm outline-none focus:border-gold-400/30"
              value={settings.language} onChange={e => updateSettings({ language: e.target.value })}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="sa">Sanskrit</option>
            </select>
          </motion.div>

          {/* Notifications */}
          <motion.div className="glass p-5 sm:p-6 rounded-2xl" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="flex items-center gap-3 mb-5">
              <Bell className="w-5 h-5 text-gold-400" />
              <h2 className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Notifications</h2>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Daily wisdom notification</span>
              <button onClick={() => updateSettings({ notifications: !settings.notifications })}
                className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${settings.notifications ? 'bg-gold-500' : 'bg-gray-700'}`}
                aria-label="Toggle notifications">
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary-400 transition-all ${settings.notifications ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
          </motion.div>

          {/* Danger zone */}
          <motion.div className="glass p-5 sm:p-6 rounded-2xl border-red-400/10" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <div className="flex items-center gap-3 mb-5">
              <Trash2 className="w-5 h-5 text-red-400/60" />
              <h2 className="text-red-400/60 font-semibold text-sm uppercase tracking-wider">Data</h2>
            </div>
            <button onClick={handleClearAllData}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-all"
              aria-label="Clear all data">
              Clear All Data
            </button>
            <p className="text-gray-600 text-xs mt-2">Remove all chat history and saved answers</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
