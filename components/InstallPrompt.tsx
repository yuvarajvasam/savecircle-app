import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        return true;
      }
      return false;
    };

    if (checkInstalled()) {
      return;
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Listen for the beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app was just installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
    });

    // Show prompt after a delay if not installed
    // Check every 30 seconds if user hasn't installed
    const showPromptTimer = setTimeout(() => {
      if (!checkInstalled()) {
        setShowPrompt(true);
      }
    }, 3000); // Show after 3 seconds

    // Periodically check and show prompt if not installed
    const periodicCheck = setInterval(() => {
      if (!checkInstalled() && !showPrompt) {
        setShowPrompt(true);
      }
    }, 30000); // Check every 30 seconds

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(showPromptTimer);
      clearInterval(periodicCheck);
    };
  }, [showPrompt]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setShowPrompt(false);
      setIsInstalled(true);
    } else {
      console.log('User dismissed the install prompt');
      handleDismiss();
    }

    // Clear the deferred prompt
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    // Temporarily hide, but will show again after delay
    setShowPrompt(false);
    // Show again after 1 minute
    setTimeout(() => {
      if (!isInstalled) {
        setShowPrompt(true);
      }
    }, 60000);
  };

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  // Show prompt even if deferredPrompt is not available (for iOS or when event hasn't fired)
  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 flex justify-center px-4 animate-slide-up">
      <div className="bg-white dark:bg-[#1c1c1e] w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
        <div className="p-4 flex items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
            <Download size={24} className="text-primary dark:text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
              Install SaveCircle
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {isIOS 
                ? 'Tap Share → Add to Home Screen' 
                : 'Add to your home screen for quick access'
              }
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {deferredPrompt ? (
              <button
                onClick={handleInstall}
                className="px-4 py-2 bg-primary text-primary-content rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all"
              >
                Install
              </button>
            ) : (
              <button
                onClick={() => {
                  // For iOS or when prompt not available, just hide temporarily
                  handleDismiss();
                }}
                className="px-4 py-2 bg-primary text-primary-content rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all"
              >
                Got it
              </button>
            )}
            <button
              onClick={handleDismiss}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Dismiss"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

