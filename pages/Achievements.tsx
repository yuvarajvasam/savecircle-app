
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Zap, Trophy, Target, BookOpen, Wallet, Users, Shield, Lock } from 'lucide-react';
import { getUser } from '../utils/storage';

export const Achievements: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();

  const allAchievements = [
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
          icon: <BookOpen size={24} className="text-blue-500" />,
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
          icon: <Users size={24} className="text-purple-500" />,
          bg: 'bg-purple-100 dark:bg-purple-900/20',
          borderColor: 'border-purple-200 dark:border-purple-900/30'
      },
      {
          id: 5,
          title: 'Guardian',
          description: 'Use 3 Streak Freezes',
          level: 0,
          maxLevel: 5,
          progress: 1,
          target: 3,
          icon: <Shield size={24} className="text-sky-500" />,
          bg: 'bg-sky-100 dark:bg-sky-900/20',
          borderColor: 'border-sky-200 dark:border-sky-900/30'
      },
      {
          id: 6,
          title: 'Tycoon',
          description: 'Save ₹1,00,000 total',
          level: 1,
          maxLevel: 10,
          progress: user.totalSaved,
          target: 100000,
          icon: <Wallet size={24} className="text-green-500" />,
          bg: 'bg-green-100 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-900/30'
      },
      {
          id: 7,
          title: 'Champion',
          description: 'Reach Diamond League',
          level: 0,
          maxLevel: 1,
          progress: 0,
          target: 1,
          icon: <Trophy size={24} className="text-indigo-500" />,
          bg: 'bg-indigo-100 dark:bg-indigo-900/20',
          borderColor: 'border-indigo-200 dark:border-indigo-900/30'
      },
      {
          id: 8,
          title: 'Consistency',
          description: 'Save for 7 days in a row',
          level: 5,
          maxLevel: 100,
          progress: 7,
          target: 7,
          icon: <Target size={24} className="text-red-500" />,
          bg: 'bg-red-100 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-900/30'
      }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full flex flex-col font-display transition-colors duration-300">
        <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
            <div className="flex w-12 items-center justify-start">
                <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </div>
            <h1 className="text-lg font-bold text-text-primary-light dark:text-white">Achievements</h1>
            <div className="w-12"></div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
            {allAchievements.map((achievement) => (
                <div key={achievement.id} className={`p-4 rounded-2xl border ${achievement.borderColor} ${achievement.bg} flex items-center gap-4 relative overflow-hidden transition-all hover:scale-[1.01]`}>
                    <div className="relative z-10 bg-white/60 dark:bg-black/20 p-3 rounded-xl backdrop-blur-sm">
                        {achievement.icon}
                    </div>
                    <div className="flex-1 relative z-10">
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-text-primary-light dark:text-white">{achievement.title}</h4>
                            <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark px-2 py-0.5 bg-white/40 dark:bg-black/20 rounded-lg">Lvl {achievement.level}</span>
                        </div>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-3 font-medium opacity-90">{achievement.description}</p>
                        
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1 h-2 bg-white/40 dark:bg-black/20 rounded-full overflow-hidden">
                                <div 
                                    className="absolute top-0 left-0 h-full bg-current opacity-80 rounded-full transition-all duration-1000" 
                                    style={{ width: `${Math.min(100, (achievement.progress / achievement.target) * 100)}%`, color: 'currentColor' }}
                                ></div>
                            </div>
                            <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark w-12 text-right">
                                {achievement.progress >= achievement.target ? 'DONE' : `${achievement.progress}/${achievement.target}`}
                            </span>
                        </div>
                    </div>
                    {/* Lock overlay if level 0 */}
                    {achievement.level === 0 && (
                        <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                            <div className="bg-white dark:bg-[#2c2c2e] p-2 rounded-full shadow-lg">
                                <Lock className="text-gray-400 dark:text-gray-500" size={20} />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </main>
    </div>
  );
};
