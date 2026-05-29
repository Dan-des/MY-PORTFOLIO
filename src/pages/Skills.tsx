import { motion } from 'framer-motion';

export default function Skills() {
  const tools = [
    "Adobe Photoshop", 
    "Adobe Illustrator", 
    "Figma", 
    "Affinity Designer", 
    "Notion"
  ];
  
  const softSkills = [
    "Creative Direction", 
    "Brand Strategy", 
    "Project Management", 
    "UI/UX Concepts",
    "Digital Storytelling"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="py-12 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">Technical Arsenal</h2>
      
      <div className="space-y-16">
        {/* Software & Tools Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-slate-200 flex-grow"></div>
            <h3 className="text-xl font-semibold text-slate-900">Design & Software</h3>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool) => (
              <motion.div 
                key={tool} 
                whileHover={{ scale: 1.05 }}
                className="bg-white border border-slate-200 px-6 py-3 rounded-md shadow-sm font-medium text-slate-700 transition-colors hover:border-slate-400 cursor-default"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Competencies Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-slate-200 flex-grow"></div>
            <h3 className="text-xl font-semibold text-slate-900">Professional Competencies</h3>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {softSkills.map((skill) => (
              <motion.div 
                key={skill} 
                whileHover={{ scale: 1.05 }}
                className="bg-slate-900 text-slate-50 border border-slate-900 px-6 py-3 rounded-md shadow-sm font-medium transition-colors hover:bg-slate-800 cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}