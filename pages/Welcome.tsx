
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full bg-background-light dark:bg-background-dark flex flex-col relative overflow-hidden font-display transition-colors duration-500">
      <div className="flex-1 flex flex-col items-center justify-center p-8 animate-fade-in text-center max-w-md mx-auto w-full relative">
         <div className="w-24 h-24 rounded-full border-8 border-primary flex items-center justify-center mb-12 relative">
             <div className="absolute inset-0 border-8 border-primary opacity-20 rounded-full animate-ping"></div>
         </div>
         
         <h1 className="text-5xl font-bold text-text-primary-light dark:text-white mb-6 tracking-tight">
           SaveCircle
         </h1>
         <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark font-normal leading-relaxed max-w-xs mb-12">
           Master your money through <br/> consistency and community.
         </p>

         <div className="absolute bottom-10 w-full px-8 left-0 space-y-4">
            <button onClick={() => navigate('/signup')} className="w-full h-14 bg-text-primary-light dark:bg-white text-background-light dark:text-black rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg">
               Create Account
            </button>
            
            <div className="pt-4">
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">
                    Already have an account? <Link to="/login" className="text-primary-dark dark:text-primary font-bold hover:underline">Log In</Link>
                </p>
            </div>
         </div>
      </div>
    </div>
  );
};
