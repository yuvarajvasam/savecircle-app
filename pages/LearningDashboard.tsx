
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, 
  BarChart, Bar, XAxis, Tooltip, Cell, PolarRadiusAxis
} from 'recharts';
import { Trophy, Flame, Target, BookOpen, Share2, Award, Zap, Lock, ChevronRight, Star, TrendingUp } from 'lucide-react';
import { getUser } from '../utils/storage';
import { CircularProgress } from '../components/CircularProgress'; // We can reuse or inline a simpler version for the avatar
import { ShareModal } from '../components/ShareModal';

// Mock Data for Financial IQ
const SKILL_DATA = [
  { subject: 'Budgeting', A: 90, fullMark: 100 },
  { subject: 'Investing', A: 65, fullMark: 100 },
  { subject: 'Credit', A: 70, fullMark: 100 },
  { subject: 'Taxes', A: 30, fullMark: 100 },
  { subject: 'Risk', A: 60, fullMark: 100 },
  { subject: 'Banking', A: 85, fullMark: 100 },
];

// Mock Data for Weekly Activity
const ACTIVITY_DATA = [
  { day: 'M', xp: 120 },
  { day: 'T', xp: 200 },
  { day: 'W', xp: 150 },
  { day: 'T', xp: 80 },
  { day: 'F', xp: 250 },
  { day: 'S', xp: 100 },
  { day: 'S', xp: 40 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a1a] border border-white/10 p-2 rounded-lg shadow-xl z-50">
          <p className="text-white font-bold text-xs font-display">
            {payload[0].value} XP
          </p>
        </div>
      );
    }
    return null;
};

