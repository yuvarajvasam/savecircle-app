
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, MessageCircle, Mail } from 'lucide-react';
import { Button } from '../components/Button';

const FAQS = [
    {
        question: "How do Circles work?",
        answer: "Circles are groups where members commit to saving a specific amount periodically. You can track everyone's progress, ensuring accountability and motivation."
    },
    {
        question: "Is my money safe?",
        answer: "Yes. SaveCircle does not hold your funds directly. All transactions are processed through secure UPI gateways directly to your linked bank account or investment vehicle."
    },
    {
        question: "What happens if I miss a day?",
        answer: "If you miss a daily goal, your streak will reset to zero unless you have a 'Streak Freeze' equipped. You can buy freezes in the Shop with Gems."
    },
    {
        question: "Can I withdraw my money anytime?",
        answer: "For 'Solo Goals', yes, you can withdraw instantly. For 'Social Circles', withdrawal rules depend on the circle's configuration, but generally, you can withdraw your own contributions at any time."
    },
    {
        question: "How is the consistency score calculated?",
        answer: "It's a percentage of successful saving days versus total days since you joined. A higher score unlocks better investment plans and badges."
    }
];

export const HelpCenter: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full flex flex-col font-display transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5">
         <div className="flex w-12 items-center justify-start">
            <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
         </div>
         <h1 className="text-lg font-bold text-text-primary-light dark:text-white">Help Center</h1>
         <div className="w-12"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-8">
         
         {/* Search */}
         <div className="relative mb-8">
             <input 
               type="text" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Search for help..."
               className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card-light dark:bg-card-dark border border-border-light dark:border-white/5 focus:ring-2 focus:ring-primary/50 focus:border-transparent text-text-primary-light dark:text-white placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark font-medium shadow-sm dark:shadow-none"
             />
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark" size={20} />
         </div>

         {/* FAQ List */}
         <div className="space-y-3 mb-8">
             <h3 className="font-bold text-text-secondary-light dark:text-text-secondary-dark text-xs uppercase tracking-widest px-2 mb-2">Frequently Asked Questions</h3>
             
             {filteredFaqs.length > 0 ? (
                 filteredFaqs.map((faq, index) => (
                     <div key={index} className="bg-card-light dark:bg-card-dark rounded-2xl border border-border-light dark:border-white/5 overflow-hidden transition-all">
                         <button 
                            onClick={() => toggleFaq(index)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                         >
                             <span className="font-bold text-text-primary-light dark:text-white text-sm pr-4">{faq.question}</span>
                             <ChevronDown size={20} className={`text-text-secondary-light dark:text-text-secondary-dark transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                         </button>
                         
                         <div className={`px-5 text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
                             {faq.answer}
                         </div>
                     </div>
                 ))
             ) : (
                 <div className="text-center py-8 text-text-secondary-light dark:text-text-secondary-dark">
                     <p>No results found.</p>
                 </div>
             )}
         </div>

         {/* Contact Support */}
         <div className="bg-primary/10 rounded-[2rem] p-6 text-center border border-primary/20">
             <h3 className="font-bold text-lg text-text-primary-light dark:text-white mb-2">Still need help?</h3>
             <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-6">Our team is available 24/7 to assist you with any issues.</p>
             
             <div className="flex gap-3">
                 <Button className="flex-1 bg-primary text-background-dark hover:brightness-110 flex items-center justify-center gap-2">
                     <MessageCircle size={20} /> Chat
                 </Button>
                 <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2">
                     <Mail size={20} /> Email
                 </Button>
             </div>
         </div>

      </main>
    </div>
  );
};
