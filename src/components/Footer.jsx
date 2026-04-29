import { Heart, Github, Twitter, ExternalLink } from 'lucide-react';
import OmSymbol from '../assets/OmSymbol';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gold-400/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Sanskrit verse decoration */}
        <div className="text-center mb-8">
          <p className="shloka-text text-sm md:text-base opacity-40 italic">
            "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत"
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <OmSymbol size={28} />
            <span className="font-cinzel text-lg text-gold-400/80 tracking-wider">Gita AI</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gold-400 transition-colors duration-300 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Privacy</span>
            </a>
            <a href="#" className="hover:text-gold-400 transition-colors duration-300 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Terms</span>
            </a>
            <a href="#" className="hover:text-gold-400 transition-colors duration-300">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-gold-400 transition-colors duration-300">
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-600 flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-saffron-400 fill-saffron-400" /> for seekers of wisdom
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} Gita AI. All teachings inspired by the Bhagavad Gita.
          </p>
        </div>
      </div>
    </footer>
  );
}
