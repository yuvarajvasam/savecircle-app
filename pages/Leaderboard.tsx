
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_LEADERBOARD } from '../constants';

export const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  
  const top3 = [
    MOCK_LEADERBOARD[1], // Rank 2 (Left)
    MOCK_LEADERBOARD[0], // Rank 1 (Center)
    MOCK_LEADERBOARD[2], // Rank 3 (Right)
  ];
  
  const listData = [
      { rank: 4, name: 'MoneyMaker', xp: 1125, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhWJk5jhZEE0oisbga1W4Srk-EwFGaY5VWGeOoAaEhTCQDtpkiQARUva_tg91WO_SzvV2rEMkMam-AUN1oi6l5YohJChZJStxnvDEO_AF3qtc0q-EGSW4gkGwTtaT_LuhEEWlRdsga9Wp5K_guqoH8r6jWH-B9H4FG0-5bdaiByA1PrP3d6A6qnvogWiUzSRlBKc7BRJSf5hLDwq2KkRr-AkTV-v29yXZKlQBjJzzP6gG7a8tBTBGZXfrqb83e1fMjZgDmkbqESsM', isCurrentUser: false, movement: 'down' },
      { rank: 5, name: 'DollarDan', xp: 1090, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHAN8Kh8eMCGUHRSvu2FW7bOPqBiVqn6gCAvaW_8WG9ILxm0NUHqAyGMbEoAz3d6Z40XOdidoXr4GsUKSA_RMkVVeDkyTr1l8vMmRrrcByTeaGG-Wb6it_Y-e4CZmQx4noe57G0DxBgp9NGmM--7O318wv9kmjCLGLDCcbHr1H3zioYCiYx5aF_T_bpJAFZ4xDWasypLzYVChYA9G305Bz4rSYQudGJM9S58Ko7MXtQZWx0mKzEgnv3tDhYLo6Uh-gtSrP8hy-dwM', isCurrentUser: false, movement: 'same' },
      { rank: 6, name: 'InvestorIvy', xp: 1050, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjXqbhJNtu3dC-UthmZLXFZCLAlCZwOpE-VmdD4ptHuBmWs1jvV0DDihxwcWXr8zaWLh8yozEBzdxdfekZ8IpNaoNYJq43YoLPqmcu6j8HOBVWt466PpY8utFtdyoaDb3yqga2zjSrxG3H9SqaBZATzcZKuDCd1bzVzldGQ2uBSicDDY0Rr744s3wwIntpahf8ao_rVkAwLUPr_qZR0O7Zj-1TeSDBIrIQVLs8PLz1LGOtiH_MCceqg5mZUa1UfW62UAddJOra8Tc', isCurrentUser: false, movement: 'up' },
      { rank: 7, name: 'CashFlow', xp: 980, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF2br4APO_FjG6cQLlCrODBCBji4UhXF2hHdqdt95MwEaOHk39qiJria-Gki6X8HBpCXAl51YZS0O0o1u9AnM2ncRrcO4VEdhs1B3XMyXY6wSpFwxVB3VZOF5OECpVorveZIK9sM5IEZAzPj3Wnr-vYIIfkDHoMOxF0ZPZwLZiKWE_0rrk19iFSsCRZirhVU1FSD-zGTLMNmXc4uklTMBVwQYPcbirgLV5e_mW0oW5ZxJvpxp62IyBxoIfhHdDT7-cu3S16ADYhOk', isCurrentUser: false, movement: 'down' },
      { rank: 15, name: 'You', xp: 850, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw9cR54xcAIe-TPNb6NE9LRkR1vEjE8VhTEF9QnNRC5hg-Rimk1HTq386mvYkZNgfgyqLw29X7I7Jg8Y6wo8-tVTF8TI1Uq8agD1mY0DMGdOB95ajxt3CkNQHCyBBBsoT7YeejrTleJUwkpVW-ugH9yL4_-A1nq3snNvFsRyDMdSwkx96-pXF5E14AQHMbGjw_wtCOhGdFWCCN1P13XPXdtvCP3uAbnh5dLuhI11HaQ0IlHViVq2LaLI_UlrOFlIUmK9JAuZH6iMg', isCurrentUser: true, movement: 'up' }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display flex-1 flex flex-col h-full transition-colors duration-300">
      <header className="sticky top-0 z-20 flex flex-col bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-border-light dark:border-white/5 transition-colors duration-300">
        <div className="flex items-center justify-between px-4 py-3">
             <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                 <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex flex-col items-center">
                 <h1 className="text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest">Diamond League</h1>
                 <div className="flex items-center gap-1 text-xs font-bold text-primary-dark dark:text-primary">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    2 Days Left
                 </div>
            </div>
            <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-hidden">
          {/* Podium Section */}
          <div className="flex items-end justify-center gap-4 px-4 pt-8 pb-8 relative shrink-0">
              {/* Light Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none"></div>

              {/* Rank 2 */}
              <div className="flex flex-col items-center z-10">
                  <div className="relative mb-3">
                      <div className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-white/20 p-1 bg-background-light dark:bg-background-dark">
                          <img src={top3[0].avatar} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-white dark:bg-background-dark rounded-full flex items-center justify-center border border-border-light dark:border-white/10 text-xs font-bold text-text-primary-light dark:text-white shadow-sm">2</div>
                  </div>
                  <p className="text-text-primary-light dark:text-white font-bold text-sm mb-1">{top3[0].name}</p>
                  <p className="text-primary-dark dark:text-primary font-bold text-xs">{top3[0].streak * 15} XP</p>
                  <div className="w-20 h-24 bg-gray-200/50 dark:bg-white/5 mt-2 rounded-t-lg border-t border-x border-white/20 dark:border-white/10 backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                  </div>
              </div>

              {/* Rank 1 */}
              <div className="flex flex-col items-center z-10 -mb-4">
                  <div className="relative mb-4">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl">👑</div>
                      <div className="w-20 h-20 rounded-full border-2 border-yellow-400 p-1 shadow-[0_0_20px_rgba(250,204,21,0.3)] bg-background-light dark:bg-background-dark">
                          <img src={top3[1].avatar} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-background-dark text-sm font-bold shadow-lg">1</div>
                  </div>
                  <p className="text-text-primary-light dark:text-white font-bold text-base mb-1">{top3[1].name}</p>
                  <p className="text-yellow-600 dark:text-yellow-400 font-bold text-sm">{top3[1].streak * 18} XP</p>
                  <div className="w-24 h-32 bg-gradient-to-t from-yellow-400/20 to-white/30 dark:to-white/10 mt-2 rounded-t-xl border-t border-x border-white/30 dark:border-white/10 backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  </div>
              </div>

              {/* Rank 3 */}
              <div className="flex flex-col items-center z-10">
                  <div className="relative mb-3">
                      <div className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-white/20 p-1 bg-background-light dark:bg-background-dark">
                          <img src={top3[2].avatar} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-white dark:bg-background-dark rounded-full flex items-center justify-center border border-border-light dark:border-white/10 text-xs font-bold text-text-primary-light dark:text-white shadow-sm">3</div>
                  </div>
                  <p className="text-text-primary-light dark:text-white font-bold text-sm mb-1">{top3[2].name}</p>
                  <p className="text-primary-dark dark:text-primary font-bold text-xs">{top3[2].streak * 10} XP</p>
                  <div className="w-20 h-16 bg-gray-200/50 dark:bg-white/5 mt-2 rounded-t-lg border-t border-x border-white/20 dark:border-white/10 backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                  </div>
              </div>
          </div>

          {/* List Section */}
          <div className="flex-1 bg-white dark:bg-surface-dark rounded-t-[2rem] border-t border-border-light dark:border-white/10 p-4 overflow-y-auto relative shadow-top dark:shadow-none transition-colors duration-300">
             <div className="flex justify-center mb-4">
                 <div className="h-1 w-12 bg-gray-200 dark:bg-white/20 rounded-full"></div>
             </div>
             
             <div className="space-y-2 pb-20">
                 <p className="text-xs font-bold text-green-500 uppercase px-3 mb-2">Promotion Zone</p>
                 {listData.slice(0, 2).map((item) => (
                     <LeaderboardRow key={item.rank} item={item} />
                 ))}
                 
                 <div className="my-4 border-t border-dashed border-gray-200 dark:border-white/10"></div>
                 
                 {listData.slice(2).map((item) => (
                     <LeaderboardRow key={item.rank} item={item} />
                 ))}
             </div>
             
             {/* Sticky User Rank at Bottom (Visual fix for scrolling) */}
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white dark:from-surface-dark dark:via-surface-dark to-transparent pt-12 transition-colors duration-300">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-primary text-background-dark shadow-lg shadow-primary/20">
                    <div className="flex items-center gap-4">
                        <span className="w-6 text-center font-bold text-background-dark/70 text-sm">15</span>
                        <img src={listData[4].avatar} className="w-10 h-10 rounded-full bg-black/10 object-cover" />
                        <p className="font-bold text-sm">You</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-black/10 px-2 py-1 rounded">Top 15%</span>
                        <p className="font-bold text-sm">850 XP</p>
                    </div>
                </div>
             </div>
          </div>
      </main>
    </div>
  );
};

const LeaderboardRow = ({item}: {item: any}) => (
    <div className={`flex items-center justify-between p-3 rounded-2xl border transition-colors ${item.isCurrentUser ? 'bg-primary/10 dark:bg-white/10 border-primary/50' : 'bg-gray-50 dark:bg-background-dark border-border-light dark:border-white/5'}`}>
        <div className="flex items-center gap-4">
            <div className="w-6 flex flex-col items-center">
                <span className="font-bold text-text-secondary-light dark:text-text-secondary-dark text-sm">{item.rank}</span>
                {item.movement === 'up' && <span className="material-symbols-outlined text-xs text-green-500">arrow_drop_up</span>}
                {item.movement === 'down' && <span className="material-symbols-outlined text-xs text-red-500">arrow_drop_down</span>}
            </div>
            <img src={item.avatar} className="w-10 h-10 rounded-full bg-gray-200 dark:bg-card-dark object-cover" />
            <p className={`font-bold text-sm ${item.isCurrentUser ? 'text-primary-dark dark:text-primary' : 'text-text-primary-light dark:text-white'}`}>{item.name}</p>
        </div>
        <p className="font-bold text-text-primary-light dark:text-white text-sm">{item.xp} XP</p>
    </div>
)
