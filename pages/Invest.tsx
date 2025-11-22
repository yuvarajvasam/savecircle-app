




import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Circle } from '../types';
import { getCircle, investFunds, withdrawInvestment, updateCircle } from '../utils/storage';
import { INVESTMENT_PLANS } from '../constants';
import { Button } from '../components/Button';
import { ChevronLeft, Shield, TrendingUp, Zap, AlertTriangle, Check, HelpCircle, ArrowUpRight, ArrowDownLeft, Lock } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, ReferenceLine, XAxis, YAxis } from 'recharts';

// Timeframes
const TIME_RANGES = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'Max'];

// Helper to generate realistic stock-like data
const generateGraphData = (currentPrice: number, range: string) => {
  const points = 60; // Number of data points
  const data = [];
  
  // Determine volatility and starting price based on range to simulate return
  let volatility = 0.002; 
  let startPrice = currentPrice;

  const randomPercent = (min: number, max: number) => Math.random() * (max - min) + min;

  switch(range) {
      case '1D': 
        startPrice = currentPrice * (1 - randomPercent(-0.01, 0.015)); // -1% to +1.5%
        volatility = 0.001;
        break;
      case '5D':
        startPrice = currentPrice * (1 - randomPercent(-0.02, 0.03));
        volatility = 0.003;
        break;
      case '1M':
        startPrice = currentPrice * (1 - randomPercent(-0.03, 0.06));
        volatility = 0.005;
        break;
      case '6M':
        startPrice = currentPrice * (1 - randomPercent(-0.05, 0.12));
        volatility = 0.008;
        break;
      case 'YTD':
        startPrice = currentPrice * 0.88; // Fixed hypothetical YTD gain
        volatility = 0.01;
        break;
      case '1Y':
        startPrice = currentPrice * 0.82; // 18% gain
        volatility = 0.012;
        break;
      case '5Y':
        startPrice = currentPrice * 0.60; // 40% gain
        volatility = 0.02;
        break;
      case 'Max':
        startPrice = currentPrice * 0.45; // 55% gain
        volatility = 0.025;
        break;
      default:
        startPrice = currentPrice * 0.99;
  }

  // Generate path from startPrice to currentPrice (Brownian Bridge approximation)
  let val = startPrice;
  const stepSize = (currentPrice - startPrice) / points;
  const now = new Date();
  
  for (let i = 0; i < points; i++) {
    // Add randomness
    const randomBump = (Math.random() - 0.5) * (startPrice * volatility);
    // Add trend component
    val += stepSize + randomBump;
    
    // Labels
    let label = '';
    if (range === '1D') {
        // For 1D, show times like 10:00 AM
        const d = new Date(now.getTime() - (points - i) * 10 * 60000); 
        label = d.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
    } else {
        // For others, show dates
        const daysBack = (points - i) * (range === '5D' ? 0.2 : range === '1M' ? 1 : range === '6M' ? 5 : 20);
        const d = new Date(now.getTime() - daysBack * 86400000);
        label = d.toLocaleDateString([], {month: 'short', day: 'numeric'});
    }

    data.push({ time: label, value: val });
  }
  
  // Force last point to match exact current value
  data[data.length - 1].value = currentPrice;
  
  return { data, startPrice };
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#303030] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl border border-white/10 flex gap-2 items-center whitespace-nowrap z-50">
                <span className="text-gray-400">{label}</span>
                <span className="w-px h-3 bg-white/20"></span>
                <span>₹{payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
        );
    }
    return null;
};

