
import React, { useState } from 'react';
import { Copy, Share2, X, Check, MessageCircle, Twitter } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  url?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, text, url = 'https://savecircle.app' }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;
  
  const fullText = `${text}\n\n${url}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SaveCircle',
          text: text,
          url: url,
        });
        onClose();
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const handleWhatsApp = () => {
      window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`, '_blank');
  };

  const handleTwitter = () => {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end sm:justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="bg-white dark:bg-[#1c1c1e] w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden shadow-2xl relative z-10 animate-slide-up">
        
        <div className="p-6 pb-8">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-xl text-gray-900 dark:text-white">{title}</h3>
             <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                <X size={20} />
             </button>
          </div>

          <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-2xl border border-gray-100 dark:border-white/5 mb-6">
             <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">
                "{text}"
             </p>
             <p className="text-primary-dark dark:text-primary text-xs mt-2 font-bold">{url}</p>
          </div>

          <div className="grid grid-cols-4 gap-4">
             <button onClick={handleCopy} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-700 dark:text-white group-active:scale-95 transition-all group-hover:bg-gray-200 dark:group-hover:bg-white/10">
                   {copied ? <Check size={24} className="text-green-500" /> : <Copy size={24} />}
                </div>
                <span className="text-xs font-bold text-gray-500">{copied ? 'Copied' : 'Copy'}</span>
             </button>

             <button onClick={handleWhatsApp} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-active:scale-95 transition-all group-hover:bg-[#25D366]/20">
                   <MessageCircle size={24} className="fill-current" />
                </div>
                <span className="text-xs font-bold text-gray-500">WhatsApp</span>
             </button>

             <button onClick={handleTwitter} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-2xl bg-[#1DA1F2]/10 flex items-center justify-center text-[#1DA1F2] group-active:scale-95 transition-all group-hover:bg-[#1DA1F2]/20">
                   <Twitter size={24} className="fill-current" />
                </div>
                <span className="text-xs font-bold text-gray-500">Twitter</span>
             </button>

             {typeof navigator !== 'undefined' && navigator.share && (
                 <button onClick={handleNativeShare} className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary-dark dark:text-primary group-active:scale-95 transition-all group-hover:bg-primary/20">
                       <Share2 size={24} />
                    </div>
                    <span className="text-xs font-bold text-gray-500">More</span>
                 </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
