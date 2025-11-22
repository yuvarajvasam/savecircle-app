
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { GoogleButton } from '../components/GoogleButton';
import { Button } from '../components/Button';
import { updateUser } from '../utils/storage';

interface SignupProps {
  onLogin: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<'google' | 'email' | null>(null);

  const handleGoogleSignup = () => {
    setLoading('google');
    setTimeout(() => {
        // Simulate Google User Data (Name provided by Google)
        updateUser({
            name: "Alex (Google)", 
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw9cR54xcAIe-TPNb6NE9LRkR1vEjE8VhTEF9QnNRC5hg-Rimk1HTq386mvYkZNgfgyqLw29X7I7Jg8Y6wo8-tVTF8TI1Uq8agD1mY0DMGdOB95ajxt3CkNQHCyBBBsoT7YeejrTleJUwkpVW-ugH9yL4_-A1nq3snNvFsRyDMdSwkx96-pXF5E14AQHMbGjw_wtCOhGdFWCCN1P13XPXdtvCP3uAbnh5dLuhI11HaQ0IlHViVq2LaLI_UlrOFlIUmK9JAuZH6iMg",
            streak: 0,
            level: 1
        });
        
        // Set Auth Token
        localStorage.setItem('savecircle_auth', 'true');
        
        // Trigger App state update - this will redirect to /onboarding via routes
        onLogin();
    }, 1500);
  };

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading('email');
    setTimeout(() => {
        // Initialize empty user for manual setup
        updateUser({
            name: "", // Name will be collected in Onboarding
            avatar: "", // Avatar will be collected in Onboarding
            streak: 0,
            level: 1
        });
        
        // Set Auth Token
        localStorage.setItem('savecircle_auth', 'true');
        
        // Trigger App state update - this will redirect to /onboarding via routes
        onLogin();
    }, 1500);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full flex flex-col font-display transition-colors duration-300 p-6">
      <header className="mb-8 pt-4">
        <button 
            onClick={() => navigate('/welcome')} 
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
        >
            <ChevronLeft size={24} />
        </button>
      </header>

      <main className="animate-slide-up flex-1 flex flex-col">
        <h1 className="text-3xl font-bold text-text-primary-light dark:text-white mb-2">Create Account</h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">Begin your savings journey.</p>

        <div className="space-y-4 mb-8">
            <GoogleButton 
                onClick={handleGoogleSignup} 
                isLoading={loading === 'google'} 
                text="Sign up with Google"
            />
        </div>

        <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
            </div>
            <span className="relative bg-background-light dark:bg-background-dark px-4 text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest">
                Or with email
            </span>
        </div>

        <form onSubmit={handleEmailSignup} className="space-y-4 flex-1">
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
                    <Mail size={20} />
                </div>
                <input 
                    type="email" 
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-black/20 focus:ring-0 transition-all text-text-primary-light dark:text-white font-medium placeholder:text-text-secondary-light/50"
                />
            </div>

            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
                    <Lock size={20} />
                </div>
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-12 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-black/20 focus:ring-0 transition-all text-text-primary-light dark:text-white font-medium placeholder:text-text-secondary-light/50"
                />
                <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            <div className="pt-4">
                <Button 
                    fullWidth 
                    size="lg" 
                    type="submit" 
                    disabled={loading !== null || !email || !password}
                    className={(loading !== null || !email || !password) ? 'opacity-50' : 'shadow-lg shadow-primary/20'}
                >
                    {loading === 'email' ? 'Creating Account...' : 'Create Account'}
                </Button>
            </div>
        </form>

        <div className="py-6 text-center">
            <p className="text-text-secondary-light dark:text-text-secondary-dark font-medium">
                Already have an account? <Link to="/login" className="text-primary-dark dark:text-primary font-bold hover:underline">Log In</Link>
            </p>
        </div>
      </main>
    </div>
  );
};