export const Invest: React.FC = () => {
  const navigate = useNavigate();
  const { circleId } = useParams();
  const [circle, setCircle] = useState<Circle | undefined>(undefined);
  
  const [viewMode, setViewMode] = useState<'select' | 'educate' | 'dashboard' | 'withdraw' | 'switch'>('select');
  
  // Form Inputs
  const [amount, setAmount] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan_med');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  
  // Chart State
  const [activeRange, setActiveRange] = useState('1D');
  const [chartData, setChartData] = useState<{time: string, value: number}[]>([]);
  const [startPrice, setStartPrice] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  
  // Derived Chart Stats
  const change = currentValue - startPrice;
  const pctChange = startPrice > 0 ? (change / startPrice) * 100 : 0;
  const isProfit = change >= 0;
  const themeColor = isProfit ? '#10b981' : '#ef4444'; // Green or Red

  useEffect(() => {
      if (circleId) {
          const c = getCircle(circleId);
          setCircle(c);
          
          if (c && c.investedAmount && c.investedAmount > 0) {
              setViewMode('dashboard');
              setSelectedPlanId(c.investmentPlanId || 'plan_med');
              
              // Mock current market value based on plan risk
              const base = c.investedAmount;
              // Add small random variation to simulate live market
              const variation = base * (Math.random() * 0.02 - 0.005); 
              const curr = base + variation;
              
              setCurrentValue(curr);
              refreshChart(curr, activeRange);
          } else {
              setViewMode('select');
          }
      }
  }, [circleId]);

  // Regenerate chart when range changes
  useEffect(() => {
      if (currentValue > 0) {
          refreshChart(currentValue, activeRange);
      }
  }, [activeRange]);

  const refreshChart = (curr: number, range: string) => {
      const { data, startPrice } = generateGraphData(curr, range);
      setChartData(data);
      setStartPrice(startPrice);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val === '' || /^[0-9]+$/.test(val)) {
          setAmount(val);
      }
  };

  const confirmInvestment = () => {
      if (circleId && amount && selectedPlanId) {
          investFunds(circleId, parseInt(amount), selectedPlanId);
          // Refresh
          const updated = getCircle(circleId);
          setCircle(updated);
          const newTotal = updated?.investedAmount || 0;
          setCurrentValue(newTotal);
          refreshChart(newTotal, '1D');
          setActiveRange('1D');
          setViewMode('dashboard');
          setAmount('');
      }
  };

  const handleSwitchPlan = () => {
      if (circleId && selectedPlanId) {
          updateCircle(circleId, {
              investedAmount: Math.floor(currentValue),
              investmentPlanId: selectedPlanId
          });
          // Refresh
          const updated = getCircle(circleId);
          setCircle(updated);
          refreshChart(currentValue, activeRange);
          setViewMode('dashboard');
      }
  };

  const handleWithdraw = () => {
      if (circleId && withdrawAmount && circle) {
          const withdrawVal = parseInt(withdrawAmount);
          const remainingVal = Math.max(0, currentValue - withdrawVal);
          const isFullWithdrawal = remainingVal < 10 || withdrawVal >= Math.floor(currentValue);

          if (isFullWithdrawal) {
              withdrawInvestment(circleId, 0, true);
              
              setCircle(getCircle(circleId));
              setViewMode('select');
              setSelectedPlanId('plan_med');
          } else {
              withdrawInvestment(circleId, withdrawVal, false);
              
              const updated = getCircle(circleId);
              setCircle(updated);
              setCurrentValue(remainingVal);
              refreshChart(remainingVal, activeRange);
              setViewMode('dashboard');
          }
          setWithdrawAmount('');
      }
  };

  if (!circle) return <div className="p-8 text-center">Loading...</div>;

  const currentPlan = INVESTMENT_PLANS.find(p => p.id === (circle.investmentPlanId || selectedPlanId)) || INVESTMENT_PLANS[0];

  const getPlanGradient = (id: string) => {
      switch(id) {
          case 'plan_low': return 'from-emerald-500 to-teal-600';
          case 'plan_med': return 'from-blue-500 to-indigo-600';
          case 'plan_high': return 'from-orange-500 to-red-600';
          default: return 'from-gray-500 to-gray-700';
      }
  };

  const withdrawVal = parseInt(withdrawAmount) || 0;
  const exceedsBalance = withdrawVal > Math.floor(currentValue);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full flex flex-col font-display transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 transition-colors duration-300">
            <div className="flex items-center gap-3">
                <button onClick={() => {
                    if(viewMode === 'educate') setViewMode('select');
                    else if(viewMode === 'withdraw' || viewMode === 'switch') setViewMode('dashboard');
                    else navigate(-1);
                }} className="h-10 w-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-text-primary-light dark:text-white">
                    <ChevronLeft />
                </button>
                <h1 className="font-bold text-lg text-text-primary-light dark:text-white">
                    {viewMode === 'dashboard' ? 'Portfolio' : viewMode === 'withdraw' ? 'Withdraw' : viewMode === 'switch' ? 'Switch Plan' : 'Invest'}
                </h1>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-32 no-scrollbar">
            
            {/* ================= DASHBOARD VIEW ================= */}
            {viewMode === 'dashboard' && (
                <div className="flex flex-col h-full">
                    {/* Graph Container - Dark Mode styled for finance look */}
                    <div className="bg-[#1a1a1a] pt-8 pb-2 text-white border-b border-white/5">
                        
                        {/* Price Header */}
                        <div className="px-6 mb-6">
                            <h2 className="text-[3.5rem] font-medium tracking-tighter leading-none text-white">
                                {currentValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} <span className="text-lg text-gray-500 font-medium align-top mt-2 inline-block">INR</span>
                            </h2>
                            <div className={`flex items-center gap-2 mt-2 text-lg font-medium ${isProfit ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                                <span>{isProfit ? '+' : ''}{change.toFixed(2)} ({pctChange.toFixed(2)}%)</span>
                                <span className="text-gray-500 text-sm flex items-center gap-1 ml-1">
                                    <span className="material-symbols-outlined text-base">
                                        {isProfit ? 'arrow_upward' : 'arrow_downward'}
                                    </span>
                                    {activeRange === '1D' ? 'today' : activeRange === '1Y' ? 'past year' : 'this period'}
                                </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {new Date().toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })} • Market Closed
                            </div>
                        </div>

                        {/* Time Range Tabs */}
                        <div className="flex justify-between px-4 mb-4 border-b border-white/10">
                            {TIME_RANGES.map(range => (
                                <button
                                    key={range}
                                    onClick={() => setActiveRange(range)}
                                    className={`px-2 py-3 text-xs font-bold relative transition-colors ${
                                        activeRange === range 
                                        ? 'text-[#4fa3f7]' 
                                        : 'text-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    {range}
                                    {activeRange === range && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#4fa3f7] rounded-t-full"></div>}
                                </button>
                            ))}
                        </div>

                        {/* Graph */}
                        <div className="h-[320px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{top: 20, right: 0, left: 0, bottom: 0}}>
                                    <defs>
                                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={themeColor} stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor={themeColor} stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    
                                    <XAxis 
                                        dataKey="time" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fontSize: 10, fill: '#666'}} 
                                        minTickGap={50}
                                        interval="preserveStartEnd"
                                        dy={10}
                                    />
                                    
                                    {/* Reference line for Start Price */}
                                    <ReferenceLine 
                                        y={startPrice} 
                                        stroke="#666" 
                                        strokeDasharray="3 3" 
                                        strokeWidth={1}
                                    />
                                    
                                    <Tooltip 
                                        cursor={{ stroke: '#fff', strokeWidth: 1, strokeDasharray: '3 3' }}
                                        content={<CustomTooltip />}
                                        isAnimationActive={false}
                                    />
                                    
                                    <Area 
                                        type="monotone" 
                                        dataKey="value" 
                                        stroke={themeColor} 
                                        strokeWidth={2}
                                        fillOpacity={1} 
                                        fill="url(#colorVal)"
                                        animationDuration={500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Dashboard Actions */}
                    <div className="flex-1 bg-white dark:bg-[#1c1c1e] p-6 z-10 relative">
                         <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100 dark:border-white/5">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Active Strategy</p>
                                <h3 className={`text-xl font-bold bg-gradient-to-r ${getPlanGradient(currentPlan.id)} bg-clip-text text-transparent`}>
                                    {currentPlan.name}
                                </h3>
                            </div>
                            <button 
                                onClick={() => setViewMode('switch')}
                                className="text-sm font-bold text-blue-500 bg-blue-500/10 px-4 py-2 rounded-full hover:bg-blue-500/20"
                            >
                                Switch
                            </button>
                         </div>

                         <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                             <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                                 <p className="text-[10px] text-gray-500 font-bold uppercase">Open</p>
                                 <p className="font-bold text-sm dark:text-white">{(startPrice * 0.99).toFixed(2)}</p>
                             </div>
                             <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                                 <p className="text-[10px] text-gray-500 font-bold uppercase">High</p>
                                 <p className="font-bold text-sm dark:text-white">{(Math.max(currentValue, startPrice) * 1.01).toFixed(2)}</p>
                             </div>
                             <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                                 <p className="text-[10px] text-gray-500 font-bold uppercase">Low</p>
                                 <p className="font-bold text-sm dark:text-white">{(Math.min(currentValue, startPrice) * 0.99).toFixed(2)}</p>
                             </div>
                         </div>

                         <div className="space-y-3">
                             <Button fullWidth onClick={() => setViewMode('select')} className="h-12 text-base shadow-lg shadow-primary/20">
                                <ArrowUpRight size={20} /> Invest More
                             </Button>
                             <Button fullWidth variant="secondary" onClick={() => setViewMode('withdraw')} className="h-12 text-base bg-gray-100 dark:bg-white/5 border-transparent">
                                <ArrowDownLeft size={20} /> Withdraw
                             </Button>
                         </div>
                    </div>
                </div>
            )}

            {/* ================= SELECT / SWITCH VIEW ================= */}
            {(viewMode === 'select' || viewMode === 'switch') && (
                <div className="animate-fade-in space-y-8">
                    {viewMode === 'select' && (
                        <div className="px-4 text-center mt-8">
                            <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest mb-4">Investment Amount</p>
                            <div className="relative inline-block">
                                <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-text-secondary-light dark:text-text-secondary-dark opacity-50">₹</span>
                                <input 
                                    type="text" 
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    className="w-[200px] bg-transparent border-none p-0 text-6xl font-display font-bold text-center text-text-primary-light dark:text-white focus:ring-0 placeholder:text-text-secondary-light/20 dark:placeholder:text-white/20"
                                    placeholder="0"
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}

                    {viewMode === 'switch' && (
                        <div className="px-6 mt-6 text-center">
                            <h3 className="text-2xl font-bold text-text-primary-light dark:text-white mb-2">Switch Strategy</h3>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                Select a new plan. Your balance of <span className="text-text-primary-light dark:text-white font-bold">₹{currentValue.toLocaleString(undefined, {maximumFractionDigits: 2})}</span> will be re-invested.
                            </p>
                        </div>
                    )}

                    {/* Plan Carousel */}
                    <div>
                        <div className="flex items-center gap-2 px-6 mb-4">
                             <p className="font-bold text-text-primary-light dark:text-white text-sm uppercase tracking-wider">Select Plan</p>
                        </div>
                        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 no-scrollbar">
                            {INVESTMENT_PLANS.map(plan => {
                                const isSelected = selectedPlanId === plan.id;
                                return (
                                    <button
                                        key={plan.id}
                                        onClick={() => setSelectedPlanId(plan.id)}
                                        className={`relative shrink-0 w-[260px] snap-center rounded-[2rem] p-6 text-left transition-all duration-300 overflow-hidden group border-2 ${
                                            isSelected 
                                            ? 'border-white/50 scale-100 shadow-2xl' 
                                            : 'border-transparent scale-95 opacity-60 hover:opacity-80'
                                        }`}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${getPlanGradient(plan.id)} opacity-90`}></div>
                                        
                                        <div className="relative z-10 text-white h-full flex flex-col">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                                                    {plan.risk === 'Low' ? <Shield size={24} /> : plan.risk === 'Medium' ? <TrendingUp size={24} /> : <Zap size={24} />}
                                                </div>
                                                {isSelected && <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center"><Check size={14} strokeWidth={4}/></div>}
                                            </div>
                                            <h4 className="text-2xl font-bold mb-1">{plan.name}</h4>
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="px-2 py-0.5 bg-black/20 rounded text-[10px] font-bold uppercase">{plan.risk} Risk</span>
                                                <span className="text-xs font-bold opacity-90">{plan.minReturn}-{plan.maxReturn}% Return</span>
                                            </div>
                                            <p className="text-xs leading-relaxed opacity-80 mt-auto">
                                                {plan.description.substring(0, 60)}...
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className="fixed bottom-0 left-0 w-full p-6 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-white/5">
                        {viewMode === 'select' ? (
                            <>
                                <Button 
                                    fullWidth 
                                    size="lg" 
                                    disabled={!amount || parseInt(amount) < 100 || parseInt(amount) > (circle.poolTotal || 0)}
                                    onClick={() => setViewMode('educate')}
                                    className={(!amount || parseInt(amount) < 100) ? 'opacity-50' : 'shadow-lg shadow-primary/20'}
                                >
                                    Review
                                </Button>
                                <p className="text-center text-[10px] text-text-secondary-light dark:text-text-secondary-dark mt-3">
                                    Min: ₹100 • Max: ₹{(circle.poolTotal || 0).toLocaleString()}
                                </p>
                            </>
                        ) : (
                            <Button 
                                fullWidth 
                                size="lg" 
                                onClick={handleSwitchPlan}
                                className="shadow-lg shadow-primary/20"
                            >
                                Confirm Switch
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* ================= EDUCATE VIEW ================= */}
            {viewMode === 'educate' && selectedPlanId && (
                <div className="px-6 py-4 animate-slide-up pb-32">
                     <div className="text-center mb-8">
                         <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-dark dark:text-primary">
                             <HelpCircle size={32} />
                         </div>
                         <h2 className="text-2xl font-bold text-text-primary-light dark:text-white">Knowledge Check</h2>
                         <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2">
                             Understanding your investment is key to growth.
                         </p>
                     </div>

                     <div className="space-y-4">
                         <div className="bg-card-light dark:bg-card-dark p-5 rounded-2xl border border-border-light dark:border-white/5 flex gap-4">
                             <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                                 <TrendingUp size={20} />
                             </div>
                             <div>
                                 <h4 className="font-bold text-text-primary-light dark:text-white text-sm">Market Fluctuations</h4>
                                 <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">
                                     Your balance will go up and down daily. This is normal.
                                 </p>
                             </div>
                         </div>
                         <div className="bg-primary/10 border border-primary/20 p-5 rounded-2xl flex gap-4">
                             <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-dark dark:text-primary shrink-0">
                                 <Check size={20} strokeWidth={3} />
                             </div>
                             <div>
                                 <h4 className="font-bold text-primary-dark dark:text-primary text-sm">Selected Strategy</h4>
                                 <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed opacity-80">
                                     You chose a <strong>{INVESTMENT_PLANS.find(p => p.id === selectedPlanId)?.risk} Risk</strong> plan.
                                 </p>
                             </div>
                         </div>
                     </div>

                     <div className="fixed bottom-0 left-0 w-full p-6 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-white/5 z-30">
                         <Button fullWidth size="lg" onClick={confirmInvestment} className="shadow-xl shadow-primary/20">
                             I Understand, Invest ₹{amount}
                         </Button>
                     </div>
                </div>
            )}

            {/* ================= WITHDRAW VIEW ================= */}
            {viewMode === 'withdraw' && (
                <div className="p-6 animate-slide-up">
                    <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-8 border border-gray-200 dark:border-white/5 shadow-xl text-center">
                         <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                             <ArrowDownLeft size={32} />
                         </div>
                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Withdraw</h2>
                         <p className="text-gray-500 text-sm mt-1">Available: ₹{currentValue.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>

                         <div className="relative my-6">
                             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">₹</span>
                             <input 
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={withdrawAmount}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === '' || /^[0-9]+$/.test(val)) {
                                        // Cap at current value logic handled in action, just validate type here
                                        setWithdrawAmount(val);
                                    }
                                }}
                                placeholder="0"
                                className={`w-full bg-gray-100 dark:bg-black/20 rounded-2xl py-5 pl-10 pr-4 text-3xl font-bold text-center text-gray-900 dark:text-white border-none focus:ring-2 transition-all ${exceedsBalance ? 'focus:ring-red-500 ring-2 ring-red-500/50' : 'focus:ring-red-500/50'}`}
                             />
                             {exceedsBalance && (
                                 <p className="text-xs text-red-500 text-center mt-2 font-bold">Amount exceeds portfolio value</p>
                             )}
                         </div>

                         <div className="flex gap-2 mb-6">
                             <button onClick={() => setWithdrawAmount(Math.floor(currentValue * 0.25).toString())} className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-500">25%</button>
                             <button onClick={() => setWithdrawAmount(Math.floor(currentValue * 0.5).toString())} className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-500">50%</button>
                             <button onClick={() => setWithdrawAmount(Math.floor(currentValue).toString())} className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-500">MAX</button>
                         </div>

                         {withdrawAmount && parseInt(withdrawAmount) >= Math.floor(currentValue) && (
                             <div className="mb-6 p-3 bg-red-500/10 rounded-xl flex gap-3 items-start border border-red-500/20 text-left">
                                 <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                                 <p className="text-xs text-red-600 dark:text-red-400 font-medium leading-relaxed">
                                     Withdrawing full amount closes the portfolio.
                                 </p>
                             </div>
                         )}

                         <Button 
                            fullWidth 
                            onClick={handleWithdraw} 
                            disabled={!withdrawAmount || parseInt(withdrawAmount) <= 0 || exceedsBalance}
                            className={`bg-red-500 border-red-600 text-white hover:bg-red-400 ${exceedsBalance ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {withdrawAmount && parseInt(withdrawAmount) >= Math.floor(currentValue) ? 'Withdraw All & Close' : 'Confirm Withdraw'}
                        </Button>
                    </div>
                </div>
            )}

        </main>
    </div>
  );
};