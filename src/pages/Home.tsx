import { motion } from 'motion/react';
import { ArrowRight, Code, Layout, Smartphone, Zap, Shield, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex-1 w-full"
    >
      {/* Hero Section */}
      <section className="relative px-4 py-24 sm:px-10 lg:px-10 max-w-7xl mx-auto flex flex-col items-start overflow-hidden">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="px-2 py-0.5 bg-dark-border/50 border border-dark-border text-[10px] text-primary-light font-mono uppercase tracking-tighter">Status: Operational</span>
          <div className="h-[1px] w-24 bg-dark-border"></div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-none tracking-tight mb-6"
        >
          Architecting <br /><span className="font-bold text-primary">Digital Futures.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed"
        >
          We deliver high-performance, enterprise-grade web solutions tailored for scaling industries. From cloud infrastructure to bespoke UI/UX systems.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link to="/services" className="px-5 py-2 bg-primary-hover hover:bg-primary text-slate-900 border border-primary-hover hover:border-primary text-xs font-bold rounded uppercase tracking-widest transition-colors flex items-center justify-center">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link to="/about" className="px-5 py-2 bg-transparent text-primary-light border border-dark-border hover:border-primary text-xs font-bold rounded uppercase tracking-widest transition-colors flex items-center justify-center">
            Learn More
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-10 lg:px-10 max-w-7xl mx-auto w-full border-t border-dark-border/50">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Core Features</h2>
          <div className="h-[1px] w-full bg-dark-border ml-4"></div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { tag: "Module 01", title: "Cloud Architecture", icon: Globe2, desc: "Scale with distributed serverless environments & edge computing.", stat: "99.9%", statLabel: "Uptime" },
            { tag: "Module 02", title: "Frontend Engine", icon: Layout, desc: "Next-gen frameworks optimized for sub-second rendering.", stat: "42ms", statLabel: "LCP" },
            { tag: "Module 03", title: "Security Shield", icon: Shield, desc: "E2E encryption with automated threat detection systems.", stat: "AES", statLabel: "256-Bit" },
            { tag: "Module 04", title: "API Gateway", icon: Zap, desc: "Unified access layer with robust rate limiting & logging.", stat: "GraphQL", statLabel: "REST" }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-dark-card border border-dark-border p-6 rounded-lg flex flex-col justify-between hover:border-primary-dark transition-colors group"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{feature.tag}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mt-1">{feature.title}</h3>
                <p className="text-xs text-slate-400 leading-normal mb-8 mt-1">
                  {feature.desc}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-mono text-primary">{feature.stat}</span>
                <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">{feature.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-4 py-16 sm:px-10 lg:px-10 max-w-7xl mx-auto w-full">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Why Choose Us?</h2>
          <div className="h-[1px] w-full bg-dark-border ml-4"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Modern Design", icon: Layout, desc: "Clean, intuitive interfaces built with user experience in mind." },
            { title: "Clean Code", icon: Code, desc: "Scalable, maintainable architecture using the latest framework standards." },
            { title: "Responsive", icon: Smartphone, desc: "Flawless performance across all devices and screen sizes." }
          ].map((reason, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-dark-card border border-dark-border p-6 rounded-lg hover:border-primary-dark transition-colors"
            >
              <reason.icon className="h-6 w-6 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{reason.title}</h3>
              <p className="text-xs text-slate-400 leading-normal">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 bg-dark-card border border-dark-border rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recent Project Activity</span>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                <span className="text-sm text-slate-300">Nexus Admin Panel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                <span className="text-sm text-slate-300">Vortex CRM Migration</span>
              </div>
            </div>
          </div>
          <div className="text-left md:text-right">
            <div className="text-2xl font-mono text-white">$1.2M+</div>
            <div className="text-[10px] text-slate-600 uppercase font-bold tracking-tighter">Revenue Generated</div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
