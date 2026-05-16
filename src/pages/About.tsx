import { motion } from 'motion/react';
import { Target, Eye } from 'lucide-react';

export default function About() {
  const team = [
    { name: "Alex Chen", role: "Lead Systems Architect", id: "ID: 492-A" },
    { name: "Sarah Jenkins", role: "Frontend Engine Pilot", id: "ID: 819-F" },
    { name: "Marcus Doe", role: "Security Ops Commander", id: "ID: 104-S" },
    { name: "Elena Rostova", role: "Data Flow Engineer", id: "ID: 772-D" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex-1 w-full px-4 py-16 sm:px-10 lg:px-10 max-w-7xl mx-auto"
    >
      <div className="max-w-3xl mb-16 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-2 py-0.5 bg-dark-border/50 border border-dark-border text-[10px] text-primary-light font-mono uppercase tracking-tighter">Entity Info</span>
          <div className="h-[1px] flex-1 max-w-[100px] bg-dark-border"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">About the Core.</h1>
        <p className="text-lg text-slate-400">
          We are a nexus of architects, engineers, and strategists dedicated to crafting exceptional digital infrastructure.
        </p>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-dark-card border border-dark-border p-8 rounded-lg flex flex-col hover:border-primary-dark transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Target className="w-32 h-32 text-primary" />
          </div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="h-10 w-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase mb-4 relative z-10">Directive 01</span>
          <p className="text-sm text-slate-400 leading-relaxed max-w-md relative z-10">
            At Civizsicloud, our mission is to empower enterprises with cutting-edge technology and robust architectural design. We believe that a resilient digital infrastructure is the foundation of success in an automated world.
          </p>
        </div>

        <div className="bg-dark-card border border-dark-border p-8 rounded-lg flex flex-col hover:border-primary-dark transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Eye className="w-32 h-32 text-primary" />
          </div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="h-10 w-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Our Vision</h2>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase mb-4 relative z-10">Directive 02</span>
          <p className="text-sm text-slate-400 leading-relaxed max-w-md relative z-10">
            Founded with a vision to bridge the gap between high-performance backends and seamless frontends, we aim to architect systems that are future-proof, scalable, and secure against tomorrow's threats.
          </p>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Meet the Team</h2>
          <div className="h-[1px] w-full bg-dark-border ml-4"></div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-dark-card border border-dark-border p-6 rounded-lg flex flex-col hover:border-primary-dark transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                 <span className="text-[8px] font-mono text-primary-light uppercase tracking-widest">{member.id}</span>
              </div>
              <div className="w-16 h-16 rounded bg-dark-bg border border-dark-border mb-4 flex items-center justify-center overflow-hidden">
                 <div className="w-full h-full bg-slate-800/30 flex items-center justify-center font-mono text-xl text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">{member.name.charAt(0)}</div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-dark-border">
        {[
          { label: "Deployments", value: "150+" },
          { label: "Uptime Avg", value: "99.9%" },
          { label: "Active Nodes", value: "340" },
          { label: "Global Ops", value: "24/7" }
        ].map((stat, i) => (
          <div key={i} className="text-left bg-dark-card border border-dark-border p-6 rounded-lg hover:border-primary-dark transition-colors">
            <div className="text-3xl font-mono text-primary mb-2">{stat.value}</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
