import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const steps = [
  { n: '01', title: 'Share Your Concern', desc: 'Type whatever is on your mind — stress, confusion, fear, or any life question.' },
  { n: '02', title: 'Receive Wisdom', desc: 'AI finds the most relevant Bhagavad Gita shloka and creates personalized guidance.' },
  { n: '03', title: 'Apply & Grow', desc: 'Follow the practical advice and save answers for future reflection.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-cinzel text-2xl sm:text-3xl text-gold-gradient font-semibold mb-4">About</h1>
          <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed font-light max-w-lg">
            Gita AI brings the timeless teachings of the Bhagavad Gita to your everyday challenges. 
            Share what troubles you, and receive wisdom through sacred shlokas, simple meanings, and practical life advice.
          </p>
        </motion.div>

        <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="text-[11px] text-gold-500/50 uppercase tracking-wider mb-6 font-medium">How it works</p>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="font-cinzel text-2xl text-white/[0.06] font-bold leading-none mt-0.5">{step.n}</span>
                <div>
                  <h3 className="text-gray-200 text-sm font-medium mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl p-6 text-center"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm font-light mb-4">Ready to seek guidance?</p>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 text-black text-sm font-medium hover:bg-gold-400 transition-colors"
          >
            Start Asking <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
