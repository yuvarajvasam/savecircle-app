
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft, Filter, Search, Calendar } from 'lucide-react';

// Mock Data - Strictly Financial Transactions
const HISTORY_ITEMS = [
  { id: 1, title: 'Daily Save', amount: 100, date: '2024-10-24T09:00:00', type: 'credit', category: 'Savings', method: 'UPI •••82' },
  { id: 3, title: 'Referral Bonus', amount: 50, date: '2024-10-22T10:15:00', type: 'credit', category: 'Reward', method: 'System' },
  { id: 4, title: 'Weekly Contribution', amount: 500, date: '2024-10-20T09:00:00', type: 'credit', category: 'Circle', method: 'Weekend Warriors' },
  { id: 5, title: 'Goal Withdrawal', amount: -1500, date: '2024-10-15T16:45:00', type: 'debit', category: 'Withdrawal', method: 'To HDFC Bank' },
  { id: 6, title: 'Daily Save', amount: 100, date: '2024-10-14T09:00:00', type: 'credit', category: 'Savings', method: 'UPI •••82' },
  { id: 7, title: 'Daily Save', amount: 100, date: '2024-09-28T09:00:00', type: 'credit', category: 'Savings', method: 'UPI •••82' },
];

// Helper to format date
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return `Today, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    if (days === 1) return `Yesterday, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
};

export const History: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter items based on search
  const filteredItems = useMemo(() => {
    return HISTORY_ITEMS.filter(item => 
       item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Group by Month
  const grouped = useMemo(() => {
      return filteredItems.reduce((acc: any, item) => {
          const date = new Date(item.date);
          const key = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
      }, {});
  }, [filteredItems]);

  // Calculate Stats for the current view (October 2024 mainly)
  const currentMonthKey = "October 2024";
  const currentMonthItems = grouped[currentMonthKey] || [];
  
  const stats = useMemo(() => {
      let income = 0;
      let expense = 0;
      currentMonthItems.forEach((item: any) => {
          if (item.type === 'credit') income += item.amount;
          else expense += Math.abs(item.amount);
      });
      return { income, expense };
  }, [currentMonthItems]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex-1 font-display flex flex-col h-full transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5">
         <div className="flex w-12 items-center justify-start">
            <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
         </div>
         <h1 className="text-lg font-bold">Financial History</h1>
         <div className="flex w-12 items-center justify-end">
             <button className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <Filter size={20} />
            </button>
         </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-8">
          {/* Summary Card */}
          <div className="bg-card-light dark:bg-card-dark p-6 rounded-[2rem] border border-border-light dark:border-white/5 shadow-sm dark:shadow-none mb-6">
             <div className="flex items-center justify-between mb-4">
                 <h2 className="font-bold text-text-secondary-light dark:text-text-secondary-dark text-xs uppercase tracking-wider">October Summary</h2>
                 <div className="flex items-center gap-1 text-xs font-bold bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-lg text-text-secondary-light dark:text-text-secondary-dark">
                     <Calendar size={14} />
                     <span>Oct 1 - Oct 31</span>
                 </div>
             </div>
             <div className="flex gap-4">
                 <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1 text-green-600 dark:text-green-400">
                         <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                            <ArrowDownLeft size={14} strokeWidth={3} />
                         </div>
                         <span className="text-xs font-bold">In</span>
                     </div>
                     <p className="text-2xl font-bold text-text-primary-light dark:text-white">₹{stats.income.toLocaleString()}</p>
                 </div>
                 <div className="w-px bg-border-light dark:bg-white/10"></div>
                 <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1 text-text-primary-light dark:text-white">
                         <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center">
                            <ArrowUpRight size={14} strokeWidth={3} />
                         </div>
                         <span className="text-xs font-bold">Out</span>
                     </div>
                     <p className="text-2xl font-bold text-text-primary-light dark:text-white">₹{stats.expense.toLocaleString()}</p>
                 </div>
             </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
             <input 
               type="text" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Search transactions" 
               className="w-full h-12 bg-gray-100 dark:bg-white/5 rounded-2xl pl-11 pr-4 font-medium text-sm focus:ring-2 focus:ring-primary/50 border-none placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark text-text-primary-light dark:text-white"
             />
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark" size={20} />
          </div>

          {/* Transactions List */}
          <div className="space-y-6">
              {Object.entries(grouped).map(([month, items]: [string, any]) => (
                  <div key={month}>
                      <h3 className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-3 px-2">{month}</h3>
                      <div className="bg-card-light dark:bg-card-dark rounded-[1.5rem] overflow-hidden border border-border-light dark:border-white/5 shadow-sm dark:shadow-none">
                          {items.map((item: any, index: number) => (
                              <div key={item.id} className={`p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer ${index !== items.length - 1 ? 'border-b border-border-light dark:border-white/5' : ''}`}>
                                  <div className="flex items-center gap-4">
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                          item.type === 'credit' 
                                            ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                                            : 'bg-gray-200 dark:bg-white/10 text-text-primary-light dark:text-white'
                                      }`}>
                                          {item.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-sm text-text-primary-light dark:text-white">{item.title}</h4>
                                          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{formatDate(item.date)} • {item.method}</p>
                                      </div>
                                  </div>
                                  <span className={`font-bold text-sm ${item.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-text-primary-light dark:text-white'}`}>
                                      {item.type === 'credit' ? '+' : '-'}₹{Math.abs(item.amount).toLocaleString()}
                                  </span>
                              </div>
                          ))}
                      </div>
                  </div>
              ))}
              
              {Object.keys(grouped).length === 0 && (
                  <div className="text-center py-12 text-text-secondary-light dark:text-text-secondary-dark">
                      <p className="text-sm font-medium">No transactions found</p>
                  </div>
              )}
          </div>
      </main>
    </div>
  );
};
