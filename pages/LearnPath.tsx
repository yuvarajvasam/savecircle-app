
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";
import { Loader2, Heart, Star, Lock, BookOpen, BarChart2, Check, Gift } from 'lucide-react';
import { INITIAL_USER } from '../constants';
import { getUser } from '../utils/storage';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 1. Initial Hardcoded Data (10 Units)
const INITIAL_UNITS = [
  {
    id: 1,
    title: "Intro to Investing",
    description: "Learn how to make your money grow.",
    color: "primary",
    lessons: [
      { id: '1-1', type: 'quiz', topic: 'Basics of Investing' },
      { id: '1-2', type: 'save', topic: 'Emergency Fund' },
      { id: '1-3', type: 'quiz', topic: 'Risk vs Reward' },
      { id: '1-4', type: 'quiz', topic: 'Stocks & Bonds' },
      { id: '1-5', type: 'quiz', topic: 'Diversification' },
      { id: '1-6', type: 'reward', topic: 'Unit Reward' },
    ]
  },
  {
    id: 2,
    title: "Smart Budgeting",
    description: "Master the 50/30/20 rule.",
    color: "sky",
    lessons: [
      { id: '2-1', type: 'quiz', topic: 'Income vs Expenses' },
      { id: '2-2', type: 'quiz', topic: 'Needs vs Wants' },
      { id: '2-3', type: 'save', topic: 'First Savings' },
      { id: '2-4', type: 'quiz', topic: 'Tracking Spending' },
      { id: '2-5', type: 'reward', topic: 'Unit Reward' },
    ]
  },
  {
    id: 3,
    title: "Credit & Debt",
    description: "Understand scores and loans.",
    color: "purple",
    lessons: [
        { id: '3-1', type: 'quiz', topic: 'Credit Scores' },
        { id: '3-2', type: 'quiz', topic: 'Interest Rates' },
        { id: '3-3', type: 'quiz', topic: 'Managing Debt' },
        { id: '3-4', type: 'reward', topic: 'Unit Reward' },
    ]
  },
  {
    id: 4,
    title: "Banking Basics",
    description: "Savings, checking, and interest.",
    color: "primary",
    lessons: [
        { id: '4-1', type: 'quiz', topic: 'Checking Accounts' },
        { id: '4-2', type: 'quiz', topic: 'Savings Accounts' },
        { id: '4-3', type: 'quiz', topic: 'Compound Interest' },
        { id: '4-4', type: 'save', topic: 'Open a Vault' },
        { id: '4-5', type: 'reward', topic: 'Unit Reward' },
    ]
  },
  {
    id: 5,
    title: "Taxes 101",
    description: "Understanding where your money goes.",
    color: "sky",
    lessons: [
        { id: '5-1', type: 'quiz', topic: 'Income Tax' },
        { id: '5-2', type: 'quiz', topic: 'Tax Brackets' },
        { id: '5-3', type: 'quiz', topic: 'Deductions' },
        { id: '5-4', type: 'reward', topic: 'Unit Reward' },
    ]
  },
  {
    id: 6,
    title: "Retirement Planning",
    description: "It's never too early to start.",
    color: "purple",
    lessons: [
        { id: '6-1', type: 'quiz', topic: 'Why Start Early' },
        { id: '6-2', type: 'quiz', topic: '401k & PF' },
        { id: '6-3', type: 'quiz', topic: 'IRA Basics' },
        { id: '6-4', type: 'save', topic: 'Long Term Goal' },
        { id: '6-5', type: 'reward', topic: 'Unit Reward' },
    ]
  },
  {
    id: 7,
    title: "Stock Market",
    description: "Bulls, bears, and dividends.",
    color: "primary",
    lessons: [
        { id: '7-1', type: 'quiz', topic: 'What is a Stock?' },
        { id: '7-2', type: 'quiz', topic: 'Market Indices' },
        { id: '7-3', type: 'quiz', topic: 'Dividends' },
        { id: '7-4', type: 'quiz', topic: 'Reading Charts' },
        { id: '7-5', type: 'reward', topic: 'Unit Reward' },
    ]
  },
  {
    id: 8,
    title: "Real Estate",
    description: "Property as an investment.",
    color: "sky",
    lessons: [
        { id: '8-1', type: 'quiz', topic: 'Buying vs Renting' },
        { id: '8-2', type: 'quiz', topic: 'Mortgages' },
        { id: '8-3', type: 'quiz', topic: 'REITs' },
        { id: '8-4', type: 'reward', topic: 'Unit Reward' },
    ]
  },
  {
    id: 9,
    title: "Insurance",
    description: "Protecting your wealth.",
    color: "purple",
    lessons: [
        { id: '9-1', type: 'quiz', topic: 'Health Insurance' },
        { id: '9-2', type: 'quiz', topic: 'Life Insurance' },
        { id: '9-3', type: 'quiz', topic: 'Premiums & Deductibles' },
        { id: '9-4', type: 'reward', topic: 'Unit Reward' },
    ]
  },
  {
    id: 10,
    title: "Financial Freedom",
    description: "Building passive income.",
    color: "primary",
    lessons: [
        { id: '10-1', type: 'quiz', topic: 'Passive Income' },
        { id: '10-2', type: 'quiz', topic: 'Side Hustles' },
        { id: '10-3', type: 'quiz', topic: 'FIRE Movement' },
        { id: '10-4', type: 'save', topic: 'Freedom Fund' },
        { id: '10-5', type: 'reward', topic: 'Unit Reward' },
    ]
  }
];

