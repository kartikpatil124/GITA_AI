import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Heart, MessageCircle, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import OmSymbol from '../assets/OmSymbol';

const faqs = [
  { q: 'Is this a real AI?', a: 'Currently this is a demo MVP with curated Bhagavad Gita wisdom. A full AI integration with advanced language understanding is coming soon.' },
  { q: 'Are the shlokas authentic?', a: 'Yes! All shlokas are sourced from the Bhagavad Gita with accurate Sanskrit text, chapter/verse references, and faithful translations.' },
  { q: 'Is this a replacement for professional help?', a: 'No. Gita AI provides spiritual guidance and philosophical perspective. For mental health concerns, please consult a qualified professional.' },
  { q: 'Can I save my favorite answers?', a: 'Absolutely! Click the "Save Answer" button on any response to bookmark it for future reflection.' },
  { q: 'Will this work on mobile?', a: 'Yes, Gita AI is fully responsive and optimized for a smooth experience on all devices.' },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="glass-light rounded-xl overflow-hidden" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left" aria-label={`Toggle FAQ: ${faq.q}`}>
        <span className="text-gold-400/90 text-sm sm:text-base font-medium pr-4">{faq.q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gold-400/50 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gold-400/50 flex-shrink-0" />}
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <OmSymbol size={56} className="mx-auto mb-5 opacity-30" />
          <h1 className="font-cinzel text-3xl sm:text-4xl text-gold-gradient font-bold mb-4">About Gita AI</h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Bridging ancient divine wisdom with modern AI technology to bring you peace, clarity, and guidance.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div className="glass p-6 sm:p-8 rounded-2xl mb-12 text-center divine-glow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Heart className="w-8 h-8 text-saffron-400/60 mx-auto mb-4" />
          <h2 className="font-cinzel text-xl sm:text-2xl text-gold-400 mb-4">Our Mission</h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            In a world full of noise and confusion, we believe the timeless teachings of the Bhagavad Gita hold answers 
            to the most pressing challenges of modern life. Gita AI makes this sacred wisdom accessible, personal, and 
            practical — helping you navigate stress, fear, relationships, and purpose with divine clarity.
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="font-cinzel text-2xl sm:text-3xl text-gold-gradient font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MessageCircle, title: 'Ask Freely', desc: 'Type any life problem or question. No judgement, no formality — just share what\'s on your mind.', step: '01' },
              { icon: BookOpen, title: 'AI Finds Wisdom', desc: 'Our AI matches your concern with the most relevant Bhagavad Gita shloka and creates guidance.', step: '02' },
              { icon: Sparkles, title: 'Receive Guidance', desc: 'Get a complete response: shloka, meaning, practical advice, and a comforting message.', step: '03' },
            ].map((item, i) => (
              <motion.div key={i} className="glass p-6 rounded-2xl text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -5 }}>
                <span className="font-cinzel text-3xl text-gold-400/15 font-bold">{item.step}</span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-saffron-500 flex items-center justify-center mx-auto my-4">
                  <item.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="font-cinzel text-base text-gold-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* About the Gita */}
        <motion.div className="glass-light p-6 sm:p-8 rounded-2xl mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-cinzel text-xl sm:text-2xl text-gold-400 mb-4 text-center">About the Bhagavad Gita</h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto">
            The Bhagavad Gita ("Song of God") is a 700-verse Hindu scripture that is part of the Mahabharata. 
            It contains a conversation between Prince Arjuna and Lord Krishna on the battlefield of Kurukshetra. 
            Its teachings on duty, righteousness, devotion, and self-knowledge have guided millions for over 5000 years 
            and remain profoundly relevant to modern life challenges.
          </p>
        </motion.div>

        {/* FAQ */}
        <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="font-cinzel text-2xl sm:text-3xl text-gold-gradient font-bold text-center mb-8 flex items-center justify-center gap-3">
            <HelpCircle className="w-6 h-6 text-gold-400" /> FAQ
          </h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Link to="/chat" className="btn-divine inline-flex items-center gap-2 text-base">
            <MessageCircle className="w-5 h-5" /> Start Your Journey <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
