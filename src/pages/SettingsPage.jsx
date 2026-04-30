import { motion } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function SettingsPage() {
  const { state, updateSettings, dispatch } = useAppContext();

  const Toggle = ({ value, onChange, label }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-400 text-sm font-light">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${value ? 'bg-gold-500' : 'bg-white/[0.08]'}`}
        aria-label={`Toggle ${label}`}
      >
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-black transition-all duration-300 ${value ? 'right-0.5' : 'left-0.5'}`} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-md mx-auto">
        <motion.div className="mb-10" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-cinzel text-2xl text-gold-gradient font-semibold mb-1">Settings</h1>
          <p className="text-gray-600 text-sm font-light">Preferences</p>
        </motion.div>

        <motion.div className="space-y-1 divide-y divide-white/[0.04]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <Toggle label="Animations" value={state.settings.animationsEnabled} onChange={(v) => updateSettings({ animationsEnabled: v })} />
          <Toggle label="Notifications" value={state.settings.notifications} onChange={(v) => updateSettings({ notifications: v })} />

          <div className="py-3">
            <label className="text-gray-400 text-sm font-light block mb-2">Language</label>
            <select
              value={state.settings.language}
              onChange={e => updateSettings({ language: e.target.value })}
              className="w-full p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-gray-300 text-sm outline-none focus:border-gold-500/20"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>

          <div className="py-4">
            <button
              onClick={() => { if (confirm('Clear all data?')) { dispatch({ type: 'CLEAR_CHAT' }); state.savedAnswers.forEach(a => dispatch({ type: 'REMOVE_SAVED_ANSWER', payload: a.id })); }}}
              className="text-red-400/60 text-sm hover:text-red-400 transition-colors"
            >
              Clear all data
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