export const LearnPath: React.FC = () => {
  const [user] = useState(getUser());
  
  const [units, setUnits] = useState(() => {
    try {
      const storedUnits = localStorage.getItem('savecircle_units');
      return storedUnits ? JSON.parse(storedUnits) : INITIAL_UNITS;
    } catch (e) {
      console.error("Failed to load units from storage", e);
      return INITIAL_UNITS;
    }
  });
  
  const [processedUnits, setProcessedUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeUnitId, setActiveUnitId] = useState(1);
  
  const [hearts, setHearts] = useState(() => {
      return parseInt(localStorage.getItem('savecircle_hearts') || '5');
  });
  const [gems, setGems] = useState(() => {
      return parseInt(localStorage.getItem('savecircle_gems') || INITIAL_USER.gems.toString());
  });

  const observerTarget = useRef(null);
  const location = useLocation();

  // On Mount & Route Change: Calculate Progress & Sync Stats
  useEffect(() => {
      const calculateProgress = () => {
          const storedCompleted = JSON.parse(localStorage.getItem('savecircle_completed_lessons') || '[]');
          const storedHearts = localStorage.getItem('savecircle_hearts');
          const storedGems = localStorage.getItem('savecircle_gems');
          
          if (storedHearts) setHearts(parseInt(storedHearts));
          if (storedGems) setGems(parseInt(storedGems));

          let firstCurrentFound = false;
          let calculatedActiveUnit = 1;

          const updated = units.map((unit: any) => {
              let unitCompletedCount = 0;
              
              const updatedLessons = unit.lessons.map((lesson: any) => {
                  if (storedCompleted.includes(lesson.id)) {
                      unitCompletedCount++;
                      return { ...lesson, status: 'completed' };
                  } else if (!firstCurrentFound) {
                      firstCurrentFound = true;
                      calculatedActiveUnit = unit.id;
                      return { ...lesson, status: 'current' };
                  } else {
                      return { ...lesson, status: 'locked' };
                  }
              });

              return {
                  ...unit,
                  completed: unitCompletedCount,
                  total: unit.lessons.length,
                  lessons: updatedLessons
              };
          });

          setProcessedUnits(updated);
          setActiveUnitId(calculatedActiveUnit);
      };

      calculateProgress();
  }, [units, location]);

  // Infinite Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading) {
          await generateMoreUnits();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [units, loading]);

  const generateMoreUnits = async () => {
    if (loading) return; // Prevent multiple simultaneous calls
    setLoading(true);
    try {
      const lastUnit = units[units.length - 1];
      if (!lastUnit) return;
      
      // Determine next color cyclically
      const colors = ['primary', 'sky', 'purple'];
      const lastColorIndex = colors.indexOf(lastUnit.color);
      const nextColor = colors[(lastColorIndex + 1) % colors.length];
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
          The current financial literacy curriculum ends with "${lastUnit.title}" (${lastUnit.description}). 
          Generate 2 NEW, SEQUENTIAL units that logically follow this topic and continue the learning path.
          
          Each unit should have 4-5 lessons (mix of quiz and save types).
          The last lesson should always be a reward type.
          
          IMPORTANT: Descriptions must be VERY BRIEF - maximum 5-7 words, similar to these examples:
          - "Learn how to make your money grow."
          - "Master the 50/30/20 rule."
          - "Understand scores and loans."
          - "Savings, checking, and interest."
          
          Return a JSON array with exactly 2 units.
          Schema per unit:
          - title (string): Clear, engaging unit title
          - description (string): VERY BRIEF description (5-7 words max, like the examples above)
          - color (string): Must be one of "primary", "sky", or "purple"
          - lessons (array of 4-5 objects):
            - topic (string): Specific lesson topic
            - type (string): Must be "quiz" or "save"
        `,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        color: { type: Type.STRING },
                        lessons: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    topic: { type: Type.STRING },
                                    type: { type: Type.STRING }
                                }
                            }
                        }
                    },
                    required: ['title', 'description', 'color', 'lessons']
                }
            }
        }
      });

      if (response.text) {
        const newUnitsData = JSON.parse(response.text);
        
        // Transform Gemini data to match our internal state structure
        const newUnits = newUnitsData.map((u: any, idx: number) => {
            const newId = units.length + idx + 1;
            const unitColor = u.color && ['primary', 'sky', 'purple'].includes(u.color) 
                ? u.color 
                : colors[(lastColorIndex + idx + 1) % colors.length];
            
            // Ensure we have lessons
            const lessons = Array.isArray(u.lessons) && u.lessons.length > 0 
                ? u.lessons 
                : [
                    { topic: 'Introduction', type: 'quiz' },
                    { topic: 'Key Concepts', type: 'quiz' },
                    { topic: 'Practical Application', type: 'save' },
                    { topic: 'Advanced Topics', type: 'quiz' }
                  ];
            
            // Truncate description to be brief (max 50 characters or ~7 words)
            let description = u.description || `Continue your financial education journey.`;
            if (description.length > 50) {
                const words = description.split(' ');
                description = words.slice(0, 7).join(' ');
                if (description.length > 50) {
                    description = description.substring(0, 47) + '...';
                }
            }
            
            return {
                id: newId,
                title: u.title || `Unit ${newId}`,
                description: description,
                color: unitColor,
                lessons: [
                    ...lessons.map((l: any, lIdx: number) => ({
                        id: `${newId}-${lIdx + 1}`,
                        type: l.type === 'save' ? 'save' : 'quiz', // Ensure valid type
                        topic: l.topic || `Lesson ${lIdx + 1}`
                    })),
                    { id: `${newId}-${lessons.length + 1}`, type: 'reward', topic: 'Unit Reward' }
                ]
            };
        });

        setUnits((prev: any[]) => {
            const updated = [...prev, ...newUnits];
            localStorage.setItem('savecircle_units', JSON.stringify(updated));
            return updated;
        });
      } else {
        console.error("No response text from Gemini");
      }

    } catch (error) {
      console.error("Failed to generate new units:", error);
      // Don't set loading to false on error to allow retry
    } finally {
      setLoading(false);
    }
  };

  const renderUnit = (unit: any) => {
    const BTN_SIZE = 72;
    const GAP = 80; // Increased to accommodate lesson names
    const BASE_WIDTH = 400; // SVG viewBox width

    let currentY = 0;
    
    // Calculate coordinates for snake layout
    const coords = unit.lessons.map((lesson: any, i: number) => {
        const height = BTN_SIZE;
        let xPercent = 50;
        
        // Pattern: Center (Start) -> Left -> Center -> Right -> Center (End)
        if (i === unit.lessons.length - 1) {
            xPercent = 50; // Force end to center
        } else {
            const pattern = [50, 25, 50, 75];
            xPercent = pattern[i % 4];
        }

        const xSvg = (BASE_WIDTH * xPercent) / 100;
        const coord = { xPct: xPercent, x: xSvg, y: currentY, h: height, lesson };
        
        currentY += height + GAP;
        return coord;
    });

    const totalHeight = currentY + 20; // Add padding at bottom

    // Define colors based on unit theme
    let strokeColor = '#c9f158';
    if (unit.color === 'sky') strokeColor = '#38bdf8';
    if (unit.color === 'purple') strokeColor = '#a855f7';

    return (
        <div className="relative w-full mb-4" style={{ height: totalHeight }}>
            {/* 1. Background Track (Dashed Line) */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" viewBox={`0 0 ${BASE_WIDTH} ${totalHeight}`} preserveAspectRatio="none">
                {coords.map((pt: any, i: number) => {
                    if (i === coords.length - 1) return null;
                    const next = coords[i+1];
                    const startX = pt.x;
                    const startY = pt.y + (pt.h / 2);
                    const endX = next.x;
                    const endY = next.y + (next.h / 2);
                    const cp1Y = startY + (endY - startY) * 0.5;
                    const cp2Y = endY - (endY - startY) * 0.5;
                    const d = `M ${startX} ${startY} C ${startX} ${cp1Y}, ${endX} ${cp2Y}, ${endX} ${endY}`;

                    return (
                        <path 
                            key={`track-${i}`}
                            d={d} 
                            fill="none" 
                            stroke="currentColor"
                            strokeWidth="8" 
                            strokeDasharray="15 15" 
                            className="text-black/5 dark:text-white/10"
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    );
                })}
            </svg>

            {/* 2. Progress Path (Solid Line on top) */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" viewBox={`0 0 ${BASE_WIDTH} ${totalHeight}`} preserveAspectRatio="none">
                {coords.map((pt: any, i: number) => {
                    if (i === coords.length - 1) return null;
                    const next = coords[i+1];
                    
                    // Only draw solid line if current lesson is completed
                    if (pt.lesson.status !== 'completed') return null;

                    const startX = pt.x;
                    const startY = pt.y + (pt.h / 2);
                    const endX = next.x;
                    const endY = next.y + (next.h / 2);
                    const cp1Y = startY + (endY - startY) * 0.5;
                    const cp2Y = endY - (endY - startY) * 0.5;
                    const d = `M ${startX} ${startY} C ${startX} ${cp1Y}, ${endX} ${cp2Y}, ${endX} ${endY}`;
                    
                    return (
                        <path 
                            key={`prog-${i}`}
                            d={d} 
                            fill="none" 
                            stroke={strokeColor} 
                            strokeWidth="8" 
                            strokeDasharray="15 15"
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="transition-all duration-700 ease-out"
                        />
                    );
                })}
            </svg>
            
            {/* 3. Lesson Nodes */}
            {coords.map((pt: any) => {
                const { lesson, xPct, y, h } = pt;
                const isCurrent = lesson.status === 'current';
                const isCompleted = lesson.status === 'completed';
                const isLocked = lesson.status === 'locked';
                const isReward = lesson.type === 'reward';

                // Node Styles
                let bgClass = 'bg-gray-200 dark:bg-[#2c2c2e]';
                let iconColorClass = 'text-gray-400 dark:text-white/20';
                let shadowClass = 'shadow-[0_6px_0_rgba(0,0,0,0.1)] dark:shadow-[0_6px_0_rgba(255,255,255,0.05)]';
                let borderClass = 'border-4 border-transparent';
                
                if (isCompleted) {
                     // Completed styling
                     bgClass = unit.color === 'primary' ? 'bg-[#c9f158]' : unit.color === 'sky' ? 'bg-sky-400' : 'bg-purple-500';
                     shadowClass = unit.color === 'primary' ? 'shadow-[0_6px_0_#a3cc39]' : unit.color === 'sky' ? 'shadow-[0_6px_0_#0284c7]' : 'shadow-[0_6px_0_#7e22ce]';
                     iconColorClass = unit.color === 'primary' ? 'text-black' : 'text-white';
                } else if (isCurrent) {
                     // Current styling (like Completed but with Start indicator)
                     bgClass = unit.color === 'primary' ? 'bg-[#c9f158]' : unit.color === 'sky' ? 'bg-sky-400' : 'bg-purple-500';
                     shadowClass = unit.color === 'primary' ? 'shadow-[0_6px_0_#a3cc39]' : unit.color === 'sky' ? 'shadow-[0_6px_0_#0284c7]' : 'shadow-[0_6px_0_#7e22ce]';
                     iconColorClass = unit.color === 'primary' ? 'text-black' : 'text-white';
                }
                
                if (isReward) {
                     if(isCompleted || isCurrent) {
                        bgClass = 'bg-[#ffd900]'; 
                        shadowClass = 'shadow-[0_6px_0_#d4b400]';
                        iconColorClass = 'text-yellow-900';
                     } else {
                        // Locked Reward
                        bgClass = 'bg-gray-200 dark:bg-[#2c2c2e]';
                        borderClass = 'border-4 border-gray-300 dark:border-white/10';
                     }
                }

                // Adjust translateY for pressed effect
                const translateY = isLocked ? '' : 'active:translate-y-[6px] active:shadow-none transition-all';

                // Determine which side to place the lesson name
                const nameOnRight = xPct < 50; // Left or center-left lessons get name on right
                const nameOnLeft = xPct > 50; // Right lessons get name on left
                const nameSide = nameOnRight ? 'right' : nameOnLeft ? 'left' : 'right'; // Default to right for center

                return (
                    <div 
                        key={lesson.id} 
                        className="absolute transform -translate-x-1/2 z-10 flex flex-col items-center justify-center" 
                        style={{ top: y, left: `${xPct}%`, width: h, height: h }}
                    >
                        {isCurrent && (
                            <div className="absolute -top-14 z-30 flex flex-col items-center animate-bounce-subtle pointer-events-none">
                                <div className="bg-white dark:bg-[#333] px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg mb-1 border border-gray-100 dark:border-white/10 text-primary-dark dark:text-primary">
                                    Start
                                </div>
                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white dark:border-t-[#333]"></div>
                            </div>
                        )}

                        <Link 
                            to={isLocked ? '#' : `/lesson/${lesson.id}?type=${lesson.type}&topic=${encodeURIComponent(lesson.topic)}`}
                            className={`
                                relative w-full h-full rounded-full flex items-center justify-center
                                ${bgClass} ${borderClass} ${shadowClass} ${translateY}
                                ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
                            `}
                        >
                             {isReward ? (
                                 <Gift size={32} className={`${iconColorClass}`} strokeWidth={2.5} />
                             ) : isLocked ? (
                                 <Lock size={24} className={`${iconColorClass}`} strokeWidth={3} />
                             ) : isCompleted ? (
                                 <Check size={32} className={`${iconColorClass}`} strokeWidth={4} />
                             ) : (
                                 <Star size={32} className={`${iconColorClass} fill-current`} strokeWidth={2} />
                             )}
                        </Link>

                        {/* Lesson Name - Positioned to the side */}
                        {!isReward && (
                            <div 
                                className={`absolute top-1/2 -translate-y-1/2 z-20 max-w-[120px] ${nameSide === 'right' ? 'left-full ml-3 text-left' : 'right-full mr-3 text-right'} ${isLocked ? 'text-gray-400 dark:text-gray-600' : isCompleted || isCurrent ? 'text-text-primary-light dark:text-white font-bold' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
                            >
                                <p className="text-xs font-medium leading-tight">{lesson.topic}</p>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-background-light dark:bg-background-dark font-display overflow-hidden transition-colors duration-300">
      
      {/* Header - Fixed glassmorphism overlay matching other pages */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 py-3 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl border-b border-border-light dark:border-white/5 transition-all duration-300 h-[64px]">
        <div className="flex items-center gap-3">
            <Link to="/" className="w-10 h-10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-text-secondary-light dark:text-white">
                <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h1 className="text-lg font-bold text-text-primary-light dark:text-white">Learning</h1>
        </div>
        
        <div className="flex items-center gap-2">
            {/* Hearts */}
            <div className="h-9 px-3 rounded-xl flex items-center gap-1.5 text-red-500">
                <Heart size={24} className="fill-current" />
                <span className="font-bold text-lg">{hearts}</span>
            </div>
            {/* Gems */}
            <Link to="/shop" className="h-9 px-3 rounded-xl flex items-center gap-1.5 text-sky-500 hover:bg-sky-500/10 transition-colors">
                <span className="material-symbols-outlined filled text-xl">diamond</span>
                <span className="font-bold text-lg">{gems}</span>
            </Link>
            
            {/* Prominent Stats Button */}
            <Link to="/learning-dashboard" className="w-10 h-10 rounded-xl bg-primary text-primary-content flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all ml-1">
               <BarChart2 size={22} strokeWidth={2.5} />
            </Link>
        </div>
      </header>

      <div className="relative w-full flex-1 overflow-y-auto no-scrollbar scroll-smooth pb-24">
        
        {processedUnits.map((unit, idx) => (
            <div key={unit.id} className={`relative mb-8 ${idx === 0 ? 'pt-[64px]' : ''}`}>
                {/* Sticky Unit Header */}
                <div className={`
                    sticky top-[64px] z-40 mx-4 mb-8 p-5 rounded-3xl flex justify-between items-center shadow-lg shadow-black/5 transition-transform
                    ${unit.color === 'primary' ? 'bg-[#c9f158] text-black' : ''}
                    ${unit.color === 'sky' ? 'bg-sky-500 text-white' : ''}
                    ${unit.color === 'purple' ? 'bg-purple-500 text-white' : ''}
                `}>
                    <div>
                        <h3 className={`text-xs font-bold uppercase tracking-widest opacity-70 mb-1 ${unit.color === 'primary' ? 'text-black' : 'text-white'}`}>Unit {unit.id}</h3>
                        <h2 className={`text-xl font-bold leading-tight ${unit.color === 'primary' ? 'text-black' : 'text-white'}`}>{unit.title}</h2>
                        <p className={`text-sm font-medium mt-1 opacity-90 leading-snug ${unit.color === 'primary' ? 'text-black' : 'text-white'}`}>{unit.description}</p>
                    </div>
                    
                    <Link 
                        to={`/guide/${unit.id}?title=${encodeURIComponent(unit.title)}`} 
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform active:scale-95 border-2 shrink-0 ml-4 ${unit.color === 'primary' ? 'bg-black/10 border-black/5 text-black' : 'bg-white/20 border-white/10 text-white'}`}
                    >
                        <BookOpen size={24} strokeWidth={2} />
                    </Link>
                </div>

                {/* Lessons Path */}
                <div className="relative z-[1] w-full px-4">
                    {renderUnit(unit)}
                </div>
            </div>
        ))}

        {/* Loader for Infinite Scroll */}
        <div ref={observerTarget} className="h-32 flex items-center justify-center">
            {loading && (
                <div className="flex flex-col items-center text-text-secondary-light dark:text-text-secondary-dark bg-white/50 dark:bg-black/20 backdrop-blur-sm p-4 rounded-2xl">
                    <Loader2 className="animate-spin mb-2 text-primary" size={24} />
                    <span className="text-xs font-bold uppercase tracking-wider">Loading Next Unit...</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
