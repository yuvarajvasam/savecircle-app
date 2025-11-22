
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MOCK_SHOP_ITEMS } from '../constants';
import { getUser, updateUser } from '../utils/storage';
import { Heart, Zap, Shield, Sparkles, Lock, Check, Gem, X, Infinity } from 'lucide-react';
import { Button } from '../components/Button';

// --- Subscription Modal ---

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'pitch' | 'processing' | 'success'>('pitch');

  useEffect(() => {
    if (isOpen) setStatus('pitch');
  }, [isOpen]);

  const handleSubscribe = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      // Mock persistence
      localStorage.setItem('savecircle_premium', 'true');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end sm:justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
       <div className="bg-white dark:bg-[#1c1c1e] w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden shadow-2xl relative animate-slide-up">
          
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-white/10 rounded-full text-gray-500 dark:text-white z-20 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
             <X size={20} />
          </button>

          {status === 'pitch' && (
            <div className="p-8 pt-12 flex flex-col items-center text-center">
               <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-6 shadow-xl shadow-purple-500/30">
                  <Infinity size={48} className="text-white" />
               </div>
               
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unlimited Hearts</h2>
               <p className="text-gray-500 dark:text-gray-300 text-sm mb-8 leading-relaxed max-w-[250px]">
                  Never run out of hearts again. Make mistakes, keep learning, and save without limits.
               </p>

               <div className="w-full space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-left">
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                          <Heart size={20} className="fill-current" />
                      </div>
                      <div>
                          <p className="font-bold text-gray-900 dark:text-white text-sm">Infinite Health</p>
                          <p className="text-xs text-gray-500">No waiting for refills.</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-left">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                          <Zap size={20} className="fill-current" />
                      </div>
                      <div>
                          <p className="font-bold text-gray-900 dark:text-white text-sm">Mastery Quizzes</p>
                          <p className="text-xs text-gray-500">Unlock hard mode lessons.</p>
                      </div>
                  </div>
               </div>

               <Button fullWidth size="lg" onClick={handleSubscribe} className="bg-gradient-to-r from-purple-600 to-indigo-600 border-none shadow-lg shadow-indigo-500/30">
                  Subscribe for ₹99/mo
               </Button>
               <p className="text-[10px] text-gray-400 mt-4 font-medium uppercase tracking-wider">Cancel Anytime</p>
            </div>
          )}

          {status === 'processing' && (
             <div className="h-[400px] flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-bold text-gray-900 dark:text-white">Confirming Subscription...</p>
             </div>
          )}

          {status === 'success' && (
             <div className="h-[400px] flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-green-500/30 animate-bounce-subtle">
                   <Check size={40} strokeWidth={4} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You are now Premium!</h2>
                <p className="text-gray-500 mb-8">Unlimited hearts have been activated.</p>
                <Button fullWidth onClick={onClose} variant="secondary">Awesome</Button>
             </div>
          )}
       </div>
    </div>
  );
};

// --- Main Shop Component ---

