import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Shield, Wind, Brain, Anchor } from 'lucide-react';
import IntentCard from '../components/IntentCard';
import { useAppContext } from '../context/AppContext';

const intents = [
  { id: 'purpose', title: 'Searching for Purpose', desc: 'Find direction when you feel lost or disconnected from your path.', icon: Compass },
  { id: 'conflict', title: 'Facing Conflict', desc: 'Navigate difficult relationships or internal dilemmas with grace.', icon: Shield },
  { id: 'peace', title: 'Seeking Peace', desc: 'Calm an anxious mind and find stillness amidst the noise.', icon: Wind },
  { id: 'stress', title: 'Handling Stress', desc: 'Build resilience during overwhelming or painful moments.', icon: Anchor },
  { id: 'clarity', title: 'Seeking Clarity', desc: 'Gain profound insight when facing tough life decisions.', icon: Brain },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();

  const handleIntentSelect = (intentId, title) => {
    // Clear chat history for a fresh start when selecting an intent
    dispatch({ type: 'CLEAR_CHAT' });
    navigate(`/chat?intent=${intentId}&q=${encodeURIComponent(title)}`);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-12">
      
      {/* Header */}
      <motion.div 
        className="text-center mb-16 mt-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-gold-500/60 text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
          Digital Sanctuary
        </span>
        <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-gray-100 font-normal leading-tight tracking-wide mb-6">
          What brings you <br className="hidden sm:block" />
          <span className="text-gold-gradient">here today?</span>
        </h1>
        <p className="text-gray-500 text-sm sm:text-[15px] font-light max-w-lg mx-auto leading-relaxed">
          Select a state of mind to begin your journey. Receive grounded, philosophical guidance inspired by the Bhagavad Gita.
        </p>
      </motion.div>

      {/* Intent Grid */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {intents.map((intent, i) => (
          <div key={intent.id} className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}>
            <IntentCard
              title={intent.title}
              description={intent.desc}
              icon={intent.icon}
              delay={0.2 + (i * 0.1)}
              onClick={() => handleIntentSelect(intent.id, intent.title)}
            />
          </div>
        ))}
      </div>

    </div>
  );
}
