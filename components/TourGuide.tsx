
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

export interface TourStep {
  targetId: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'center';
}

interface TourGuideProps {
  steps: TourStep[];
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const TourGuide: React.FC<TourGuideProps> = ({ steps, isOpen, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Update target position when step changes or window resizes
  useEffect(() => {
    if (isOpen) {
        const updatePosition = () => {
            const step = steps[currentStep];
            if (!step) return;

            if (step.targetId === 'center') {
                setTargetRect(null);
                setIsReady(true);
                return;
            }

            const element = document.getElementById(step.targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Wait for scroll
                setTimeout(() => {
                    const rect = element.getBoundingClientRect();
                    setTargetRect(rect);
                    setIsReady(true);
                }, 500);
            } else {
                // Element not found, skip to next or fallback to center
                setTargetRect(null);
                setIsReady(true);
            }
        };

        // Small initial delay to ensure DOM is ready
        const timer = setTimeout(updatePosition, 100);
        
        window.addEventListener('resize', updatePosition);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updatePosition);
        };
    }
  }, [currentStep, isOpen, steps]);

  const handleNext = () => {
      if (currentStep < steps.length - 1) {
          setIsReady(false);
          setCurrentStep(prev => prev + 1);
      } else {
          onComplete();
      }
  };

  const handlePrev = () => {
      if (currentStep > 0) {
          setIsReady(false);
          setCurrentStep(prev => prev - 1);
      }
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  const isCenter = !targetRect;

  // Tooltip Styles
  let tooltipStyle: React.CSSProperties = {};
  
  if (isCenter) {
      tooltipStyle = {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'fixed',
          zIndex: 100,
          width: '90%',
          maxWidth: '350px'
      };
  } else if (targetRect) {
      const spacing = 16;
      const tooltipHeight = 180; // Est
      
      // Default to preferred, fallback if off-screen
      let pos = step.position || 'bottom';
      
      // Simple boundary check logic
      if (pos === 'bottom' && targetRect.bottom + tooltipHeight > window.innerHeight) pos = 'top';
      if (pos === 'top' && targetRect.top - tooltipHeight < 0) pos = 'bottom';

      tooltipStyle = {
          position: 'fixed',
          zIndex: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '350px',
          ...(pos === 'bottom' ? { top: targetRect.bottom + spacing } : { bottom: window.innerHeight - targetRect.top + spacing })
      };
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] pointer-events-auto font-display touch-none">
      
      {/* Spotlight Overlay */}
      <div className="absolute inset-0 overflow-hidden transition-all duration-500 ease-in-out">
          {/* 
             We use a massive box-shadow on the target div to create the 'dimmed' background 
             around the highlighted area.
          */}
          {targetRect ? (
              <div 
                className="absolute rounded-2xl transition-all duration-500 ease-in-out shadow-[0_0_0_9999px_rgba(0,0,0,0.8)] ring-4 ring-primary/50 pointer-events-none"
                style={{
                    top: targetRect.top - 4,
                    left: targetRect.left - 4,
                    width: targetRect.width + 8,
                    height: targetRect.height + 8,
                }}
              />
          ) : (
              <div className="absolute inset-0 bg-black/80 transition-opacity duration-500" />
          )}
      </div>

      {/* Tooltip Card */}
      <div 
        className={`bg-white dark:bg-[#1c1c1e] p-6 rounded-[1.5rem] shadow-2xl border border-gray-100 dark:border-white/10 transition-all duration-500 ease-out ${isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={tooltipStyle}
      >
          <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                      {steps.map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentStep ? 'bg-primary' : 'bg-gray-200 dark:bg-white/10'}`} />
                      ))}
                  </div>
              </div>
              <button onClick={onSkip} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors p-1">
                  <X size={20} />
              </button>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">{step.content}</p>

          <div className="flex justify-between items-center">
              <button 
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`p-2 rounded-full transition-colors ${currentStep === 0 ? 'text-gray-300 dark:text-gray-700 opacity-50 cursor-not-allowed' : 'text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'}`}
              >
                  <ChevronLeft size={24} />
              </button>

              <button 
                onClick={handleNext}
                className="flex items-center gap-1 pl-5 pr-4 py-2.5 bg-primary text-black rounded-xl font-bold text-sm hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20"
              >
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                  <ChevronRight size={18} />
              </button>
          </div>
      </div>

    </div>,
    document.body
  );
};
