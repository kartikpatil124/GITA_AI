import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';

export default function ShlokaCard({ shloka }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `${shloka.sanskrit}\n\n— ${shloka.reference}\n\n${shloka.meaning}`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl p-5 sm:p-6"
      style={{
        background: 'linear-gradient(135deg, rgba(26, 17, 69, 0.6) 0%, rgba(15, 21, 53, 0.8) 100%)',
        border: '1px solid rgba(212, 168, 67, 0.2)',
        boxShadow: '0 4px 30px rgba(255, 215, 0, 0.08), inset 0 1px 0 rgba(255, 215, 0, 0.05)',
      }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gold-400/40 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-gold-400/40 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-12 h-12">
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-gold-400/40 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-gold-400/40 to-transparent" />
      </div>

      {/* Sanskrit text */}
      <div className="text-center mb-4">
        <p className="shloka-text text-base sm:text-lg leading-relaxed whitespace-pre-line">
          {shloka.sanskrit}
        </p>
      </div>

      {/* Reference */}
      <div className="text-center mb-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-saffron-400 bg-saffron-400/10 border border-saffron-400/20">
          {shloka.reference}
        </span>
      </div>

      {/* Divider */}
      <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-gold-400/30 to-transparent mb-4" />

      {/* Meaning */}
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center font-light italic">
        "{shloka.meaning}"
      </p>

      {/* Copy button */}
      <div className="flex justify-end mt-4">
        <motion.button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300
                     text-gold-400/60 hover:text-gold-400 hover:bg-gold-400/10"
          whileTap={{ scale: 0.9 }}
          aria-label="Copy shloka"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Shloka</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
