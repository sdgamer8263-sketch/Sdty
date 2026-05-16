export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto min-h-12 border-t border-dark-border bg-dark-bg py-4 px-4 sm:px-10 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-slate-600 uppercase gap-4">
      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-primary-light transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-primary-light transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-primary-light transition-colors">Twitter</a>
        <a href="#" className="hover:text-primary-light transition-colors">GitHub</a>
      </div>
      <p className="text-slate-400 font-bold">
        © {currentYear} Developed by SDGAMER. All rights reserved.
      </p>
    </footer>
  );
}
