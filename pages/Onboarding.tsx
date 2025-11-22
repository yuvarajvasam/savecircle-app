
import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronRight, PiggyBank, Bot, Coins, Rocket, Camera, Upload, User as UserIcon, Palette, Gamepad2, Leaf, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { updateUser, getUser } from '../utils/storage';

interface OnboardingProps {
  onComplete: () => void;
}

const AVATAR_OPTIONS = [
  { 
    id: 'saver', 
    icon: <PiggyBank size={28} strokeWidth={1.5} />, 
    url: 'https://cdn-icons-png.flaticon.com/512/2331/2331966.png'
  },
  { 
    id: 'techie', 
    icon: <Bot size={28} strokeWidth={1.5} />, 
    url: 'https://cdn-icons-png.flaticon.com/512/4712/4712109.png'
  },
  { 
    id: 'investor', 
    icon: <Coins size={28} strokeWidth={1.5} />, 
    url: 'https://cdn-icons-png.flaticon.com/512/9062/9062564.png'
  },
  { 
    id: 'dreamer', 
    icon: <Rocket size={28} strokeWidth={1.5} />, 
    url: 'https://cdn-icons-png.flaticon.com/512/1356/1356479.png'
  },
  { 
    id: 'creative', 
    icon: <Palette size={28} strokeWidth={1.5} />, 
    url: 'https://cdn-icons-png.flaticon.com/512/2970/2970785.png'
  },
  { 
    id: 'gamer', 
    icon: <Gamepad2 size={28} strokeWidth={1.5} />, 
    url: 'https://cdn-icons-png.flaticon.com/512/808/808439.png'
  },
  { 
    id: 'nature', 
    icon: <Leaf size={28} strokeWidth={1.5} />, 
    url: 'https://cdn-icons-png.flaticon.com/512/2913/2913520.png'
  },
  { 
    id: 'foodie', 
    icon: <Coffee size={28} strokeWidth={1.5} />, 
    url: 'https://cdn-icons-png.flaticon.com/512/2819/2819194.png'
  }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState<number | null>(0);
  const [dailyGoal, setDailyGoal] = useState(100);
  
  // Hold Button Logic
  const [holding, setHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  
  const navigate = useNavigate();
  const holdInterval = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing user data (from login/signup)
  useEffect(() => {
      const user = getUser();
      if (user.name) setName(user.name);
      if (user.avatar && user.avatar.startsWith('data:')) setCustomAvatar(user.avatar);
  }, []);

  const nextStep = () => {
    if (step === 1 && !name.trim()) return; 
    setStep(s => s + 1);
  };
  
  const prevStep = () => setStep(s => s - 1);

  // Image Upload & Resize Logic
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          const maxSize = 300;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setCustomAvatar(dataUrl);
          setSelectedAvatarIdx(null); 
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (idx: number) => {
    setSelectedAvatarIdx(idx);
    setCustomAvatar(null);
  };

  const startHold = () => {
    setHolding(true);
    let progress = 0;
    holdInterval.current = setInterval(() => {
        progress += 1.5; 
        setHoldProgress(progress);
        if (progress >= 100) {
            clearInterval(holdInterval.current);
            setTimeout(() => finish(), 250);
        }
    }, 16);
  };

  const endHold = () => {
    if (holdProgress < 100) {
        setHolding(false);
        setHoldProgress(0);
        clearInterval(holdInterval.current);
    }
  };

  const finish = () => {
    const finalAvatar = customAvatar || AVATAR_OPTIONS[selectedAvatarIdx || 0].url;
    
    updateUser({
        name: name.trim() || "Saver",
        avatar: finalAvatar,
        dailyGoal: dailyGoal
    });
    
    onComplete();
    navigate('/');
  };

  return (
    <div className="h-full w-full bg-background-light dark:bg-background-dark flex flex-col relative overflow-hidden font-display transition-colors duration-500">
      
      {/* Navigation */}
      <div className="absolute top-0 left-0 w-full p-8 z-20 flex justify-between items-center">
        {step > 1 ? (
           <button onClick={prevStep} className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <ChevronRight className="rotate-180" size={20} strokeWidth={1.5} />
           </button>
        ) : <div className="w-10" />}
        
        {/* Progress Indicator */}
        <div className="flex gap-2">
           {[1, 2, 3].map(i => (
             <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-6 bg-primary' : 'w-1.5 bg-gray-200 dark:bg-white/10'}`} />
           ))}
        </div>
        <div className="w-10" />
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full relative">
        
        {/* STEP 1: IDENTITY */}
        {step === 1 && (
           <div className="flex-1 flex flex-col items-center p-8 pt-20 animate-slide-up overflow-y-auto no-scrollbar">
              <h2 className="text-2xl font-bold text-text-primary-light dark:text-white mb-8">Create Profile</h2>

              {/* Avatar Upload */}
              <div className="relative mb-10 group">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-32 h-32 rounded-full bg-gray-100 dark:bg-white/5 border-2 border-dashed border-gray-300 dark:border-white/20 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-primary transition-colors relative"
                  >
                      {customAvatar ? (
                          <img src={customAvatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : selectedAvatarIdx !== null ? (
                          <img src={AVATAR_OPTIONS[selectedAvatarIdx].url} alt="Avatar" className="w-full h-full object-cover p-2" />
                      ) : (
                          <UserIcon size={40} className="text-gray-400 mb-2" />
                      )}
                      
                      {!customAvatar && (
                         <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Camera className="text-white" size={24} />
                         </div>
                      )}
                  </div>
                  
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary text-background-dark flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                     {customAvatar ? <Check size={18} strokeWidth={3} /> : <Upload size={18} strokeWidth={3} />}
                  </button>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
              </div>

              {/* Name Input */}
              <div className="w-full mb-10">
                  <label className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider ml-4 mb-2 block">Your Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Taylor"
                    className="w-full h-14 bg-gray-100 dark:bg-white/5 rounded-2xl px-6 font-bold text-lg text-text-primary-light dark:text-white focus:ring-2 focus:ring-primary/50 border-none placeholder:text-text-secondary-light/30"
                    autoFocus
                  />
              </div>

              {/* Presets */}
              <div className="w-full">
                  <p className="text-center text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-4">Or choose a vibe</p>
                  <div className="flex flex-wrap justify-center gap-4 px-2">
                      {AVATAR_OPTIONS.map((opt, idx) => (
                          <button 
                            key={opt.id}
                            onClick={() => handlePresetSelect(idx)}
                            className={`w-14 h-14 rounded-full p-2 transition-all ${selectedAvatarIdx === idx && !customAvatar ? 'bg-primary scale-110 shadow-lg shadow-primary/20 ring-2 ring-background-light dark:ring-background-dark' : 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10'}`}
                          >
                              <img src={opt.url} className="w-full h-full object-contain" alt={opt.id} />
                          </button>
                      ))}
                  </div>
              </div>

              <div className="absolute bottom-10 w-full px-8 left-0">
                <button 
                    onClick={nextStep} 
                    disabled={!name.trim()}
                    className={`w-full h-16 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${name.trim() ? 'bg-text-primary-light dark:bg-white text-background-light dark:text-black hover:scale-[1.02] active:scale-95' : 'bg-gray-200 dark:bg-white/10 text-gray-400 cursor-not-allowed'}`}
                >
                   Continue
                </button>
             </div>
           </div>
        )}

        {/* STEP 2: GOAL */}
        {step === 2 && (
           <div className="flex-1 flex flex-col justify-center p-8 animate-slide-up">
              <p className="text-sm font-bold uppercase tracking-widest text-text-secondary-light dark:text-text-secondary-dark mb-4">Daily Target</p>
              
              <div className="relative mb-2">
                 <span className="text-7xl font-bold text-text-primary-light dark:text-white tracking-tighter">
                    ₹{dailyGoal}
                 </span>
              </div>
              
              <p className="text-lg text-primary-dark dark:text-primary font-medium mb-12 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                 That's ₹{(dailyGoal * 365).toLocaleString()} per year
              </p>

              <div className="mb-16">
                 <input 
                   type="range" 
                   min="50" 
                   max="1000" 
                   step="50" 
                   value={dailyGoal}
                   onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                   className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                 />
                 <div className="flex justify-between mt-4 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">
                    <span>₹50</span>
                    <span>₹1000</span>
                 </div>
              </div>

              <div className="absolute bottom-10 w-full px-8 left-0">
                <button onClick={nextStep} className="w-full h-16 bg-text-primary-light dark:bg-white text-background-light dark:text-black rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all">
                   Set Goal
                </button>
             </div>
           </div>
        )}

        {/* STEP 3: COMMIT & PLEDGE */}
        {step === 3 && (
           <div className="flex-1 flex flex-col justify-between p-6 animate-slide-up">
              <div className="mt-10 w-full flex flex-col items-center">
                 {/* The Pledge Card */}
                 <div className="w-full p-8 rounded-[2rem] bg-[#202020] text-center shadow-2xl relative overflow-hidden max-w-sm mx-auto mt-8">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none"></div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.25em] mb-4 relative z-10">THE PLEDGE</p>
                    <div className="relative z-10">
                        <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary">
                             <img src={customAvatar || AVATAR_OPTIONS[selectedAvatarIdx || 0].url} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-2xl font-bold text-white leading-relaxed">
                           I, <span className="text-white underline decoration-primary underline-offset-4">{name}</span>,<br/>
                           commit to saving <br/>
                           <span className="text-primary text-3xl">₹{dailyGoal}</span> every day.
                        </p>
                    </div>
                 </div>
              </div>

              {/* Hold Button */}
              <div className="flex flex-col items-center justify-center pb-8 relative">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                     {/* Track */}
                     <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                        {/* Outer Ring */}
                        <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" className="text-gray-200 dark:text-white/10" strokeWidth="4" />
                        
                        {/* Progress Arc */}
                        <circle 
                           cx="64" cy="64" r="56" 
                           fill="none" 
                           stroke="currentColor" 
                           className={`text-primary transition-all duration-100 ease-linear ${holdProgress > 0 ? 'opacity-100' : 'opacity-0'}`}
                           strokeWidth="4" 
                           strokeDasharray="351.86" 
                           strokeDashoffset={351.86 - (351.86 * holdProgress / 100)}
                           strokeLinecap="round"
                        />
                     </svg>
                     
                     {/* Button */}
                     <button 
                        className={`
                           relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 touch-none select-none focus:outline-none shadow-lg z-10
                           ${holdProgress > 0 ? 'scale-[0.95] bg-primary/90' : 'scale-100 bg-text-primary-light dark:bg-white hover:scale-[1.02]'}
                           ${holdProgress >= 100 ? 'bg-primary text-background-dark' : 'text-white dark:text-black'}
                        `}
                        onMouseDown={startHold}
                        onMouseUp={endHold}
                        onMouseLeave={endHold}
                        onTouchStart={startHold}
                        onTouchEnd={endHold}
                     >
                        {holdProgress >= 100 ? (
                           <Check size={40} strokeWidth={4} />
                        ) : (
                           <span className="font-bold text-lg tracking-wide">{holding ? 'HOLD' : 'START'}</span>
                        )}
                     </button>
                  </div>
                  
                  {!holding && holdProgress < 100 && (
                     <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark font-bold uppercase tracking-widest mt-6 animate-pulse">
                        Hold to commit
                     </p>
                  )}
              </div>
           </div>
        )}

      </div>
    </div>
  );
};
