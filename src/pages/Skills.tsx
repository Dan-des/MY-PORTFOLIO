import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Count-up helper component that triggers on mount
function CountUp({ to, duration = 1.2 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = to;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMiliseconds / end), 16); // cap at ~60fps
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [to, duration]);

  return <span>{count}%</span>;
}

export default function Skills() {
  const tools = [
    { name: "Adobe Photoshop", percentage: 96 },
    { name: "Adobe Illustrator", percentage: 98 },
    { name: "Figma", percentage: 95 },
    { name: "Affinity Designer", percentage: 93 },
    { name: "Notion", percentage: 92 }
  ];
  
  const softSkills = [
    { name: "Creative Direction", percentage: 97 },
    { name: "Brand Strategy", percentage: 98 },
    { name: "Project Management", percentage: 94 },
    { name: "UI/UX Concepts", percentage: 93 },
    { name: "Digital Storytelling", percentage: 96 },
    { name: "Leadership", percentage: 95 },
    { name: "Teamwork", percentage: 97 }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="py-12 max-w-4xl mx-auto"
    >
      <h2 className="text-4xl font-bold mb-4 text-center text-slate-900 tracking-tight">Technical & Creative Arsenal</h2>
      <p className="text-lg text-slate-600 text-center max-w-xl mx-auto mb-16">
        A visual representation of my design expertise, software masteries, and core professional competencies.
      </p>
      
      <div className="space-y-16">
        {/* Software & Tools Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px bg-slate-200 flex-grow"></div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Design & Software</h3>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {tools.map((tool) => (
              <div key={tool.name} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-800">{tool.name}</span>
                  <span className="text-indigo-600 font-bold">
                    <CountUp to={tool.percentage} />
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 border border-slate-200/50 rounded-full overflow-hidden relative shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tool.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Professional Competencies Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px bg-slate-200 flex-grow"></div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Professional Competencies</h3>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {softSkills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-800">{skill.name}</span>
                  <span className="text-slate-900 font-bold">
                    <CountUp to={skill.percentage} />
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 border border-slate-200/50 rounded-full overflow-hidden relative shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-slate-900 to-slate-700 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}