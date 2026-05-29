import { motion } from 'framer-motion';
import { PenTool, Layout, MonitorPlay, Calendar, Share2, Presentation, FileText } from 'lucide-react';

const services = [
  { 
    title: "Brand Strategy & Identity", 
    icon: <Layout size={32} />, 
    desc: "Building comprehensive identity systems that communicate core values and position your brand effectively in the market." 
  },
  { 
    title: "Logo Design", 
    icon: <PenTool size={32} />, 
    desc: "Crafting memorable, scalable, and impactful marks that serve as the visual anchor for your business." 
  },
  { 
    title: "Digital Content Creation", 
    icon: <MonitorPlay size={32} />, 
    desc: "Designing engaging digital series, comic frames, and visual content optimized for seamless modern loops." 
  },
  { 
    title: "Event Branding & Flyers", 
    icon: <Calendar size={32} />, 
    desc: "Developing cohesive visual packages, dynamic flyers, and promotional materials designed to drive live engagement." 
  },
  { 
    title: "Social Media Graphics", 
    icon: <Share2 size={32} />, 
    desc: "Designing visually striking grids, posts, and stories that amplify your message and drive community interaction across platforms." 
  },
  { 
    title: "Presentation Design", 
    icon: <Presentation size={32} />, 
    desc: "Transforming complex information into clean, persuasive, and highly engaging pitch decks and business presentations." 
  },
  { 
    title: "Brochure & Poster Design", 
    icon: <FileText size={32} />, 
    desc: "Crafting impactful print and digital layouts, folding brochures, and large-format posters that capture attention instantly." 
  },
];

export default function Services() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="py-12"
    >
      <h2 className="text-3xl font-bold mb-8 text-slate-900">What I Do</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc, idx) => (
          <motion.div 
            key={idx} 
            whileHover={{ y: -5 }}
            className="p-8 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-slate-900 mb-6 bg-slate-50 w-16 h-16 flex items-center justify-center rounded-lg border border-slate-100">
                {svc.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{svc.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{svc.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}