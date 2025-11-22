
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../utils/storage';
import { Flame, Trophy, Target, Star, Lock, Zap } from 'lucide-react';
import { ShareModal } from '../components/ShareModal';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, []);
  
  // Generate dynamic handle
  const userHandle = `@${user.name.toLowerCase().replace(/\s+/g, '_')}_saves`;

  // Mock Data for Achievements
  const achievements = [
      {
          id: 1,
          title: 'Wildfire',
          description: 'Reach a 50-day streak',
          level: 2,
          maxLevel: 10,
          progress: user.streak,
          target: 50,
          icon: <Flame size={24} className="text-orange-500" />,
          bg: 'bg-orange-100 dark:bg-orange-900/20',
          borderColor: 'border-orange-200 dark:border-orange-900/30'
      },
      {
          id: 2,
          title: 'Sage',
          description: 'Earn 10,000 XP',
          level: 4,
          maxLevel: 10,
          progress: user.xp,
          target: 10000,
          icon: <Zap size={24} className="text-yellow-500" />,
          bg: 'bg-yellow-100 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-900/30'
      },
      {
          id: 3,
          title: 'Scholar',
          description: 'Complete 20 lessons',
          level: 1,
          maxLevel: 5,
          progress: 12,
          target: 20,
          icon: <Target size={24} className="text-blue-500" />,
          bg: 'bg-blue-100 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-900/30'
      },
       {
          id: 4,
          title: 'Friendly',
          description: 'Follow 3 friends',
          level: 0,
          maxLevel: 1,
          progress: 1,
          target: 3,
          icon: <Star size={24} className="text-purple-500" />,
          bg: 'bg-purple-100 dark:bg-purple-900/20',
          borderColor: 'border-purple-200 dark:border-purple-900/30'
      }
  ];

  return (
    <div className="flex flex-col bg-background-light dark:bg-background-dark flex-1 min-h-full font-display transition-colors duration-300">
       <ShareModal 
         isOpen={showShare}
         onClose={() => setShowShare(false)}
         title="Share Profile"
         text={`Check out my savings progress on SaveCircle! I'm Level ${user.level} with a ${user.streak} day streak.`}
       />

       {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-text-primary-light dark:text-white">Profile</h1>
        </div>
        <div className="flex items-center justify-end">
           <Link to="/settings" className="flex h-10 w-10 items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
             <span className="material-symbols-outlined">settings</span>
           </Link>
        </div>
      </header>
      
      <main className="flex-grow overflow-y-auto pb-24">
        
        {/* Profile Header Section */}
        <div className="px-5 pt-6 pb-6 border-b border-border-light dark:border-white/5">
            <div className="flex flex-col items-start">
                <div className="flex justify-between w-full items-start mb-4">
                    <div>
                         <h2 className="text-2xl font-bold text-text-primary-light dark:text-white mb-1">{user.name}</h2>
                         <p className="text-text-secondary-light dark:text-text-secondary-dark font-medium mb-2">{userHandle}</p>
                         <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            <span className="material-symbols-outlined text-lg">calendar_month</span>
                            <span>Joined January 2024</span>
                         </div>
                    </div>
                    <div className="relative">
                         <div className="w-20 h-20 rounded-full p-1 border-2 border-dashed border-gray-300 dark:border-white/20">
                            <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt={user.name} />
                         </div>
                         <div className="absolute -bottom-1 -right-1 bg-primary rounded-md px-1.5 py-0.5 text-xs font-bold text-background-dark border-2 border-background-light dark:border-background-dark">
                             Lvl {user.level}
                         </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-text-primary-light dark:text-white">14</span>
                        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Following</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-text-primary-light dark:text-white">28</span>
                        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Followers</span>
                    </div>
                </div>

                <div className="flex gap-3 w-full">
                     <button 
                        onClick={() => navigate('/invite')}
                        className="flex-1 h-11 rounded-xl bg-primary text-primary-content font-bold text-sm flex items-center justify-center gap-2 border-b-4 border-[#a3cc39] active:border-b-0 active:translate-y-[4px] transition-all uppercase tracking-wide"
                     >
                        <span className="material-symbols-outlined text-xl">person_add</span>
                        Add Friends
                     </button>
                      <button 
                        onClick={() => setShowShare(true)}
                        className="h-11 w-11 rounded-xl bg-card-light dark:bg-card-dark border-2 border-border-light dark:border-white/10 text-text-primary-light dark:text-white font-bold flex items-center justify-center border-b-4 active:border-b-0 active:translate-y-[4px] transition-all"
                      >
                        <span className="material-symbols-outlined text-xl">ios_share</span>
                     </button>
                </div>
            </div>
        </div>

        {/* Statistics Section */}
        <div className="px-5 py-6">
            <h3 className="font-bold text-lg text-text-primary-light dark:text-white mb-4">Statistics</h3>
            <div className="grid grid-cols-2 gap-3">
                <StatCard 
                    icon={<Flame size={24} className="text-orange-500" />}
                    value={user.streak.toString()}
                    label="Day Streak"
                    bg="bg-orange-50 dark:bg-orange-900/10"
                />
                <StatCard 
                    icon={<Zap size={24} className="text-yellow-500" />}
                    value={user.xp.toLocaleString()}
                    label="Total XP"
                    bg="bg-yellow-50 dark:bg-yellow-900/10"
                />
                <StatCard 
                    icon={<Trophy size={24} className="text-purple-500" />}
                    value="Top 5%"
                    label="League Rank"
                    bg="bg-purple-50 dark:bg-purple-900/10"
                />
                <StatCard 
                    icon={<Target size={24} className="text-blue-500" />}
                    value="92%"
                    label="Consistency"
                    bg="bg-blue-50 dark:bg-blue-900/10"
                />
            </div>
        </div>

        {/* Achievements Section */}
        <div className="px-5 pb-8">
            <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Achievements</h3>
                 <Link to="/achievements" className="text-xs font-bold text-primary-dark dark:text-primary hover:underline">View All</Link>
            </div>
            
            <div className="space-y-3">
                {achievements.map((achievement) => (
                    <div key={achievement.id} className={`p-4 rounded-2xl border ${achievement.borderColor} ${achievement.bg} flex items-center gap-4 relative overflow-hidden`}>
                        <div className="relative z-10 bg-white/50 dark:bg-black/20 p-3 rounded-xl">
                            {achievement.icon}
                        </div>
                        <div className="flex-1 relative z-10">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-text-primary-light dark:text-white">{achievement.title}</h4>
                                <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark">Lvl {achievement.level}</span>
                            </div>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-3">{achievement.description}</p>
                            
                            <div className="relative w-full h-2 bg-white/40 dark:bg-black/20 rounded-full overflow-hidden">
                                <div 
                                    className="absolute top-0 left-0 h-full bg-current opacity-80 rounded-full" 
                                    style={{ width: `${(achievement.progress / achievement.target) * 100}%`, color: 'currentColor' }}
                                ></div>
                            </div>
                        </div>
                        {/* Lock overlay if level 0 */}
                        {achievement.level === 0 && (
                            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-20">
                                <Lock className="text-text-secondary-light dark:text-white opacity-50" size={24} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
};

// StatCard Component
const StatCard = ({ icon, value, label, bg }: { icon: React.ReactNode, value: string, label: string, bg: string }) => (
    <div className={`p-4 rounded-2xl border border-transparent ${bg} flex flex-col items-center justify-center gap-2 hover:scale-[1.02] transition-transform`}>
        {icon}
        <div className="text-center">
            <p className="text-lg font-bold text-text-primary-light dark:text-white leading-none mb-1">{value}</p>
            <p className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide">{label}</p>
        </div>
    </div>
);
    