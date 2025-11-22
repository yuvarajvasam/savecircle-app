
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, Share2, Search, Gift, MessageCircle, Send } from 'lucide-react';
import { getUser } from '../utils/storage';

interface Contact {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  status: 'invite' | 'sent' | 'joined';
}

export const InviteFriends: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dynamic invite code based on user name
  const inviteCode = (user.name.replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase() || "USER") + "8821";
  const inviteLink = `https://uvsavecircle.vercel.app/join/${inviteCode}`;

  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Aria Patel', handle: '@aria_p', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4hNRTiUU6IhZtQseEYFGvpT4GScE-fnd-eYMhIuGsKz1D0uclsAsi8OBzE6XGS2Hp2Si1tRrmyyWl2kx1ZN26i7wvl6BEKu827PNaN68jLY93GaDZpgFGEP_eA6PdGqe04--GI1PvSQJemV_Driq7bG4JbZ8ntVKp71NSXXY4ZbrdvRlYcctQWT21KogV8vFYw3fl00l8m9gl7CE447ARSu-3BryZjBVojstVTSto2LPrM_-lBurimBl7D_lSjCsdYvLJy-DSrUc', status: 'invite' },
    { id: '2', name: 'Ben Carter', handle: '@ben_c', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPWH5xVJkPuiR86Th35UCBlWnDgV75_ZlclNjBpiAxYcFPXbgrMMaz4pxbac1934zGX8ESkVKas4ynrop78WONu3vcn436b_Y6T0n6xEfhBypWV0fpSY4opO-V_vpWjtnepF24Q0oivA6DjLF60xmSqbBDwe48SzwPoKBUD0RqTu51AVigGUqHQbklnr-o7fnVaTZodcGG77ocpHylB5g7NE3m9J8GKulWNDiJBsBTvYSMWtd--2BwrOVYHW8CO3-WhhqaZBQ7BC8', status: 'sent' },
    { id: '3', name: 'Chloe Davis', handle: '@chloe_d', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVKKuEbEIJ_9krMRg3g05kYMvlRka3UFpCUAIqz9ZIwXJssOaegz2SbSA4dZ_HLA9OWY405fkgVcBRcjz0zaMlhK5BJ9JbKERs03o7Du-MS4B2Df6-UaVhwC4FkZiakB4-uqVGCsKKn_dvhkAqAgcxBT4uVRt8-1KAWiBAPn8tMGkwi6FjrF1IQYskPFsG0JhMYOq2A74IJGKIvVYEetcOPKfTQ2vLxrGk2ES5joANATF8fujAo_KhO5E7MCx9-CA_X2wzhab6NtU', status: 'invite' },
    { id: '4', name: 'David Kim', handle: '@dkim99', avatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png', status: 'joined' },
    { id: '5', name: 'Emma Wilson', handle: '@emma_w', avatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png', status: 'invite' },
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvite = (id: string) => {
    setContacts(prev => prev.map(c => 
        c.id === id ? { ...c, status: 'sent' } : c
    ));
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex-1 font-display flex flex-col h-full transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5">
         <div className="flex w-12 items-center justify-start">
            <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
         </div>
         <h1 className="text-lg font-bold">Invite Friends</h1>
         <div className="w-12"></div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* Hero / Reward Section */}
        <div className="bg-primary/10 dark:bg-primary/5 pt-8 pb-12 px-6 rounded-b-[3rem] relative overflow-hidden mb-4">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-16 -mt-16"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-white dark:bg-[#2c2c2e] rounded-[2rem] shadow-xl flex items-center justify-center mb-6 rotate-3 hover:rotate-0 transition-transform duration-300 ring-4 ring-white/50 dark:ring-white/10">
                    <Gift size={48} className="text-primary-dark dark:text-primary drop-shadow-sm" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-bold text-text-primary-light dark:text-white mb-2 leading-tight">
                    Get ₹50 for <br/> every friend
                </h2>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm max-w-[200px] leading-relaxed">
                    You both earn ₹50 when they join a circle and make their first save.
                </p>
            </div>
        </div>

        {/* Invite Link Card */}
        <div className="px-4 -mt-8 relative z-10 mb-8">
            <div className="bg-card-light dark:bg-card-dark p-5 rounded-[2rem] shadow-lg border border-border-light dark:border-white/5">
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary-light dark:text-text-secondary-dark mb-3">Your Invite Link</p>
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-white/5 p-3 rounded-xl border border-border-light dark:border-white/10">
                    <div className="flex-1 truncate font-mono text-sm text-text-primary-light dark:text-white">{inviteLink}</div>
                    <button 
                        onClick={handleCopy}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-primary text-black hover:brightness-110'}`}
                    >
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
            </div>
        </div>

        {/* Contacts List */}
        <div className="px-4 pb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-text-primary-light dark:text-white">Suggested Contacts</h3>
                <button className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-full text-text-secondary-light dark:text-text-secondary-dark">
                    <Search size={16} />
                </button>
            </div>

            <div className="space-y-4">
                {filteredContacts.map(contact => (
                    <div key={contact.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={contact.avatar} className="w-12 h-12 rounded-full bg-gray-200 object-cover" alt={contact.name} />
                            <div>
                                <p className="font-bold text-text-primary-light dark:text-white">{contact.name}</p>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{contact.handle}</p>
                            </div>
                        </div>
                        {contact.status === 'joined' ? (
                            <span className="text-xs font-bold text-green-500 flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-lg">
                                <Check size={12} strokeWidth={3} /> Joined
                            </span>
                        ) : contact.status === 'sent' ? (
                            <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                                Sent
                            </span>
                        ) : (
                            <button 
                                onClick={() => handleInvite(contact.id)}
                                className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm"
                            >
                                <Send size={18} className="-ml-0.5 mt-0.5" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
};
