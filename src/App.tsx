import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

// Centralized social links configuration for easy updates
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/olatundedaniel/",
  behance: "https://behance.net/danielolatunde1",
  instagram: "https://www.instagram.com/rarestardesigns/",
  tiktok: "https://www.tiktok.com/@thebig.dan?is_from_webapp=1&sender_device=pc",
  whatsapp: "https://wa.me/2348164154662"
};

// Custom Behance Icon since brand icons are not in Lucide-react
export function BehanceIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M8.2 5c1.8 0 3 .6 3.8 1.7.3.5.5 1 .5 1.7 0 1.2-.6 2.1-1.7 2.7 1.4.5 2.2 1.6 2.2 3.2 0 1.1-.3 2-.9 2.7-.9 1.1-2.4 1.7-4.6 1.7H1v-13.7h7.2zm-3.5 5.2h3c1 0 1.6-.4 1.6-1.1s-.6-1-1.6-1h-3v2.1zm0 5.4h3.3c1 0 1.7-.4 1.7-1.2 0-.9-.7-1.2-1.7-1.2H4.7v2.4zm14.1-3.6c2 0 3.3 1.1 3.5 3.2h-7.1c0 1.2.8 2 2.2 2 1.1 0 1.9-.5 2.2-1.3h2.3c-.5 2-2.3 3.3-4.5 3.3-3.3 0-5.3-2.1-5.3-5.2 0-3 2.1-5.2 5.1-5.2 3.1 0 5 2.1 5 5.2v.3l-3.4-.3zm-1.3-1.6c-1.1 0-1.8.7-2 1.6h3.9c0-.9-.7-1.6-1.9-1.6zm.5-4.4h3.6v1.2h-3.6V6z"/>
    </svg>
  );
}

// Custom LinkedIn Icon
export function LinkedinIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// Custom Instagram Icon
export function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Custom TikTok Icon
export function TiktokIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

// Custom WhatsApp Icon (Filled and simplified to prevent distortion)
export function WhatsappIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M12.004 2c-5.51 0-9.99 4.49-9.99 10 0 1.9.53 3.68 1.46 5.22L2 22l5.03-1.33c1.47.81 3.14 1.27 4.97 1.27 5.51 0 9.99-4.49 9.99-10s-4.48-10-9.99-10zm5.72 13c-.24.68-1.21 1.24-1.74 1.33-.45.08-1.03.11-1.66-.09-.4-.13-.93-.32-1.59-.6-2.82-1.21-4.66-4.08-4.8-4.28-.14-.19-1.15-1.53-1.15-2.92 0-1.39.72-2.07.98-2.35.26-.28.58-.35.77-.35s.38 0 .55.01c.18.01.42-.07.66.5.24.58.83 2.02.9 2.16.07.14.12.31.02.5-.1.19-.22.31-.38.5-.16.19-.34.42-.48.57-.16.16-.33.34-.14.67.19.32.84 1.38 1.81 2.24.97.86 1.78 1.33 2.11 1.49.33.16.52.12.72-.11.2-.23.86-1.01 1.09-1.36.23-.35.46-.29.77-.18s1.97.97 2.31 1.14c.34.17.57.25.65.39.08.14.08.82-.16 1.5z"/>
    </svg>
  );
}

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">
            Olatunde Daniel Oluseyi
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const active = isActive(link.path);
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`transition-colors font-medium text-sm ${
                    active 
                      ? 'text-slate-900 dark:text-white font-semibold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Action Buttons */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Theme Toggle for Mobile */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button 
              className="p-2 text-slate-600 dark:text-slate-400" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3 shadow-lg absolute w-full left-0">
          {links.map((link) => {
            const active = isActive(link.path);
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)} 
                className={`block font-medium px-4 py-2.5 rounded-md transition-colors ${
                  active 
                    ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900 font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  });
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <footer className="py-10 border-t border-slate-200 dark:border-slate-800 mt-auto bg-white dark:bg-slate-950 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-slate-500 dark:text-slate-400 text-sm">
              © {new Date().getFullYear()} Olatunde Daniel Oluseyi. All rights reserved.
            </div>
            
            {/* Social Icon Links */}
            <div className="flex items-center space-x-6 text-slate-500 dark:text-slate-400">
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-slate-900 dark:hover:text-white transition-colors" 
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a 
                href={SOCIAL_LINKS.behance} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-slate-900 dark:hover:text-white transition-colors" 
                aria-label="Behance"
              >
                <BehanceIcon size={20} />
              </a>
              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-slate-900 dark:hover:text-white transition-colors" 
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a 
                href={SOCIAL_LINKS.tiktok} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-slate-900 dark:hover:text-white transition-colors" 
                aria-label="TikTok"
              >
                <TiktokIcon size={20} />
              </a>
              <a 
                href={SOCIAL_LINKS.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-slate-900 dark:hover:text-white transition-colors" 
                aria-label="WhatsApp"
              >
                <WhatsappIcon size={20} />
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Scroll to Top button (Only visible on mobile screen widths) */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center md:hidden"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </Router>
  );
}