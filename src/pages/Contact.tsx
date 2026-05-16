import { motion } from 'motion/react';
import { Mail, MapPin, Send, MessageSquare, Github } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex-1 w-full px-4 py-16 sm:px-10 lg:px-10 max-w-7xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-dark-border/50 border border-dark-border text-[10px] text-primary-light font-mono uppercase tracking-tighter">Comms Link</span>
            <div className="h-[1px] w-24 bg-dark-border"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-light leading-none tracking-tight mb-2">System Contact.</h1>
          <p className="text-lg text-slate-400 mb-6">
            Commence data transfer. We respond to all inquiries within standard operational cycles.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-dark-card border border-dark-border p-6 rounded-lg flex flex-col gap-4 hover:border-primary-dark transition-colors">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Email Protocol</span>
                <a href="mailto:hello@civizsicloud.com" className="text-sm font-semibold text-white hover:text-primary transition-colors">
                  hello@civizsicloud.com
                </a>
              </div>
            </div>
            
            <div className="bg-dark-card border border-dark-border p-6 rounded-lg flex flex-col gap-4 hover:border-primary-dark transition-colors">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Physical Node</span>
                <p className="text-sm font-semibold text-white">
                  123 Tech Avenue, SF
                </p>
              </div>
            </div>

            <div className="bg-dark-card border border-dark-border p-6 rounded-lg flex flex-col gap-4 hover:border-primary-dark transition-colors">
              <MessageSquare className="h-6 w-6 text-primary" />
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Discord Comms</span>
                <a href="#" className="text-sm font-semibold text-white hover:text-primary transition-colors">
                  Join Server
                </a>
              </div>
            </div>

            <div className="bg-dark-card border border-dark-border p-6 rounded-lg flex flex-col gap-4 hover:border-primary-dark transition-colors">
              <Github className="h-6 w-6 text-primary" />
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Code Repo</span>
                <a href="https://github.com/civizsicloud" className="text-sm font-semibold text-white hover:text-primary transition-colors">
                  github.com/civizsicloud
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-dark-card rounded-lg p-8 border border-dark-border">
          <h2 className="text-xl font-semibold mb-6">Transmit Message</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Name</label>
              <input 
                type="text" 
                id="name" 
                required
                className="w-full bg-dark-bg border border-dark-border rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="Ident designation"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Email Address</label>
              <input 
                type="email" 
                id="email" 
                required
                className="w-full bg-dark-bg border border-dark-border rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="Comm link address"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="subject" className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Subject</label>
              <input 
                type="text" 
                id="subject" 
                required
                className="w-full bg-dark-bg border border-dark-border rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="Transmission classification"
              />
            </div>

            <div className="space-y-1 mb-4">
              <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Message Payload</label>
              <textarea 
                id="message" 
                required 
                rows={4}
                className="w-full bg-dark-bg border border-dark-border rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Enter payload here..."
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={status !== 'idle'}
              className="w-full mt-4 bg-primary-hover hover:bg-primary text-slate-900 font-bold py-3 px-6 rounded uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Transmitting...' : status === 'success' ? 'Transmission Sent' : (
                <>
                  Initialize Transfer
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
