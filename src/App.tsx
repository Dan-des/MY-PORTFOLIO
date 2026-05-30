import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

// Centralized social links configuration for easy updates
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/olatundedaniel/",
  behance: "https://behance.net",
  dribbble: "https://dribbble.com",
  instagram: "https://www.instagram.com/rarestardesigns/"
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

// Custom Dribbble Icon
export function DribbbleIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
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

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
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
                href={SOCIAL_LINKS.dribbble} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-slate-900 dark:hover:text-white transition-colors" 
                aria-label="Dribbble"
              >
                <DribbbleIcon size={20} />
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
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}