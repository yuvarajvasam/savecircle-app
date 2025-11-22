
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flame, Shield, Zap, Check, ChevronLeft, ChevronRight, Share2, X, Download } from 'lucide-react';
import { MOCK_CIRCLES } from '../constants';
import { getUser } from '../utils/storage';
import { CircleIcon } from '../components/CircleIcon';

// --- Custom Share Card Modal ---
const StreakShareModal = ({ isOpen, onClose, streak, user }: any) => {
  if (!isOpen) return null;

  const handleShare = async () => {
    const text = `I'm on a ${streak} day savings streak on SaveCircle! 🔥 Can you beat me?`;
    const url = 'https://uvsavecircle.vercel.app';
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SaveCircle Streak',
          text: text,
          url: url,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
        navigator.clipboard.writeText(text + ' ' + url);
        alert('Copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-6">
        {/* Close Area */}
        <div className="absolute inset-0" onClick={onClose}></div>
        
        <div className="relative z-10 w-full max-w-xs sm:max-w-sm flex flex-col gap-6 animate-slide-up">
            {/* The Share Card */}
            <div className="bg-gradient-to-br from-[#FF4D00] to-[#FF8800] p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden text-center aspect-[4/5] flex flex-col justify-between ring-4 ring-white/10">
                {/* Background Decor */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-[60px]"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-[60px]"></div>

                {/* Header */}
                <div className="relative z-10 flex justify-between items-center opacity-90">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <span className="font-bold tracking-widest uppercase text-[10px]">SaveCircle</span>
                    </div>
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-lg backdrop-blur-md">{new Date().toLocaleDateString()}</span>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
                    <div className="relative mb-6">
                        <Flame size={120} className="fill-white drop-shadow-2xl" strokeWidth={0} />
                        <div className="absolute inset-0 bg-white blur-2xl opacity-40 animate-pulse-slow"></div>
                    </div>
                    <h2 className="text-[7rem] font-display font-bold leading-none tracking-tighter drop-shadow-lg">{streak}</h2>
                    <p className="text-xl font-bold uppercase tracking-[0.3em] opacity-90 mt-2">Day Streak</p>
                </div>

                {/* Footer */}
                <div className="relative z-10 flex items-center gap-3 bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/10 mt-4">
                    <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User" />
                    <div className="text-left">
                        <p className="font-bold text-sm leading-none mb-1">{user.name}</p>
                        <p className="text-[10px] opacity-80 uppercase tracking-wide font-medium">Keeping the fire alive</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button onClick={onClose} className="h-14 w-14 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl transition-colors">
                    <X size={24} />
                </button>
                <button onClick={handleShare} className="flex-1 bg-white text-[#FF4D00] font-bold h-14 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                    <Share2 size={20} />
                    Share Card
                </button>
            </div>
        </div>
    </div>
  );
}

export const Streak: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();
  const streak = user.streak;
  const [showShare, setShowShare] = useState(false);
  
  // Calendar State
  const [viewDate, setViewDate] = useState(new Date()); // Defaults to today's month

  // Calendar Helpers
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getStartDayOffset = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDayOffset = getStartDayOffset(year, month);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthLabel = `${monthNames[month]} ${year}`;

  const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  // Date Comparison Logic
  const todayDate = new Date();
  const isCurrentMonth = todayDate.getMonth() === month && todayDate.getFullYear() === year;
  const currentDay = todayDate.getDate();
  const viewMonthIndex = year * 12 + month;
  const currentMonthIndex = todayDate.getFullYear() * 12 + todayDate.getMonth();

  const getDayStatus = (day: number) => {
      // Future Month
      if (viewMonthIndex > currentMonthIndex) return 'future';

      // Past Month (Simulated History)
      if (viewMonthIndex < currentMonthIndex) {
          // Deterministic pseudo-random based on day/month to look consistent
          const seed = (day * 3 + month * 7 + year) % 13; 
          if (seed === 0) return 'missed';
          if (seed === 1) return 'freeze';
          return 'saved';
      }

      // Current Month Logic
      if (day === currentDay) return 'today';
      if (day > currentDay) return 'future';
      
      // Specific Mock Pattern for Demo Consistency in Current Month
      // Preserving the narrative of "wildfire streak" with some specific history
      if (day === 5 || day === 18) return 'freeze';
      if (day === 12) return 'missed';
      
      return 'saved';
  };

  const socialCircles = MOCK_CIRCLES.filter(c => c.isUserMember && c.membersCount > 1);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full flex flex-col font-display transition-colors duration-300">
      
      <StreakShareModal 
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        streak={streak}
        user={user}
      />

      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
         <div className="flex w-12 items-center justify-start">
            <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
         </div>
         <h1 className="text-lg font-bold text-text-primary-light dark:text-white">Streak</h1>
         <div className="flex items-center justify-end gap-2">
            <button onClick={() => setShowShare(true)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <Share2 size={20} />
            </button>
            <Link to="/settings" className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">settings</span>
            </Link>
         </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-8 space-y-8">
         
         {/* Hero Section */}
         <div className="flex flex-col items-center justify-center py-6 relative">
             <div className="absolute inset-0 bg-orange-500/20 blur-[80px] rounded-full transform scale-75 pointer-events-none"></div>
             
             <div className="relative mb-6">
                 <Flame size={140} className="text-orange-500 fill-orange-500 animate-bounce-subtle drop-shadow-[0_0_25px_rgba(249,115,22,0.6)]" strokeWidth={1.5} />
                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background-light dark:bg-background-dark px-4 py-1 rounded-full border-2 border-orange-500 shadow-lg">
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-widest whitespace-nowrap">Day {streak}</span>
                 </div>
             </div>
             
             <h2 className="text-3xl font-bold text-text-primary-light dark:text-white text-center px-8 leading-tight">
                 You're on a <span className="text-orange-500">wildfire</span> streak!
             </h2>
             <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2 font-medium">
                 Keep saving daily to earn the 50-day badge.
             </p>
         </div>

         {/* Monthly Calendar */}
         <div className="bg-card-light dark:bg-card-dark p-6 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
             <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-lg text-text-primary-light dark:text-white min-w-[140px]">{currentMonthLabel}</h3>
                 <div className="flex gap-2">
                     <button 
                        onClick={handlePrevMonth}
                        className="w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center transition-colors active:scale-95"
                     >
                        <ChevronLeft size={20} className="text-text-secondary-light dark:text-text-secondary-dark" />
                     </button>
                     <button 
                        onClick={handleNextMonth}
                        className="w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center transition-colors active:scale-95"
                     >
                        <ChevronRight size={20} className="text-text-secondary-light dark:text-text-secondary-dark" />
                     </button>
                 </div>
             </div>
             
             <div className="grid grid-cols-7 gap-y-4">
                 {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                     <div key={d} className="text-center text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark opacity-70">{d}</div>
                 ))}
                 {/* Empty cells for start offset */}
                 {Array.from({ length: startDayOffset }).map((_, i) => (
                     <div key={`empty-${i}`} />
                 ))}
                 {/* Days */}
                 {Array.from({ length: daysInMonth }).map((_, i) => {
                     const d = i + 1;
                     const status = getDayStatus(d);
                     let bgClass = '';
                     let content = <span className="text-sm font-medium">{d}</span>;

                     if (status === 'saved') {
                        bgClass = 'bg-orange-500 text-white shadow-md shadow-orange-500/30';
                        content = <Check size={20} strokeWidth={4} />;
                     } else if (status === 'freeze') {
                        bgClass = 'bg-sky-400 text-white shadow-md shadow-sky-500/30';
                        content = <span className="material-symbols-outlined text-lg">ac_unit</span>;
                     } else if (status === 'today') {
                        bgClass = 'border-2 border-orange-500 text-text-primary-light dark:text-white';
                        content = <span className="font-bold">{d}</span>;
                     } else if (status === 'missed') {
                        bgClass = 'bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-white/20';
                     } else {
                        // Future
                        bgClass = 'text-text-secondary-light dark:text-text-secondary-dark opacity-30';
                     }

                     return (
                         <div key={d} className="flex items-center justify-center">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${bgClass}`}>
                                 {content}
                             </div>
                         </div>
                     );
                 })}
             </div>
             
             <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-border-light dark:border-white/5">
                 <div className="flex items-center gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                     <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Saved</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-sky-400"></div>
                     <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Freeze</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-white/10"></div>
                     <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Missed</span>
                 </div>
             </div>
         </div>

         <div className="grid grid-cols-2 gap-3">
             <div className="bg-card-light dark:bg-card-dark p-5 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none flex flex-col justify-between hover:border-blue-500/50 transition-colors group">
                 <div className="flex justify-between items-start mb-3">
                     <Shield className="text-blue-500 fill-blue-500/20 group-hover:scale-110 transition-transform" size={32} />
                     <span className="text-xs font-bold bg-blue-500/10 text-blue-500 px-2 py-1 rounded-lg">Active</span>
                 </div>
                 <div>
                     <p className="font-bold text-text-primary-light dark:text-white text-lg">Streak Freeze</p>
                     <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">1 Equipped</p>
                 </div>
             </div>
             <Link to="/shop" className="bg-card-light dark:bg-card-dark p-5 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none flex flex-col justify-between hover:border-orange-500/50 transition-colors group">
                 <div className="flex justify-between items-start mb-3">
                     <Zap className="text-yellow-500 fill-yellow-500/20 group-hover:scale-110 transition-transform" size={32} />
                     <span className="text-xs font-bold bg-gray-100 dark:bg-white/10 text-text-secondary-light dark:text-text-secondary-dark px-2 py-1 rounded-lg">Shop</span>
                 </div>
                 <div>
                     <p className="font-bold text-text-primary-light dark:text-white text-lg">Power-ups</p>
                     <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">View Offer</p>
                 </div>
             </Link>
         </div>

         <div className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Friends & Circles</h3>
             </div>
             
             <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-white/5 rounded-[2rem] overflow-hidden shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between p-4 bg-orange-500/5 border-b border-border-light dark:border-white/5">
                     <div className="flex items-center gap-4">
                         <div className="relative">
                            <img src={user.avatar} className="w-12 h-12 rounded-full border-2 border-orange-500 object-cover" alt="User Avatar" />
                            <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white dark:border-background-dark">ME</div>
                         </div>
                         <div>
                             <h4 className="font-bold text-text-primary-light dark:text-white">{user.name}</h4>
                             <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">On a roll!</p>
                         </div>
                     </div>
                     <div className="flex flex-col items-end">
                         <div className="flex items-center gap-1 text-orange-500 font-bold">
                             <span className="text-lg">{streak}</span>
                             <Flame size={16} fill="currentColor" />
                         </div>
                     </div>
                 </div>

                {socialCircles.map(circle => (
                    <Link to={`/circles/${circle.id}`} key={circle.id} className="flex items-center justify-between p-4 border-b border-border-light dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-4">
                             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold text-white shadow-sm ${
                                circle.theme === 'obsidian' ? 'bg-gradient-to-br from-[#2c3e50] to-[#000000]' :
                                circle.theme === 'lime' ? 'bg-gradient-to-br from-lime-400 to-emerald-600' :
                                circle.theme === 'sky' ? 'bg-gradient-to-br from-sky-400 to-blue-600' :
                                circle.theme === 'purple' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
                                'bg-gradient-to-br from-orange-400 to-pink-600'
                             }`}>
                                 <CircleIcon icon={circle.icon} type={circle.iconType} color={circle.iconColor} className="w-6 h-6" fallback={circle.name[0]} />
                             </div>
                             <div>
                                 <h4 className="font-bold text-text-primary-light dark:text-white">{circle.name}</h4>
                                 <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">{circle.membersCount} Members</p>
                             </div>
                        </div>
                        <div className="flex flex-col items-end">
                             <div className="flex items-center gap-1 text-text-primary-light dark:text-white font-bold group-hover:text-primary transition-colors">
                                 <span>{circle.streak}</span>
                                 <Flame size={16} />
                             </div>
                        </div>
                    </Link>
                ))}
             </div>
         </div>
      </main>
    </div>
  );
};
