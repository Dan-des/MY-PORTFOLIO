import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function Projects() {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Branding', 'Flyers & Events', 'Digital & Social', 'Covers'];

  // Map to the 7 specific categories and folders on your Google Drive
  const allProjects = [
    {
      title: "Branding & Logos",
      category: "Branding",
      description: "Memorable brand identities, custom typography, vector logos, and design guides built to stand out.",
      image: "/royalgate.png",
      driveUrl: "https://drive.google.com/drive/folders/1zxnjrzyI7V1s2f_eOv9VKZTQVDu5_oR6?usp=sharing"
    },
    {
      title: "Event Branding",
      category: "Flyers & Events",
      description: "Cohesive event assets, staff badges, lanyards, and promotional print/digital kits.",
      image: "/fecot.png",
      driveUrl: "https://drive.google.com/drive/folders/1nzEUdm96y2QDbveI-AAlOiMKj787Y6P1?usp=sharing"
    },
    {
      title: "Premium Flyers",
      category: "Flyers & Events",
      description: "Bespoke high-end promotional flyers, event posters, and corporate announcements.",
      image: "/fecot.png",
      driveUrl: "https://drive.google.com/drive/folders/155ejDkce9xCktB1OFzxMq_HLfyKzy427?usp=sharing"
    },
    {
      title: "Book Covers",
      category: "Covers",
      description: "Premium editorial book covers featuring custom art direction and compelling layout typography.",
      image: "/book-cover.png",
      driveUrl: "https://drive.google.com/drive/folders/13ODA7X-DHGh5dTsQsgKERj5p36CB0KTL?usp=sharing"
    },
    {
      title: "LinkedIn Banners",
      category: "Digital & Social",
      description: "Custom-fitted, high-resolution header graphics and professional profile backgrounds.",
      image: "/linkedin-banner.png",
      driveUrl: "https://drive.google.com/drive/folders/1gg74492WYgdq54YoKcaHQGVDlH9e0Cnm?usp=sharing"
    },
    {
      title: "Birthday Designs",
      category: "Flyers & Events",
      description: "Luxury and customized celebratory invitations, anniversary cards, and greeting layouts.",
      image: "/birthday-design.png",
      driveUrl: "https://drive.google.com/drive/folders/10-QZ413TW7-VR8nH4_E9WbXLGwRlR3NV?usp=sharing"
    },
    {
      title: "Social Media Designs",
      category: "Digital & Social",
      description: "Marketing creatives, Instagram feeds, growth graphics, and dynamic promotional layouts.",
      image: "/social-media.png",
      driveUrl: "https://drive.google.com/drive/folders/1xudVh_18F4eTV2zIgfmXfg-E4iHPLX3D?usp=sharing"
    }
  ];

  const filteredProjects = activeTab === 'All'
    ? allProjects
    : allProjects.filter(project => project.category === activeTab);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="py-12 max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-slate-900 tracking-tight">Design Portfolio</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore my branding identity systems, UI/UX conceptual flows, and digital designs organized by folder.
        </p>
      </div>

      {/* Tab Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-slate-200 pb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Featured Projects Grid with Layout Animations */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div 
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Project Image Container */}
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400 text-sm">
                  [Loading Cover...]
                </div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover relative z-10 opacity-0 transition-opacity duration-300 group-hover:scale-105"
                  onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                  onError={(e) => e.currentTarget.classList.add('hidden')}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                  <a 
                    href={project.driveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-slate-900 px-5 py-2.5 rounded-md font-medium flex items-center gap-1.5 shadow-md hover:bg-slate-50 transition-colors text-sm"
                  >
                    Open Drive Folder <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{project.category}</p>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                </div>
                
                <a 
                  href={project.driveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-slate-700 mt-2 self-start"
                >
                  View Files <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* The "Full Archive" Call to Action */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-50 rounded-2xl p-8 md:p-12 text-center border border-slate-200"
      >
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Looking for something else?</h3>
        <p className="text-slate-600 mb-8 max-w-xl mx-auto">
          You can also browse my complete top-level Google Drive directory for raw project folders, client briefs, and other branding strategy files.
        </p>
        <a 
          href="https://drive.google.com/drive/folders/18nHN2xAf_zgRzja4b5lr0LLGAfooQhwu?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-md hover:bg-slate-800 transition-colors font-medium shadow-md hover:shadow-lg animate-pulse"
        >
          View Full Google Drive <ExternalLink size={18} />
        </a>
      </motion.div>

    </motion.div>
  );
}