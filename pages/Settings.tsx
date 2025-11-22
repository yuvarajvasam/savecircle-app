
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Camera, X, Upload, Trash2, LogOut, Bell, Volume2, Shield, Lock, HelpCircle, FileText, ChevronRight, Info } from 'lucide-react';
import { getUser, updateUser } from '../utils/storage';
import { User } from '../types';
import { Button } from '../components/Button';

// --- Edit Profile Modal ---

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUpdate: (updatedUser: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, currentUser, onUpdate }) => {
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [dailyGoal, setDailyGoal] = useState(currentUser.dailyGoal.toString());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
      setDailyGoal(currentUser.dailyGoal.toString());
    }
  }, [isOpen, currentUser]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Resize to reasonable dimension (max 300px)
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
          setAvatar(dataUrl);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
     const updated = updateUser({
        name,
        avatar,
        dailyGoal: parseInt(dailyGoal) || currentUser.dailyGoal
     });
     onUpdate(updated);
     onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end sm:justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
       <div className="bg-white dark:bg-[#1c1c1e] w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden shadow-2xl relative animate-slide-up">
          <div className="p-6 pb-8">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white">Edit Profile</h3>
                <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                   <X size={20} />
                </button>
             </div>

             <div className="flex flex-col items-center mb-8">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                   <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-white/10">
                      <img src={avatar} className="w-full h-full object-cover" alt="Avatar" />
                   </div>
                   <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={24} />
                   </div>
                   <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-background-dark rounded-full flex items-center justify-center shadow-lg">
                      <Upload size={14} strokeWidth={3} />
                   </button>
                </div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                <p className="text-xs text-gray-500 mt-3 font-medium">Tap to change photo</p>
             </div>

             <div className="space-y-5">
                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Display Name</label>
                   <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-100 dark:bg-white/5 rounded-xl p-4 font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 border-none"
                   />
                </div>

                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Daily Savings Goal</label>
                   <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                      <input 
                          type="number" 
                          value={dailyGoal}
                          onChange={(e) => setDailyGoal(e.target.value)}
                          className="w-full bg-gray-100 dark:bg-white/5 rounded-xl p-4 pl-8 font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 border-none"
                      />
                   </div>
                </div>
             </div>

             <div className="mt-8">
                <Button fullWidth size="lg" onClick={handleSave}>
                   Save Changes
                </Button>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Logout Confirmation Modal ---

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
       <div className="bg-white dark:bg-[#1c1c1e] w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl p-6 text-center animate-slide-up relative">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-900 dark:text-white mb-4 mx-auto">
              <LogOut size={28} className="ml-1" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Log Out?</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Are you sure you want to log out? <br/>
              You will be returned to the start screen.
          </p>

          <div className="flex gap-3">
              <button 
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-white/5 font-bold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                  Cancel
              </button>
              <button 
                  onClick={onConfirm}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
              >
                  Log Out
              </button>
          </div>
       </div>
    </div>
  );
};

