
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { User, Users, Calendar, Target, Repeat, Wallet, Sparkles, Search } from 'lucide-react';
import { getUser, addCircle } from '../utils/storage';
import { Circle } from '../types';
import { CircleIcon, ICON_MAP } from '../components/CircleIcon';

export const CreateCircle: React.FC = () => {
  const navigate = useNavigate();
  
  // Mode State: 'solo' | 'social'
  const [mode, setMode] = useState<'solo' | 'social'>('solo');
  const [name, setName] = useState('');
  
  // Icon Selection State
  const [activeIconTab, setActiveIconTab] = useState<'icons' | 'emojis'>('icons');
  const [selectedIcon, setSelectedIcon] = useState<string>('Wallet');
  const [iconType, setIconType] = useState<'lucide' | 'emoji'>('lucide');
  // Default color to white since picker is removed, keeping state for compatibility
  const [iconColor, setIconColor] = useState<string>('text-white'); 
  const [customEmoji, setCustomEmoji] = useState('');
  
  const [selectedTheme, setSelectedTheme] = useState('obsidian');
  
  // Solo Inputs
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');

  // Social Inputs
  const [contribution, setContribution] = useState('500');
  const [frequency, setFrequency] = useState('Weekly');

  const emojis = ['💰', '✈️', '🚗', '🏠', '🎁', '🎓', '💍', '💻', '🎸', '⚽', '🌴', '👶', '🚀', '🍕', '🐶', '🐱', '🍔', '👟', '📚', '💡'];
  const frequencies = ['Daily', 'Weekly', 'Bi-Weekly', 'Monthly'];
  
  const themes = [
      { id: 'obsidian', name: 'Obsidian', class: 'bg-gradient-to-br from-[#2c3e50] to-[#000000]', text: 'text-white' },
      { id: 'lime', name: 'Lime', class: 'bg-gradient-to-br from-lime-400 to-emerald-600', text: 'text-lime-900' },
      { id: 'sky', name: 'Sky', class: 'bg-gradient-to-br from-sky-400 to-blue-600', text: 'text-white' },
      { id: 'purple', name: 'Royal', class: 'bg-gradient-to-br from-purple-500 to-indigo-600', text: 'text-white' },
      { id: 'sunset', name: 'Sunset', class: 'bg-gradient-to-br from-orange-400 to-pink-600', text: 'text-white' }
  ];

  const currentTheme = themes.find(t => t.id === selectedTheme) || themes[0];

  // Helper to ensure positive integers only
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const val = e.target.value;
    if (val === '') {
        setter('');
        return;
    }
    const cleanVal = val.replace(/[^0-9]/g, '');
    const num = parseInt(cleanVal);
    if (!isNaN(num) && num > 0) {
        setter(num.toString());
    } else {
        setter(''); 
    }
  };

  const handleIconSelect = (icon: string, type: 'lucide' | 'emoji') => {
      setSelectedIcon(icon);
      setIconType(type);
  };

  const handleCustomEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setCustomEmoji(val);
      if (val) {
          setSelectedIcon(val);
          setIconType('emoji');
      }
  };

  const handleCreate = () => {
      const user = getUser();
      
      const newCircle: Circle = {
          id: Date.now().toString(),
          name: name,
          membersCount: mode === 'solo' ? 1 : 2, 
          streak: 0,
          consistency: 100,
          poolTotal: 0,
          isUserMember: true,
          theme: selectedTheme,
          mode: mode,
          icon: selectedIcon,
          iconType: iconType,
          iconColor: iconType === 'lucide' ? iconColor : undefined,
          members: [
              { id: 'u1', name: 'You', avatar: user.avatar, consistency: 100 }
          ],
          activity: []
      };

      if (mode === 'solo') {
          newCircle.targetAmount = targetAmount ? parseInt(targetAmount) : undefined;
          newCircle.targetDate = targetDate;
      } else {
          newCircle.contribution = contribution ? parseInt(contribution) : undefined;
          newCircle.frequency = frequency;
          newCircle.inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      }

      addCircle(newCircle);
      navigate('/circles');
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
         <h1 className="text-lg font-bold">New {mode === 'solo' ? 'Goal' : 'Circle'}</h1>
         <div className="w-12"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-32 space-y-6">
         
         {/* Mode Toggle */}
         <div className="bg-gray-200 dark:bg-white/5 p-1 rounded-2xl flex relative">
             <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all duration-300 ease-spring ${mode === 'solo' ? 'left-1' : 'left-[calc(50%+4px)]'}`}></div>
             
             <button 
                onClick={() => setMode('solo')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl relative z-10 font-bold text-sm transition-colors ${mode === 'solo' ? 'text-primary-dark dark:text-white' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
             >
                 <User size={18} />
                 Solo
             </button>
             <button 
                onClick={() => setMode('social')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl relative z-10 font-bold text-sm transition-colors ${mode === 'social' ? 'text-primary-dark dark:text-white' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
             >
                 <Users size={18} />
                 Circle
             </button>
         </div>

         {/* Live Preview Card */}
         <section className="flex flex-col items-center py-4">
            <div className={`w-full max-w-[340px] aspect-[1.58/1] ${currentTheme.class} rounded-[2rem] p-6 text-white shadow-2xl relative overflow-hidden border border-white/10 transition-all duration-500 group hover:scale-[1.02] flex flex-col justify-between`}>
                
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-[40px] pointer-events-none"></div>

                <div className="flex justify-between items-start z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/10">
                        <CircleIcon icon={selectedIcon} type={iconType} color={iconColor} className="w-7 h-7" />
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                        {mode === 'solo' ? <User size={12} className="text-white/80" /> : <Users size={12} className="text-white/80" />}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                            {mode === 'solo' ? 'Personal' : 'Circle'}
                        </span>
                    </div>
                </div>

                <div className="z-10 mt-2">
                    <h2 className={`text-2xl font-display font-bold leading-tight tracking-tight mb-1 ${currentTheme.text === 'text-lime-900' ? 'text-lime-950' : 'text-white'}`}>
                        {name || (mode === 'solo' ? "New Goal" : "New Circle")}
                    </h2>
                    <div className="flex items-center gap-2">
                         <div className={`h-1 w-8 rounded-full ${currentTheme.text === 'text-lime-900' ? 'bg-lime-900/30' : 'bg-white/30'}`}></div>
                         <p className={`text-[10px] font-bold uppercase tracking-widest opacity-70 ${currentTheme.text === 'text-lime-900' ? 'text-lime-900' : 'text-white'}`}>
                            {mode === 'solo' ? 'Savings Goal' : 'Social Savings'}
                        </p>
                    </div>
                </div>

                <div className="z-10 mt-auto pt-4 border-t border-white/10 flex justify-between items-end">
                     <div>
                         <p className={`text-[9px] font-bold uppercase tracking-wider mb-0.5 opacity-60 ${currentTheme.text === 'text-lime-900' ? 'text-lime-900' : 'text-white'}`}>
                            {mode === 'solo' ? 'Target Amount' : 'Contribution'}
                         </p>
                         <div className="flex items-baseline gap-0.5">
                             <span className={`text-sm font-medium opacity-80 ${currentTheme.text === 'text-lime-900' ? 'text-lime-900' : 'text-white'}`}>₹</span>
                             <span className={`text-2xl font-bold font-mono tracking-tight ${currentTheme.text === 'text-lime-900' ? 'text-lime-900' : 'text-white'}`}>
                                {(mode === 'solo' ? targetAmount : contribution) ? parseInt(mode === 'solo' ? targetAmount : contribution).toLocaleString() : '0'}
                             </span>
                         </div>
                     </div>
                     
                     <div className={`px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10 ${currentTheme.text === 'text-lime-900' ? 'bg-lime-900/10 text-lime-900' : 'bg-white/10 text-white'}`}>
                         <p className="text-[10px] font-bold uppercase tracking-wide">
                            {mode === 'solo' ? (targetDate ? new Date(targetDate).toLocaleDateString(undefined, {month:'short', year:'2-digit'}) : 'No Date') : frequency}
                         </p>
                     </div>
                </div>
            </div>
            
            {/* Theme Dots */}
            <div className="flex gap-3 mt-6">
                {themes.map(theme => (
                    <button 
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`w-8 h-8 rounded-full ${theme.class} border-2 transition-all duration-300 ${selectedTheme === theme.id ? 'border-text-primary-light dark:border-white scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'}`}
                    />
                ))}
            </div>
         </section>

         {/* Name Input */}
         <div className="bg-card-light dark:bg-card-dark rounded-[2rem] p-6 border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
             <label className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider ml-1 mb-2 block">
                {mode === 'solo' ? 'Goal Name' : 'Circle Name'}
             </label>
             <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={mode === 'solo' ? "e.g. New Macbook" : "e.g. Goa Trip 2024"}
                className="w-full bg-transparent border-none p-0 text-xl font-bold text-text-primary-light dark:text-white placeholder:text-text-secondary-light/50 focus:ring-0"
             />
         </div>

         {/* Icon Selection */}
         <div className="bg-card-light dark:bg-card-dark rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none overflow-hidden">
             {/* Tabs */}
             <div className="flex border-b border-border-light dark:border-white/5">
                 <button 
                    onClick={() => setActiveIconTab('icons')}
                    className={`flex-1 py-4 font-bold text-sm transition-colors ${activeIconTab === 'icons' ? 'bg-primary/10 text-primary-dark dark:text-primary border-b-2 border-primary' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5'}`}
                 >
                     Icons
                 </button>
                 <button 
                    onClick={() => setActiveIconTab('emojis')}
                    className={`flex-1 py-4 font-bold text-sm transition-colors ${activeIconTab === 'emojis' ? 'bg-primary/10 text-primary-dark dark:text-primary border-b-2 border-primary' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5'}`}
                 >
                     Emojis
                 </button>
             </div>
             
             <div className="p-5">
                 {activeIconTab === 'icons' && (
                     <div className="space-y-5">
                         {/* Icon Horizontal Scroll */}
                         <div>
                             <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-3">Select Icon</p>
                             <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
                                 {Object.keys(ICON_MAP).map((iconName) => (
                                     <button 
                                        key={iconName}
                                        onClick={() => handleIconSelect(iconName, 'lucide')}
                                        className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all ${selectedIcon === iconName && iconType === 'lucide' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-gray-100 dark:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-white/10'}`}
                                     >
                                         <CircleIcon icon={iconName} type="lucide" className="w-6 h-6" color={selectedIcon === iconName && iconType === 'lucide' ? 'text-black' : 'text-current'} />
                                     </button>
                                 ))}
                             </div>
                         </div>
                     </div>
                 )}

                 {activeIconTab === 'emojis' && (
                     <div className="space-y-5">
                         <div>
                             <label className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-2 block">Custom Emoji</label>
                             <div className="relative">
                                 <input 
                                    type="text" 
                                    value={customEmoji}
                                    onChange={handleCustomEmojiChange}
                                    placeholder="Type an emoji..."
                                    className="w-full bg-gray-100 dark:bg-white/5 rounded-xl py-3 pl-10 pr-4 font-bold text-text-primary-light dark:text-white focus:ring-2 focus:ring-primary/50 border-none"
                                 />
                                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">
                                     {customEmoji || <Search size={18} className="text-gray-400" />}
                                 </div>
                             </div>
                         </div>

                         <div>
                             <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-3">Popular</p>
                             <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
                                 {emojis.map(emoji => (
                                     <button 
                                        key={emoji}
                                        onClick={() => handleIconSelect(emoji, 'emoji')}
                                        className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all ${selectedIcon === emoji && iconType === 'emoji' ? 'bg-primary scale-110 shadow-lg shadow-primary/20' : 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10'}`}
                                     >
                                         {emoji}
                                     </button>
                                 ))}
                             </div>
                         </div>
                     </div>
                 )}
             </div>
         </div>

         {/* Dynamic Inputs based on Mode */}
         <div className="bg-card-light dark:bg-card-dark rounded-[2rem] p-5 border border-border-light dark:border-white/5 shadow-sm dark:shadow-none animate-fade-in">
            {mode === 'solo' ? (
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
                                <Target size={18} />
                            </div>
                            <label className="font-bold text-text-primary-light dark:text-white">Target Amount</label>
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark font-bold text-lg">₹</span>
                            <input 
                                type="number"
                                min="1" 
                                value={targetAmount}
                                onChange={(e) => handleAmountChange(e, setTargetAmount)}
                                placeholder="50,000"
                                className="w-full bg-gray-100 dark:bg-white/5 rounded-2xl border-none py-4 pl-10 pr-4 text-2xl font-bold text-text-primary-light dark:text-white focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-text-secondary-light/30"
                            />
                        </div>
                    </div>

                    <div>
                            <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Calendar size={18} />
                            </div>
                            <label className="font-bold text-text-primary-light dark:text-white">Target Date (Optional)</label>
                        </div>
                        <input 
                            type="date" 
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                            className="w-full bg-gray-100 dark:bg-white/5 rounded-2xl border-none py-3 px-4 font-bold text-text-primary-light dark:text-white focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div>
                            <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Wallet size={18} />
                            </div>
                            <label className="font-bold text-text-primary-light dark:text-white">Contribution Amount</label>
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark font-bold text-lg">₹</span>
                            <input 
                                type="number"
                                min="1" 
                                value={contribution}
                                onChange={(e) => handleAmountChange(e, setContribution)}
                                className="w-full bg-gray-100 dark:bg-white/5 rounded-2xl border-none py-4 pl-10 pr-4 text-2xl font-bold text-text-primary-light dark:text-white focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                        </div>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-2 ml-1">
                            Amount each member pays per cycle.
                        </p>
                    </div>

                    <div>
                            <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                <Repeat size={18} />
                            </div>
                            <label className="font-bold text-text-primary-light dark:text-white">Frequency</label>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {frequencies.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFrequency(f)}
                                    className={`py-3 px-4 rounded-xl font-bold text-sm border-2 transition-all ${frequency === f ? 'border-primary bg-primary/10 text-primary-dark dark:text-primary' : 'border-transparent bg-gray-100 dark:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-white/10'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
         </div>
      </main>

      {/* Fixed Footer */}
      <div className="p-4 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-white/5 fixed bottom-0 left-0 w-full z-30 max-w-md mx-auto transition-colors duration-300">
          <Button 
            fullWidth 
            size="lg" 
            disabled={!name || (mode === 'solo' && (!targetAmount || parseInt(targetAmount) <= 0)) || (mode === 'social' && (!contribution || parseInt(contribution) <= 0))} 
            onClick={handleCreate} 
            className={(!name || (mode === 'solo' && !targetAmount) || (mode === 'social' && !contribution)) ? 'opacity-50 cursor-not-allowed' : 'shadow-lg shadow-primary/20'}
          >
              {mode === 'solo' ? 'Create Goal' : 'Create Circle'}
          </Button>
      </div>
    </div>
  );
};
