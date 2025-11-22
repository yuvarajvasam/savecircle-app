
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { getCircles } from '../utils/storage';
import { Circle } from '../types';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { CircleIcon } from '../components/CircleIcon';

export const JoinCircle: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'searching' | 'found' | 'joining' | 'success' | 'error' | 'already_member'>('idle');
  const [foundCircle, setFoundCircle] = useState<Circle | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    if (val.length <= 6) {
      setCode(val);
      setStatus('idle');
      setErrorMsg('');
    }
  };

  const handleSearch = () => {
    if (code.length !== 6) return;

    setStatus('searching');
    setTimeout(() => {
      // Search in all circles (both mock and created ones stored in LS)
      const circles = getCircles();
      const circle = circles.find(c => c.inviteCode === code);
      
      if (circle) {
        setFoundCircle(circle);
        // Check if already joined
        if (circle.isUserMember) {
            setStatus('already_member');
        } else {
            setStatus('found');
        }
      } else {
        setStatus('error');
        setErrorMsg('Invalid invite code. Please try again.');
      }
    }, 1000); // Mock Network Delay
  };

  const handleJoin = () => {
    if (!foundCircle) return;
    setStatus('joining');
    
    setTimeout(() => {
       // Simulate Join Logic
       setStatus('success');
       // Persist join state locally
       localStorage.setItem(`joined_${foundCircle.id}`, 'true');
       
       setTimeout(() => {
           navigate(`/circles/${foundCircle.id}`);
       }, 1500);
    }, 1500);
  };

  const getThemeGradient = (theme: string | undefined) => {
    switch(theme) {
        case 'obsidian': return 'bg-gradient-to-br from-[#2c3e50] to-[#000000]';
        case 'lime': return 'bg-gradient-to-br from-lime-400 to-emerald-600';
        case 'sky': return 'bg-gradient-to-br from-sky-400 to-blue-600';
        case 'purple': return 'bg-gradient-to-br from-purple-500 to-indigo-600';
        case 'sunset': return 'bg-gradient-to-br from-orange-400 to-pink-600';
        default: return 'bg-gradient-to-br from-[#202020] to-[#000000]';
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex-1 font-display flex flex-col h-full transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5">
         <div className="flex w-12 items-center justify-start">
            <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
         </div>
         <h1 className="text-lg font-bold">Join Circle</h1>
         <div className="w-12"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 flex flex-col">
         
         <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] transition-all duration-500">
             
             {/* SEARCH STATE UI */}
             {(status === 'idle' || status === 'searching' || status === 'error') && (
                <div className="w-full max-w-xs flex flex-col items-center animate-fade-in">
                   <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                       <span className="material-symbols-outlined text-3xl text-text-secondary-light dark:text-text-secondary-dark">key</span>
                   </div>
                   
                   <h2 className="text-2xl font-bold text-center mb-2">Enter Invite Code</h2>
                   <p className="text-text-secondary-light dark:text-text-secondary-dark text-center text-sm mb-8">
                       Ask your circle admin for the 6-character invite code.
                   </p>

                   <input 
                      type="text" 
                      value={code}
                      onChange={handleCodeChange}
                      placeholder="CODE"
                      maxLength={6}
                      className="w-full bg-card-light dark:bg-card-dark border-2 border-border-light dark:border-white/10 rounded-2xl py-4 text-center text-3xl font-mono font-bold tracking-[0.5em] uppercase focus:ring-2 focus:ring-primary focus:border-transparent transition-all mb-4 placeholder:text-gray-200 dark:placeholder:text-white/10"
                   />

                   {status === 'error' && (
                       <p className="text-red-500 font-bold text-sm mb-4 animate-bounce-subtle">{errorMsg}</p>
                   )}

                   <Button 
                      fullWidth 
                      disabled={code.length < 6 || status === 'searching'}
                      onClick={handleSearch}
                   >
                       {status === 'searching' ? <Loader2 className="animate-spin" /> : 'Find Circle'}
                   </Button>
                </div>
             )}

             {/* FOUND / ALREADY MEMBER STATE UI */}
             {(status === 'found' || status === 'joining' || status === 'success' || status === 'already_member') && foundCircle && (
                <div className="w-full animate-slide-up">
                    <div className={`w-full ${getThemeGradient(foundCircle.theme)} p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-left text-white mb-8`}>
                        {/* Decorative Blur */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-[50px] -mr-10 -mt-10"></div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md text-white shadow-inner border border-white/10 text-4xl font-bold mb-4">
                                <CircleIcon icon={foundCircle.icon} type={foundCircle.iconType} color={foundCircle.iconColor} className="w-10 h-10" fallback={foundCircle.name[0]} />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">{foundCircle.name}</h2>
                            <p className="text-white/80 font-medium mb-6">
                                {foundCircle.membersCount} Members • ₹{foundCircle.poolTotal.toLocaleString()} Pool
                            </p>
                            
                            <div className="flex items-center justify-center -space-x-3 mb-2">
                                {foundCircle.members.slice(0,3).map(m => (
                                    <img key={m.id} src={m.avatar} className="w-10 h-10 rounded-full border-2 border-white/10 bg-black/20 object-cover" />
                                ))}
                                {foundCircle.membersCount > 3 && (
                                    <div className="w-10 h-10 rounded-full border-2 border-white/10 bg-black/40 flex items-center justify-center text-xs font-bold">
                                        +{foundCircle.membersCount - 3}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {status === 'found' && (
                        <div className="flex flex-col gap-3">
                            <Button fullWidth size="lg" onClick={handleJoin}>
                                Join This Circle
                            </Button>
                            <Button fullWidth variant="text" onClick={() => setStatus('idle')}>
                                Cancel
                            </Button>
                        </div>
                    )}

                    {status === 'already_member' && (
                        <div className="flex flex-col gap-3 text-center">
                            <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 mb-2">
                                <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-500 font-bold mb-1">
                                    <AlertCircle size={20} />
                                    <span>Already a Member</span>
                                </div>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">You are already part of this circle.</p>
                            </div>
                            <Button fullWidth onClick={() => navigate(`/circles/${foundCircle.id}`)}>
                                Go to Circle
                            </Button>
                            <Button fullWidth variant="text" onClick={() => setStatus('idle')}>
                                Search Another
                            </Button>
                        </div>
                    )}

                    {status === 'joining' && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <Loader2 className="w-10 h-10 animate-spin text-primary mb-2" />
                            <p className="font-bold text-lg animate-pulse">Joining Circle...</p>
                        </div>
                    )}

                    {status === 'success' && (
                         <div className="flex flex-col items-center justify-center py-8 animate-fade-in">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-green-500/30">
                                <Check size={32} strokeWidth={4} />
                            </div>
                            <p className="font-bold text-xl text-green-600 dark:text-green-400">Success!</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">Redirecting you...</p>
                        </div>
                    )}
                </div>
             )}

         </div>
      </main>
    </div>
  );
};
