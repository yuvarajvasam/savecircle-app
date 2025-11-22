













import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { CircularProgress } from '../components/CircularProgress';
import { Send, Plus, ArrowRight, TrendingUp, Calendar, Target, ShieldCheck, Users, ArrowDownLeft, ArrowUpRight, Minus, AlertTriangle, Sprout, HeartCrack, Loader2, Check, Pencil, MoreVertical, Trash2, Briefcase, Share } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, YAxis, CartesianGrid } from 'recharts';
import { UPIGateway } from '../components/UPIGateway';
import { Circle, User } from '../types';
import { getCircles, getCircle, updateCircle, getUser, updateUser, withdrawFromCircle, addMessage, deleteCircle } from '../utils/storage';
import { CircleIcon } from '../components/CircleIcon';
import { ShareModal } from '../components/ShareModal';

// --- Custom Components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#202020] border border-white/10 p-3 rounded-xl shadow-xl z-50">
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">{label}</p>
        <p className="text-white font-bold text-sm font-display">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// --- Edit Goal Modal ---

interface EditGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    circle: Circle;
    onSave: (id: string, updates: Partial<Circle>) => void;
}

const EditGoalModal: React.FC<EditGoalModalProps> = ({ isOpen, onClose, circle, onSave }) => {
    const [name, setName] = useState(circle.name);
    const [targetAmount, setTargetAmount] = useState(circle.targetAmount?.toString() || '');
    const [targetDate, setTargetDate] = useState(circle.targetDate || '');

    useEffect(() => {
        if (isOpen) {
            setName(circle.name);
            setTargetAmount(circle.targetAmount?.toString() || '');
            setTargetDate(circle.targetDate || '');
        }
    }, [isOpen, circle]);

    const handleSave = () => {
        onSave(circle.id, {
            name,
            targetAmount: targetAmount ? parseInt(targetAmount) : undefined,
            targetDate
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end sm:justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
             <div className="bg-white dark:bg-[#1c1c1e] w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden shadow-2xl relative">
                <div className="p-6 pt-8">
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Goal</h2>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500">
                             <span className="material-symbols-outlined">close</span>
                        </button>
                     </div>

                     <div className="space-y-4">
                        <div>
                             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Goal Name</label>
                             <input 
                                type="text" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full bg-gray-100 dark:bg-white/5 rounded-xl border-none p-4 font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                             />
                        </div>
                        
                        <div>
                             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Target Amount</label>
                             <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                                <input 
                                    type="number" 
                                    value={targetAmount}
                                    onChange={e => setTargetAmount(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-white/5 rounded-xl border-none p-4 pl-8 font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                                />
                             </div>
                        </div>

                        <div>
                             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Target Date</label>
                             <input 
                                type="date" 
                                value={targetDate}
                                onChange={e => setTargetDate(e.target.value)}
                                className="w-full bg-gray-100 dark:bg-white/5 rounded-xl border-none p-4 font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                             />
                        </div>
                     </div>

                     <div className="mt-8">
                        <Button fullWidth onClick={handleSave}>Save Changes</Button>
                     </div>
                </div>
             </div>
        </div>
    );
};

// --- Withdraw Modal ---

interface WithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (amount: number, remaining: number) => void;
    circle: Circle;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, onSuccess, circle }) => {
    const [step, setStep] = useState<'input' | 'emotional_check' | 'processing' | 'success'>('input');
    const [amount, setAmount] = useState<string>('');
    const [showReinvestOption, setShowReinvestOption] = useState(false);

    // Reset on open
    useEffect(() => {
        if(isOpen) {
            setStep('input');
            setAmount('');
            setShowReinvestOption(false);
        }
    }, [isOpen]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // Strictly numeric, no negatives
        if (val === '' || /^[0-9]+$/.test(val)) {
            setAmount(val);
        }
    };

    const calculateLogic = () => {
        const numAmount = parseInt(amount) || 0;
        if (numAmount <= 0) return;
        
        // Validation check
        if (numAmount > circle.poolTotal) return;

        const isFullWithdrawal = numAmount >= circle.poolTotal;
        const targetDate = circle.targetDate ? new Date(circle.targetDate) : null;
        const isEarly = targetDate ? new Date() < targetDate : false;
        const isTargetMet = circle.targetAmount ? circle.poolTotal >= circle.targetAmount : true;
        
        // Emotional Check Trigger:
        // 1. If user is withdrawing EVERYTHING before target date
        // 2. If user is withdrawing EVERYTHING before target amount is met
        if (isFullWithdrawal && (isEarly || !isTargetMet) && circle.poolTotal > 0) {
            setStep('emotional_check');
            setShowReinvestOption(true);
        } else {
            processWithdrawal(numAmount);
        }
    };

    const processWithdrawal = (finalAmount: number) => {
        setStep('processing');
        setTimeout(() => {
            setStep('success');
            setTimeout(() => {
                onSuccess(finalAmount, circle.poolTotal - finalAmount);
            }, 2000);
        }, 1500);
    };

    const handleReinvest = () => {
        // "Leave a crumb": Leave 10% or minimum 100rs behind
        const numAmount = parseInt(amount);
        const keepAmount = Math.max(100, Math.round(circle.poolTotal * 0.1)); 
        const newWithdrawAmount = circle.poolTotal - keepAmount;
        
        if (newWithdrawAmount > 0) {
            processWithdrawal(newWithdrawAmount);
        } else {
            // If balance is too low to split, just close or withdraw all
            processWithdrawal(numAmount);
        }
    };

    const numAmount = parseInt(amount) || 0;
    const exceedsBalance = numAmount > circle.poolTotal;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end sm:justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-[#1c1c1e] w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden shadow-2xl relative">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 z-10 text-gray-500">
                    <span className="material-symbols-outlined">close</span>
                </button>

                {/* STEP 1: INPUT */}
                {step === 'input' && (
                    <div className="p-6 pt-8 animate-slide-up">
                        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">Withdraw Funds</h2>
                        <p className="text-center text-gray-500 text-sm mb-8">Available Balance: <span className="font-bold text-gray-900 dark:text-white">₹{circle.poolTotal.toLocaleString()}</span></p>

                        <div className="relative mb-6">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">₹</span>
                            <input 
                                type="text" 
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="0"
                                className={`w-full bg-gray-100 dark:bg-black/20 rounded-2xl py-6 pl-10 pr-4 text-4xl font-bold text-center text-gray-900 dark:text-white focus:ring-2 border-transparent outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-white/10 ${exceedsBalance ? 'focus:ring-red-500 ring-2 ring-red-500/50' : 'focus:ring-red-500/50'}`}
                                autoFocus
                            />
                            {exceedsBalance && (
                                <p className="absolute -bottom-6 left-0 w-full text-center text-xs text-red-500 font-bold">
                                    Exceeds available balance
                                </p>
                            )}
                        </div>

                        <div className="flex gap-2 mb-8 mt-8">
                            <button onClick={() => setAmount(Math.floor(circle.poolTotal * 0.25).toString())} className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">25%</button>
                            <button onClick={() => setAmount(Math.floor(circle.poolTotal * 0.5).toString())} className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">50%</button>
                            <button onClick={() => setAmount(circle.poolTotal.toString())} className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">All</button>
                        </div>

                        <Button 
                            fullWidth 
                            size="lg" 
                            className={`bg-red-500 border-red-700 text-white ${exceedsBalance ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-400'}`}
                            onClick={calculateLogic}
                            disabled={!amount || parseInt(amount) === 0 || exceedsBalance}
                        >
                            Withdraw
                        </Button>
                    </div>
                )}

                {/* STEP 2: EMOTIONAL CHECK */}
                {step === 'emotional_check' && (
                    <div className="p-6 pt-8 animate-slide-up flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 mb-6 animate-pulse">
                            <AlertTriangle size={40} strokeWidth={2} />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Wait, are you sure?</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-base mb-6 leading-relaxed">
                            You are withdrawing early! Draining this goal completely will break your streak and reset your consistency score for <span className="font-bold text-gray-900 dark:text-white">{circle.name}</span>.
                        </p>

                        <div className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-2xl mb-6 border border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                <Sprout size={20} className="text-green-500" />
                                <span className="font-bold text-sm text-gray-900 dark:text-white">Keep the dream alive</span>
                            </div>
                            <p className="text-left text-xs text-gray-500">
                                Leave just <span className="font-bold text-gray-900 dark:text-white">₹{Math.max(100, Math.round(circle.poolTotal * 0.1))}</span> behind to keep your goal active and reinvest later.
                            </p>
                        </div>

                        <div className="w-full space-y-3">
                            <Button 
                                fullWidth 
                                onClick={handleReinvest}
                                className="bg-green-600 border-green-800 text-white hover:bg-green-500"
                            >
                                Leave a small amount & Withdraw rest
                            </Button>
                            <button 
                                onClick={() => processWithdrawal(parseInt(amount))}
                                className="w-full py-4 text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <HeartCrack size={16} />
                                    I need to withdraw everything
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: PROCESSING */}
                {step === 'processing' && (
                   <div className="flex flex-col items-center justify-center h-[400px]">
                      <Loader2 size={48} className="text-primary animate-spin mb-4" />
                      <p className="font-bold text-lg text-gray-900 dark:text-white">Processing Transfer...</p>
                      <p className="text-sm text-gray-500">Contacting bank</p>
                   </div>
                )}

                {/* STEP 4: SUCCESS */}
                {step === 'success' && (
                    <div className="flex flex-col items-center justify-center h-[400px] p-8 text-center animate-fade-in">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-green-500/30">
                            <Check size={40} strokeWidth={4} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Withdrawal Initiated</h2>
                        <p className="text-gray-500 mb-8">Funds will reflect in your bank account within 15 minutes.</p>
                        <Button fullWidth onClick={onClose} variant="secondary">Done</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Delete Confirmation Modal ---

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    circleName: string;
    amount: number;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, circleName, amount }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
             <div className="bg-white dark:bg-[#1c1c1e] w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl p-6 text-center animate-slide-up">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-500 mb-4 mx-auto">
                    <Trash2 size={32} strokeWidth={2} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete "{circleName}"?</h2>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    Are you sure you want to delete this goal? <br/>
                    The remaining balance of <span className="font-bold text-gray-900 dark:text-white">₹{amount.toLocaleString()}</span> will be transferred to your Vault.
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
                        Delete
                    </button>
                </div>
             </div>
        </div>
    );
}

// --- Main Component ---

export const Circles: React.FC = () => {
  const navigate = useNavigate();
  const { circleId } = useParams();
  const [circlesData, setCirclesData] = useState<Circle[]>(getCircles());
  const [user, setUser] = useState<User>(getUser());
  
  useEffect(() => {
      // Sync on mount
      setCirclesData(getCircles());
      setUser(getUser());
  }, [circleId]);

  const [showPayment, setShowPayment] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState({ amount: 0, recipientName: '', recipientContext: '' });
  
  // Withdrawal State
  const [showWithdraw, setShowWithdraw] = useState(false);

  const handleUpdateCircle = (id: string, updates: Partial<Circle>) => {
      const updatedList = updateCircle(id, updates);
      setCirclesData(updatedList);
  };

  const handleSendMessage = (text: string) => {
      if (selectedCircle) {
        const updatedCircle = addMessage(selectedCircle.id, text);
        if (updatedCircle) {
            if (updatedCircle.id === 'vault') {
                 // Force re-fetch for vault special case since it might not be in the main list immediately
                 // But actually addMessage handles persistence in 'savecircle_circles'
            }
            setCirclesData(getCircles());
        }
      }
  };

  // Get Selected Circle
  // If ID is 'vault', we construct it dynamically from user state
  const selectedCircle = circleId 
    ? (circleId === 'vault' ? getCircle('vault') : circlesData.find(c => c.id === circleId))
    : null;

  const handleBack = () => {
    navigate('/circles');
  };

  const handlePaymentSuccess = (amount: number) => {
    if (circleId === 'vault') {
        // Update User Global Balance
        const updatedUser = updateUser({ 
            totalSaved: user.totalSaved + amount,
            savedToday: user.savedToday + amount,
            savedThisMonth: user.savedThisMonth + amount
        });
        setUser(updatedUser);
        // No need to update circlesData for vault as it is derived from user
    } else if (circleId) {
        // Get latest state to ensure we update correctly
        const currentCircles = getCircles();
        const currentCircle = currentCircles.find(c => c.id === circleId);

        if (currentCircle) {
             // Mark 'u1' (Current User) as paid
             const updatedMembers = currentCircle.members.map(m => {
                 if (m.id === 'u1') return { ...m, hasPaid: true };
                 return m;
             });

             // Update Specific Circle Pool & Member Status
             const updated = updateCircle(circleId, { 
                 poolTotal: currentCircle.poolTotal + amount,
                 members: updatedMembers
             });
             setCirclesData(updated);
        }
    }
  };

  const handleWithdrawSuccess = (amount: number, remaining: number) => {
      if (circleId) {
        withdrawFromCircle(circleId, amount);
        // Refresh local state
        if(circleId === 'vault') {
            setUser(getUser());
        } else {
            setCirclesData(getCircles());
        }
        setShowWithdraw(false);
      }
  };

  const triggerPayment = (amount: number, name: string, context: string) => {
      setPaymentConfig({ amount, recipientName: name, recipientContext: context });
      setShowPayment(true);
  };

  const getThemeGradient = (theme: string | undefined) => {
      switch(theme) {
          case 'obsidian': return 'bg-gradient-to-br from-[#2c3e50] to-[#000000]';
          case 'lime': return 'bg-gradient-to-br from-lime-400 to-emerald-600';
          case 'sky': return 'bg-gradient-to-br from-sky-400 to-blue-600';
          case 'purple': return 'bg-gradient-to-br from-purple-500 to-indigo-600';
          case 'sunset': return 'bg-gradient-to-br from-orange-400 to-pink-600';
          default: return 'bg-gradient-to-br from-[#202020] to-[#000000]';
      }
  };

  const getThemeColor = (theme: string | undefined) => {
      switch(theme) {
          case 'lime': return 'text-lime-900';
          default: return 'text-white';
      }
  };

  // LIST VIEW RENDER
  if (!circleId || !selectedCircle) {
      // We construct a view that includes the dynamic Vault state
      const vaultCircle = getCircle('vault');
      const myCircles = circlesData.filter(c => c.isUserMember && c.id !== 'vault');
      const goalCircles = myCircles.filter(c => c.membersCount === 1);
      const socialCircles = myCircles.filter(c => c.membersCount > 1);

      return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex-1 font-display flex flex-col h-full transition-colors duration-300">
            <header className="sticky top-0 z-30 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/')} className="h-10 w-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold text-text-primary-light dark:text-white">My Circles</h1>
                </div>
                <Link to="/create-circle" className="h-10 w-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">add_circle</span>
                </Link>
            </header>

            <main className="flex-1 overflow-y-auto p-4 pb-24 space-y-8">
                
                {/* Personal Section */}
                <section>
                    {/* Vault - The Primary Account */}
                    {vaultCircle && (
                        <div className="mb-6">
                            <div className="flex items-center justify-between px-1 mb-3">
                                <h2 className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Primary Balance</h2>
                            </div>
                            <button 
                                onClick={() => navigate(`/circles/vault`)}
                                className={`w-full bg-[#1a1a1a] dark:bg-[#000000] p-6 rounded-[2rem] shadow-xl relative overflow-hidden text-left group active:scale-[0.98] transition-all duration-300 border border-gray-800 dark:border-white/10`}
                            >
                                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[50px] -mr-10 -mt-10"></div>
                                
                                <div className="relative z-10 flex flex-col gap-6">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
                                            <span className="material-symbols-outlined text-primary text-sm">lock</span>
                                            <span className="text-[10px] font-bold text-white/80 uppercase tracking-wide">My Vault</span>
                                        </div>
                                        <span className="text-white/40 text-xs font-mono">**** 8821</span>
                                    </div>

                                    <div>
                                        <p className="text-white/60 text-xs font-medium mb-1 uppercase tracking-wider">Total Net Worth</p>
                                        <h3 className="text-4xl font-display font-bold text-white tracking-tight">
                                            ₹{((vaultCircle.poolTotal || 0) + (vaultCircle.investedAmount || 0)).toLocaleString()}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm font-medium text-white/60">
                                        {vaultCircle.investedAmount && vaultCircle.investedAmount > 0 ? (
                                            <div className="flex items-center gap-1">
                                                <Briefcase size={16} className="text-primary" />
                                                <span className="text-white">₹{vaultCircle.investedAmount.toLocaleString()} Invested</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-lg text-primary">trending_up</span>
                                                <span className="text-white">Start Investing</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        </div>
                    )}

                    {/* Goals - Specific Targets */}
                    {goalCircles.length > 0 && (
                        <div>
                             <div className="flex items-center justify-between px-1 mb-3">
                                <h2 className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Solo Goals</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {goalCircles.map(circle => {
                                    // Calculate progress
                                    const totalVal = (circle.poolTotal || 0) + (circle.investedAmount || 0);
                                    const progress = circle.targetAmount ? Math.min(100, Math.round((totalVal / circle.targetAmount) * 100)) : 0;
                                    
                                    return (
                                        <button 
                                            key={circle.id}
                                            onClick={() => navigate(`/circles/${circle.id}`)}
                                            className={`w-full ${getThemeGradient(circle.theme)} p-5 rounded-[2rem] shadow-lg relative overflow-hidden text-left group active:scale-[0.98] transition-all duration-300 border border-white/10 min-h-[140px] flex flex-col justify-between`}
                                        >
                                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-[40px] -ml-8 -mb-8"></div>
                                            
                                            <div className="relative z-10 flex justify-between items-start">
                                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md text-white shadow-inner border border-white/10">
                                                    <CircleIcon icon={circle.icon} type={circle.iconType} color={circle.iconColor} className="w-5 h-5" fallback={circle.name[0]} />
                                                </div>
                                                <div className="bg-black/20 px-2 py-1 rounded-lg backdrop-blur-md">
                                                    <p className="text-[10px] font-bold text-white">Goal</p>
                                                </div>
                                            </div>

                                            <div className="relative z-10">
                                                <h3 className={`text-xl font-bold mb-1 ${getThemeColor(circle.theme)}`}>{circle.name}</h3>
                                                
                                                <div className="flex items-end justify-between">
                                                     <p className="text-sm text-white/90 font-medium">₹{totalVal.toLocaleString()}</p>
                                                     <div className="flex flex-col items-end">
                                                        <div className="w-24 bg-black/20 h-1.5 rounded-full overflow-hidden mb-1">
                                                            <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }}></div>
                                                        </div>
                                                        <span className="text-[10px] font-bold text-white/70">{progress}%</span>
                                                     </div>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </section>

                {/* Social Circles Section */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1 mt-4">
                        <h2 className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Circles</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Link to="/create-circle" className="p-4 rounded-[1.5rem] bg-primary text-background-dark flex flex-col items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20">
                            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                                <Plus size={18} strokeWidth={3} />
                            </div>
                            <span className="font-bold text-sm">Create Circle</span>
                        </Link>
                        <Link to="/join-circle" className="p-4 rounded-[1.5rem] bg-card-light dark:bg-card-dark border border-border-light dark:border-white/5 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-95">
                             <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-text-primary-light dark:text-white">
                                <Users size={18} strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-sm text-text-primary-light dark:text-white">Join with Code</span>
                        </Link>
                    </div>

                    {socialCircles.map((circle) => (
                        <button 
                            key={circle.id} 
                            onClick={() => navigate(`/circles/${circle.id}`)}
                            className="w-full bg-card-light dark:bg-card-dark p-5 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none text-left hover:border-primary/50 dark:hover:border-primary/50 transition-all group active:scale-[0.98]"
                        >
                             <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md ${getThemeGradient(circle.theme)}`}>
                                        <CircleIcon icon={circle.icon} type={circle.iconType} color={circle.iconColor} className="w-6 h-6" fallback={circle.name[0]} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-none text-text-primary-light dark:text-white group-hover:text-primary transition-colors">{circle.name}</h3>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium mt-1">
                                            {circle.membersCount} Members • {circle.streak} Day Streak
                                        </p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark group-hover:translate-x-1 transition-transform">chevron_right</span>
                            </div>

                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-bold uppercase tracking-wider mb-1">Total Pool</p>
                                    <p className="text-2xl font-display font-bold text-text-primary-light dark:text-white">₹{circle.poolTotal.toLocaleString()}</p>
                                </div>
                                
                                <div className="flex items-center -space-x-2">
                                    {circle.members.slice(0, 3).map(m => (
                                        <div key={m.id} className="w-8 h-8 rounded-full border-2 border-card-light dark:border-card-dark overflow-hidden bg-gray-200">
                                            <img src={m.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="w-full h-full object-cover" alt={m.name} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </button>
                    ))}
                </section>
            </main>
        </div>
      );
  }

  // DETAIL VIEW RENDER
  return (
      <>
        <CircleDetailView 
            circle={selectedCircle} 
            onBack={handleBack} 
            onTriggerPayment={triggerPayment}
            onTriggerWithdraw={() => setShowWithdraw(true)}
            user={user}
            onUpdateCircle={handleUpdateCircle}
            onSendMessage={handleSendMessage}
            onEdit={() => {/* handled inside view via state */}}
        />
        <UPIGateway 
            isOpen={showPayment}
            onClose={() => setShowPayment(false)}
            onSuccess={handlePaymentSuccess}
            amount={paymentConfig.amount}
            recipientName={paymentConfig.recipientName}
            recipientContext={paymentConfig.recipientContext}
        />
        <WithdrawModal 
            isOpen={showWithdraw}
            onClose={() => setShowWithdraw(false)}
            onSuccess={handleWithdrawSuccess}
            circle={selectedCircle}
        />
      </>
  );
};

// --- OVERVIEW COMPONENTS ---

const SoloOverview: React.FC<{ 
    circle: Circle, 
    themeGradient: string, 
    onTriggerPayment: (amount: number, name: string, ctx: string) => void, 
    onTriggerWithdraw: () => void,
    user: User 
}> = ({ circle, themeGradient, onTriggerPayment, onTriggerWithdraw, user }) => {
    const navigate = useNavigate();
    const isVault = circle.id === 'vault';
    
    // For vault, calculate progress based on Daily Goal
    // For other solo goals, use target amount
    const target = isVault ? user.dailyGoal * 365 : (circle.targetAmount || 10000); 
    const currentTotal = (circle.poolTotal || 0) + (circle.investedAmount || 0);
    const progress = Math.min(100, Math.round((currentTotal / target) * 100));
    
    // State for deposit amount
    const [depositAmount, setDepositAmount] = useState<string>(isVault ? user.dailyGoal.toString() : '500');

    const transactions = [
        { id: 1, title: 'Daily Save', amount: 100, date: 'Today', type: 'credit' },
        { id: 2, title: 'Deposit', amount: 500, date: 'Oct 24', type: 'credit' },
        { id: 3, title: 'Withdrawal', amount: -200, date: 'Oct 20', type: 'debit' },
    ];

    const handleQuickAdd = (amount: number) => {
        setDepositAmount(amount.toString());
    };

    const handlePay = () => {
        const amount = parseInt(depositAmount);
        if (amount > 0) {
            onTriggerPayment(amount, circle.name, isVault ? 'My Vault' : circle.name);
        }
    };

    return (
        <div className="space-y-6">
            {/* Circular Progress Hero (Vault Style) */}
             <div className="flex flex-col items-center justify-center py-4 relative">
                <div className="relative w-64 h-64 flex items-center justify-center mb-4">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" className="stroke-gray-200 dark:stroke-[#333] transition-colors duration-300" strokeWidth="6" />
                        <circle 
                            cx="50" cy="50" r="45" 
                            fill="none" 
                            stroke="#c9f158" 
                            strokeWidth="6" 
                            strokeDasharray="283" 
                            strokeDashoffset={283 - (283 * (progress / 100))} 
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    
                    <div className="flex flex-col items-center text-center z-10">
                        <div className={`w-12 h-12 rounded-full border border-border-light dark:border-white/10 flex items-center justify-center mb-2 shadow-sm ${isVault ? 'bg-card-light dark:bg-white/5' : 'bg-white/5'}`}>
                            <CircleIcon icon={circle.icon} type={circle.iconType} color={isVault ? circle.iconColor : 'text-white'} className="w-6 h-6" fallback={circle.name[0]} />
                        </div>
                        <h2 className="text-4xl font-bold text-text-primary-light dark:text-white mb-1">₹{currentTotal.toLocaleString()}</h2>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase tracking-wider">{isVault ? 'Total Net Worth' : 'Current Value'}</p>
                    </div>
                    
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-primary/5 dark:bg-primary/5 rounded-full blur-3xl -z-10"></div>
                </div>

                {/* Goal Context */}
                <div className="flex items-center gap-2 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    <span>Target: ₹{target.toLocaleString()}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span className="text-primary-dark dark:text-primary font-bold">{progress}%</span>
                </div>

                {/* Breakdown: Liquid vs Invested */}
                <div className="flex gap-3 w-full">
                    <div className="flex-1 bg-card-light dark:bg-card-dark border border-border-light dark:border-white/5 rounded-2xl p-3 text-center">
                        <p className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Liquid Cash</p>
                        <p className="text-lg font-bold text-text-primary-light dark:text-white">₹{(circle.poolTotal || 0).toLocaleString()}</p>
                        <button 
                            onClick={onTriggerWithdraw}
                            disabled={circle.poolTotal === 0}
                            className="mt-2 text-[10px] font-bold text-red-500 hover:underline disabled:opacity-50"
                        >
                            Withdraw
                        </button>
                    </div>
                    <div className="flex-1 bg-card-light dark:bg-card-dark border border-border-light dark:border-white/5 rounded-2xl p-3 text-center relative overflow-hidden">
                        <p className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase">Invested</p>
                        <p className="text-lg font-bold text-text-primary-light dark:text-white">₹{(circle.investedAmount || 0).toLocaleString()}</p>
                        <Link 
                            to={`/invest/${circle.id}`}
                            className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-primary-dark dark:text-primary hover:underline"
                        >
                            {circle.investedAmount && circle.investedAmount > 0 ? 'Manage' : 'Start'} <ArrowUpRight size={10} />
                        </Link>
                    </div>
                </div>
             </div>

             {/* Deposit Actions */}
             <div className="bg-card-light dark:bg-card-dark p-5 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Add Funds</h3>
                    <div className="flex gap-2">
                        {[100, 500, 1000].map(amt => (
                            <button 
                                key={amt}
                                onClick={() => handleQuickAdd(amt)}
                                className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary hover:text-black transition-colors"
                            >
                                +₹{amt}
                            </button>
                        ))}
                    </div>
                 </div>

                 <div className="flex gap-3">
                     <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark font-bold">₹</span>
                        <input 
                            type="number"
                            min="1"
                            value={depositAmount}
                            onChange={(e) => {
                                const val = e.target.value;
                                // Allow empty or strictly positive numbers
                                if (val === '' || (parseInt(val) >= 0 && !val.includes('-'))) {
                                    setDepositAmount(val);
                                }
                            }}
                            onKeyDown={(e) => {
                                // Block invalid chars for positive integer input
                                if (['-', 'e', '+'].includes(e.key)) e.preventDefault();
                            }}
                            className="w-full h-12 bg-gray-100 dark:bg-white/5 rounded-xl border-none pl-8 pr-4 font-bold text-text-primary-light dark:text-white focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="Amount"
                        />
                     </div>
                     <Button 
                         onClick={handlePay}
                         className="shadow-lg shadow-primary/20 px-6"
                         disabled={!depositAmount || parseInt(depositAmount) <= 0}
                     >
                         <Plus size={20} strokeWidth={3} />
                     </Button>
                 </div>
             </div>

             <Link to="/history" className="bg-card-light dark:bg-card-dark text-text-primary-light dark:text-white border border-border-light dark:border-white/10 h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-95">
                 <span className="material-symbols-outlined">history</span>
                 View History
             </Link>

            {/* Recent Activity */}
            <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none overflow-hidden">
                <div className="p-4 border-b border-border-light dark:border-white/5 flex justify-between items-center">
                    <h3 className="font-bold text-text-primary-light dark:text-white">Recent Transactions</h3>
                </div>
                <div>
                    {transactions.map((t) => (
                        <div key={t.id} className="flex items-center justify-between p-4 border-b border-border-light dark:border-white/5 last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                             <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'credit' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-500'}`}>
                                    {t.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                </div>
                                <div>
                                    <p className="font-bold text-text-primary-light dark:text-white text-sm">{t.title}</p>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{t.date}</p>
                                </div>
                            </div>
                            <span className={`font-bold text-sm ${t.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-text-primary-light dark:text-white'}`}>
                                {t.type === 'credit' ? '+' : '-'}₹{Math.abs(t.amount)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CircleOverview: React.FC<{ 
    circle: Circle, 
    themeGradient: string, 
    onTriggerPayment: (amount: number, name: string, ctx: string) => void,
    onTriggerWithdraw: () => void 
}> = ({ circle, themeGradient, onTriggerPayment, onTriggerWithdraw }) => {
    // Mock Social Data
    const contributionData = [
        { name: 'Week 1', value: 2500 },
        { name: 'Week 2', value: 2500 },
        { name: 'Week 3', value: 2000 },
        { name: 'Week 4', value: 3000 },
    ];

    const currentUserMember = circle.members.find(m => m.id === 'u1');

    return (
        <div className="space-y-6">
            {/* Hero Stats Card */}
            <div className={`w-full rounded-[2.5rem] p-6 text-white shadow-2xl relative overflow-hidden ${themeGradient}`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[60px] -mr-16 -mt-16 pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                         <div>
                             <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Total Pool</p>
                             <h2 className="text-4xl font-display font-bold">₹{circle.poolTotal.toLocaleString()}</h2>
                         </div>
                         <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                             <span className="text-xs font-bold">Round 3/12</span>
                         </div>
                    </div>

                    <div className="bg-black/20 rounded-xl p-4 border border-white/5 backdrop-blur-md flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-yellow-400">emoji_events</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-white/60 font-bold uppercase">Next Payout</p>
                                <p className="font-bold text-sm">Riya Singh</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold">₹15k</p>
                            <p className="text-[10px] text-white/60 font-bold">Nov 1st</p>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            className="flex-1 text-xs bg-white text-black hover:bg-gray-100 border-none h-10"
                            onClick={() => onTriggerPayment(circle.contribution || 2500, "Pool Contribution", circle.name)}
                            disabled={currentUserMember?.hasPaid}
                        >
                            {currentUserMember?.hasPaid ? "Paid" : "Pay Share"}
                        </Button>
                        <button 
                            onClick={onTriggerWithdraw}
                            className="px-4 h-10 rounded-2xl bg-black/20 text-white text-xs font-bold hover:bg-black/40 transition-colors border border-white/10"
                        >
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>

            {/* Investment Section for Circles */}
            <div className="bg-card-light dark:bg-card-dark p-5 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
                 <div className="flex items-center justify-between mb-4">
                     <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Investment</h3>
                 </div>
                 <div className="flex items-center gap-4">
                     <div className="flex-1">
                         <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1">Current Plan</p>
                         <p className="font-bold text-text-primary-light dark:text-white">
                            {circle.investmentPlanId ? 'Active Portfolio' : 'No Active Plan'}
                         </p>
                     </div>
                     <div className="text-right flex-1">
                         <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1">Invested</p>
                         <p className="font-bold text-text-primary-light dark:text-white">₹{(circle.investedAmount || 0).toLocaleString()}</p>
                     </div>
                 </div>
                 <Link to={`/invest/${circle.id}`} className="mt-4 w-full py-3 rounded-xl bg-gray-100 dark:bg-white/5 font-bold text-sm text-text-primary-light dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center gap-2 transition-colors">
                     <Briefcase size={18} />
                     Manage Investments
                 </Link>
            </div>

            {/* Member Contribution Status */}
            <div className="bg-card-light dark:bg-card-dark p-5 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Contributions</h3>
                    <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark">This Cycle</span>
                </div>
                <div className="space-y-3">
                    {circle.members.map((member, idx) => {
                        const isPaid = member.hasPaid;
                        return (
                            <div key={member.id} className="flex items-center gap-3">
                                <div className="relative">
                                    <img src={member.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="w-10 h-10 rounded-full object-cover bg-gray-200 dark:bg-white/5" />
                                    {isPaid && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-card-light dark:border-card-dark rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-[10px] text-white font-bold">check</span></div>}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm text-text-primary-light dark:text-white">{member.name}</p>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{isPaid ? 'Paid on time' : 'Pending payment'}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${isPaid ? 'bg-green-500/10 text-green-600' : 'bg-gray-100 dark:bg-white/5 text-text-secondary-light'}`}>
                                    {isPaid ? `₹${circle.contribution || 500}` : 'Due'}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-card-light dark:bg-card-dark p-6 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Pool Activity</h3>
                </div>
                <div className="h-48 w-full -ml-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={contributionData} barSize={32}>
                             <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fontSize: 10, fill: '#888'}} 
                                dy={10}
                             />
                             <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                             <Bar dataKey="value" radius={[8, 8, 8, 8]}>
                                {contributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 3 ? '#c9f158' : '#3f3f46'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

// Sub-component for the detail view wrapper
const CircleDetailView: React.FC<{ 
    circle: Circle, 
    onBack: () => void,
    onTriggerPayment: (amount: number, name: string, ctx: string) => void,
    onTriggerWithdraw: () => void,
    user: User,
    onUpdateCircle: (id: string, updates: Partial<Circle>) => void,
    onSendMessage: (text: string) => void,
    onEdit: () => void
}> = ({ circle, onBack, onTriggerPayment, onTriggerWithdraw, user, onUpdateCircle, onSendMessage, onEdit }) => {
  const isSolo = circle.membersCount === 1;
  const isVault = circle.id === 'vault';
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'chat' | 'journal'>('overview');
  const [msgText, setMsgText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // Close menu when clicking outside (simple implementation via conditional render masking)
  useEffect(() => {
    if(showMenu) {
        const timer = setTimeout(() => setShowMenu(false), 3000); // Auto close after 3s if not interacting
        return () => clearTimeout(timer);
    }
  }, [showMenu]);

  const getThemeGradient = (theme: string | undefined) => {
      switch(theme) {
          case 'obsidian': return 'bg-gradient-to-br from-[#2c3e50] to-[#000000]';
          case 'lime': return 'bg-gradient-to-br from-lime-400 to-emerald-600';
          case 'sky': return 'bg-gradient-to-br from-sky-400 to-blue-600';
          case 'purple': return 'bg-gradient-to-br from-purple-500 to-indigo-600';
          case 'sunset': return 'bg-gradient-to-br from-orange-400 to-pink-600';
          default: return 'bg-gradient-to-br from-[#202020] to-[#000000]';
      }
  };

  const messages = circle.messages || [];

  const tabs = isSolo ? ['Overview', 'Journal'] : ['Overview', 'Members', 'Chat'];

  const handleCopyCode = () => {
      if(circle.inviteCode) {
          navigator.clipboard.writeText(circle.inviteCode);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
      }
  };

  const handleSend = () => {
      if (msgText.trim()) {
          onSendMessage(msgText);
          setMsgText('');
      }
  };

  const handleDelete = () => {
      deleteCircle(circle.id);
      setShowDeleteModal(false);
      onBack();
  };

  const toggleMenu = () => setShowMenu(!showMenu);
  const openEdit = () => {
      setShowMenu(false);
      setShowEditModal(true);
  };
  
  const openDelete = () => {
      setShowMenu(false);
      setShowDeleteModal(true);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex-1 font-display flex flex-col h-full transition-colors duration-300 relative">
      <ShareModal 
         isOpen={showShare}
         onClose={() => setShowShare(false)}
         title={isSolo ? "Share Goal" : "Invite to Circle"}
         text={isSolo 
            ? `I'm saving for ${circle.name} on SaveCircle! 🎯` 
            : `Join my circle "${circle.name}" on SaveCircle! Use code: ${circle.inviteCode}`
         }
      />
      
      <EditGoalModal 
         isOpen={showEditModal}
         onClose={() => setShowEditModal(false)}
         circle={circle}
         onSave={onUpdateCircle}
      />

      <DeleteConfirmationModal 
         isOpen={showDeleteModal}
         onClose={() => setShowDeleteModal(false)}
         onConfirm={handleDelete}
         circleName={circle.name}
         amount={circle.poolTotal}
      />
      
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5">
         <div className="flex items-center gap-3">
            <button onClick={onBack} className="h-10 w-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm ${getThemeGradient(circle.theme)}`}>
                    <CircleIcon icon={circle.icon} type={circle.iconType} color={circle.iconColor} className="w-5 h-5" fallback={circle.name[0]} />
                </div>
                <div>
                    <h1 className="text-base font-bold leading-none text-text-primary-light dark:text-white">{circle.name}</h1>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">
                        {isSolo ? (circle.id === 'vault' ? 'Primary Balance' : 'Savings Goal') : `${circle.membersCount} Members • Active`}
                    </p>
                </div>
            </div>
         </div>
         <div className="relative">
            <button onClick={toggleMenu} className="h-10 w-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
            </button>
            
            {showMenu && !isVault && (
                <div className="absolute top-12 right-0 bg-white dark:bg-[#2c2c2e] rounded-xl shadow-xl border border-gray-100 dark:border-white/10 py-1 w-40 z-50 animate-fade-in origin-top-right">
                    <button 
                        onClick={() => {
                            setShowShare(true);
                            setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 flex items-center gap-2"
                    >
                        <Share size={16} /> Share {isSolo ? 'Goal' : 'Invite'}
                    </button>
                    
                    <button 
                        onClick={openEdit}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 flex items-center gap-2"
                    >
                        <Pencil size={16} /> Edit Goal
                    </button>
                    
                    <button 
                        onClick={openDelete}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2"
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
            )}
         </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-[64px] z-20 bg-background-light dark:bg-background-dark border-b border-border-light dark:border-white/5 px-4">
        <div className="flex gap-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase() as any)}
                    className={`py-3 text-sm font-bold border-b-[3px] transition-all px-1 ${
                        activeTab === tab.toLowerCase() 
                        ? 'border-primary text-text-primary-light dark:text-white' 
                        : 'border-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-black/20">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
            <div className="p-4 pb-24 animate-fade-in">
                {isSolo ? (
                    <SoloOverview 
                        circle={circle} 
                        themeGradient={getThemeGradient(circle.theme)} 
                        onTriggerPayment={onTriggerPayment}
                        onTriggerWithdraw={onTriggerWithdraw}
                        user={user}
                    />
                ) : (
                    <CircleOverview 
                        circle={circle} 
                        themeGradient={getThemeGradient(circle.theme)} 
                        onTriggerPayment={onTriggerPayment}
                        onTriggerWithdraw={onTriggerWithdraw}
                    />
                )}
            </div>
        )}

        {/* MEMBERS TAB */}
        {activeTab === 'members' && !isSolo && (
             <div className="p-4 space-y-4 animate-fade-in pb-24">
                 {/* Invite Code Card */}
                 {circle.inviteCode && (
                     <div className="bg-primary/10 dark:bg-primary/5 p-5 rounded-[1.5rem] border-2 border-dashed border-primary/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary-dark dark:text-primary mb-2">Invite Friends</p>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-4 max-w-[200px]">Share this code to let your friends join this circle instantly.</p>
                        
                        <button 
                            onClick={handleCopyCode}
                            className="flex items-center gap-3 bg-card-light dark:bg-surface-dark px-6 py-3 rounded-xl shadow-sm border border-border-light dark:border-white/10 active:scale-95 transition-all hover:border-primary/50 group"
                        >
                            <span className="font-mono text-2xl font-bold text-text-primary-light dark:text-white tracking-widest group-hover:text-primary transition-colors">{circle.inviteCode}</span>
                            <span className="w-px h-6 bg-gray-200 dark:bg-white/10"></span>
                            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary transition-colors">
                                {copied ? 'check' : 'content_copy'}
                            </span>
                        </button>
                        {copied && <p className="text-[10px] text-green-500 font-bold mt-2 absolute bottom-2">Copied to clipboard!</p>}
                     </div>
                 )}

                 {/* Member List Logic */}
                 <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] overflow-hidden border border-border-light dark:border-white/5">
                     {circle.members.map((m, i) => (
                         <div key={m.id} className="p-4 flex items-center gap-4 border-b border-border-light dark:border-white/5 last:border-0">
                             <span className="font-bold text-text-secondary-light dark:text-text-secondary-dark w-4">{i + 1}</span>
                             <div className="relative">
                                <img src={m.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="w-10 h-10 rounded-full object-cover bg-gray-200 dark:bg-white/5" />
                                {m.id === 'u1' && <div className="absolute -top-1 -right-1 bg-primary text-[8px] font-bold px-1 rounded-sm text-background-dark">ME</div>}
                             </div>
                             <div className="flex-1">
                                 <p className="font-bold text-text-primary-light dark:text-white text-sm">{m.name}</p>
                                 <div className="flex items-center gap-1 mt-1">
                                    <div className="h-1.5 w-16 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{width: `${m.consistency}%`}}></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark">{m.consistency}%</span>
                                 </div>
                             </div>
                             <button className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark">
                                 <span className="material-symbols-outlined text-xl">chat_bubble</span>
                             </button>
                         </div>
                     ))}
                 </div>
             </div>
        )}

        {/* CHAT / JOURNAL TAB */}
        {(activeTab === 'chat' || activeTab === 'journal') && (
            <div className="flex flex-col h-[calc(100vh-120px)] animate-fade-in">
                <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-24">
                    {messages.length === 0 && (
                         <div className="flex flex-col items-center justify-center h-full text-text-secondary-light dark:text-text-secondary-dark">
                             <span className="material-symbols-outlined text-4xl mb-2 opacity-50">forum</span>
                             <p className="text-sm font-medium">No messages yet. Start the conversation!</p>
                         </div>
                    )}
                    
                    {messages.map((msg) => {
                        if (msg.type === 'event') {
                            return (
                                <div key={msg.id} className="flex items-center justify-center gap-2 opacity-60 my-4">
                                    <div className="h-[1px] w-8 bg-gray-400"></div>
                                    <p className="text-[10px] font-bold uppercase text-text-secondary-light dark:text-text-secondary-dark">{msg.text}</p>
                                    <div className="h-[1px] w-8 bg-gray-400"></div>
                                </div>
                            );
                        }

                        // For solo mode, messages are effectively 'notes'
                        const isMe = msg.userId === 'u1';
                        return (
                            <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                                {!isMe && (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 shrink-0 overflow-hidden">
                                        <img src={circle.members.find(m => m.id === msg.userId)?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                                    isMe 
                                    ? 'bg-primary text-background-dark rounded-tr-sm' 
                                    : 'bg-white dark:bg-card-dark border border-border-light dark:border-white/5 text-text-primary-light dark:text-white rounded-tl-sm shadow-sm'
                                }`}>
                                    <p>{msg.text}</p>
                                    <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-black/40' : 'text-gray-400'}`}>{msg.timestamp}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                
                {/* Message Input Area */}
                <div className="p-4 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-white/5 fixed bottom-[70px] left-0 w-full max-w-md mx-auto">
                    <div className="flex gap-2 items-center bg-gray-100 dark:bg-white/5 p-2 rounded-full border border-transparent focus-within:border-primary/50 transition-colors">
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5">
                            <span className="material-symbols-outlined text-xl">{isSolo ? 'edit' : 'add_circle'}</span>
                        </button>
                        <input 
                            type="text" 
                            value={msgText}
                            onChange={(e) => setMsgText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={isSolo ? "Add a note..." : "Message..."}
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-text-primary-light dark:text-white placeholder:text-text-secondary-light"
                        />
                        <button 
                            onClick={handleSend}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${msgText ? 'bg-primary text-background-dark rotate-0' : 'bg-transparent text-text-secondary-light dark:text-text-secondary-dark rotate-0'}`}
                            disabled={!msgText}
                        >
                            <Send size={18} fill={msgText ? "currentColor" : "none"} />
                        </button>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}