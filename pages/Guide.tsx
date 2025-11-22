
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { GoogleGenAI, Type } from "@google/genai";
import { Loader2 } from 'lucide-react';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface GuideSection {
    title: string;
    text?: string;
    highlight?: string;
    items?: { label: string; desc: string; icon: string }[];
}

interface GuideContent {
    title: string;
    description: string;
    sections: GuideSection[];
}

export const Guide: React.FC = () => {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const [searchParams] = useSearchParams();
  const unitTitle = searchParams.get('title') || `Unit ${unitId}`;
  
  const [content, setContent] = useState<GuideContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
        const storageKey = `savecircle_guide_${unitId}`;
        const storedGuide = localStorage.getItem(storageKey);

        if (storedGuide) {
            try {
                setContent(JSON.parse(storedGuide));
                setLoading(false);
                return;
            } catch (e) {
                console.error("Error parsing stored guide", e);
                localStorage.removeItem(storageKey);
            }
        }

        // Unit 1 Hardcoded Fallback (Faster)
        if (unitId === '1') {
            const staticContent = {
                title: "Intro to Investing",
                description: "Learn how to make your money grow over time through smart asset allocation.",
                sections: [
                    {
                        title: "What is Investing?",
                        text: "Investing is the act of allocating resources, usually money, with the expectation of generating an income or profit. Unlike saving, which is setting money aside for safety, investing involves taking calculated risks to grow wealth."
                    },
                    {
                        title: "Risk vs. Reward",
                        text: "There is always a trade-off. Higher risk investments generally offer the potential for higher returns, while lower risk investments offer stability but lower growth.",
                        highlight: "Pro Tip: Diversification (buying different types of assets) is the best way to manage risk without sacrificing all your potential gains."
                    },
                    {
                        title: "Key Asset Classes",
                        items: [
                        { label: "Stocks (Equities)", desc: "Buying a small piece of ownership in a company. High potential growth, higher risk.", icon: "trending_up" },
                        { label: "Bonds (Fixed Income)", desc: "Loaning money to a government or company in exchange for interest payments. Lower risk, steady income.", icon: "account_balance" },
                        { label: "ETFs", desc: "A basket of securities that trades on an exchange like a stock. Instant diversification.", icon: "pie_chart" }
                        ]
                    }
                ]
            };
            setContent(staticContent);
            // Save static content to LS for consistency
            localStorage.setItem(storageKey, JSON.stringify(staticContent));
            setLoading(false);
            return;
        }

        // Dynamic Generation for other units
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `Create a concise study guide for a financial unit titled "${unitTitle}".
                           Limit the content to approximately 300 words total to ensure a quick read.
                           Structure:
                           1. Description (1-2 sentences max).
                           2. 3 Sections total. 
                           3. One section MUST use the 'items' list for key terms/definitions with icons.
                           4. Other sections should use 'text' and optional 'highlight'.
                           Tone: Beginner-friendly and motivating.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            sections: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        title: { type: Type.STRING },
                                        text: { type: Type.STRING, nullable: true },
                                        highlight: { type: Type.STRING, nullable: true },
                                        items: {
                                            type: Type.ARRAY,
                                            nullable: true,
                                            items: {
                                                type: Type.OBJECT,
                                                properties: {
                                                    label: { type: Type.STRING },
                                                    desc: { type: Type.STRING },
                                                    icon: { type: Type.STRING }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            
            if (response.text) {
                try {
                    const data = JSON.parse(response.text);
                    setContent(data);
                    // Save to local storage
                    localStorage.setItem(storageKey, JSON.stringify(data));
                } catch (parseError) {
                    console.error("JSON Parse Error", parseError);
                    throw new Error("Received malformed JSON from API");
                }
            }
        } catch (e) {
            console.error("Failed to generate guide", e);
            // Fallback content so page doesn't crash
            setContent({
                title: unitTitle,
                description: "We couldn't generate a fresh guide right now. Here are some general tips to get you started!",
                sections: [
                    {
                        title: "Key Takeaways",
                        text: "Focus on understanding the core vocabulary of this topic. Consistency in learning is just as important as consistency in saving.",
                        highlight: "Tip: Try the quizzes in this unit to test your knowledge!"
                    },
                    {
                        title: "Study Tools",
                        items: [
                            { label: "Quizzes", desc: "Test your recall", icon: "quiz" },
                            { label: "Practice", desc: "Apply concepts in real life", icon: "fitness_center" }
                        ]
                    }
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    loadContent();
  }, [unitId, unitTitle]);

  if (loading) {
      return (
          <div className="h-full flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-text-primary-light dark:text-white transition-colors duration-300">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="font-bold text-lg animate-pulse">Preparing Guide...</p>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-2">Powered by Gemini</p>
          </div>
      );
  }

  if (!content) return null;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full flex flex-col font-display text-text-primary-light dark:text-white transition-colors duration-300">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5 flex items-center justify-between">
         <div className="w-10"></div> {/* Spacer for centering */}
         <h1 className="font-bold text-lg opacity-90 uppercase tracking-widest text-xs">Unit {unitId} Guide</h1>
         <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-text-secondary-light dark:text-text-secondary-dark">
            <span className="material-symbols-outlined">close</span>
         </button>
      </div>

      <div className="p-6 pb-24 space-y-8 flex-1 overflow-y-auto animate-fade-in">
         {/* Hero Section */}
         <div className="border-b border-border-light dark:border-white/10 pb-6">
            <h2 className="text-3xl font-bold mb-3 text-text-primary-light dark:text-white leading-tight">{content.title}</h2>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{content.description}</p>
         </div>

         {/* Sections */}
         {content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4 animate-slide-up" style={{animationDelay: `${idx * 100}ms`}}>
               <div className="flex items-center gap-2">
                   <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                   <h3 className="text-xl font-bold text-text-primary-light dark:text-white">{section.title}</h3>
               </div>
               
               <div className="bg-card-light dark:bg-card-dark rounded-2xl border border-border-light dark:border-white/5 p-5 shadow-sm dark:shadow-none">
                   {section.text && <p className="text-base leading-relaxed text-text-primary-light dark:text-white/90">{section.text}</p>}
                   
                   {section.highlight && (
                     <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-xl mt-4 flex gap-3">
                        <span className="material-symbols-outlined text-primary-dark dark:text-primary shrink-0">lightbulb</span>
                        <p className="font-bold text-primary-dark dark:text-primary text-sm leading-relaxed">{section.highlight}</p>
                     </div>
                   )}

                   {section.items && (
                     <div className="space-y-3 mt-2">
                        {section.items.map((item, i) => (
                           <div key={i} className="flex items-start gap-4 p-3 bg-background-light dark:bg-background-dark rounded-xl border border-transparent hover:border-border-light dark:hover:border-white/10 transition-colors">
                              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 text-text-secondary-light dark:text-text-secondary-dark">
                                 <span className="material-symbols-outlined">{item.icon}</span>
                              </div>
                              <div>
                                 <p className="font-bold text-base text-text-primary-light dark:text-white mb-0.5">{item.label}</p>
                                 <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{item.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                   )}
               </div>
            </div>
         ))}
      </div>
      
      {/* Footer Button */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-white/5 backdrop-blur-xl bg-opacity-90">
          <Button fullWidth size="lg" onClick={() => navigate(-1)}>
            I'm Ready
          </Button>
      </div>
    </div>
  );
};
