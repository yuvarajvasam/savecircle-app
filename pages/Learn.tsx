

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { X, Check, PiggyBank, Loader2, Gift, Heart, HeartCrack, Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { GoogleGenAI, Type } from "@google/genai";
import { getStaticLesson, INITIAL_USER } from '../constants';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface Question {
  question: string;
  options: { text: string; icon: string }[];
  correctAnswerIndex: number;
  explanation: string;
}

export const Learn: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'quiz';
  const topic = searchParams.get('topic') || 'Financial Literacy';
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  // Gamification State
  const [step, setStep] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  
  // Persistent Hearts State
  const [hearts, setHearts] = useState(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('savecircle_heart_date');
    const storedHearts = localStorage.getItem('savecircle_hearts');

    if (storedDate !== today) {
        // New Day Reset
        localStorage.setItem('savecircle_heart_date', today);
        localStorage.setItem('savecircle_hearts', '5');
        return 5;
    }
    return storedHearts ? parseInt(storedHearts) : 5;
  });

  // Persistent Gems State
  const [userGems, setUserGems] = useState(() => {
      const stored = localStorage.getItem('savecircle_gems');
      return stored ? parseInt(stored) : INITIAL_USER.gems;
  });

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const generateLesson = async () => {
      const storageKey = `savecircle_lesson_data_${id}`;

      // Handle Special Types immediately
      if (type === 'save' || type === 'reward') {
        setLoading(false);
        return;
      }

      // Check Local Storage first
      const storedLesson = localStorage.getItem(storageKey);
      if (storedLesson) {
          setQuestions(JSON.parse(storedLesson));
          setLoading(false);
          return;
      }

      // Check if it's a predefined unit (1-10)
      const unitId = parseInt(id?.split('-')[0] || '0');
      if (unitId > 0 && unitId <= 10) {
          const staticData = getStaticLesson(id || '', topic);
          setQuestions(staticData);
          setLoading(false);
          return;
      }

      // Fallback to Gemini for Unit 11+
      setLoading(true);
      try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Create a fun, gamified quiz with 5 to 10 multiple-choice questions about "${topic}" for a financial literacy app.
                       The tone should be encouraging and simple. 
                       Each option should have a relevant single emoji as an icon.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING },
                            options: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        text: { type: Type.STRING },
                                        icon: { type: Type.STRING }
                                    }
                                }
                            },
                            correctAnswerIndex: { type: Type.INTEGER },
                            explanation: { type: Type.STRING }
                        }
                    }
                }
            }
        });

        if (response.text) {
            const data = JSON.parse(response.text);
            setQuestions(data);
            localStorage.setItem(storageKey, JSON.stringify(data));
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load lesson. Please try again.");
        // Fallback data if API fails
        setQuestions([{
            question: "What is the most important rule of saving?",
            options: [{ text: "Spend first", icon: "💸" }, { text: "Pay yourself first", icon: "💰" }],
            correctAnswerIndex: 1,
            explanation: "Paying yourself first ensures you save before spending on other things."
        }]);
      } finally {
        setLoading(false);
      }
    };

    generateLesson();
  }, [topic, type, id]);

  const updateHearts = (newCount: number) => {
      setHearts(newCount);
      localStorage.setItem('savecircle_hearts', newCount.toString());
  };

  const handleCheck = () => {
     if (type === 'save' || type === 'reward') {
        setStep(1); 
        setStatus('correct'); // Reuse correct state for visual feedback
        return;
     }
     
     if (selectedOption !== null) {
        const currentQ = questions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQ.correctAnswerIndex;
        
        if (isCorrect) {
            setStatus('correct');
        } else {
            setStatus('wrong');
            updateHearts(Math.max(0, hearts - 1));
        }
     }
  };

  const completeLesson = () => {
      if (!id) return;

      // 1. Update Completed Lessons
      const completed = JSON.parse(localStorage.getItem('savecircle_completed_lessons') || '[]');
      if (!completed.includes(id)) {
          completed.push(id);
          localStorage.setItem('savecircle_completed_lessons', JSON.stringify(completed));
          
          // 2. Update XP
          const currentXp = parseInt(localStorage.getItem('savecircle_xp') || '2500');
          const xpGain = type === 'reward' ? 100 : 20;
          localStorage.setItem('savecircle_xp', (currentXp + xpGain).toString());

          // 3. Update Gems
          const currentGems = parseInt(localStorage.getItem('savecircle_gems') || INITIAL_USER.gems.toString());
          const gemGain = type === 'reward' ? 50 : 10;
          localStorage.setItem('savecircle_gems', (currentGems + gemGain).toString());
      }

      navigate('/learn');
  };

  const handleContinue = () => {
     if (type === 'save' || type === 'reward') {
         completeLesson();
         return;
     }

     // Check if game over condition was met
     if (status === 'wrong' && hearts === 0) {
        setIsGameOver(true);
        return;
     }

     // If answer was wrong, append current question to end of list so user must retry it later
     if (status === 'wrong') {
         const currentQ = questions[currentQuestionIndex];
         setQuestions(prev => [...prev, currentQ]);
     }

     if (currentQuestionIndex < questions.length - 1) {
         setCurrentQuestionIndex(prev => prev + 1);
         setSelectedOption(null);
         setStatus('idle');
     } else {
         // All questions done (including retries)
         setIsQuizComplete(true);
         setStatus('idle');
     }
  };

  const handleRefillHearts = () => {
      const REFILL_COST = 50;
      if (userGems >= REFILL_COST) {
          const newGems = userGems - REFILL_COST;
          setUserGems(newGems);
          localStorage.setItem('savecircle_gems', newGems.toString());
          
          updateHearts(5);
          setIsGameOver(false);
          setStatus('idle');
          // We do not reset the question index, letting them retry from where they left off
      } else {
          alert("Not enough gems to refill hearts!");
      }
  };

  const handleExit = () => setShowExitDialog(true);
  const confirmExit = () => navigate('/learn');
  const cancelExit = () => setShowExitDialog(false);

  if (loading) {
      return (
          <div className="h-full flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-text-primary-light dark:text-white">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="font-bold text-lg animate-pulse">Generating Lesson...</p>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2">Powered by Gemini</p>
          </div>
      );
  }

  // GAME OVER SCREEN
  if (isGameOver) {
      return (
          <div className="h-full flex flex-col items-center justify-center bg-background-light dark:bg-background-dark p-6 text-center animate-fade-in">
              <div className="w-32 h-32 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-500 mb-8 border-4 border-red-500/20 animate-pulse">
                  <HeartCrack size={64} strokeWidth={1.5} />
              </div>
              
              <h2 className="text-3xl font-bold text-text-primary-light dark:text-white mb-3">Out of Hearts!</h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg max-w-xs mb-10 leading-relaxed">
                  You need hearts to continue learning. Refill them now to keep your streak alive!
              </p>
              
              <div className="w-full max-w-xs space-y-3">
                  <Button fullWidth size="lg" onClick={handleRefillHearts} disabled={userGems < 50} className={userGems < 50 ? "opacity-50" : ""}>
                      <div className="flex items-center gap-2">
                        <Plus size={20} /> 
                        Refill Hearts
                        <span className="bg-black/20 px-2 py-0.5 rounded text-sm flex items-center gap-1 ml-1">
                            50 <span className="material-symbols-outlined text-xs filled">diamond</span>
                        </span>
                      </div>
                  </Button>
                  {userGems < 50 && (
                      <p className="text-xs text-red-500 font-bold">Not enough gems ({userGems})</p>
                  )}
                  <Button fullWidth variant="text" onClick={confirmExit} className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white">
                      Quit Lesson
                  </Button>
              </div>
          </div>
      );
  }

  const currentQ = questions[currentQuestionIndex];
  // Progress calculation
  let progress = 0;
  if (type === 'save' || type === 'reward') {
      progress = step === 1 ? 100 : 50;
  } else {
      // Progress bar logic: 
      // If errors occur, total questions length increases, so progress might appear to jump back slightly
      // This is a known "feature" of dynamic queues (Duolingo style)
      progress = isQuizComplete ? 100 : ((currentQuestionIndex) / questions.length) * 100;
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full flex flex-col relative transition-colors duration-300 overflow-hidden">
       {/* Header */}
       <div className="px-4 pt-4 pb-2 flex items-center justify-between sticky top-0 bg-background-light dark:bg-background-dark z-10">
          <button onClick={handleExit} className="text-gray-400 hover:text-neo-black dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
             <X size={24} strokeWidth={2.5} />
          </button>
          <div className="flex-1 mx-4 h-4 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
             <div 
               className="h-full bg-primary transition-all duration-500 ease-out rounded-full relative" 
               style={{ width: `${progress}%` }}
             >
                <div className="absolute top-1 right-2 w-6 h-1 bg-white/30 rounded-full"></div>
             </div>
          </div>
          <div className={`flex items-center gap-1 font-bold transition-transform ${hearts <= 1 ? 'text-red-500 animate-pulse scale-110' : 'text-red-500'}`}>
             <Heart size={24} className="fill-current" strokeWidth={0} />
             <span className="text-lg">{hearts}</span>
          </div>
       </div>

       {/* Content Area */}
       <div className="flex-1 px-4 flex flex-col justify-center max-w-sm mx-auto w-full pb-32">
          
          {/* SAVE TYPE LEVEL */}
          {type === 'save' && step === 0 && (
             <div className="text-center animate-slide-up">
                <div className="w-40 h-40 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-primary">
                   <PiggyBank size={64} className="text-primary-dark dark:text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-text-primary-light dark:text-white mb-2">Action: {topic}</h2>
                <p className="text-text-secondary-light dark:text-text-secondary-dark font-medium text-lg mb-8">
                    Deposit <span className="text-primary-dark dark:text-primary font-bold">₹50</span> to complete this step.
                </p>
                
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl border-2 border-border-light dark:border-white/10 mb-4 text-left">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-text-secondary-light uppercase">Source</span>
                      <span className="text-xs font-bold text-text-primary-light dark:text-white">UPI •••45</span>
                   </div>
                   <div className="text-3xl font-bold text-text-primary-light dark:text-white">₹50.00</div>
                </div>
             </div>
          )}

          {/* REWARD TYPE LEVEL */}
          {type === 'reward' && step === 0 && (
             <div className="text-center animate-slide-up">
                <div className="w-40 h-40 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-purple-500 animate-bounce-subtle">
                   <Gift size={64} className="text-purple-600 dark:text-purple-400" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-text-primary-light dark:text-white mb-2">Unit Complete!</h2>
                <p className="text-text-secondary-light dark:text-text-secondary-dark font-medium text-lg mb-8">
                    Claim your reward for finishing <br/> <span className="font-bold text-text-primary-light dark:text-white">{topic}</span>
                </p>
                
                <div className="flex justify-center gap-4">
                    <div className="bg-card-light dark:bg-card-dark px-6 py-4 rounded-2xl border border-border-light dark:border-white/10 flex flex-col items-center">
                        <span className="text-2xl mb-1">💎</span>
                        <span className="font-bold text-lg">50 Gems</span>
                    </div>
                    <div className="bg-card-light dark:bg-card-dark px-6 py-4 rounded-2xl border border-border-light dark:border-white/10 flex flex-col items-center">
                        <span className="text-2xl mb-1">⚡</span>
                        <span className="font-bold text-lg">100 XP</span>
                    </div>
                </div>
             </div>
          )}

          {(type === 'save' || type === 'reward') && step === 1 && (
              <div className="text-center animate-fade-in">
                  <div className={`w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(201,241,88,0.3)] ${type === 'reward' ? 'bg-purple-500' : 'bg-primary'}`}>
                     <Check size={64} className="text-white dark:text-black" strokeWidth={4} />
                  </div>
                  <h2 className="text-3xl font-bold text-text-primary-light dark:text-white mb-4">{type === 'reward' ? 'Claimed!' : 'Saved!'}</h2>
                  <div className="flex justify-center gap-3 mb-8">
                     <div className="px-4 py-2 bg-card-light dark:bg-white/10 rounded-xl font-bold text-primary-dark dark:text-primary text-sm border border-primary/30">
                        +{type === 'reward' ? '100' : '20'} XP
                     </div>
                     <div className="px-4 py-2 bg-card-light dark:bg-white/10 rounded-xl font-bold text-sky-600 dark:text-sky-400 text-sm border border-sky-500/30 flex items-center gap-1">
                        +{type === 'reward' ? '50' : '10'} <span className="material-symbols-outlined text-sm filled">diamond</span>
                     </div>
                  </div>
              </div>
          )}

          {/* QUIZ COMPLETION */}
          {isQuizComplete && (
              <div className="text-center animate-fade-in">
                  <div className="w-40 h-40 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(201,241,88,0.3)]">
                     <Check size={64} className="text-background-dark" strokeWidth={4} />
                  </div>
                  <h2 className="text-3xl font-bold text-text-primary-light dark:text-white mb-4">Lesson Complete!</h2>
                  <div className="flex justify-center gap-3 mb-8">
                     <div className="px-4 py-2 bg-card-light dark:bg-white/10 rounded-xl font-bold text-primary-dark dark:text-primary text-sm border border-primary/30">
                        +20 XP
                     </div>
                     <div className="px-4 py-2 bg-card-light dark:bg-white/10 rounded-xl font-bold text-sky-600 dark:text-sky-400 text-sm border border-sky-500/30 flex items-center gap-1">
                        +10 <span className="material-symbols-outlined text-sm filled">diamond</span>
                     </div>
                  </div>
              </div>
          )}

          {/* QUIZ TYPE LEVEL */}
          {type === 'quiz' && currentQ && !isQuizComplete && (
             <div className="animate-slide-up">
                <h2 className="text-2xl font-bold text-text-primary-light dark:text-white mb-8 leading-tight">{currentQ.question}</h2>
                
                <div className="grid grid-cols-1 gap-3">
                   {currentQ.options.map((option, index) => {
                      const isSelected = selectedOption === index;
                      
                      return (
                         <button
                            key={index}
                            disabled={status !== 'idle'}
                            onClick={() => setSelectedOption(index)}
                            className={`
                                w-full p-4 rounded-2xl border-2 border-b-4 text-left transition-all active:scale-95 flex items-center gap-4
                                ${isSelected 
                                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300' 
                                    : 'border-gray-200 dark:border-white/10 bg-white dark:bg-[#2c2c2e] text-text-primary-light dark:text-white hover:bg-gray-50 dark:hover:bg-[#3a3a3c]'
                                }
                            `}
                         >
                            <span className="text-2xl">{option.icon}</span>
                            <span className="font-bold text-base">{option.text}</span>
                         </button>
                      );
                   })}
                </div>
             </div>
          )}
       </div>

       {/* FIXED BOTTOM FOOTER AREA */}
       <div className="fixed bottom-0 left-0 w-full z-50">
            {/* IDLE STATE BUTTON */}
            {status === 'idle' && !isQuizComplete && (
                <div className="p-4 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-white/5">
                     <Button 
                        fullWidth 
                        size="lg"
                        onClick={handleCheck}
                        disabled={type === 'quiz' && selectedOption === null}
                        className={type === 'quiz' && selectedOption === null ? 'opacity-50' : ''}
                    >
                        {type === 'save' ? 'Deposit ₹50' : type === 'reward' ? 'Claim Reward' : 'Check Answer'}
                    </Button>
                </div>
            )}

            {/* CORRECT STATE DRAWER */}
            {status === 'correct' && !isQuizComplete && (
                <div className="p-6 pb-8 bg-[#d7ffb8] dark:bg-[#1a2e05] border-t-2 border-[#bef264] dark:border-[#3f6212] animate-slide-up">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-black/20 flex items-center justify-center text-green-600 dark:text-green-400">
                                <Check size={32} strokeWidth={4} />
                            </div>
                            <div className="text-green-800 dark:text-green-100 font-bold text-2xl">Nice job!</div>
                        </div>
                        <Button 
                            fullWidth 
                            variant="success" 
                            size="lg"
                            onClick={handleContinue}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            )}

            {/* WRONG STATE DRAWER */}
            {status === 'wrong' && currentQ && !isQuizComplete && (
                <div className="p-6 pb-8 bg-[#ffdfe0] dark:bg-[#2e0505] border-t-2 border-[#fca5a5] dark:border-[#7f1d1d] animate-slide-up">
                     <div className="max-w-md mx-auto">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-black/20 flex items-center justify-center text-red-600 dark:text-red-400">
                                <X size={32} strokeWidth={4} />
                            </div>
                            <div className="text-red-800 dark:text-red-100 font-bold text-2xl">Incorrect</div>
                        </div>
                        
                        <div className="mb-6 pl-16">
                            <p className="text-red-800 dark:text-red-200 text-sm font-bold uppercase mb-1">Correct Answer:</p>
                            <p className="text-red-900 dark:text-red-50 font-medium">{currentQ.options[currentQ.correctAnswerIndex].text}</p>
                            <p className="text-red-700 dark:text-red-300 text-sm mt-2 italic">"{currentQ.explanation}"</p>
                        </div>

                        <Button 
                            fullWidth 
                            variant="danger" 
                            size="lg"
                            onClick={handleContinue}
                        >
                            {hearts === 0 ? 'See Result' : 'Got it'}
                        </Button>
                    </div>
                </div>
            )}

            {/* QUIZ COMPLETE FOOTER */}
            {isQuizComplete && (
                <div className="p-4 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-white/5">
                     <Button 
                        fullWidth 
                        size="lg"
                        onClick={completeLesson}
                    >
                        Continue
                    </Button>
                </div>
            )}
       </div>

       {/* EXIT CONFIRMATION MODAL */}
       {showExitDialog && (
            <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-card-light dark:bg-card-dark rounded-[2rem] p-6 w-full max-w-sm border-2 border-border-light dark:border-white/10 shadow-2xl animate-slide-up">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-500 mb-4">
                            <HeartCrack size={40} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary-light dark:text-white mb-2">Wait, don't go!</h3>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark font-medium">
                            You'll lose your progress for this lesson if you quit now.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button variant="primary" fullWidth onClick={cancelExit}>
                            Keep Learning
                        </Button>
                        <Button variant="text" fullWidth onClick={confirmExit} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">
                            End Session
                        </Button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};