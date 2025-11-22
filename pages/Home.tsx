
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCircles, getUser } from '../utils/storage';
import { 
  Bell, 
  Plus, 
  Target,
  ChevronRight,
  Wallet,
  Trophy,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Flame
} from 'lucide-react';
import { CircleIcon } from '../components/CircleIcon';
import { TourGuide, TourStep } from '../components/TourGuide';

export const Home: React.FC = () => {
  const [user, setUser] = useState(getUser());
  const [circles, setCircles] = useState(getCircles());
  const [showTour, setShowTour] = useState(false);
  
  // Re-fetch on focus to keep UI in sync when navigating back
  useEffect(() => {
    const handleFocus = () => {
        setUser(getUser());
        setCircles(getCircles());
    };
    window.addEventListener('focus', handleFocus);
    
    // Tour Logic check - small delay to ensure render
    setTimeout(() => {
      const hasSeenTour = localStorage.getItem('savecircle_tour_seen');
      if (!hasSeenTour) {
          setShowTour(true);
      }
    }, 1000);
    
    const interval = setInterval(handleFocus, 2000);
    
    return () => {
        window.removeEventListener('focus', handleFocus);
        clearInterval(interval);
    };
  }, []);

  const finishTour = () => {
      setShowTour(false);
      localStorage.setItem('savecircle_tour_seen', 'true');
  };

  const tourSteps: TourStep[] = [
      {
          targetId: 'center',
          title: 'Welcome to SaveCircle! 👋',
          content: "Let's take a quick tour to help you start your savings journey and build wealth together.",
          position: 'center'
      },
      {
          targetId: 'tour-balance',
          title: 'Your Money Hub',
          content: "This card shows your total savings across all circles. You can quickly deposit funds here.",
          position: 'bottom'
      },
      {
          targetId: 'tour-streak',
          title: 'Track Consistency',
          content: "Build your streak by saving daily. Higher streaks unlock badges and special rewards!",
          position: 'bottom'
      },
      {
          targetId: 'nav-circles',
          title: 'Social Savings',
          content: "Join circles with friends or create solo goals. Saving together makes you 3x more likely to succeed.",
          position: 'top'
      },
      {
          targetId: 'nav-learn',
          title: 'Boost Financial IQ',
          content: "Take short lessons on investing, budgeting, and credit to earn XP and Gems.",
          position: 'top'
      }
  ];

  const dailyTarget = user.dailyGoal;
  const savedToday = user.savedToday;
  const progressPercentage = Math.min(100, (savedToday / dailyTarget) * 100);

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full flex flex-col font-display transition-colors duration-300 pb-24">
      
      <TourGuide 
        steps={tourSteps} 
        isOpen={showTour} 
        onComplete={finishTour}
        onSkip={finishTour}
      />

      {/* HEADER - Minimal & Personal */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl px-6 py-4 border-b border-transparent transition-all duration-300">
         <Link to="/profile" className="relative group">
            <img src={user.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-white/10 group-hover:scale-105 transition-transform" alt="Profile" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background-light dark:border-background-dark rounded-full"></div>
         </Link>

         <div className="flex items-center gap-3">
             <Link to="/shop" className="flex items-center gap-1.5 bg-sky-500/10 px-3 py-1.5 rounded-full border border-sky-500/20 hover:bg-sky-500/20 transition-colors active:scale-95">
                <span className="material-symbols-outlined text-sky-500 text-lg filled">diamond</span>
                <span className="font-bold text-sky-600 dark:text-sky-400 text-sm">{user.gems}</span>
             </Link>
             <Link to="/notifications" className="w-10 h-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors relative active:scale-95">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background-light dark:border-background-dark"></span>
             </Link>
         </div>
      </header>

      <main className="flex-1 px-6 space-y-8 overflow-y-auto no-scrollbar pt-2">
        
        {/* Large Greeting */}
        <div className="flex flex-col animate-fade-in">
            <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">{greeting},</span>
            <h1 className="text-3xl font-bold text-text-primary-light dark:text-white">{user.name}</h1>
        </div>

        {/* Hero Card - The "Wallet" Look */}
        <section id="tour-balance" className="relative w-full rounded-[2rem] bg-[#1a1a1a] dark:bg-[#1a1a1a] text-white p-6 shadow-2xl overflow-hidden border border-white/5 group transition-transform active:scale-[0.99]">
             {/* Abstract Background */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-16 -mt-24 pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none"></div>

             <div className="relative z-10">
                 <div className="flex justify-between items-start mb-8">
                     <div>
                         <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Total Saved</p>
                         <h2 className="text-4xl font-display font-bold tracking-tight">₹{user.totalSaved.toLocaleString()}</h2>
                     </div>
                     <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-inner">
                         <Wallet className="text-primary" size={24} />
                     </div>
                 </div>

                 {/* Daily Goal Progress Inline */}
                 <div className="mb-8">
                     <div className="flex justify-between text-sm font-medium mb-2">
                         <span className="text-white/80">Daily Goal</span>
                         <span className="text-white font-bold">₹{savedToday} / ₹{dailyTarget}</span>
                     </div>
                     <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                         <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out relative" style={{width: `${progressPercentage}%`}}>
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50"></div>
                         </div>
                     </div>
                 </div>

                 <div className="flex gap-3">
                     <Link to="/circles/vault" className="flex-1 bg-primary text-background-dark h-12 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20">
                         <Plus size={20} strokeWidth={3} />
                         Deposit
                     </Link>
                     <Link to="/history" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white border border-white/5 backdrop-blur-md">
                         <ArrowUpRight size={22} />
                     </Link>
                 </div>
             </div>
        </section>

        {/* Bento Grid Stats */}
        <section className="grid grid-cols-3 gap-3">
             <Link id="tour-streak" to="/streak" className="bg-orange-500/5 dark:bg-orange-500/5 p-4 rounded-2xl border border-orange-500/20 flex flex-col items-center text-center gap-1 active:scale-95 transition-transform hover:bg-orange-500/10">
                 <Flame className="text-orange-500 fill-orange-500 mb-1" size={24} />
                 <span className="text-xl font-bold text-text-primary-light dark:text-white leading-none">{user.streak}</span>
                 <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide">Streak</span>
             </Link>
             <div className="bg-blue-500/5 dark:bg-blue-500/5 p-4 rounded-2xl border border-blue-500/20 flex flex-col items-center text-center gap-1">
                 <TrendingUp className="text-blue-500 mb-1" size={24} />
                 <span className="text-xl font-bold text-text-primary-light dark:text-white leading-none">₹{user.savedThisMonth.toLocaleString()}</span>
                 <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Month</span>
             </div>
             <Link to="/leaderboard" className="bg-purple-500/5 dark:bg-purple-500/5 p-4 rounded-2xl border border-purple-500/20 flex flex-col items-center text-center gap-1 active:scale-95 transition-transform hover:bg-purple-500/10">
                 <Trophy className="text-purple-500 mb-1" size={24} />
                 <span className="text-xl font-bold text-text-primary-light dark:text-white leading-none">#15</span>
                 <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">Rank</span>
             </Link>
        </section>

        {/* Active Circles Horizontal Scroll */}
        <section>
             <div className="flex items-center justify-between mb-4 px-1">
                 <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Your Circles</h3>
                 <Link to="/circles" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary hover:text-black transition-colors">
                     <ArrowUpRight size={16} />
                 </Link>
             </div>
             <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
                 <Link to="/create-circle" className="shrink-0 w-20 flex flex-col items-center justify-center gap-2 group">
                     <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-400 group-hover:border-primary group-hover:text-primary transition-colors bg-gray-50 dark:bg-white/5">
                         <Plus size={24} />
                     </div>
                     <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark">New</span>
                 </Link>
                 
                 {circles.filter(c => c.isUserMember).map((circle) => (
                     <Link key={circle.id} to={`/circles/${circle.id}`} className="shrink-0 w-64 p-4 rounded-2xl bg-white dark:bg-[#202020] border border-gray-100 dark:border-white/5 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform hover:border-primary/30">
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-sm ${
                            circle.theme === 'obsidian' ? 'bg-gradient-to-br from-gray-700 to-black' :
                            circle.theme === 'lime' ? 'bg-gradient-to-br from-lime-400 to-emerald-600' :
                            circle.theme === 'sky' ? 'bg-gradient-to-br from-sky-400 to-blue-600' :
                            circle.theme === 'purple' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
                            'bg-gradient-to-br from-orange-400 to-pink-600'
                         }`}>
                             <CircleIcon icon={circle.icon} type={circle.iconType} color={circle.iconColor} className="w-6 h-6" fallback={circle.name[0]} />
                         </div>
                         <div className="flex-1 min-w-0">
                             <h4 className="font-bold text-text-primary-light dark:text-white truncate text-base">{circle.name}</h4>
                             <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                                 <span className="font-bold text-green-600 dark:text-green-400">₹{circle.poolTotal.toLocaleString()}</span>
                                 <span className="opacity-50">•</span>
                                 <span className="font-medium">{circle.membersCount} ppl</span>
                             </div>
                         </div>
                     </Link>
                 ))}
             </div>
        </section>

        {/* For You / Daily Activities */}
        <section>
             <h3 className="font-bold text-lg text-text-primary-light dark:text-white mb-4 px-1">For You</h3>
             <div className="space-y-4">
                 <Link to="/learn" className="block bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[1.5rem] p-5 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.99] transition-transform relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[30px] -mr-10 -mt-10 pointer-events-none group-hover:bg-white/20 transition-colors"></div>
                     
                     <div className="flex justify-between items-start mb-4 relative z-10">
                         <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                             <span className="text-[10px] font-bold uppercase tracking-wider">Continue Learning</span>
                         </div>
                         <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                             <Sparkles size={16} className="text-yellow-300 fill-current" />
                         </div>
                     </div>
                     
                     <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-1">Compound Interest</h3>
                        <p className="text-white/80 text-sm mb-4 font-medium">Unit 4 • Lesson 3</p>
                        <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-3/4 rounded-full"></div>
                        </div>
                     </div>
                 </Link>

                 <Link to="/challenges" className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-card-light dark:bg-card-dark border border-border-light dark:border-white/5 shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors active:scale-[0.99]">
                     <div className="w-12 h-12 rounded-2xl bg-yellow-100 dark:bg-yellow-500/10 flex items-center justify-center text-yellow-600 dark:text-yellow-500">
                         <Target size={24} />
                     </div>
                     <div className="flex-1">
                         <h4 className="font-bold text-text-primary-light dark:text-white">Daily Challenge</h4>
                         <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium mt-0.5">Save ₹50 without spending</p>
                     </div>
                     <ChevronRight size={20} className="text-gray-400" />
                 </Link>
             </div>
        </section>

        <div className="h-4"></div>
      </main>
    </div>
  );
};