export const LearningDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());
  const [showShare, setShowShare] = useState(false);
  
  useEffect(() => {
      setUser(getUser());
  }, []);

  const completedLessons = JSON.parse(localStorage.getItem('savecircle_completed_lessons') || '[]').length;
  const nextLevelXp = user.nextLevelXp || 3800; // Fallback if not in user obj
  const xpProgress = Math.min(100, (user.xp / nextLevelXp) * 100);

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex-1 font-display flex flex-col h-full transition-colors duration-300">
      
      <ShareModal 
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        title="Share Progress"
        text={`I'm Level ${user.level} on SaveCircle with ${user.xp} XP! 🎓 Join me and master your money.`}
      />

      {/* Navbar */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
        <div className="flex w-12 items-center justify-start">
          <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <h1 className="text-lg font-bold">Progress</h1>
        <div className="flex w-12 items-center justify-end">
           <button 
             onClick={() => setShowShare(true)}
             className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
           >
            <Share2 size={20} strokeWidth={2} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        
        {/* HERO: Rank & Level */}
        <section className="flex flex-col items-center pt-2">
            <div className="relative mb-4">
                {/* Custom SVG Ring for XP */}
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="none" className="stroke-gray-200 dark:stroke-white/10" strokeWidth="6" />
                    <circle 
                        cx="50" cy="50" r="46" 
                        fill="none" 
                        stroke="#c9f158" 
                        strokeWidth="6" 
                        strokeDasharray="289"
                        strokeDashoffset={289 - (289 * (xpProgress / 100))}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(201,241,88,0.5)]"
                    />
                </svg>
                
                {/* Avatar */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-background-light dark:border-background-dark">
                    <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
                </div>

                {/* Level Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-background-light dark:border-background-dark shadow-lg flex items-center gap-1">
                    <Star size={12} className="fill-current" />
                    Level {user.level}
                </div>
            </div>

            <h2 className="text-2xl font-bold text-text-primary-light dark:text-white mb-1">{user.name}</h2>
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                <Trophy size={14} className="text-yellow-500" />
                <span>Diamond League</span>
                <span className="w-1 h-1 bg-current rounded-full opacity-50"></span>
                <span>Top 5%</span>
            </div>
        </section>

        {/* STATS GRID */}
        <section className="grid grid-cols-2 gap-3">
             <div className="bg-card-light dark:bg-card-dark p-4 rounded-[1.5rem] border border-border-light dark:border-white/5 flex flex-col justify-between shadow-sm dark:shadow-none hover:border-orange-500/30 transition-colors group">
                 <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-3 group-hover:scale-110 transition-transform">
                     <Flame size={20} className="fill-current" />
                 </div>
                 <div>
                     <p className="text-2xl font-bold text-text-primary-light dark:text-white leading-none">{user.streak}</p>
                     <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mt-1">Day Streak</p>
                 </div>
             </div>

             <div className="bg-card-light dark:bg-card-dark p-4 rounded-[1.5rem] border border-border-light dark:border-white/5 flex flex-col justify-between shadow-sm dark:shadow-none hover:border-blue-500/30 transition-colors group">
                 <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3 group-hover:scale-110 transition-transform">
                     <BookOpen size={20} />
                 </div>
                 <div>
                     <p className="text-2xl font-bold text-text-primary-light dark:text-white leading-none">{completedLessons}</p>
                     <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mt-1">Lessons Done</p>
                 </div>
             </div>
             
             <div className="col-span-2 bg-card-light dark:bg-card-dark p-4 rounded-[1.5rem] border border-border-light dark:border-white/5 flex items-center justify-between shadow-sm dark:shadow-none">
                 <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                         <Target size={20} />
                     </div>
                     <div>
                         <p className="font-bold text-text-primary-light dark:text-white text-base">Quiz Accuracy</p>
                         <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">Top 10% of learners</p>
                     </div>
                 </div>
                 <span className="text-xl font-bold text-text-primary-light dark:text-white">92%</span>
             </div>
        </section>

        {/* SKILL RADAR */}
        <section className="relative overflow-hidden bg-[#151515] text-white p-6 rounded-[2rem] shadow-xl border border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div>
                    <h3 className="font-bold text-lg">Financial IQ</h3>
                    <p className="text-xs text-white/50">Your knowledge map</p>
                </div>
                <div className="bg-white/10 px-2 py-1 rounded-lg border border-white/5 backdrop-blur-md">
                    <span className="text-xs font-bold text-primary">Balanced</span>
                </div>
            </div>

            <div className="h-[220px] w-full -ml-4 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis 
                            dataKey="subject" 
                            tick={{ fill: '#888', fontSize: 10, fontWeight: 'bold' }} 
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Skill"
                            dataKey="A"
                            stroke="#c9f158"
                            strokeWidth={3}
                            fill="#c9f158"
                            fillOpacity={0.3}
                        />
                        <Tooltip cursor={false} content={<CustomTooltip />} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </section>

        {/* WEEKLY ACTIVITY */}
        <section className="bg-card-light dark:bg-card-dark p-6 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Consistency</h3>
                <div className="flex items-center gap-2 text-xs font-bold bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded-lg">
                    <TrendingUp size={14} />
                    +12% vs last week
                </div>
            </div>
            
            <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ACTIVITY_DATA} barSize={12}>
                        <XAxis 
                            dataKey="day" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#888', fontSize: 11, fontWeight: 'bold'}}
                            dy={10}
                        />
                        <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                        <Bar dataKey="xp" radius={[6, 6, 6, 6]}>
                            {ACTIVITY_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.xp > 150 ? '#c9f158' : '#3f3f46'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>

        {/* NEXT MILESTONE */}
        <section className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[2rem] p-6 text-white shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-[40px] -mr-8 -mt-8 transition-opacity duration-500 opacity-50 group-hover:opacity-80"></div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Next Milestone</p>
                        <h3 className="font-bold text-xl">Reach Level 4</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/10">
                        <Lock size={18} className="text-white" />
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm font-medium mb-2">
                    <span className="text-white/80">{user.xp} XP</span>
                    <span className="text-white font-bold">{nextLevelXp} XP</span>
                </div>
                
                <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-white rounded-full transition-all duration-1000" style={{width: `${xpProgress}%`}}></div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-indigo-100 bg-black/10 px-3 py-2 rounded-xl w-fit">
                    <Award size={14} className="text-yellow-300" />
                    <span>Reward: </span>
                    <span className="font-bold text-white">50 Gems</span>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
};
