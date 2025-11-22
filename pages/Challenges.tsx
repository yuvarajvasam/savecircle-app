
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Challenges: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display flex-1 transition-colors duration-300">
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
        <div className="flex w-12 items-center justify-start">
          <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <h1 className="text-lg font-bold text-text-primary-light dark:text-white">Challenges</h1>
        <div className="w-12"></div>
      </header>

      <main className="p-4 space-y-6 overflow-y-auto pb-8">
        <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-bold text-text-primary-light dark:text-white">Active Challenges</h2>
            <Link to="/leaderboard" className="text-primary-dark dark:text-primary text-sm font-bold flex items-center gap-1 hover:underline">
            Leaderboard <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
        </div>

        {/* Challenge Cards */}
        <div className="space-y-3">
            <div className="bg-card-light dark:bg-card-dark p-5 rounded-[1.5rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none hover:border-primary/50 transition-all active:scale-[0.99]">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-text-primary-light dark:text-white mb-1">Weekly Savings Goal</h3>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Ends in: 2d 15h</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 text-xs font-bold">
                        500 XP
                    </div>
                </div>
                <div className="relative h-3 w-full rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                    <div className="absolute top-0 left-0 h-full rounded-full bg-primary" style={{width: '75%'}}></div>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark">₹375 / ₹500</span>
                    <span className="text-[10px] font-bold text-text-primary-light dark:text-white">75%</span>
                </div>
            </div>

            <div className="bg-card-light dark:bg-card-dark p-5 rounded-[1.5rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none hover:border-primary/50 transition-all active:scale-[0.99]">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-text-primary-light dark:text-white mb-1">Investment Streak</h3>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Ends in: 4d 8h</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-500 text-xs font-bold">
                        +₹5 Bonus
                    </div>
                </div>
                <div className="relative h-3 w-full rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                    <div className="absolute top-0 left-0 h-full rounded-full bg-blue-500" style={{width: '40%'}}></div>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark">2 / 5 Days</span>
                    <span className="text-[10px] font-bold text-text-primary-light dark:text-white">40%</span>
                </div>
            </div>

            <div className="bg-card-light dark:bg-card-dark p-5 rounded-[1.5rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none hover:border-primary/50 transition-all active:scale-[0.99]">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-text-primary-light dark:text-white mb-1">Early Bird Saver</h3>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Ends in: 1d 2h</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-500 text-xs font-bold">
                        Badge
                    </div>
                </div>
                <div className="relative h-3 w-full rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                    <div className="absolute top-0 left-0 h-full rounded-full bg-purple-500" style={{width: '90%'}}></div>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark">Almost there!</span>
                    <span className="text-[10px] font-bold text-text-primary-light dark:text-white">90%</span>
                </div>
            </div>
        </div>

        <div className="pt-4 px-2">
            <h2 className="text-xl font-bold text-text-primary-light dark:text-white mb-4">Upcoming Events</h2>
            
            <div className="space-y-3">
                <div className="bg-card-light dark:bg-card-dark p-5 rounded-[1.5rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-text-primary-light dark:text-white">Budgeting Webinar</h3>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">Starts in 3 days</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-text-primary-light dark:text-white">
                        <span className="material-symbols-outlined">calendar_month</span>
                    </div>
                </div>
                
                <div className="bg-card-light dark:bg-card-dark p-5 rounded-[1.5rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-text-primary-light dark:text-white">Crypto AMA</h3>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">Oct 28 • Live Q&A</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-text-primary-light dark:text-white">
                        <span className="material-symbols-outlined">mic</span>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};