export const Shop: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Sync state with storage
  const [userGems, setUserGems] = useState(getUser().gems);
  const [showSubscription, setShowSubscription] = useState(false);

  const [hearts, setHearts] = useState(() => {
      return parseInt(localStorage.getItem('savecircle_hearts') || '5');
  });

  // Refresh gems when navigating to this page (location change)
  useEffect(() => {
      setUserGems(getUser().gems);
  }, [location.pathname]);

  const handleBuy = (cost: number, itemId?: string) => {
    if (userGems >= cost) {
        const newAmount = userGems - cost;
        setUserGems(newAmount);
        updateUser({ gems: newAmount });
        // Logic to persist item ownership would go here in a real backend
    }
  };

  const handleRefillHearts = () => {
      if (hearts === 5) return;
      if (userGems >= 50) {
          handleBuy(50);
          setHearts(5);
          localStorage.setItem('savecircle_hearts', '5');
      }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex-1 font-display flex flex-col h-full transition-colors duration-300">
      
      <SubscriptionModal isOpen={showSubscription} onClose={() => setShowSubscription(false)} />

      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
         <div className="flex w-12 items-center justify-start">
            <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
         </div>
         <h1 className="text-lg font-bold">Shop</h1>
         <div className="flex items-center justify-end min-w-12">
             <div className="flex items-center gap-1.5 text-sky-500 font-bold bg-sky-500/10 border border-sky-500/20 px-3 py-1.5 rounded-xl">
                <span className="material-symbols-outlined text-sm filled">diamond</span>
                <span>{userGems}</span>
            </div>
         </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-24 space-y-8">
         
         {/* Hero Balance Card */}
         <section className="relative overflow-hidden rounded-[2.5rem] bg-[#1a1a1a] p-8 text-center shadow-2xl border border-white/5 group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-sky-500/10 to-transparent opacity-50"></div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-500/20 rounded-full blur-[80px] animate-pulse-slow"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-4 relative">
                      <div className="absolute inset-0 bg-sky-400/30 blur-xl rounded-full"></div>
                      <Gem size={80} className="text-sky-400 relative z-10 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500 fill-sky-400/20" strokeWidth={1} />
                  </div>
                  <h2 className="text-5xl font-bold text-white mb-1 tracking-tight">{userGems}</h2>
                  <p className="text-sky-400 font-bold text-xs tracking-[0.2em] uppercase">Total Gems</p>
                  
                  <button className="mt-8 bg-white text-black px-8 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-white/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">store</span>
                    Get more gems
                  </button>
              </div>
         </section>

         {/* Section: Essentials */}
         <section>
             <h3 className="font-bold text-text-secondary-light dark:text-text-secondary-dark text-xs uppercase tracking-widest px-2 mb-4">Essentials</h3>
             
             <div className="bg-card-light dark:bg-card-dark rounded-[2rem] p-1 border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
                 {/* Heart Refill */}
                 <div className="flex items-center justify-between p-4 border-b border-border-light dark:border-white/5">
                     <div className="flex items-center gap-4">
                         <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 relative overflow-hidden">
                             <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                             <Heart size={32} className="fill-current relative z-10" />
                         </div>
                         <div>
                             <h4 className="font-bold text-lg text-text-primary-light dark:text-white">Refill Hearts</h4>
                             <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium mb-1">Get full health to keep learning.</p>
                             <div className="flex items-center gap-1">
                                 <span className="text-xs font-bold text-red-500">{hearts}/5 Hearts</span>
                             </div>
                         </div>
                     </div>
                     <button 
                        onClick={handleRefillHearts}
                        disabled={hearts === 5 || userGems < 50}
                        className={`
                            h-12 px-5 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all
                            ${hearts === 5 
                                ? 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-default' 
                                : userGems >= 50 
                                    ? 'bg-primary text-background-dark hover:brightness-110 shadow-lg shadow-primary/20 active:scale-95' 
                                    : 'bg-gray-100 dark:bg-white/5 text-gray-400 opacity-50'
                            }
                        `}
                     >
                        {hearts === 5 ? (
                            <span className="uppercase">Full</span>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-base filled">diamond</span>
                                50
                            </>
                        )}
                     </button>
                 </div>

                 {/* Unlimited Hearts (Subscription) */}
                 <div className="flex items-center justify-between p-4">
                     <div className="flex items-center gap-4">
                         <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                             <Infinity size={32} strokeWidth={2.5} />
                         </div>
                         <div>
                             <h4 className="font-bold text-lg text-text-primary-light dark:text-white">Unlimited Hearts</h4>
                             <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">Never run out of hearts.</p>
                         </div>
                     </div>
                     <button 
                        onClick={() => setShowSubscription(true)}
                        className="h-12 px-5 rounded-xl font-bold text-sm bg-gray-100 dark:bg-white/5 text-text-primary-light dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                     >
                        View Plan
                     </button>
                 </div>
             </div>
         </section>

         {/* Section: Power-ups */}
         <section>
             <h3 className="font-bold text-text-secondary-light dark:text-text-secondary-dark text-xs uppercase tracking-widest px-2 mb-4">Power-ups</h3>
             <div className="grid grid-cols-1 gap-4">
                {MOCK_SHOP_ITEMS.filter(i => i.type === 'powerup').map(item => (
                    <div key={item.id} className="group bg-card-light dark:bg-card-dark rounded-[2rem] p-5 border border-border-light dark:border-white/5 shadow-sm dark:shadow-none hover:border-primary/30 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${
                                item.name.includes('Freeze') ? 'bg-sky-500/10 text-sky-500' : 'bg-orange-500/10 text-orange-500'
                            }`}>
                                {item.name.includes('Freeze') ? <Shield size={32} className="fill-current" /> : <Zap size={32} className="fill-current" />}
                            </div>
                            <div className="px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-lg text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">
                                Consumable
                            </div>
                        </div>
                        
                        <h4 className="font-bold text-lg text-text-primary-light dark:text-white mb-1">{item.name}</h4>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4 leading-relaxed min-h-[40px]">{item.description}</p>
                        
                        <button 
                            onClick={() => handleBuy(item.cost)}
                            disabled={userGems < item.cost}
                            className={`w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95
                                ${userGems >= item.cost 
                                    ? 'bg-white dark:bg-white/10 text-text-primary-light dark:text-white hover:bg-gray-50 dark:hover:bg-white/20 border border-gray-200 dark:border-white/5' 
                                    : 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed'
                                }
                            `}
                        >
                            {item.purchased ? (
                                <span className="text-green-500 flex items-center gap-1"><Check size={18} /> Owned</span>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-base filled text-sky-500">diamond</span>
                                    {item.cost}
                                </>
                            )}
                        </button>
                    </div>
                ))}
             </div>
         </section>

         {/* Section: Cosmetics */}
         <section>
             <h3 className="font-bold text-text-secondary-light dark:text-text-secondary-dark text-xs uppercase tracking-widest px-2 mb-4">Cosmetics</h3>
             <div className="grid grid-cols-2 gap-4">
                 {/* Example Cosmetic Cards */}
                 <div className="bg-card-light dark:bg-card-dark rounded-[2rem] p-4 border border-border-light dark:border-white/5 flex flex-col items-center text-center group hover:border-primary/30 transition-all">
                      <div className="w-20 h-20 rounded-full p-1 border-4 border-yellow-400 mb-3 relative">
                          <img src={getUser().avatar} className="w-full h-full rounded-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Sparkles className="text-yellow-400 fill-current animate-pulse" size={24} />
                          </div>
                      </div>
                      <h4 className="font-bold text-text-primary-light dark:text-white text-sm mb-1">Golden Aura</h4>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-3">Profile Border</p>
                      <button 
                        disabled
                        className="w-full py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-400 text-xs font-bold flex items-center justify-center gap-1"
                      >
                          <Lock size={12} /> Lvl 10
                      </button>
                 </div>

                 <div className="bg-card-light dark:bg-card-dark rounded-[2rem] p-4 border border-border-light dark:border-white/5 flex flex-col items-center text-center group hover:border-primary/30 transition-all">
                      <div className="w-20 h-20 rounded-full p-1 border-4 border-sky-400 mb-3 relative shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                          <img src={getUser().avatar} className="w-full h-full rounded-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h4 className="font-bold text-text-primary-light dark:text-white text-sm mb-1">Neon Pulse</h4>
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-3">Profile Border</p>
                      <button 
                         onClick={() => handleBuy(500)}
                         disabled={userGems < 500}
                         className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors ${userGems >= 500 ? 'bg-primary text-background-dark hover:brightness-110' : 'bg-gray-100 dark:bg-white/5 text-gray-400'}`}
                      >
                          <span className="material-symbols-outlined text-xs filled">diamond</span> 500
                      </button>
                 </div>
             </div>
         </section>

      </main>
    </div>
  );
};

