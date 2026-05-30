import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PenTool, Layout, MonitorPlay, Calendar, Share2, Presentation, FileText, ChevronDown, ChevronUp, Check } from 'lucide-react';

const services = [
  { 
    title: "Brand Strategy & Identity", 
    icon: <Layout size={32} />, 
    desc: "Building comprehensive identity systems that communicate core values and position your brand effectively in the market.",
    deliverables: [
      "Core brand positioning outline",
      "Visual identity style guidelines",
      "Custom typography specifications",
      "Harmonious brand color palettes"
    ]
  },
  { 
    title: "Logo Design", 
    icon: <PenTool size={32} />, 
    desc: "Crafting memorable, scalable, and impactful marks that serve as the visual anchor for your business.",
    deliverables: [
      "Scalable vector source files (.AI, .EPS, .SVG)",
      "High-resolution raster files (.PNG, .JPG)",
      "Multiple unique layout variations",
      "App icon & Favicon adaptations"
    ]
  },
  { 
    title: "Digital Content Creation", 
    icon: <MonitorPlay size={32} />, 
    desc: "Designing engaging digital series, comic frames, and visual content optimized for seamless modern loops.",
    deliverables: [
      "Engaging visual storyboards",
      "Digital series layout guidelines",
      "Custom vector illustrations",
      "Platform-optimized layout sizes"
    ]
  },
  { 
    title: "Event Branding & Flyers", 
    icon: <Calendar size={32} />, 
    desc: "Developing cohesive visual packages, dynamic flyers, and promotional materials designed to drive live engagement.",
    deliverables: [
      "Promotional & event flyers",
      "Staff badges & attendee lanyards",
      "Digital billboard designs",
      "Print-ready CMYK layouts"
    ]
  },
  { 
    title: "Social Media Graphics", 
    icon: <Share2 size={32} />, 
    desc: "Designing visually striking grids, posts, and stories that amplify your message and drive community interaction across platforms.",
    deliverables: [
      "Instagram feed & grid assets",
      "Story templates & backgrounds",
      "Growth marketing creative banners",
      "Source design layers (Figma/Photoshop)"
    ]
  },
  { 
    title: "Presentation Design", 
    icon: <Presentation size={32} />, 
    desc: "Transforming complex information into clean, persuasive, and highly engaging pitch decks and business presentations.",
    deliverables: [
      "Custom presentation templates",
      "Data visualization & charts",
      "Pitch deck visual outline",
      "Exported slides (.PPTX / Google Slides)"
    ]
  },
  { 
    title: "Brochure & Poster Design", 
    icon: <FileText size={32} />, 
    desc: "Crafting impactful print and digital layouts, folding brochures, and large-format posters that capture attention instantly.",
    deliverables: [
      "Tri-fold & bi-fold brochure layouts",
      "High-impact promotional posters",
      "Print-ready CMYK configurations",
      "Optimized digital PDF publications"
    ]
  },
];

export default function Services() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggleCard = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="py-12"
    >
      <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">What I Do</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-xl">
        Select any services to view the list of visual deliverables you will receive with the package.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc, idx) => (
          <motion.div 
            key={idx} 
            whileHover={{ y: expandedIdx === idx ? 0 : -5 }}
            className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-fit"
          >
            <div>
              <div className="text-slate-900 dark:text-white mb-6 bg-slate-50 dark:bg-slate-950 w-16 h-16 flex items-center justify-center rounded-lg border border-slate-100 dark:border-slate-800">
                {svc.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{svc.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">{svc.desc}</p>
              
              <AnimatePresence>
                {expandedIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-3 text-sm text-slate-650 dark:text-slate-400">
                      {svc.deliverables.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5">
                          <Check size={14} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => toggleCard(idx)}
              className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between w-full text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <span>{expandedIdx === idx ? "Hide Deliverables" : "View Deliverables"}</span>
              {expandedIdx === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}