// --- Main Settings Component ---

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (document.documentElement.classList.contains('dark')) return 'dark';
    return 'light';
  });

  // Local Settings State (Mock)
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [biometrics, setBiometrics] = useState(() => {
    return localStorage.getItem('savecircle_biometric_enabled') === 'true';
  });
  const [biometricTimeout, setBiometricTimeout] = useState(() => {
    return localStorage.getItem('savecircle_biometric_timeout') || '30'; // Default 30 seconds
  });

  const toggleTheme = (mode: 'light' | 'dark') => {
    setTheme(mode);
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setUser(getUser());
  }, []);

  const handleUserUpdate = (updatedUser: User) => {
      setUser(updatedUser);
  };

  const handleLogout = () => {
      localStorage.removeItem('savecircle_auth');
      localStorage.removeItem('savecircle_onboarded');
      localStorage.removeItem('savecircle_tour_seen');
      localStorage.removeItem('savecircle_user');
      window.location.href = '/';
  };

  const handleReset = () => {
      if (window.confirm("Are you sure? This will wipe all progress, circles, and achievements.")) {
          Object.keys(localStorage).forEach(key => {
              if (key.startsWith('savecircle_') || key.startsWith('joined_')) {
                  localStorage.removeItem(key);
              }
          });
          window.location.href = '/';
      }
  };

  return (
    <div className="flex flex-col bg-background-light dark:bg-background-dark flex-1 font-display text-text-primary-light dark:text-text-primary-dark h-full transition-colors duration-300">
      
      <EditProfileModal 
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        currentUser={user}
        onUpdate={handleUserUpdate}
      />

      <LogoutModal 
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogout}
      />

      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
        <div className="flex w-12 items-center justify-start">
          <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <h1 className="text-lg font-bold">Settings</h1>
        <div className="w-12"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-8">
        {/* User Profile Snippet */}
        <div className="flex items-center gap-4 p-4 bg-card-light dark:bg-card-dark rounded-[1.5rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
           <img src={user.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-primary" alt="Profile" />
           <div className="flex-1">
             <h2 className="font-bold text-lg text-text-primary-light dark:text-white">{user.name}</h2>
             <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{user.name.toLowerCase().replace(/\s+/g, '')}@savecircle.app</p>
           </div>
           <button 
             onClick={() => setIsEditOpen(true)}
             className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-primary border border-border-light dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
           >
             <span className="material-symbols-outlined text-xl">edit</span>
           </button>
        </div>

        {/* Appearance */}
        <section>
           <h3 className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase mb-3 px-2 tracking-wider">Appearance</h3>
           <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] overflow-hidden border border-border-light dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
              <div className="flex items-center justify-between p-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white">
                      <span className="material-symbols-outlined">palette</span>
                    </div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Theme</span>
                 </div>
                 <div className="flex bg-background-light dark:bg-background-dark p-1 rounded-xl border border-border-light dark:border-white/5">
                    <button 
                      onClick={() => toggleTheme('light')}
                      className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-white dark:bg-white/10 shadow-sm text-primary-content dark:text-white' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
                    >
                      <Sun size={20} />
                    </button>
                    <button 
                      onClick={() => toggleTheme('dark')}
                      className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-white dark:bg-white/10 shadow-sm text-primary-content dark:text-white' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
                    >
                      <Moon size={20} />
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* Account */}
        <section>
           <h3 className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase mb-3 px-2 tracking-wider">Account</h3>
            <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] overflow-hidden border border-border-light dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
              <button className="w-full flex items-center justify-between p-4 border-b border-border-light dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white"><span className="material-symbols-outlined">currency_rupee</span></div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Currency</span>
                 </div>
                 <div className="flex items-center gap-1 text-text-secondary-light dark:text-text-secondary-dark">
                    <span className="text-sm font-medium">{user.currency === '₹' ? 'INR' : 'USD'}</span>
                    <ChevronRight size={20} />
                 </div>
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white"><span className="material-symbols-outlined">account_balance</span></div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Linked Accounts</span>
                 </div>
                 <div className="flex items-center gap-1 text-text-secondary-light dark:text-text-secondary-dark">
                    <span className="text-sm font-medium">2 Active</span>
                    <ChevronRight size={20} />
                 </div>
              </button>
           </div>
        </section>

        {/* General */}
        <section>
           <h3 className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase mb-3 px-2 tracking-wider">General</h3>
           <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] overflow-hidden border border-border-light dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
              <div className="flex items-center justify-between p-4 border-b border-border-light dark:border-white/5">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white">
                        <Bell size={20} />
                    </div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Notifications</span>
                 </div>
                 <Switch checked={notifications} onChange={() => setNotifications(!notifications)} />
              </div>
              <div className="flex items-center justify-between p-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white">
                        <Volume2 size={20} />
                    </div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Sounds & Haptics</span>
                 </div>
                 <Switch checked={sounds} onChange={() => setSounds(!sounds)} />
              </div>
           </div>
        </section>

        {/* Security */}
        <section>
           <h3 className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase mb-3 px-2 tracking-wider">Security</h3>
           <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] overflow-hidden border border-border-light dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
              <div className="flex items-center justify-between p-4 border-b border-border-light dark:border-white/5">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white">
                        <Lock size={20} />
                    </div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">App Lock (Biometrics)</span>
                 </div>
                 <Switch 
                   checked={biometrics} 
                   onChange={() => {
                     const newValue = !biometrics;
                     setBiometrics(newValue);
                     localStorage.setItem('savecircle_biometric_enabled', newValue.toString());
                     // If disabling, remove stored credential
                     if (!newValue) {
                       localStorage.removeItem('biometric_credential_id');
                       localStorage.removeItem('savecircle_last_unlock');
                     }
                     // Trigger storage event for App.tsx to pick up
                     window.dispatchEvent(new StorageEvent('storage', {
                       key: 'savecircle_biometric_enabled',
                       newValue: newValue.toString()
                     }));
                   }} 
                 />
              </div>
              
              {/* Timeout Setting - Only show if biometrics is enabled */}
              {biometrics && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-text-primary-light dark:text-white">Lock Timeout</span>
                    <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      {biometricTimeout === '0' ? 'Immediately' : 
                       biometricTimeout === '30' ? '30 seconds' :
                       biometricTimeout === '60' ? '1 minute' :
                       biometricTimeout === '300' ? '5 minutes' :
                       biometricTimeout === '900' ? '15 minutes' :
                       biometricTimeout === '3600' ? '1 hour' :
                       biometricTimeout === '86400' ? 'Never' :
                       `${parseInt(biometricTimeout) / 60} minutes`}
                    </span>
                  </div>
                  <select
                    value={biometricTimeout}
                    onChange={(e) => {
                      const newTimeout = e.target.value;
                      setBiometricTimeout(newTimeout);
                      localStorage.setItem('savecircle_biometric_timeout', newTimeout);
                      // Trigger storage event for App.tsx to pick up
                      window.dispatchEvent(new StorageEvent('storage', {
                        key: 'savecircle_biometric_timeout',
                        newValue: newTimeout
                      }));
                    }}
                    className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-white/10 rounded-xl p-3 text-text-primary-light dark:text-white font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option value="0">Immediately (always lock)</option>
                    <option value="30">30 seconds</option>
                    <option value="60">1 minute</option>
                    <option value="300">5 minutes</option>
                    <option value="900">15 minutes</option>
                    <option value="3600">1 hour</option>
                    <option value="86400">Never (until app closes)</option>
                  </select>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-2">
                    App will lock after this time when returning from background
                  </p>
                </div>
              )}
           </div>
        </section>

        {/* Support */}
        <section>
           <h3 className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase mb-3 px-2 tracking-wider">Support</h3>
           <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] overflow-hidden border border-border-light dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
              <button onClick={() => navigate('/help')} className="w-full flex items-center justify-between p-4 border-b border-border-light dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white">
                        <HelpCircle size={20} />
                    </div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Help Center</span>
                 </div>
                 <ChevronRight size={20} className="text-text-secondary-light dark:text-text-secondary-dark" />
              </button>
              <button onClick={() => navigate('/privacy')} className="w-full flex items-center justify-between p-4 border-b border-border-light dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white">
                        <FileText size={20} />
                    </div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">Privacy Policy</span>
                 </div>
                 <ChevronRight size={20} className="text-text-secondary-light dark:text-text-secondary-dark" />
              </button>
              <button onClick={() => navigate('/about')} className="w-full flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-text-primary-light dark:text-white">
                        <Info size={20} />
                    </div>
                    <span className="font-medium text-base text-text-primary-light dark:text-white">About SaveCircle</span>
                 </div>
                 <ChevronRight size={20} className="text-text-secondary-light dark:text-text-secondary-dark" />
              </button>
           </div>
        </section>

        {/* Logout & Danger Zone */}
        <section className="pt-4 space-y-3">
            <button onClick={() => setIsLogoutOpen(true)} className="w-full p-4 bg-card-light dark:bg-card-dark border border-border-light dark:border-white/5 rounded-[1.5rem] text-text-primary-light dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                <LogOut size={20} />
                Log Out
            </button>
            
            <button onClick={handleReset} className="w-full p-4 bg-red-500/5 text-red-500 font-bold rounded-[1.5rem] border border-red-500/10 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2">
                <Trash2 size={20} />
                Reset All Data
            </button>
            
            <p className="text-center text-xs text-text-secondary-light dark:text-text-secondary-dark mt-6 font-medium">Version 1.0.3 (Build 451)</p>
        </section>

      </main>
    </div>
  )
}

const Switch = ({checked, onChange}: {checked: boolean, onChange: () => void}) => (
  <button onClick={onChange} className={`relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-primary' : 'bg-gray-200 dark:bg-[#404040]'}`}>
    <div className={`h-[20px] w-[20px] rounded-full bg-white transition-transform duration-300 shadow-sm ${checked ? 'translate-x-[20px]' : ''}`}></div>
  </button>
)
