
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Globe, Twitter, Instagram } from 'lucide-react';

export const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full flex flex-col font-display transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5">
         <div className="flex w-12 items-center justify-start">
            <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
         </div>
         <h1 className="text-lg font-bold text-text-primary-light dark:text-white">About</h1>
         <div className="w-12"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 pb-8 flex flex-col items-center text-center">
         
         <div className="w-24 h-24 rounded-3xl bg-primary text-background-dark flex items-center justify-center mb-6 shadow-2xl shadow-primary/20 mt-4">
             <span className="material-symbols-outlined text-5xl">savings</span>
         </div>

         <h2 className="text-3xl font-bold text-text-primary-light dark:text-white mb-2">SaveCircle</h2>
         <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-8">Version 1.0.3 (Build 451)</p>

         <div className="max-w-xs mx-auto mb-10">
             <p className="text-base leading-relaxed text-text-primary-light dark:text-white/90">
                 SaveCircle is designed to make financial freedom accessible to everyone through the power of community and consistency.
             </p>
         </div>

         <div className="w-full max-w-sm bg-card-light dark:bg-card-dark rounded-[2rem] p-6 border border-border-light dark:border-white/5 mb-8 text-left shadow-sm dark:shadow-none">
             <h3 className="font-bold text-lg text-text-primary-light dark:text-white mb-4">Our Mission</h3>
             <div className="space-y-4">
                 <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                         <span className="material-symbols-outlined">groups</span>
                     </div>
                     <div>
                         <h4 className="font-bold text-text-primary-light dark:text-white text-sm">Community First</h4>
                         <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">Saving is easier when we do it together.</p>
                     </div>
                 </div>
                 <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                         <span className="material-symbols-outlined">trending_up</span>
                     </div>
                     <div>
                         <h4 className="font-bold text-text-primary-light dark:text-white text-sm">Micro-Habits</h4>
                         <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">Small daily actions lead to massive results.</p>
                     </div>
                 </div>
             </div>
         </div>

         <div className="flex gap-6 mb-12">
             <a href="#" className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">
                 <Globe size={24} />
             </a>
             <a href="#" className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">
                 <Twitter size={24} />
             </a>
             <a href="#" className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">
                 <Instagram size={24} />
             </a>
         </div>

         <div className="mt-auto flex items-center gap-1 text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark opacity-60">
             <span>Made with</span>
             <Heart size={12} className="fill-red-500 text-red-500" />
             <span>by Yuvaraj Vasam</span>
         </div>

      </main>
    </div>
  );
};
