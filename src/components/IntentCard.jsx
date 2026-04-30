import { motion } from 'framer-motion';

export default function IntentCard({ title, description, icon: Icon, onClick, delay = 0 }) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative w-full text-left p-6 rounded-2xl transition-all duration-500 overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, background: 'rgba(255,255,255,0.04)' }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
           style={{ background: 'radial-gradient(circle at top right, rgba(212, 168, 67, 0.08), transparent 60%)' }} />
      
      <div className="flex flex-col gap-4 relative z-10">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.04] text-gold-400 border border-white/[0.05] group-hover:border-gold-500/30 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-gray-200 text-[17px] font-medium tracking-wide mb-1.5">{title}</h3>
          <p className="text-gray-500 text-sm font-light leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.button>
  );
}
