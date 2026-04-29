import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Heart, ArrowRight, MessageCircle } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ChatInput from '../components/ChatInput';
import PromptChips from '../components/PromptChips';
import OmSymbol from '../assets/OmSymbol';

const features = [
  {
    icon: BookOpen,
    title: 'Sacred Shlokas',
    description: 'Receive relevant Bhagavad Gita verses with accurate Sanskrit text and simple translations.',
    color: 'from-gold-400 to-saffron-500',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Wisdom',
    description: 'Advanced AI that understands your problems and maps them to timeless spiritual teachings.',
    color: 'from-saffron-400 to-gold-500',
  },
  {
    icon: Heart,
    title: 'Emotional Support',
    description: 'Compassionate, calming responses with practical advice tailored to your modern life challenges.',
    color: 'from-cosmic-300 to-gold-400',
  },
];

const steps = [
  { number: '01', title: 'Share Your Concern', description: 'Type whatever is troubling you — stress, confusion, fear, or any life challenge.' },
  { number: '02', title: 'Receive Divine Wisdom', description: 'Our AI finds the most relevant Gita shloka and creates a personalized guidance for you.' },
  { number: '03', title: 'Apply & Grow', description: 'Follow the practical advice, save answers for later, and walk your path with clarity.' },
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleSubmit = (text) => {
    navigate(`/chat?q=${encodeURIComponent(text)}`);
  };

  return (
    <div className="relative">
      {/* Hero */}
      <HeroSection />

      {/* Chat Input Section */}
      <section className="relative z-10 pb-8 -mt-4 px-4">
        <ChatInput onSubmit={handleSubmit} large placeholder="What troubles your heart? Ask freely..." />
        <div className="mt-6">
          <PromptChips onSelect={handleSubmit} maxItems={8} />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-bold mb-4">
              Why Gita AI?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
              Ancient wisdom meets modern technology to guide you through life's challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass p-6 sm:p-8 rounded-2xl group hover:border-gold-400/30 transition-all duration-500 cursor-default"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: '0 0 40px rgba(255, 215, 0, 0.1)' }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 
                                  group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="font-cinzel text-lg text-gold-400 mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base">
              Three simple steps to divine clarity
            </p>
          </motion.div>

          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 sm:gap-6 glass-light p-5 sm:p-6 rounded-2xl"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <span className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-400/20 leading-none flex-shrink-0 mt-1">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-cinzel text-base sm:text-lg text-gold-400 mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 sm:py-24 px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center glass p-8 sm:p-12 rounded-3xl divine-glow"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <OmSymbol size={48} className="mx-auto mb-5 opacity-40" />
          <h2 className="font-cinzel text-2xl sm:text-3xl text-gold-gradient font-bold mb-4">
            Begin Your Journey
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Whatever weighs on your heart, the Gita holds an answer. 
            Take the first step toward clarity and peace.
          </p>
          <motion.button
            onClick={() => navigate('/chat')}
            className="btn-divine inline-flex items-center gap-2 text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Start Asking</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
