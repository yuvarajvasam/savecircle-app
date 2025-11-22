
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Home } from './pages/Home';
import { Circles } from './pages/Circles';
import { Learn } from './pages/Learn'; 
import { LearnPath } from './pages/LearnPath'; 
import { Guide } from './pages/Guide'; 
import { Challenges } from './pages/Challenges';
import { Profile } from './pages/Profile';
import { Onboarding } from './pages/Onboarding';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Welcome } from './pages/Welcome';
import { Navbar } from './components/Navbar';
import { InstallPrompt } from './components/InstallPrompt';
import { BiometricLock } from './components/BiometricLock';
import { Notifications } from './pages/Notifications';
import { Leaderboard } from './pages/Leaderboard';
import { CreateCircle } from './pages/CreateCircle';
import { InviteFriends } from './pages/InviteFriends';
import { Settings } from './pages/Settings';
import { About } from './pages/About';
import { HelpCenter } from './pages/HelpCenter';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Shop } from './pages/Shop';
import { JoinCircle } from './pages/JoinCircle';
import { LearningDashboard } from './pages/LearningDashboard';
import { Streak } from './pages/Streak';
import { History } from './pages/History';
import { Invest } from './pages/Invest';
import { Achievements } from './pages/Achievements';

const App: React.FC = () => {
  // State to track authentication and onboarding status
  // savecircle_auth: Set when user logs in or signs up
  // savecircle_onboarded: Set when user completes the wizard
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('savecircle_auth') === 'true';
  });
  
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('savecircle_onboarded') === 'true';
  });

  // Biometric lock state
  const [isBiometricEnabled, setIsBiometricEnabled] = useState<boolean>(() => {
    return localStorage.getItem('savecircle_biometric_enabled') === 'true';
  });
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    // Check if we need to show lock screen
    if (!isBiometricEnabled) return true;
    // Check if app was just opened (not from background)
    const lastUnlockTime = localStorage.getItem('savecircle_last_unlock');
    if (!lastUnlockTime) return false;
    // If unlocked within last 30 seconds, don't require re-authentication
    const timeSinceUnlock = Date.now() - parseInt(lastUnlockTime);
    return timeSinceUnlock < 30000; // 30 seconds
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [isAuthenticated]);

  // Listen for biometric setting changes and app visibility
  useEffect(() => {
    const checkBiometric = () => {
      const enabled = localStorage.getItem('savecircle_biometric_enabled') === 'true';
      setIsBiometricEnabled(enabled);
      if (!enabled) {
        setIsUnlocked(true);
        return;
      }
      
      // If biometrics is enabled, check if we need to lock
      const lastUnlockTime = localStorage.getItem('savecircle_last_unlock');
      if (!lastUnlockTime) {
        setIsUnlocked(false);
        return;
      }
      
      const timeSinceUnlock = Date.now() - parseInt(lastUnlockTime);
      // Lock if more than 30 seconds have passed
      setIsUnlocked(timeSinceUnlock < 30000);
    };

    // Check on mount
    checkBiometric();

    // Listen for storage changes (when settings are updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'savecircle_biometric_enabled') {
        checkBiometric();
      }
    };

    // Handle app visibility changes (when app comes back from background)
    const handleVisibilityChange = () => {
      if (!document.hidden && isBiometricEnabled) {
        // App became visible, check if we need to lock
        checkBiometric();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Also check periodically (for same-tab updates)
    const interval = setInterval(checkBiometric, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, [isBiometricEnabled]);

  const handleBiometricUnlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('savecircle_last_unlock', Date.now().toString());
  };

  // Show biometric lock if enabled and not unlocked
  const showBiometricLock = isBiometricEnabled && !isUnlocked && isAuthenticated && hasOnboarded;

  const handleAuth = () => {
    setIsAuthenticated(true);
    setHasOnboarded(localStorage.getItem('savecircle_onboarded') === 'true');
  };

  const handleOnboardingComplete = () => {
    setHasOnboarded(true);
    localStorage.setItem('savecircle_onboarded', 'true');
  };

  return (
    <HashRouter>
      {/* Outer container fixed to viewport height to prevent window scrolling */}
      <div className="h-[100dvh] w-screen bg-gray-100 dark:bg-black flex justify-center font-display overflow-hidden transition-colors duration-300">
        {/* App container fixed to parent height */}
        <div className="w-full max-w-md bg-background-light dark:bg-background-dark h-full relative shadow-2xl flex flex-col overflow-hidden transition-colors duration-300">
          {/* Biometric Lock Screen */}
          {showBiometricLock && <BiometricLock onUnlock={handleBiometricUnlock} />}
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/welcome" 
              element={
                isAuthenticated ? (hasOnboarded ? <Navigate to="/" /> : <Navigate to="/onboarding" />) : <Welcome />
              } 
            />
            
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/" /> : <div className="h-full overflow-y-auto no-scrollbar"><Login onLogin={handleAuth} /></div>
              } 
            />
            
            <Route 
              path="/signup" 
              element={
                isAuthenticated ? <Navigate to="/" /> : <div className="h-full overflow-y-auto no-scrollbar"><Signup onLogin={handleAuth} /></div>
              } 
            />

            {/* Onboarding Wizard - Protected but accessible if auth'd but not setup */}
            <Route 
              path="/onboarding" 
              element={
                !isAuthenticated ? (
                  <Navigate to="/welcome" />
                ) : hasOnboarded ? (
                  <Navigate to="/" />
                ) : (
                  <div className="h-full overflow-y-auto no-scrollbar"><Onboarding onComplete={handleOnboardingComplete} /></div>
                )
              } 
            />

            {/* Protected Routes - Only if Auth AND Setup complete */}
            <Route 
              path="/*" 
              element={
                !isAuthenticated ? (
                  <Navigate to="/welcome" />
                ) : !hasOnboarded ? (
                  <Navigate to="/onboarding" />
                ) : (
                  <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth w-full bg-background-light dark:bg-background-dark transition-colors duration-300">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        
                        <Route path="/circles" element={<Circles />} />
                        <Route path="/circles/:circleId" element={<Circles />} />
                        
                        <Route path="/create-circle" element={<CreateCircle />} />
                        <Route path="/join-circle" element={<JoinCircle />} />
                        <Route path="/invite" element={<InviteFriends />} />
                        
                        <Route path="/learn" element={<LearnPath />} />
                        <Route path="/learning-dashboard" element={<LearningDashboard />} />
                        <Route path="/lesson/:id" element={<Learn />} />
                        <Route path="/guide/:unitId" element={<Guide />} />
                        
                        <Route path="/challenges" element={<Challenges />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/streak" element={<Streak />} />
                        
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/help" element={<HelpCenter />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/history" element={<History />} />
                        
                        <Route path="/invest/:circleId" element={<Invest />} />
                        <Route path="/achievements" element={<Achievements />} />
                      </Routes>
                    </div>
                    {/* Fixed Bottom Navbar */}
                    <Navbar />
                    {/* PWA Install Prompt */}
                    <InstallPrompt />
                  </div>
                )
              } 
            />
          </Routes>
        </div>
      </div>
      <Analytics />
    </HashRouter>
  );
};

export default App;
