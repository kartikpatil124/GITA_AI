import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center pt-32 pb-8 px-4">
      <motion.h1
        className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-semibold text-gold-gradient tracking-wide leading-tight"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Find Your Answer
      </motion.h1>

      <motion.p
        className="mt-4 text-gray-500 text-sm sm:text-base max-w-md font-light leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Share what troubles you. Receive wisdom from the Bhagavad Gita.
      </motion.p>
    </section>
  );
}
