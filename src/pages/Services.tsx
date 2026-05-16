import { motion } from 'motion/react';
import { Server, Cpu, HardDrive, Shield, Check, ArrowRight, ExternalLink, Activity } from 'lucide-react';

export default function Services() {
  const minecraftPlans = [
    {
      name: "Premium Plan",
      price: "₹160",
      period: "/ mo",
      ram: "8GB DDR5",
      cpu: "4 vCore (AMD Epyc)",
      storage: "60GB NVMe SSD"
    },
    {
      name: "Business Plan",
      price: "₹220",
      period: "/ mo",
      ram: "12GB DDR5",
      cpu: "6 vCore (AMD Epyc)",
      storage: "80GB NVMe SSD"
    },
    {
      name: "Enterprise Plan",
      price: "₹260",
      period: "/ mo",
      ram: "16GB DDR5",
      cpu: "8 vCore (AMD Epyc)",
      storage: "100GB NVMe SSD"
    },
    {
      name: "Ultra Plan",
      price: "₹320",
      period: "/ mo",
      ram: "24GB DDR5",
      cpu: "12 vCore (AMD Epyc)",
      storage: "150GB NVMe SSD"
    },
    {
      name: "Proplus Plan",
      price: "₹420",
      period: "/ mo",
      ram: "32GB DDR5",
      cpu: "16 vCore (AMD Epyc)",
      storage: "200GB NVMe SSD"
    },
    {
      name: "Unlimited Plan",
      price: "₹600",
      period: "/ mo",
      ram: "64GB DDR5",
      cpu: "Unlimited vCore (AMD Epyc)",
      storage: "Unlimited NVMe SSD",
      extra: "Free Subdomain"
    },
    {
      name: "Infinite Plan",
      price: "₹900",
      period: "/ mo",
      ram: "Unlimited DDR5",
      cpu: "Unlimited vCore",
      storage: "Unlimited NVMe SSD",
      extra: "Priority Support",
      popular: true
    }
  ];

  const vpsPlans = [
    {
      name: "Starter Plan",
      price: "₹89",
      period: "/ mo",
      ram: "2 GB RAM",
      cpu: "1 vCore",
      storage: "50 GB Storage"
    },
    {
      name: "Basic Plan",
      price: "₹179",
      period: "/ mo",
      ram: "4 GB RAM",
      cpu: "2 vCore",
      storage: "80 GB Storage"
    },
    {
      name: "Pro Plan",
      price: "₹239",
      period: "/ mo",
      ram: "8 GB RAM",
      cpu: "4 vCore",
      storage: "100 GB Storage",
      popular: true
    },
    {
      name: "Advanced Plan",
      price: "₹359",
      period: "/ mo",
      ram: "16 GB RAM",
      cpu: "8 vCore",
      storage: "300 GB Storage"
    },
    {
      name: "Ultra Plan",
      price: "₹599",
      period: "/ mo",
      ram: "32 GB RAM",
      cpu: "16 vCore",
      storage: "800 GB Storage"
    },
    {
      name: "God Tier Plan",
      price: "₹919",
      period: "/ mo",
      ram: "64 GB RAM",
      cpu: "16 vCore",
      storage: "1 TB Storage"
    }
  ];

  const discordUrl = "https://discord.gg/NrFzwAdPct";
  const panelUrl = "https://panel.civizsicloudhosting.indevs.in";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex-1 w-full px-4 py-16 sm:px-10 lg:px-10 max-w-7xl mx-auto"
    >
      <div className="max-w-3xl mb-12 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-2 py-0.5 bg-dark-border/50 border border-dark-border text-[10px] text-primary-light font-mono uppercase tracking-tighter">Pricing & Services</span>
          <div className="h-[1px] flex-1 max-w-[100px] bg-dark-border"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Select your power.</h1>
        <p className="text-lg text-slate-400">
          Scale your infrastructure with our high-frequency instances. Choose the tier that matches your operations.
        </p>
      </div>

      {/* Alert Box */}
      <div className="mb-16 bg-primary/10 border border-primary/50 rounded-lg p-4 flex items-center justify-between shadow-[0_0_20px_rgba(6,182,212,0.15)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="h-10 w-10 rounded-full bg-dark-bg border border-primary/30 flex items-center justify-center shrink-0">
            <Activity className="h-5 w-5 text-primary-light animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Trial Access Enabled</h3>
            <p className="text-primary-light text-sm">
              Notice: Minecraft Server Trial is <strong className="text-white">₹50</strong> | VPS Trial is <strong className="text-white">₹30</strong>.
            </p>
          </div>
        </div>
        <a href={discordUrl} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-4 py-2 bg-dark-bg border border-primary/30 text-primary-light text-xs font-bold uppercase rounded hover:bg-primary/20 transition-colors">
          Claim Trial <ArrowRight className="h-3 w-3" />
        </a>
      </div>

      {/* Section 1: Minecraft Plans */}
      <section className="mb-24">
        <div className="mb-8">
          <h2 className="text-2xl font-light text-white flex items-center gap-3">
            <Server className="h-6 w-6 text-primary" />
            Civizsicloud <span className="font-semibold text-primary">— PREMIUM MINECRAFT PLANS</span>
          </h2>
          <p className="text-slate-400 mt-2 font-mono text-sm uppercase tracking-wider">
            High-frequency cores. NVMe speed. Built for serious performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {minecraftPlans.map((plan, i) => (
            <div 
              key={i}
              className={`p-6 rounded-lg bg-dark-card/60 backdrop-blur-md border ${plan.popular ? 'border-primary shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-dark-border hover:border-primary-dark hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]'} flex flex-col justify-between transition-all duration-300 relative overflow-hidden group`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary/20 text-primary-light text-[9px] font-bold uppercase tracking-widest px-3 py-1 border-b border-l border-primary/30">
                  Top Tier
                </div>
              )}
              
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-light text-white">{plan.price}</span>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">{plan.period}</span>
                </div>
                
                <div className="h-[1px] w-full bg-dark-border/50 mb-6 group-hover:bg-primary/30 transition-colors"></div>
                
                <ul className="flex flex-col gap-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Cpu className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors shrink-0" />
                    <span className="text-sm text-slate-300">{plan.cpu}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <HardDrive className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors shrink-0" />
                    <span className="text-sm text-slate-300">{plan.ram} RAM</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Server className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors shrink-0" />
                    <span className="text-sm text-slate-300">{plan.storage}</span>
                  </li>
                  {plan.extra && (
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      <span className="text-sm text-green-400">{plan.extra}</span>
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="flex flex-col gap-2 mt-auto">
                <a 
                  href={discordUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`w-full py-3 px-4 rounded text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${plan.popular ? 'bg-primary-hover hover:bg-primary text-slate-900 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-transparent text-primary-light border border-primary hover:bg-primary/20'}`}
                >
                  Buy Now
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a 
                  href={panelUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-2.5 px-4 rounded text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center bg-dark-bg/50 text-slate-400 border border-dark-border hover:border-primary-dark hover:text-white"
                >
                  Panel
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 rounded bg-dark-card border border-dark-border flex items-center justify-center">
          <p className="text-xs text-slate-400 font-mono uppercase tracking-widest text-center">
            <strong className="text-primary-light">ALL MINECRAFT PLANS INCLUDE:</strong> Unlimited Player Slots, High-Frequency vCPU, NVMe SSD Storage, Intel / AMD Epyc Options.
          </p>
        </div>
      </section>

      {/* Section 2: VPS Plans */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-light text-white flex items-center gap-3">
            <Cpu className="h-6 w-6 text-primary" />
            <span className="font-semibold text-primary">PREMIUM VPS PLANS</span>
          </h2>
          <p className="text-slate-400 mt-2 font-mono text-sm uppercase tracking-wider">
            Full root access. Dedicated resources. Global network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vpsPlans.map((plan, i) => (
            <div 
              key={i}
              className={`p-6 rounded-lg bg-dark-card/60 backdrop-blur-md border ${plan.popular ? 'border-primary shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-dark-border hover:border-primary-dark hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]'} flex flex-col justify-between transition-all duration-300 relative overflow-hidden group`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary/20 text-primary-light text-[9px] font-bold uppercase tracking-widest px-3 py-1 border-b border-l border-primary/30">
                  Most Popular
                </div>
              )}
              
              <div className="flex flex-col">
                 <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                 <div className="flex items-baseline gap-1 mb-6">
                   <span className="text-3xl font-light text-white">{plan.price}</span>
                   <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">{plan.period}</span>
                 </div>
                 
                 <div className="h-[1px] w-full bg-dark-border/50 mb-6 group-hover:bg-primary/30 transition-colors"></div>
                 
                 <ul className="flex flex-col gap-3 mb-8">
                   <li className="flex items-center gap-3">
                     <Cpu className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors shrink-0" />
                     <span className="text-sm text-slate-300">{plan.cpu}</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <HardDrive className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors shrink-0" />
                     <span className="text-sm text-slate-300">{plan.ram}</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <Server className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors shrink-0" />
                     <span className="text-sm text-slate-300">{plan.storage}</span>
                   </li>
                 </ul>
              </div>
              
              <div className="mt-auto">
                <a 
                  href={discordUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`w-full py-3 px-4 rounded text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${plan.popular ? 'bg-primary-hover hover:bg-primary text-slate-900 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-transparent text-primary-light border border-primary hover:bg-primary/20'}`}
                >
                  Buy Now
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 rounded bg-dark-card border border-dark-border flex items-center justify-center">
          <p className="text-xs text-slate-400 font-mono uppercase tracking-widest text-center flex flex-col md:flex-row items-center gap-2">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-green-500"/> <strong className="text-primary-light">ALL VPS PLANS INCLUDE:</strong></span>
            <span>HVM Virtualization, Dedicated public IPv4, 99.9% Uptime, Full Root Access, Instant Setup.</span>
          </p>
        </div>
      </section>

    </motion.div>
  );
}
