
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, Trophy, UserPlus, Wallet, Zap, AlertCircle } from 'lucide-react';

// Mock Data
const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'achievement', title: 'Wildfire Badge', message: "You've reached a 10-day streak! 🔥", time: '2m ago', read: false, category: 'updates' },
  { id: 2, type: 'social', title: 'Riya joined your circle', message: 'Riya Singh joined "Weekend Warriors".', time: '1h ago', read: false, category: 'social' },
  { id: 3, type: 'system', title: 'Deposit Successful', message: '₹500 added to your Vault via UPI.', time: '3h ago', read: true, category: 'updates' },
  { id: 4, type: 'social', title: 'Alex poked you', message: 'Alex wants you to save today! 👋', time: 'Yesterday', read: true, category: 'social' },
  { id: 5, type: 'alert', title: 'Goal Reached', message: 'You hit 50% of your "Macbook" goal.', time: '2d ago', read: true, category: 'updates' },
  { id: 6, type: 'social', title: 'New Follower', message: 'David Kim started following you.', time: '3d ago', read: true, category: 'social' },
];

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'updates' | 'social'>('all');
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filtered = notifications.filter(n => filter === 'all' || n.category === filter);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Group by Read/Unread for "New" vs "Earlier"
  const newNotifications = filtered.filter(n => !n.read);
  const earlierNotifications = filtered.filter(n => n.read);

  const getIcon = (type: string) => {
     switch(type) {
        case 'achievement': return { icon: <Trophy size={20} className="fill-current" />, bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-600 dark:text-yellow-500' };
        case 'social': return { icon: <UserPlus size={20} />, bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-500' };
        case 'system': return { icon: <Wallet size={20} />, bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-500' };
        case 'alert': return { icon: <Zap size={20} className="fill-current" />, bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-500' };
        default: return { icon: <Bell size={20} />, bg: 'bg-gray-100 dark:bg-white/10', text: 'text-gray-600 dark:text-gray-400' };
     }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full font-display flex flex-col transition-colors duration-300">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex w-12 shrink-0 items-center justify-start">
                <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </div>
            <h1 className="text-lg font-bold text-text-primary-light dark:text-white">Notifications</h1>
            <div className="flex w-12 shrink-0 items-center justify-end">
                {unreadCount > 0 && (
                    <button onClick={handleMarkAllRead} className="h-10 w-10 flex items-center justify-center text-primary-dark dark:text-primary hover:bg-primary/10 rounded-full transition-colors" title="Mark all read">
                        <CheckCheck size={20} />
                    </button>
                )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex p-1 bg-gray-200 dark:bg-white/5 rounded-xl relative">
              <button 
                onClick={() => setFilter('all')} 
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'all' ? 'bg-white dark:bg-white/10 text-text-primary-light dark:text-white shadow-sm' : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white'}`}
              >
                  All
              </button>
              <button 
                onClick={() => setFilter('updates')} 
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'updates' ? 'bg-white dark:bg-white/10 text-text-primary-light dark:text-white shadow-sm' : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white'}`}
              >
                  Updates
              </button>
              <button 
                onClick={() => setFilter('social')} 
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'social' ? 'bg-white dark:bg-white/10 text-text-primary-light dark:text-white shadow-sm' : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white'}`}
              >
                  Social
              </button>
          </div>
        </header>

        {/* Notification List */}
        <main className="flex-1 overflow-y-auto p-4 pb-8">
          
          {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 opacity-50">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                      <Bell size={32} className="text-text-secondary-light dark:text-text-secondary-dark" />
                  </div>
                  <p className="font-bold text-text-secondary-light dark:text-text-secondary-dark">No notifications yet</p>
              </div>
          )}

          {/* NEW SECTION */}
          {newNotifications.length > 0 && (
              <div className="mb-6 animate-fade-in">
                  <h3 className="text-xs font-bold text-primary-dark dark:text-primary uppercase tracking-widest mb-3 px-2">New</h3>
                  <div className="bg-white dark:bg-card-dark rounded-[1.5rem] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm dark:shadow-none">
                      {newNotifications.map((item, idx) => {
                          const style = getIcon(item.type);
                          return (
                            <div 
                                key={item.id} 
                                onClick={() => handleRead(item.id)}
                                className={`flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer relative ${idx !== newNotifications.length - 1 ? 'border-b border-gray-100 dark:border-white/5' : ''}`}
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                                <div className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${style.bg} ${style.text}`}>
                                    {style.icon}
                                </div>
                                <div className="flex flex-1 flex-col justify-center">
                                    <div className="flex justify-between items-start">
                                        <p className="font-bold text-text-primary-light dark:text-white text-sm">{item.title}</p>
                                        <p className="text-[10px] font-bold text-primary-dark dark:text-primary whitespace-nowrap ml-2">{item.time}</p>
                                    </div>
                                    <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">{item.message}</p>
                                </div>
                            </div>
                          );
                      })}
                  </div>
              </div>
          )}

          {/* EARLIER SECTION */}
          {earlierNotifications.length > 0 && (
              <div className="animate-slide-up">
                  <h3 className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest mb-3 px-2">Earlier</h3>
                  <div className="bg-gray-50 dark:bg-card-dark rounded-[1.5rem] border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm dark:shadow-none">
                      {earlierNotifications.map((item, idx) => {
                          const style = getIcon(item.type);
                          return (
                            <div key={item.id} className={`flex items-start gap-4 p-4 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer ${idx !== earlierNotifications.length - 1 ? 'border-b border-gray-200 dark:border-white/5' : ''}`}>
                                <div className={`flex size-12 shrink-0 items-center justify-center rounded-2xl grayscale opacity-70 ${style.bg} ${style.text}`}>
                                    {style.icon}
                                </div>
                                <div className="flex flex-1 flex-col justify-center opacity-80">
                                    <div className="flex justify-between items-start">
                                        <p className="font-bold text-text-primary-light dark:text-white text-sm">{item.title}</p>
                                        <p className="text-[10px] font-medium text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap ml-2">{item.time}</p>
                                    </div>
                                    <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">{item.message}</p>
                                </div>
                            </div>
                          );
                      })}
                  </div>
              </div>
          )}
        </main>
    </div>
  );
};
