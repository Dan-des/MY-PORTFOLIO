import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between min-h-[75vh] gap-12 py-12">
      
      {/* Left Column: Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 text-center md:text-left flex flex-col items-center md:items-start"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-6 leading-tight">
          Designing Brands <br className="hidden md:block" /> That Stand Out.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          I'm Olatunde Daniel Oluseyi, a professional designer specializing in brand identity, impactful logos, and compelling flyer designs. Elevating ideas through seamless digital aesthetics.
        </p>
        
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mb-12">
          {/* This points to your Drive link */}
          <a href="https://drive.google.com/drive/folders/18nHN2xAf_zgRzja4b5lr0LLGAfooQhwu?usp=sharing" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-slate-900 text-white px-8 py-3 rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 font-medium">
            View Drive Portfolio <ArrowRight size={18} />
          </a>
          <Link to="/contact" className="w-full sm:w-auto bg-white text-slate-900 border border-slate-300 px-8 py-3 rounded-md hover:bg-slate-50 transition-colors font-medium text-center">
            Get in Touch
          </Link>
        </div>
      </motion.div>

      {/* Right Column: Visual Element / Real Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 w-full max-w-md"
      >
        <div className="aspect-square rounded-3xl bg-slate-100 border-8 border-white shadow-xl overflow-hidden relative">
           {/* 
             IMPORTANT: If your image is not named "profile.jpg" (e.g., if it is "profile.png"),
             change the src below to match your filename.
           */}
           <img 
             src="/Profile.png" 
             alt="Olatunde Daniel Oluseyi - Brand Designer" 
             className="w-full h-full object-cover"
           />
        </div>
      </motion.div>

    </div>
  );
}