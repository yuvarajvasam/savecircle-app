
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Loader2, Check } from 'lucide-react';

interface UPIGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number) => void;
  amount: number;
  recipientName: string;
  recipientContext: string; // e.g., "My Vault" or "Bali Trip"
}

export const UPIGateway: React.FC<UPIGatewayProps> = ({
  isOpen,
  onClose,
  onSuccess,
  amount,
  recipientName,
  recipientContext
}) => {
  const [step, setStep] = useState<'summary' | 'pin' | 'processing' | 'success'>('summary');
  const [pin, setPin] = useState('');
  
  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep('summary');
      setPin('');
    }
  }, [isOpen]);

  const handlePinClick = (num: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleSubmitPin = () => {
    if (pin.length === 4 || pin.length === 6) {
      setStep('processing');
      setTimeout(() => {
        setStep('success');
        setTimeout(() => {
          onSuccess(amount);
          onClose();
        }, 2000);
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col h-full w-full bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
      
      {/* CLICK OUTSIDE TO CLOSE (Only on summary step) */}
      <div className="flex-1" onClick={() => step === 'summary' && onClose()}></div>

      {/* CONTENT SHEET */}
      <div className={`bg-white dark:bg-[#1c1c1e] w-full max-w-md mx-auto rounded-t-[2rem] overflow-hidden shadow-2xl transition-transform duration-300 ${step === 'pin' ? 'h-full rounded-none' : 'min-h-[60%]'}`}>
        
        {/* STEP 1: PAYMENT SUMMARY */}
        {step === 'summary' && (
          <div className="flex flex-col h-full p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">Paying {recipientName}</h3>
              <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-white/10 rounded-full">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary-dark dark:text-primary mb-4">
                 <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
              </div>
              <div className="flex items-start">
                 <span className="text-2xl font-bold mt-2 mr-1">₹</span>
                 <span className="text-6xl font-bold tracking-tighter">{amount.toLocaleString()}</span>
              </div>
              <div className="mt-2 px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-lg flex items-center gap-2">
                 <span className="material-symbols-outlined text-sm">verified_user</span>
                 <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Banking Secure</span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-white/10 pt-4 mb-6">
               <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">From</span>
                  <span className="text-sm font-bold text-gray-800 dark:text-white">HDFC Bank •••• 4921</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">To</span>
                  <span className="text-sm font-bold text-gray-800 dark:text-white">{recipientContext}</span>
               </div>
            </div>

            <button 
              onClick={() => setStep('pin')}
              className="w-full py-4 bg-primary text-primary-content font-bold text-lg rounded-xl hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20"
            >
              Pay ₹{amount}
            </button>
            
            <div className="flex justify-center mt-4 opacity-50">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/2560px-UPI-Logo-vector.svg.png" alt="UPI" className="h-4 dark:invert" />
            </div>
          </div>
        )}

        {/* STEP 2: SECURE PIN ENTRY */}
        {step === 'pin' && (
          <div className="flex flex-col h-full bg-[#1a1a1a] text-white animate-fade-in">
             {/* Header */}
             <div className="p-4 flex justify-between items-center border-b border-white/10">
                <span className="font-bold text-lg">Enter UPI PIN</span>
                <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-2 py-1 rounded">
                   <ShieldCheck size={14} />
                   <span className="text-xs font-bold uppercase">Secure</span>
                </div>
             </div>

             {/* Summary Bar */}
             <div className="bg-[#252525] p-4 flex justify-between items-center">
                <div>
                   <p className="text-xs text-gray-400">Paying to</p>
                   <p className="font-bold text-sm">{recipientContext}</p>
                </div>
                <p className="font-bold text-xl">₹{amount}</p>
             </div>

             {/* PIN Dots */}
             <div className="flex-1 flex flex-col items-center justify-center">
                <div className="flex gap-4 mb-8">
                   {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div 
                        key={i} 
                        className={`w-4 h-4 rounded-full transition-all duration-200 ${
                           pin.length >= i ? 'bg-white scale-110' : 'bg-white/20'
                        }`}
                      />
                   ))}
                </div>
                <p className="text-sm text-gray-500 font-medium">ENTER 4 or 6 DIGIT PIN</p>
             </div>

             {/* Keypad */}
             <div className="bg-[#202020] p-4 pb-8">
                <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                   {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                      <button 
                        key={num}
                        onClick={() => handlePinClick(num.toString())}
                        className="h-16 rounded-full text-2xl font-bold text-white hover:bg-white/10 transition-colors active:scale-90"
                      >
                         {num}
                      </button>
                   ))}
                   <div className="h-16 flex items-center justify-center">
                      {/* Placeholder */}
                   </div>
                   <button 
                        onClick={() => handlePinClick('0')}
                        className="h-16 rounded-full text-2xl font-bold text-white hover:bg-white/10 transition-colors active:scale-90"
                   >
                      0
                   </button>
                   <button 
                        onClick={handleBackspace}
                        className="h-16 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors active:scale-90"
                   >
                      <span className="material-symbols-outlined">backspace</span>
                   </button>
                </div>
                
                {/* Submit Button */}
                <button 
                   onClick={handleSubmitPin}
                   disabled={pin.length < 4}
                   className={`w-full mt-6 py-4 rounded-xl font-bold text-black flex items-center justify-center gap-2 transition-all ${
                      pin.length >= 4 ? 'bg-primary hover:brightness-110' : 'bg-gray-600 cursor-not-allowed opacity-50'
                   }`}
                >
                   <span className="material-symbols-outlined">check_circle</span>
                   Submit
                </button>
             </div>
          </div>
        )}

        {/* STEP 3: PROCESSING */}
        {step === 'processing' && (
           <div className="flex flex-col items-center justify-center h-full min-h-[300px] p-8 bg-white dark:bg-[#1c1c1e]">
              <Loader2 size={64} className="text-primary animate-spin mb-6" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Processing Payment...</h3>
              <p className="text-gray-500 text-sm">Do not close this window</p>
           </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 'success' && (
           <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 bg-white dark:bg-[#1c1c1e]">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 animate-bounce-subtle shadow-xl shadow-green-500/30">
                 <Check size={48} strokeWidth={4} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-500 text-lg mb-8">₹{amount.toLocaleString()} sent to {recipientContext}</p>
              
              <div className="w-full bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10 mb-4">
                 <div className="flex justify-between mb-2">
                    <span className="text-gray-500 text-sm">Transaction ID</span>
                    <span className="text-gray-800 dark:text-white font-mono text-sm">T8291029381</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Time</span>
                    <span className="text-gray-800 dark:text-white text-sm">{new Date().toLocaleTimeString()}</span>
                 </div>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};
