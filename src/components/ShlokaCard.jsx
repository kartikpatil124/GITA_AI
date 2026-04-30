import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';

export default function ShlokaCard({ shloka }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `${shloka.sanskrit}\n— ${shloka.reference}\n\n${shloka.meaning}`;
    if (await copyToClipboard(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      className="rounded-xl p-5 sm:p-6 my-1"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(212, 168, 67, 0.1)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="shloka-text text-sm sm:text-base text-center leading-relaxed whitespace-pre-line">
        {shloka.sanskrit}
      </p>

      <p className="text-center mt-3 mb-4">
        <span className="text-[11px] text-gold-500/60 tracking-wider uppercase">{shloka.reference}</span>
      </p>

      <div className="w-8 h-px mx-auto bg-white/[0.06] mb-4" />

      <p className="text-gray-400 text-sm leading-relaxed text-center font-light italic">
        "{shloka.meaning}"
      </p>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] text-gray-600 hover:text-gold-400 transition-colors duration-300"
          aria-label="Copy shloka"
        >
          {copied ? <><Check className="w-3 h-3 text-green-500" /><span className="text-green-500">Copied</span></> :
           <><Copy className="w-3 h-3" /><span>Copy</span></>}
        </button>
      </div>
    </motion.div>
  );
}
