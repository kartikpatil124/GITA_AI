import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function SettingsPage() {
  const { state, dispatch, updateSettings } = useAppContext();

  const Toggle = ({ value, onChange, label, desc }) => (
    <div className="flex items-center justify-between py-4 border-b border-white/[0.03]">
      <div>
        <p className="text-gray-300 text-sm">{label}</p>
        {desc && <p className="text-gray-600 text-xs font-light mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${value ? 'bg-gold-500' : 'bg-white/[0.08]'}`}
        aria-label={`Toggle ${label}`}
      >
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-surface transition-all duration-300 ${value ? 'right-0.5' : 'left-0.5'}`} />
      </button>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8">
      <div className="max-w-md mx-auto">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-cinzel text-xl text-gold-gradient font-semibold mb-1">Settings</h1>
          <p className="text-gray-600 text-sm font-light">Customize your experience</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <Toggle label="Animations" desc="Smooth transitions and motion effects" value={state.settings.animationsEnabled} onChange={v => updateSettings({ animationsEnabled: v })} />
          <Toggle label="Sound Effects" desc="Subtle audio feedback" value={state.settings.soundEnabled} onChange={v => updateSettings({ soundEnabled: v })} />

          <div className="py-4 border-b border-white/[0.03]">
            <label className="text-gray-300 text-sm block mb-2">Language</label>
            <select
              value={state.settings.language}
              onChange={e => updateSettings({ language: e.target.value })}
              className="w-full p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-gray-300 text-sm outline-none focus:border-gold-500/20"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>

          <div className="py-4 border-b border-white/[0.03]">
            <label className="text-gray-300 text-sm block mb-2">Text Size</label>
            <div className="flex gap-2">
              {['small', 'normal', 'large'].map(size => (
                <button key={size} onClick={() => updateSettings({ textSize: size })}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${state.settings.textSize === size ? 'bg-gold-500/15 text-gold-400 border border-gold-500/20' : 'bg-white/[0.03] text-gray-500 border border-white/[0.04]'}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="py-6">
            <button
              onClick={() => { if (confirm('Clear all conversations and saved data? This cannot be undone.')) { dispatch({ type: 'CLEAR_ALL_CONVERSATIONS' }); }}}
              className="flex items-center gap-2 text-red-400/60 text-sm hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Clear all data
            </button>
            <p className="text-gray-700 text-xs mt-1 font-light">Remove all conversations, bookmarks, and preferences</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
