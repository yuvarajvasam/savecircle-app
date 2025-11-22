import React from 'react';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { WEEKLY_DATA } from '../constants';

export const Insights: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-neo-gray min-h-screen pb-28">
       <div className="px-6 pt-6 pb-4 bg-neo-gray sticky top-0 z-10 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-neo-black"><ChevronRight className="rotate-180" /></button>
          <h1 className="text-2xl font-bold text-neo-black">Insights</h1>
       </div>

       <div className="p-6 space-y-6">
          {/* Overview Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <h2 className="font-bold text-neo-black text-xl mb-6">This Month</h2>
             <div className="h-48 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={WEEKLY_DATA}>
                      <Line type="monotone" dataKey="value" stroke="#202020" strokeWidth={4} dot={{r: 6, fill: '#c9f158', stroke: '#202020', strokeWidth: 3}} />
                      <Tooltip cursor={{stroke: '#e5e7eb'}} contentStyle={{borderRadius: '12px', border: 'none', backgroundColor: '#202020', color: '#fff'}} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
             <p className="text-center text-gray-500 font-medium">You've maintained an <span className="font-bold text-neo-black border-b-2 border-neo-lime">83% saving rate</span>.</p>
          </div>

          {/* Trends Section */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-neo-black p-6 rounded-[2rem] text-white shadow-lg shadow-black/5">
                <p className="text-xs text-gray-400 font-bold uppercase mb-3 tracking-wider">Growth</p>
                <div className="flex items-end gap-2">
                   <span className="text-4xl font-bold text-neo-lime">+12%</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 font-medium">vs last week</p>
             </div>
             <div className="bg-white p-6 rounded-[2rem] border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase mb-3 tracking-wider">Best Day</p>
                <span className="text-4xl font-bold text-neo-black">Mon</span>
                <p className="text-xs text-gray-400 mt-2 font-medium">100% score</p>
             </div>
          </div>

          {/* Circle Stats Comparison */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100">
             <h3 className="font-bold text-neo-black text-lg mb-6">Circle Comparison</h3>
             
             <div className="space-y-6">
                <div>
                   <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-neo-black">Weekend Warriors</span>
                      <span className="text-neo-black">100%</span>
                   </div>
                   <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                      <div className="bg-neo-black h-full w-full rounded-full"></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-gray-500">Holiday Fund</span>
                      <span className="text-gray-500">80%</span>
                   </div>
                   <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                      <div className="bg-neo-lime h-full w-[80%] rounded-full"></div>
                   </div>
                </div>
             </div>
          </div>

          {/* Milestone Timeline */}
          <div>
             <h3 className="font-bold text-neo-black text-lg mb-4 px-2">Milestones</h3>
             <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                <div className="min-w-[150px] p-6 bg-neo-lime rounded-[2rem] flex flex-col items-center text-center">
                   <div className="w-10 h-10 rounded-full bg-neo-black text-white flex items-center justify-center text-sm font-bold mb-3">✓</div>
                   <p className="font-bold text-neo-black text-sm">First Save</p>
                   <p className="text-xs text-black/60 mt-1 font-bold">Jan 10</p>
                </div>
                <div className="min-w-[150px] p-6 bg-white rounded-[2rem] border border-gray-100 flex flex-col items-center text-center">
                   <div className="w-10 h-10 rounded-full bg-neo-black text-white flex items-center justify-center text-sm font-bold mb-3">✓</div>
                   <p className="font-bold text-neo-black text-sm">7-Day Streak</p>
                   <p className="text-xs text-gray-400 mt-1 font-bold">Jan 17</p>
                </div>
                <div className="min-w-[150px] p-6 bg-gray-100 rounded-[2rem] border border-transparent flex flex-col items-center text-center opacity-50">
                   <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center text-sm font-bold mb-3">🔒</div>
                   <p className="font-bold text-gray-500 text-sm">30-Day</p>
                   <p className="text-xs text-gray-400 mt-1 font-bold">Soon</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};