
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { GoogleButton } from '../components/GoogleButton';
import { Button } from '../components/Button';
import { updateUser } from '../utils/storage';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<'google' | 'email' | null>(null);

  const handleGoogleLogin = () => {
    setLoading('google');
    setTimeout(() => {
        // Simulate Google User Data
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

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading('email');
    setTimeout(() => {
        // Simulate Email User Data
        updateUser({
            name: email.split('@')[0], // Use part of email as name
            avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            streak: 12, // Simulate a returning user with data
            level: 3
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

      <main className="flex-1 flex flex-col">
        <h1 className="text-3xl font-bold text-text-primary-light dark:text-white mb-2">Welcome back!</h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">Enter your credentials to continue.</p>

        <div className="space-y-4 mb-8">
            <GoogleButton onClick={handleGoogleLogin} isLoading={loading === 'google'} />
        </div>

        <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
            </div>
            <span className="relative bg-background-light dark:bg-background-dark px-4 text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest">
                Or with email
            </span>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4 flex-1">
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

            <div className="flex justify-end">
                <button type="button" className="text-sm font-bold text-primary-dark dark:text-primary hover:underline">
                    Forgot Password?
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
                    {loading === 'email' ? 'Logging in...' : 'Log In'}
                </Button>
            </div>
        </form>

        <div className="py-6 text-center">
            <p className="text-text-secondary-light dark:text-text-secondary-dark font-medium">
                Don't have an account? <Link to="/signup" className="text-primary-dark dark:text-primary font-bold hover:underline">Sign Up</Link>
            </p>
        </div>
      </main>
    </div>
  );
};
