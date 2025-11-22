

import { User, Circle, Challenge, Lesson, LeaderboardEntry, ShopItem, InvestmentPlan } from './types';

export const INITIAL_USER: User = {
  name: "Ananya",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD8cmUy1-UybK7FNX9IIYBS08iHC4okIxIdgAARU1m3SE2O9NqtmFUTs9QABYYqgSA6YFVXHYCZ2ErT9I8G8q5QlBes8ls4TstNbEBwN3WpNwBQRhnR8w-M1upOjGf3hEWL388X1UVaGsQAbiWqFwXex6zJI50kUtoP5rZvKePkDboTpBoyGbV-KdK5eHTfB-h0mE30PVC6afDZsgpLBQrNOpyfWT03yJ3zxhSWZC7Hu3ayOY1KXqt6CrBVewWkrQ2WvuUtfFJ738",
  streak: 10,
  dailyGoal: 100,
  currency: "₹",
  savedThisMonth: 2850,
  totalSaved: 6400,
  savedToday: 0,
  consistencyScore: 92,
  level: 3,
  xp: 2500,
  nextLevelXp: 3800,
  gems: 450
};

export const INVESTMENT_PLANS: InvestmentPlan[] = [
  {
    id: 'plan_low',
    name: 'Safe Haven',
    risk: 'Low',
    minReturn: 5,
    maxReturn: 7,
    description: 'Ideal for short-term goals. Your money is invested in government bonds and liquid funds. Very low volatility.',
    tags: ['Stable', 'Low Risk', 'Govt Backed'],
    color: 'text-green-500'
  },
  {
    id: 'plan_med',
    name: 'Balanced Growth',
    risk: 'Medium',
    minReturn: 8,
    maxReturn: 12,
    description: 'A mix of blue-chip stocks and bonds. Good for goals 1-3 years away. Offers better returns with moderate fluctuations.',
    tags: ['Balanced', 'Index Funds', 'Top 50 Cos'],
    color: 'text-blue-500'
  },
  {
    id: 'plan_high',
    name: 'High Flyer',
    risk: 'High',
    minReturn: -15,
    maxReturn: 25,
    description: 'Pure equity exposure in emerging markets. High volatility means your balance will fluctuate daily, but offers highest long-term potential.',
    tags: ['Aggressive', 'Small Cap', 'High Reward'],
    color: 'text-orange-500'
  }
];

export const MOCK_SHOP_ITEMS: ShopItem[] = [
  {
    id: 's1',
    name: 'Streak Freeze',
    description: 'Miss a day of saving without losing your streak.',
    cost: 200,
    icon: 'ac_unit',
    type: 'powerup',
    purchased: false
  },
  {
    id: 's2',
    name: 'Double or Nothing',
    description: 'Double your 50 gem wager by maintaining a 7 day streak.',
    cost: 50,
    icon: 'casino',
    type: 'powerup',
    purchased: false
  },
  {
    id: 's3',
    name: 'Gold Avatar',
    description: 'Stand out in the leaderboard with a golden border.',
    cost: 1000,
    icon: 'workspace_premium',
    type: 'cosmetic',
    purchased: false
  }
];

export const MOCK_CIRCLES: Circle[] = [
  {
    id: "vault",
    name: "My Vault",
    membersCount: 1,
    streak: 124,
    consistency: 100,
    poolTotal: 6400, // synced with initial user
    isUserMember: true,
    theme: 'obsidian',
    icon: 'Lock',
    iconType: 'lucide',
    iconColor: 'text-primary',
    investedAmount: 0,
    members: [
        { id: 'u1', name: 'You', avatar: INITIAL_USER.avatar, consistency: 100, hasPaid: true }
    ],
    activity: [
        { id: 'v1', userId: 'u1', userName: 'You', userAvatar: INITIAL_USER.avatar, action: 'saved', timestamp: '9:00 AM', reactions: 0 },
        { id: 'v2', userId: 'sys', userName: 'System', userAvatar: '', action: 'saved', timestamp: 'Yesterday', reactions: 0 },
    ],
    messages: [
        { id: 'm1', userId: 'u1', text: 'Added ₹500 to my emergency fund.', timestamp: 'Oct 24, 10:30 AM', type: 'msg' },
        { id: 'm2', userId: 'sys', text: 'You reached your weekly goal!', timestamp: 'Oct 23', type: 'event' },
        { id: 'm3', userId: 'u1', text: 'Saving up for that new laptop.', timestamp: 'Oct 22, 09:15 AM', type: 'msg' }
    ]
  },
  {
    id: "c3",
    name: "New Macbook",
    membersCount: 1,
    streak: 45,
    consistency: 100,
    poolTotal: 120000,
    isUserMember: true,
    theme: 'purple',
    icon: 'Laptop',
    iconType: 'lucide',
    iconColor: 'text-purple-400',
    investedAmount: 0,
    members: [
        { id: 'u1', name: 'You', avatar: INITIAL_USER.avatar, consistency: 100, hasPaid: true }
    ],
    activity: [],
    messages: [
        { id: 'm1', userId: 'u1', text: 'Just 2 months left until purchase!', timestamp: 'Today, 08:00 AM', type: 'msg' }
    ]
  },
  {
    id: "c1",
    name: "Weekend Warriors",
    membersCount: 3,
    streak: 9,
    consistency: 97,
    poolTotal: 8120,
    isUserMember: true,
    theme: 'sunset',
    inviteCode: 'WKND24',
    icon: 'Zap',
    iconType: 'lucide',
    iconColor: 'text-orange-400',
    investedAmount: 0,
    members: [
       { id: 'u1', name: 'You', avatar: INITIAL_USER.avatar, consistency: 95, hasPaid: false },
       { id: 'u2', name: 'Riya', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAav4R4n7Af7Add3v6NzQglFBLgpEEMKxRYY5iEVvlbV70vUhCHg2CKXbjJzmxU-82smI9ZUJpoInXImgjcWr1uq9kC5PK8xwfCMkSEdvPBduXC5uNw4CAbuUzLNNkA0nPkizMSw8LfMS3ExzRU0OY3mvCLaDk7MhSUAt4q4tGhlpPsu0VEZ2gpUIaTUkJcXoN1JyTW-I2GqzEe5TmjAZfgEwLUF_0vvhZxwhVVji1GvWEZaIH7ARloIJDDW6zghQieLWYbXVzh028', consistency: 100, hasPaid: true },
       { id: 'u3', name: 'Alex', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc0U_Dp-IasYy2QfHPsk7HCUMamZELQRbxfxADdXu2Fc0g50GQnZfMgTuYZTQLnETjlukrM9VxdawmM6laXahME5cCXmFeBu0GhjSPqz8vm2cNuNNxW40WGwAbcIqo4_ayJJ3F4mLVeRQuijvjvIKuWGJm29ID6QsrbZ2Cf_ygLfXBABuu4-KjQ67pIIbDYnkWO8ZKo8y_IyGcOkDLCE7-rAyltSzH00PBACSUJH_V-SFEupa9xANeui3ORKDk7RZQneeFUg-UNXA', consistency: 99, hasPaid: false },
    ],
    activity: [
        { id: 'a1', userId: 'u2', userName: 'Riya', userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAav4R4n7Af7Add3v6NzQglFBLgpEEMKxRYY5iEVvlbV70vUhCHg2CKXbjJzmxU-82smI9ZUJpoInXImgjcWr1uq9kC5PK8xwfCMkSEdvPBduXC5uNw4CAbuUzLNNkA0nPkizMSw8LfMS3ExzRU0OY3mvCLaDk7MhSUAt4q4tGhlpPsu0VEZ2gpUIaTUkJcXoN1JyTW-I2GqzEe5TmjAZfgEwLUF_0vvhZxwhVVji1GvWEZaIH7ARloIJDDW6zghQieLWYbXVzh028', action: 'saved', timestamp: '2h ago', reactions: 5 },
        { id: 'a2', userId: 'u1', userName: 'You', userAvatar: INITIAL_USER.avatar, action: 'saved', timestamp: '5h ago', reactions: 2 },
        { id: 'a3', userId: 'u3', userName: 'Alex', userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc0U_Dp-IasYy2QfHPsk7HCUMamZELQRbxfxADdXu2Fc0g50GQnZfMgTuYZTQLnETjlukrM9VxdawmM6laXahME5cCXmFeBu0GhjSPqz8vm2cNuNNxW40WGwAbcIqo4_ayJJ3F4mLVeRQuijvjvIKuWGJm29ID6QsrbZ2Cf_ygLfXBABuu4-KjQ67pIIbDYnkWO8ZKo8y_IyGcOkDLCE7-rAyltSzH00PBACSUJH_V-SFEupa9xANeui3ORKDk7RZQneeFUg-UNXA', action: 'missed', timestamp: '1d ago', reactions: 0 },
    ],
    messages: [
        { id: 'm1', userId: 'u2', text: 'Just deposited my share! 💸', timestamp: '10:30 AM', type: 'msg' },
        { id: 'm2', userId: 'sys', text: 'Riya saved ₹500', timestamp: '10:30 AM', type: 'event' },
        { id: 'm3', userId: 'u1', text: 'Nice! We are almost at the goal for this month.', timestamp: '10:45 AM', type: 'msg' },
        { id: 'm4', userId: 'sys', text: 'New cycle started', timestamp: 'Yesterday', type: 'event' },
    ]
  },
  {
    id: "c2",
    name: "Bali Trip 2024",
    membersCount: 3,
    streak: 12,
    consistency: 100,
    poolTotal: 45000,
    isUserMember: true,
    theme: 'sky',
    icon: 'Plane',
    iconType: 'lucide',
    iconColor: 'text-sky-400',
    inviteCode: 'BALI24',
    investedAmount: 0,
    members: [
        { id: 'u1', name: 'You', avatar: INITIAL_USER.avatar, consistency: 95, hasPaid: true },
        { id: 'u5', name: 'Sarah', avatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png', consistency: 100, hasPaid: true },
        { id: 'u6', name: 'Mike', avatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png', consistency: 100, hasPaid: true },
    ],
    activity: [],
    messages: []
  },
  {
    id: "c4",
    name: "Office Lunch Club",
    membersCount: 5,
    streak: 22,
    consistency: 88,
    poolTotal: 12500,
    isUserMember: false,
    theme: 'lime',
    icon: '🍕',
    iconType: 'emoji',
    inviteCode: 'LUNCH1',
    investedAmount: 0,
    members: [
        { id: 'u7', name: 'David', avatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png', consistency: 90, hasPaid: true },
        { id: 'u8', name: 'Priya', avatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140039.png', consistency: 95, hasPaid: false },
    ],
    activity: [],
    messages: []
  }
];

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: "ch1",
    title: "30-Day Consistency",
    description: "Save everyday for 30 days.",
    daysTotal: 30,
    daysCompleted: 13,
    rewardXP: 250,
    rewardGold: 50,
    active: true,
    category: 'active'
  },
  {
    id: "ch2",
    title: "Weekend Mission",
    description: "Save ₹500 this weekend.",
    daysTotal: 2,
    daysCompleted: 0,
    rewardXP: 100,
    rewardGold: 20,
    active: false,
    category: 'new'
  },
  {
    id: "ch3",
    title: "No Spend Day",
    description: "Don't spend any money on wants today.",
    daysTotal: 1,
    daysCompleted: 0,
    rewardXP: 50,
    rewardGold: 10,
    active: false,
    category: 'new'
  }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, name: 'Riya S.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAav4R4n7Af7Add3v6NzQglFBLgpEEMKxRYY5iEVvlbV70vUhCHg2CKXbjJzmxU-82smI9ZUJpoInXImgjcWr1uq9kC5PK8xwfCMkSEdvPBduXC5uNw4CAbuUzLNNkA0nPkizMSw8LfMS3ExzRU0OY3mvCLaDk7MhSUAt4q4tGhlpPsu0VEZ2gpUIaTUkJcXoN1JyTW-I2GqzEe5TmjAZfgEwLUF_0vvhZxwhVVji1GvWEZaIH7ARloIJDDW6zghQieLWYbXVzh028', streak: 45, isCurrentUser: false, movement: 'up' },
    { rank: 2, name: 'Alex J.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc0U_Dp-IasYy2QfHPsk7HCUMamZELQRbxfxADdXu2Fc0g50GQnZfMgTuYZTQLnETjlukrM9VxdawmM6laXahME5cCXmFeBu0GhjSPqz8vm2cNuNNxW40WGwAbcIqo4_ayJJ3F4mLVeRQuijvjvIKuWGJm29ID6QsrbZ2Cf_ygLfXBABuu4-KjQ67pIIbDYnkWO8ZKo8y_IyGcOkDLCE7-rAyltSzH00PBACSUJH_V-SFEupa9xANeui3ORKDk7RZQneeFUg-UNXA', streak: 32, isCurrentUser: false, movement: 'same' },
    { rank: 3, name: 'You', avatar: INITIAL_USER.avatar, streak: 10, isCurrentUser: true, movement: 'up' },
    { rank: 4, name: 'Jordan', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN_c3Dg0OvKFHkAIp8Ch2wN0YX0PrZ6mvG0wrjhCK_JcY5mtazouRM5RWjlOMaVdJXcVPUrktPVpXwcyUDRsP9O8TAZKV-p8KYjEh4ROFTolAhQKnIhorqc4ue_l9hz0GxbPBMdFt2eQ1tTNetriDKZT3965NLO-q6QDuBcXubr8ZitHyWEz_SRcHBKAbJKL0DQxIaL4Vg6uy8E7RqkAIXpom4D8tPNKTCXF6R3Ecnr2M68RJSyvWt7mL_NAWMk257V6fryyOYErM', streak: 8, isCurrentUser: false, movement: 'down' },
]

export const MOCK_LESSONS: Lesson[] = [
  { 
      id: "l1", 
      title: "Basics of Saving", 
      duration: "3 min", 
      completed: true, 
      xp: 20, 
      status: 'completed',
      content: [] 
  },
  { 
      id: "l2", 
      title: "Creating a Budget", 
      duration: "5 min", 
      completed: true, 
      xp: 30, 
      status: 'completed',
      content: []
  },
  { 
      id: "l3", 
      title: "Needs vs. Wants", 
      duration: "4 min", 
      completed: false, 
      xp: 25, 
      status: 'current',
      content: [
          { type: 'slide', text: "Needs are essential for survival and basic well-being, like food, shelter, and healthcare.", image: "https://cdn-icons-png.flaticon.com/512/2829/2829823.png" },
          { type: 'slide', text: "Wants are things we desire but don't strictly need, like dining out, latest gadgets, or expensive clothes." },
          { type: 'quiz', question: "Is a Netflix subscription a Need or a Want?", options: ["Need", "Want"], correctOption: 1 }
      ]
  },
  { 
      id: "l4", 
      title: "Intro to Investing", 
      duration: "6 min", 
      completed: false, 
      xp: 40, 
      status: 'locked',
      content: []
  },
];

export const WEEKLY_DATA = [
  { label: 'M', value: 100 },
  { label: 'T', value: 100 },
  { label: 'W', value: 100 },
  { label: 'T', value: 0 },
  { label: 'F', value: 50 },
  { label: 'S', value: 100 },
  { label: 'S', value: 100 },
];

export const MONTHLY_DATA = [
    { label: '1', value: 100 }, { label: '5', value: 80 },
    { label: '10', value: 100 }, { label: '15', value: 100 },
    { label: '20', value: 0 }, { label: '25', value: 100 },
    { label: '30', value: 120 }
];


// Helper to generate static lessons for the first 10 units
// Returns exactly 5 questions per lesson topic
export const getStaticLesson = (id: string, topic: string) => {
  const defaultQuestions = [
    {
      question: `What is the key concept of ${topic}?`,
      options: [
        { text: "Spending more", icon: "💸" },
        { text: "Understanding value", icon: "💡" },
        { text: "Avoiding it", icon: "🚫" }
      ],
      correctAnswerIndex: 1,
      explanation: `Understanding the core value of ${topic} is essential for financial growth.`
    },
    {
      question: "Which of these is a good practice?",
      options: [
        { text: "Consistency", icon: "🔄" },
        { text: "Impulse buying", icon: "🛍️" },
        { text: "Ignoring statements", icon: "🙈" }
      ],
      correctAnswerIndex: 0,
      explanation: "Consistency is the most powerful tool in personal finance."
    },
    {
      question: "When should you start?",
      options: [
        { text: "Next year", icon: "📅" },
        { text: "When rich", icon: "💰" },
        { text: "Now", icon: "⚡" }
      ],
      correctAnswerIndex: 2,
      explanation: "Time is your biggest asset. Starting now allows compound interest to work for you."
    },
    {
      question: "How does this help your future?",
      options: [
        { text: "Adds stress", icon: "😓" },
        { text: "Builds wealth", icon: "🏦" },
        { text: "No impact", icon: "🤷" }
      ],
      correctAnswerIndex: 1,
      explanation: "Proper financial habits compound over time to create wealth."
    },
    {
      question: "What is the first step?",
      options: [
        { text: "Get a loan", icon: "💳" },
        { text: "Education", icon: "📚" },
        { text: "Buy stocks", icon: "📈" }
      ],
      correctAnswerIndex: 1,
      explanation: "Educating yourself is always the first step before making financial decisions."
    }
  ];

  // Specific content for Unit 1: Intro to Investing
  if (id.startsWith('1-')) {
    if (topic.includes('Basics')) {
       return [
         {
           question: "What is the primary goal of investing?",
           options: [{ text: "Saving for a car", icon: "🚗" }, { text: "Growing wealth", icon: "📈" }, { text: "Paying bills", icon: "🧾" }],
           correctAnswerIndex: 1,
           explanation: "Investing is about making your money work for you to build wealth over time."
         },
         {
            question: "Which carries more risk?",
            options: [{ text: "Savings Account", icon: "🏦" }, { text: "Stocks", icon: "📊" }],
            correctAnswerIndex: 1,
            explanation: "Stocks are more volatile than savings accounts but offer higher potential returns."
         },
         {
             question: "What is compound interest?",
             options: [{ text: "Interest on interest", icon: "🔄" }, { text: "Bank fees", icon: "💸" }, { text: "Tax deduction", icon: "📉" }],
             correctAnswerIndex: 0,
             explanation: "Compound interest allows your earnings to generate their own earnings."
         },
         {
             question: "Investing is best for:",
             options: [{ text: "Short term goals", icon: "⏱️" }, { text: "Long term goals", icon: "🗓️" }],
             correctAnswerIndex: 1,
             explanation: "The market fluctuates in the short term, so investing is best for long term growth."
         },
         {
             question: "Inflation does what to cash?",
             options: [{ text: "Increases value", icon: "⬆️" }, { text: "Decreases value", icon: "⬇️" }],
             correctAnswerIndex: 1,
             explanation: "Inflation reduces purchasing power over time, which is why investing is important."
         }
       ];
    }
    if (topic.includes('Risk')) {
        return [
            {
                question: "High risk usually correlates with:",
                options: [{ text: "Low Reward", icon: "⬇️" }, { text: "High Reward", icon: "⬆️" }],
                correctAnswerIndex: 1,
                explanation: "In finance, taking on more risk is usually compensated with higher potential returns."
            },
            {
                question: "How can you lower investment risk?",
                options: [{ text: "Diversification", icon: "🎨" }, { text: "Timing the market", icon: "⏱️" }],
                correctAnswerIndex: 0,
                explanation: "Spreading your money across different assets (diversification) reduces the impact of any single loss."
            },
            {
                question: "Which asset is generally safest?",
                options: [{ text: "Government Bonds", icon: "🏛️" }, { text: "Crypto", icon: "🪙" }],
                correctAnswerIndex: 0,
                explanation: "Government bonds are backed by the government, making them very low risk."
            },
            {
                question: "What is volatility?",
                options: [{ text: "Price stability", icon: "➖" }, { text: "Price fluctuation", icon: "〰️" }],
                correctAnswerIndex: 1,
                explanation: "Volatility measures how much and how quickly prices change."
            },
            {
                question: "You should take more risk when:",
                options: [{ text: "Retiring soon", icon: "👴" }, { text: "Younger", icon: "👶" }],
                correctAnswerIndex: 1,
                explanation: "When younger, you have more time to recover from market dips."
            }
        ]
    }
    if (topic.includes('Stocks')) {
        return [
            {
                question: "Buying a stock means you own:",
                options: [{ text: "Debt", icon: "📜" }, { text: "Part of a company", icon: "🏢" }],
                correctAnswerIndex: 1,
                explanation: "Stocks represent equity ownership in a corporation."
            },
            {
                question: "What is a bond?",
                options: [{ text: "A loan you give", icon: "🤝" }, { text: "A donation", icon: "🎁" }],
                correctAnswerIndex: 0,
                explanation: "Bonds are essentially loans where you earn interest."
            },
            {
                question: "Stocks generally offer:",
                options: [{ text: "Guaranteed returns", icon: "🔒" }, { text: "Potential growth", icon: "🚀" }],
                correctAnswerIndex: 1,
                explanation: "Stocks have no guarantees but historically offer high growth."
            },
            {
                question: "What is a dividend?",
                options: [{ text: "Profit share", icon: "💸" }, { text: "A fee", icon: "🧾" }],
                correctAnswerIndex: 0,
                explanation: "Dividends are payments made by a corporation to its shareholders."
            },
            {
                question: "Where do you buy stocks?",
                options: [{ text: "Supermarket", icon: "🛒" }, { text: "Stock Exchange", icon: "🏛️" }],
                correctAnswerIndex: 1,
                explanation: "Stocks are traded on exchanges like the NYSE or BSE."
            }
        ]
    }
    if (topic.includes('Diversification')) {
        return [
            {
                question: "Diversification means:",
                options: [{ text: "Putting eggs in one basket", icon: "🧺" }, { text: "Spreading investments", icon: "🌐" }],
                correctAnswerIndex: 1,
                explanation: "Don't put all your eggs in one basket to minimize risk."
            },
            {
                question: "An ETF helps with:",
                options: [{ text: "Instant diversification", icon: "⚡" }, { text: "Higher fees", icon: "📉" }],
                correctAnswerIndex: 0,
                explanation: "ETFs hold many stocks, giving you instant diversification."
            },
            {
                question: "Diversification protects against:",
                options: [{ text: "All losses", icon: "🛡️" }, { text: "Single company failure", icon: "📉" }],
                correctAnswerIndex: 1,
                explanation: "It won't stop market crashes, but it stops one bad company from ruining your portfolio."
            },
            {
                question: "Which portfolio is diversified?",
                options: [{ text: "100% Tech Stocks", icon: "💻" }, { text: "Stocks, Bonds, Gold", icon: "⚖️" }],
                correctAnswerIndex: 1,
                explanation: "Mixing asset classes is key to diversification."
            },
            {
                question: "Rebalancing means:",
                options: [{ text: "Selling winners", icon: "💰" }, { text: "Adjusting allocation", icon: "🔧" }],
                correctAnswerIndex: 1,
                explanation: "Rebalancing gets your portfolio back to your target risk level."
            }
        ]
    }
  }

  // Specific content for Unit 2: Budgeting
  if (id.startsWith('2-')) {
      if (topic.includes('Income')) {
          return [
              {
                  question: "Net income is:",
                  options: [{ text: "Before tax", icon: "📄" }, { text: "After tax", icon: "💰" }],
                  correctAnswerIndex: 1,
                  explanation: "Net income is what you actually take home after taxes and deductions."
              },
              {
                  question: "Which is a fixed expense?",
                  options: [{ text: "Rent", icon: "🏠" }, { text: "Dining out", icon: "🍔" }],
                  correctAnswerIndex: 0,
                  explanation: "Rent stays the same every month, making it a fixed expense."
              },
              {
                  question: "Gross income is:",
                  options: [{ text: "Total earnings", icon: "💵" }, { text: "Pocket money", icon: "👖" }],
                  correctAnswerIndex: 0,
                  explanation: "Gross income is your total pay before any taxes are taken out."
              },
              {
                  question: "Variable expenses include:",
                  options: [{ text: "Car payment", icon: "🚗" }, { text: "Groceries", icon: "🛒" }],
                  correctAnswerIndex: 1,
                  explanation: "Grocery costs change every month depending on what you buy."
              },
              {
                  question: "Disposable income is for:",
                  options: [{ text: "Taxes", icon: "🏛️" }, { text: "Spending & Saving", icon: "💳" }],
                  correctAnswerIndex: 1,
                  explanation: "It's the money left over after taxes to use as you please."
              }
          ]
      }
      if (topic.includes('Needs')) {
           return [
              {
                  question: "According to 50/30/20, what % is for Needs?",
                  options: [{ text: "30%", icon: "🍰" }, { text: "50%", icon: "🏠" }, { text: "20%", icon: "🏦" }],
                  correctAnswerIndex: 1,
                  explanation: "50% of your income should cover essentials like housing and food."
              },
              {
                  question: "Is a gym membership a need?",
                  options: [{ text: "Yes", icon: "🏋️" }, { text: "No", icon: "🙅" }],
                  correctAnswerIndex: 1,
                  explanation: "While healthy, it is strictly a want. You can exercise for free."
              },
              {
                  question: "The 20% is for:",
                  options: [{ text: "Fun", icon: "🎉" }, { text: "Savings & Debt", icon: "🐷" }],
                  correctAnswerIndex: 1,
                  explanation: "20% should go towards your financial future."
              },
              {
                  question: "Wants include:",
                  options: [{ text: "Electricity", icon: "💡" }, { text: "Video Games", icon: "🎮" }],
                  correctAnswerIndex: 1,
                  explanation: "Electricity is essential; games are for entertainment."
              },
              {
                  question: "If needs exceed 50%, you should:",
                  options: [{ text: "Cut wants", icon: "✂️" }, { text: "Stop saving", icon: "🛑" }],
                  correctAnswerIndex: 0,
                  explanation: "Reduce discretionary spending to balance your budget first."
              }
          ]
      }
      if (topic.includes('Tracking')) {
          return [
              {
                  question: "Why track spending?",
                  options: [{ text: "To feel bad", icon: "😢" }, { text: "To find leaks", icon: "🚰" }],
                  correctAnswerIndex: 1,
                  explanation: "Tracking helps identify where you might be overspending unaware."
              },
              {
                  question: "Small daily purchases are called:",
                  options: [{ text: "Latte Factor", icon: "☕" }, { text: "Big Spender", icon: "💸" }],
                  correctAnswerIndex: 0,
                  explanation: "Small frequent purchases add up to large amounts over time."
              },
              {
                  question: "Best tool for tracking?",
                  options: [{ text: "Memory", icon: "🧠" }, { text: "App or Spreadsheet", icon: "📱" }],
                  correctAnswerIndex: 1,
                  explanation: "Memory is unreliable. Use a record-keeping tool."
              },
              {
                  question: "You should review your budget:",
                  options: [{ text: "Annually", icon: "📅" }, { text: "Monthly", icon: "🗓️" }],
                  correctAnswerIndex: 1,
                  explanation: "Monthly reviews help you adjust to changing expenses."
              },
              {
                  question: "An emergency fund covers:",
                  options: [{ text: "Vacations", icon: "🏖️" }, { text: "Unexpected costs", icon: "🚑" }],
                  correctAnswerIndex: 1,
                  explanation: "It prevents you from going into debt when surprises happen."
              }
          ]
      }
  }

  // Specific Content for Unit 3: Credit
  if (id.startsWith('3-')) {
      if (topic.includes('Score')) {
          return [
              {
                  question: "A good credit score helps you:",
                  options: [{ text: "Get lower interest rates", icon: "📉" }, { text: "Earn more salary", icon: "💼" }],
                  correctAnswerIndex: 0,
                  explanation: "Lenders see you as lower risk, offering you cheaper loans."
              },
              {
                  question: "What hurts your score most?",
                  options: [{ text: "Checking it", icon: "👀" }, { text: "Missing payments", icon: "❌" }],
                  correctAnswerIndex: 1,
                  explanation: "Payment history is the biggest factor in your credit score."
              },
              {
                  question: "What is a good score range?",
                  options: [{ text: "300-500", icon: "🔴" }, { text: "700-850", icon: "🟢" }],
                  correctAnswerIndex: 1,
                  explanation: "Scores above 700 are generally considered good to excellent."
              },
              {
                  question: "Credit utilization should be below:",
                  options: [{ text: "30%", icon: "📉" }, { text: "100%", icon: "💳" }],
                  correctAnswerIndex: 0,
                  explanation: "Using less than 30% of your limit shows responsible usage."
              },
              {
                  question: "How often can you check your report for free?",
                  options: [{ text: "Never", icon: "🚫" }, { text: "Annually (or more)", icon: "📅" }],
                  correctAnswerIndex: 1,
                  explanation: "You are entitled to free reports regularly."
              }
          ]
      }
      if (topic.includes('Rates')) {
          return [
              {
                  question: "APR stands for:",
                  options: [{ text: "Annual Percentage Rate", icon: "percent" }, { text: "All Payment Return", icon: "💵" }],
                  correctAnswerIndex: 0,
                  explanation: "APR represents the yearly cost of borrowing money."
              },
              {
                  question: "Compound interest on debt is:",
                  options: [{ text: "Good", icon: "👍" }, { text: "Bad", icon: "👎" }],
                  correctAnswerIndex: 1,
                  explanation: "It means your debt grows faster, which is bad for you."
              },
              {
                  question: "Which loan typically has lower rates?",
                  options: [{ text: "Credit Card", icon: "💳" }, { text: "Mortgage", icon: "🏠" }],
                  correctAnswerIndex: 1,
                  explanation: "Secured loans like mortgages usually have lower rates than unsecured credit cards."
              },
              {
                  question: "Fixed rate means:",
                  options: [{ text: "Rate changes", icon: "🌊" }, { text: "Rate stays same", icon: "⚓" }],
                  correctAnswerIndex: 1,
                  explanation: "Your interest rate won't change for the life of the loan."
              },
              {
                  question: "Paying minimum balance results in:",
                  options: [{ text: "Paying more interest", icon: "📈" }, { text: "Paying off faster", icon: "🏎️" }],
                  correctAnswerIndex: 0,
                  explanation: "You'll stay in debt longer and pay much more interest."
              }
          ]
      }
      if (topic.includes('Managing')) {
          return [
              {
                  question: "Snowball method focuses on:",
                  options: [{ text: "Highest Interest", icon: "🔥" }, { text: "Smallest Balance", icon: "❄️" }],
                  correctAnswerIndex: 1,
                  explanation: "It builds momentum by knocking out small debts first."
              },
              {
                  question: "Avalanche method focuses on:",
                  options: [{ text: "Highest Interest", icon: "🔥" }, { text: "Smallest Balance", icon: "❄️" }],
                  correctAnswerIndex: 0,
                  explanation: "It saves the most money mathematically by targeting high interest."
              },
              {
                  question: "Good debt can be:",
                  options: [{ text: "Luxury vacation", icon: "🏖️" }, { text: "Education/Mortgage", icon: "🎓" }],
                  correctAnswerIndex: 1,
                  explanation: "Debt that helps you build wealth or income is often considered 'good'."
              },
              {
                  question: "If you can't pay, you should:",
                  options: [{ text: "Hide", icon: "🙈" }, { text: "Contact lender", icon: "📞" }],
                  correctAnswerIndex: 1,
                  explanation: "Lenders often have hardship programs if you communicate early."
              },
              {
                  question: "Consolidation means:",
                  options: [{ text: "Combining loans", icon: "🔗" }, { text: "Canceling loans", icon: "❌" }],
                  correctAnswerIndex: 0,
                  explanation: "Merging multiple debts into one payment, often with lower interest."
              }
          ]
      }
  }

  // Unit 4: Banking Basics
  if (id.startsWith('4-')) {
    if (topic.includes('Checking')) {
      return [
        {
          question: "A checking account is best for:",
          options: [{ text: "Long-term savings", icon: "🏦" }, { text: "Daily transactions", icon: "💳" }, { text: "Investing", icon: "📈" }],
          correctAnswerIndex: 1,
          explanation: "Checking accounts are designed for frequent deposits and withdrawals."
        },
        {
          question: "What is an overdraft?",
          options: [{ text: "Extra money", icon: "💰" }, { text: "Spending more than you have", icon: "📉" }],
          correctAnswerIndex: 1,
          explanation: "Overdraft occurs when you spend more than your account balance, often incurring fees."
        },
        {
          question: "Debit cards are linked to:",
          options: [{ text: "Credit line", icon: "💳" }, { text: "Your checking account", icon: "🏦" }],
          correctAnswerIndex: 1,
          explanation: "Debit cards directly withdraw money from your checking account."
        },
        {
          question: "Minimum balance requirements:",
          options: [{ text: "Always required", icon: "🔒" }, { text: "Vary by bank", icon: "🏛️" }],
          correctAnswerIndex: 1,
          explanation: "Different banks have different minimum balance requirements, some have none."
        },
        {
          question: "Online banking allows you to:",
          options: [{ text: "Only check balance", icon: "👀" }, { text: "Manage accounts 24/7", icon: "🌐" }],
          correctAnswerIndex: 1,
          explanation: "Online banking gives you full account access anytime, anywhere."
        },
        {
          question: "What is a routing number?",
          options: [{ text: "Your account number", icon: "🔢" }, { text: "Bank identifier", icon: "🏦" }],
          correctAnswerIndex: 1,
          explanation: "A routing number identifies your bank for transactions."
        }
      ];
    }
    if (topic.includes('Savings')) {
      return [
        {
          question: "Savings accounts typically offer:",
          options: [{ text: "Higher interest than checking", icon: "📈" }, { text: "Same as checking", icon: "➖" }],
          correctAnswerIndex: 0,
          explanation: "Savings accounts pay interest to encourage saving money."
        },
        {
          question: "Emergency fund should cover:",
          options: [{ text: "1-2 months expenses", icon: "📅" }, { text: "3-6 months expenses", icon: "🗓️" }],
          correctAnswerIndex: 1,
          explanation: "3-6 months of expenses provides a solid safety net for emergencies."
        },
        {
          question: "High-yield savings accounts:",
          options: [{ text: "Have higher interest rates", icon: "⬆️" }, { text: "Are riskier", icon: "⚠️" }],
          correctAnswerIndex: 0,
          explanation: "They offer better interest rates while still being FDIC insured."
        },
        {
          question: "Savings account withdrawals are:",
          options: [{ text: "Unlimited", icon: "♾️" }, { text: "Limited per month", icon: "📊" }],
          correctAnswerIndex: 1,
          explanation: "Most savings accounts limit withdrawals to 6 per month."
        },
        {
          question: "Compound interest helps savings:",
          options: [{ text: "Grow faster", icon: "🚀" }, { text: "Stay the same", icon: "➖" }],
          correctAnswerIndex: 0,
          explanation: "Earning interest on your interest accelerates growth over time."
        },
        {
          question: "FDIC insurance protects up to:",
          options: [{ text: "$100,000", icon: "💵" }, { text: "$250,000", icon: "💰" }],
          correctAnswerIndex: 1,
          explanation: "FDIC insures deposits up to $250,000 per account type."
        }
      ];
    }
    if (topic.includes('Compound')) {
      return [
        {
          question: "Compound interest means:",
          options: [{ text: "Interest on interest", icon: "🔄" }, { text: "Simple addition", icon: "➕" }],
          correctAnswerIndex: 0,
          explanation: "You earn interest on both your principal and previously earned interest."
        },
        {
          question: "Time is important because:",
          options: [{ text: "It doesn't matter", icon: "⏰" }, { text: "More time = more growth", icon: "📈" }],
          correctAnswerIndex: 1,
          explanation: "The longer your money compounds, the exponentially more it grows."
        },
        {
          question: "Starting early with $100 vs $200 later:",
          options: [{ text: "$200 is always better", icon: "💰" }, { text: "$100 early often wins", icon: "⏰" }],
          correctAnswerIndex: 1,
          explanation: "Time in the market beats timing the market - starting early is powerful."
        },
        {
          question: "Annual compounding vs monthly:",
          options: [{ text: "Monthly is better", icon: "📅" }, { text: "Same result", icon: "➖" }],
          correctAnswerIndex: 0,
          explanation: "More frequent compounding periods result in higher returns."
        },
        {
          question: "The 'Rule of 72' helps estimate:",
          options: [{ text: "Doubling time", icon: "2️⃣" }, { text: "Tax rate", icon: "📊" }],
          correctAnswerIndex: 0,
          explanation: "Divide 72 by your interest rate to estimate years to double your money."
        },
        {
          question: "Compound interest works best with:",
          options: [{ text: "Frequent withdrawals", icon: "💸" }, { text: "Leaving money alone", icon: "🔒" }],
          correctAnswerIndex: 1,
          explanation: "Letting your money grow untouched maximizes compound interest benefits."
        }
      ];
    }
  }

  // Unit 5: Taxes 101
  if (id.startsWith('5-')) {
    if (topic.includes('Income Tax')) {
      return [
        {
          question: "Income tax is based on:",
          options: [{ text: "Your age", icon: "🎂" }, { text: "Your earnings", icon: "💰" }],
          correctAnswerIndex: 1,
          explanation: "Tax is calculated as a percentage of your taxable income."
        },
        {
          question: "Taxable income is:",
          options: [{ text: "Gross income", icon: "💵" }, { text: "Income after deductions", icon: "📊" }],
          correctAnswerIndex: 1,
          explanation: "You only pay tax on income after subtracting deductions and exemptions."
        },
        {
          question: "Filing taxes is required:",
          options: [{ text: "Only if you owe money", icon: "💸" }, { text: "Annually for most people", icon: "📅" }],
          correctAnswerIndex: 1,
          explanation: "Most people must file tax returns annually, even if they get a refund."
        },
        {
          question: "A tax refund means:",
          options: [{ text: "You overpaid", icon: "💰" }, { text: "You didn't pay enough", icon: "📉" }],
          correctAnswerIndex: 0,
          explanation: "A refund means you paid more taxes than you actually owed."
        },
        {
          question: "W-2 form shows:",
          options: [{ text: "Your deductions", icon: "📝" }, { text: "Wages and taxes withheld", icon: "💼" }],
          correctAnswerIndex: 1,
          explanation: "Your employer sends a W-2 showing your annual earnings and tax withholdings."
        },
        {
          question: "Self-employment income:",
          options: [{ text: "Is tax-free", icon: "🆓" }, { text: "Must be reported", icon: "📋" }],
          correctAnswerIndex: 1,
          explanation: "All income, including self-employment, must be reported and is taxable."
        }
      ];
    }
    if (topic.includes('Brackets')) {
      return [
        {
          question: "Tax brackets mean:",
          options: [{ text: "You pay that rate on all income", icon: "💯" }, { text: "Different rates for different amounts", icon: "📊" }],
          correctAnswerIndex: 1,
          explanation: "You pay different rates on different portions of your income."
        },
        {
          question: "Being in a higher bracket:",
          options: [{ text: "Taxes all your income more", icon: "📈" }, { text: "Only affects income above threshold", icon: "⬆️" }],
          correctAnswerIndex: 1,
          explanation: "Only income above each bracket threshold is taxed at that higher rate."
        },
        {
          question: "Progressive tax system means:",
          options: [{ text: "Higher earners pay higher rates", icon: "📈" }, { text: "Everyone pays the same", icon: "➖" }],
          correctAnswerIndex: 0,
          explanation: "As income increases, the tax rate on additional income increases."
        },
        {
          question: "Effective tax rate is:",
          options: [{ text: "Your top bracket", icon: "🔝" }, { text: "Average rate you actually pay", icon: "📊" }],
          correctAnswerIndex: 1,
          explanation: "It's the overall percentage of income you pay in taxes."
        },
        {
          question: "Marginal tax rate is:",
          options: [{ text: "Rate on next dollar earned", icon: "💰" }, { text: "Your total tax", icon: "📋" }],
          correctAnswerIndex: 0,
          explanation: "It's the tax rate you'd pay on an additional dollar of income."
        }
      ];
    }
    if (topic.includes('Deductions')) {
      return [
        {
          question: "Tax deductions:",
          options: [{ text: "Reduce taxable income", icon: "📉" }, { text: "Increase your refund", icon: "💰" }],
          correctAnswerIndex: 0,
          explanation: "Deductions lower the amount of income subject to tax."
        },
        {
          question: "Standard deduction:",
          options: [{ text: "Requires receipts", icon: "🧾" }, { text: "Is automatic", icon: "✅" }],
          correctAnswerIndex: 1,
          explanation: "You can take a standard deduction without itemizing expenses."
        },
        {
          question: "Itemized deductions include:",
          options: [{ text: "Mortgage interest", icon: "🏠" }, { text: "Groceries", icon: "🛒" }],
          correctAnswerIndex: 0,
          explanation: "Mortgage interest, charitable donations, and medical expenses can be itemized."
        },
        {
          question: "You should itemize when:",
          options: [{ text: "Itemized > Standard", icon: "📊" }, { text: "Always", icon: "♾️" }],
          correctAnswerIndex: 0,
          explanation: "Only itemize if your total deductions exceed the standard deduction."
        },
        {
          question: "Tax credits are better than deductions because:",
          options: [{ text: "They reduce tax owed directly", icon: "💰" }, { text: "They're the same", icon: "➖" }],
          correctAnswerIndex: 0,
          explanation: "Credits reduce your tax bill dollar-for-dollar, while deductions reduce taxable income."
        },
        {
          question: "Common deductions include:",
          options: [{ text: "Student loan interest", icon: "🎓" }, { text: "Entertainment", icon: "🎉" }],
          correctAnswerIndex: 0,
          explanation: "Student loan interest, retirement contributions, and certain expenses are deductible."
        }
      ];
    }
  }

  // Unit 6: Retirement Planning
  if (id.startsWith('6-')) {
    if (topic.includes('Why Start Early')) {
      return [
        {
          question: "Starting retirement savings early:",
          options: [{ text: "Doesn't matter", icon: "🤷" }, { text: "Massively increases wealth", icon: "📈" }],
          correctAnswerIndex: 1,
          explanation: "Time allows compound interest to work its magic - starting 10 years earlier can double your retirement fund."
        },
        {
          question: "The power of compound interest means:",
          options: [{ text: "Only the last years matter", icon: "⏰" }, { text: "Early years are crucial", icon: "🌱" }],
          correctAnswerIndex: 1,
          explanation: "Money invested early has decades to compound, making those contributions extremely valuable."
        },
        {
          question: "If you start at 25 vs 35:",
          options: [{ text: "Small difference", icon: "📏" }, { text: "Huge difference at retirement", icon: "💎" }],
          correctAnswerIndex: 1,
          explanation: "10 extra years of compounding can result in 2-3x more retirement savings."
        },
        {
          question: "Retirement planning should start:",
          options: [{ text: "When you're 50", icon: "👴" }, { text: "As soon as you earn", icon: "💼" }],
          correctAnswerIndex: 1,
          explanation: "The earlier you start, the less you need to save monthly to reach your goal."
        },
        {
          question: "Time horizon affects:",
          options: [{ text: "Only your age", icon: "🎂" }, { text: "Risk tolerance and strategy", icon: "📊" }],
          correctAnswerIndex: 1,
          explanation: "Longer time horizons allow for more aggressive, growth-oriented investments."
        },
        {
          question: "The 4% rule suggests:",
          options: [{ text: "Save 4% of income", icon: "💰" }, { text: "Withdraw 4% annually in retirement", icon: "🏦" }],
          correctAnswerIndex: 1,
          explanation: "Withdrawing 4% of your retirement savings annually is generally considered safe."
        }
      ];
    }
    if (topic.includes('401k') || topic.includes('PF')) {
      return [
        {
          question: "401k/EPF is:",
          options: [{ text: "A savings account", icon: "🏦" }, { text: "Employer retirement plan", icon: "💼" }],
          correctAnswerIndex: 1,
          explanation: "It's a tax-advantaged retirement account often with employer matching."
        },
        {
          question: "Employer match is:",
          options: [{ text: "Free money", icon: "💰" }, { text: "A loan", icon: "💳" }],
          correctAnswerIndex: 0,
          explanation: "Employer matching is essentially free money - always contribute enough to get the full match."
        },
        {
          question: "401k contributions are:",
          options: [{ text: "Taxed now", icon: "📊" }, { text: "Pre-tax (traditional)", icon: "💰" }],
          correctAnswerIndex: 1,
          explanation: "Traditional 401k contributions reduce your taxable income now."
        },
        {
          question: "Roth 401k means:",
          options: [{ text: "Tax-free withdrawals later", icon: "🆓" }, { text: "Taxed twice", icon: "💸" }],
          correctAnswerIndex: 0,
          explanation: "You pay taxes now, but withdrawals in retirement are tax-free."
        },
        {
          question: "Early withdrawal penalty is:",
          options: [{ text: "10% plus taxes", icon: "⚠️" }, { text: "Nothing", icon: "✅" }],
          correctAnswerIndex: 0,
          explanation: "Withdrawing before age 59.5 typically incurs a 10% penalty plus income taxes."
        },
        {
          question: "Contribution limits:",
          options: [{ text: "Are unlimited", icon: "♾️" }, { text: "Change annually", icon: "📅" }],
          correctAnswerIndex: 1,
          explanation: "The IRS sets annual contribution limits that adjust for inflation."
        }
      ];
    }
    if (topic.includes('IRA')) {
      return [
        {
          question: "IRA stands for:",
          options: [{ text: "Individual Retirement Account", icon: "👤" }, { text: "Investment Return Account", icon: "📈" }],
          correctAnswerIndex: 0,
          explanation: "It's a personal retirement account you open yourself."
        },
        {
          question: "Traditional IRA:",
          options: [{ text: "Tax-deductible now", icon: "💰" }, { text: "Tax-free now", icon: "🆓" }],
          correctAnswerIndex: 0,
          explanation: "Contributions may be tax-deductible, but withdrawals are taxed."
        },
        {
          question: "Roth IRA:",
          options: [{ text: "Tax-free withdrawals", icon: "✅" }, { text: "Tax-deductible", icon: "📊" }],
          correctAnswerIndex: 0,
          explanation: "You contribute after-tax money, but qualified withdrawals are tax-free."
        },
        {
          question: "IRA contribution limits:",
          options: [{ text: "Are the same for all", icon: "➖" }, { text: "Vary by age and income", icon: "📊" }],
          correctAnswerIndex: 1,
          explanation: "Limits depend on your age and income level, with catch-up contributions for 50+."
        },
        {
          question: "You can have both:",
          options: [{ text: "401k and IRA", icon: "✅" }, { text: "Only one retirement account", icon: "❌" }],
          correctAnswerIndex: 0,
          explanation: "You can contribute to both a 401k and an IRA, subject to income limits."
        }
      ];
    }
  }

  // Unit 7: Stock Market
  if (id.startsWith('7-')) {
    if (topic.includes('Stock')) {
      return [
        {
          question: "A stock represents:",
          options: [{ text: "Ownership in a company", icon: "🏢" }, { text: "A loan to a company", icon: "💳" }],
          correctAnswerIndex: 0,
          explanation: "When you buy stock, you own a small piece of that company."
        },
        {
          question: "Stock prices change because:",
          options: [{ text: "Supply and demand", icon: "⚖️" }, { text: "They're fixed", icon: "🔒" }],
          correctAnswerIndex: 0,
          explanation: "Prices fluctuate based on how many people want to buy vs sell."
        },
        {
          question: "Buying low and selling high:",
          options: [{ text: "Is the goal", icon: "🎯" }, { text: "Is impossible", icon: "❌" }],
          correctAnswerIndex: 0,
          explanation: "The basic strategy is buying when prices are low and selling when high."
        },
        {
          question: "Long-term investing means:",
          options: [{ text: "Holding for years", icon: "📅" }, { text: "Day trading", icon: "📊" }],
          correctAnswerIndex: 0,
          explanation: "Long-term investors hold stocks for years, not days or hours."
        },
        {
          question: "Diversification in stocks means:",
          options: [{ text: "Buying one stock", icon: "📈" }, { text: "Buying many different stocks", icon: "🌐" }],
          correctAnswerIndex: 1,
          explanation: "Spreading investments across many companies reduces risk."
        },
        {
          question: "Market volatility is:",
          options: [{ text: "Price fluctuations", icon: "〰️" }, { text: "Guaranteed losses", icon: "📉" }],
          correctAnswerIndex: 0,
          explanation: "Volatility is normal - prices go up and down regularly."
        }
      ];
    }
    if (topic.includes('Indices')) {
      return [
        {
          question: "A market index tracks:",
          options: [{ text: "One stock", icon: "📈" }, { text: "A group of stocks", icon: "📊" }],
          correctAnswerIndex: 1,
          explanation: "Indices like S&P 500 track the performance of many stocks together."
        },
        {
          question: "S&P 500 represents:",
          options: [{ text: "500 large companies", icon: "🏢" }, { text: "All companies", icon: "🌐" }],
          correctAnswerIndex: 0,
          explanation: "It's a basket of 500 of the largest US companies."
        },
        {
          question: "Index funds:",
          options: [{ text: "Try to beat the market", icon: "🚀" }, { text: "Match market performance", icon: "📊" }],
          correctAnswerIndex: 1,
          explanation: "They aim to replicate an index's performance, not outperform it."
        },
        {
          question: "Index investing is:",
          options: [{ text: "Very risky", icon: "⚠️" }, { text: "Lower cost and diversified", icon: "💰" }],
          correctAnswerIndex: 1,
          explanation: "Index funds offer diversification at low cost with minimal management."
        },
        {
          question: "Dow Jones tracks:",
          options: [{ text: "30 large companies", icon: "🏢" }, { text: "500 companies", icon: "📊" }],
          correctAnswerIndex: 0,
          explanation: "The Dow is a price-weighted average of 30 major companies."
        }
      ];
    }
    if (topic.includes('Dividends')) {
      return [
        {
          question: "Dividends are:",
          options: [{ text: "Company profits shared", icon: "💰" }, { text: "Stock price increases", icon: "📈" }],
          correctAnswerIndex: 0,
          explanation: "Companies pay dividends as a share of profits to shareholders."
        },
        {
          question: "Dividend stocks are good for:",
          options: [{ text: "Income in retirement", icon: "👴" }, { text: "Only young investors", icon: "👶" }],
          correctAnswerIndex: 0,
          explanation: "They provide regular income, making them attractive for retirees."
        },
        {
          question: "Dividend yield is:",
          options: [{ text: "Annual dividend / Stock price", icon: "📊" }, { text: "Total dividends paid", icon: "💰" }],
          correctAnswerIndex: 0,
          explanation: "It's the percentage return from dividends relative to stock price."
        },
        {
          question: "Reinvesting dividends:",
          options: [{ text: "Increases compound growth", icon: "📈" }, { text: "Does nothing", icon: "➖" }],
          correctAnswerIndex: 0,
          explanation: "Using dividends to buy more shares accelerates wealth building."
        },
        {
          question: "Not all stocks pay dividends:",
          options: [{ text: "True", icon: "✅" }, { text: "False", icon: "❌" }],
          correctAnswerIndex: 0,
          explanation: "Growth companies often reinvest profits instead of paying dividends."
        }
      ];
    }
    if (topic.includes('Charts')) {
      return [
        {
          question: "Reading stock charts helps you:",
          options: [{ text: "Understand price trends", icon: "📊" }, { text: "Guarantee profits", icon: "💰" }],
          correctAnswerIndex: 0,
          explanation: "Charts show historical price movements and patterns."
        },
        {
          question: "A candlestick chart shows:",
          options: [{ text: "Open, high, low, close", icon: "📈" }, { text: "Only closing price", icon: "📉" }],
          correctAnswerIndex: 0,
          explanation: "It displays the full price range for a time period."
        },
        {
          question: "Volume indicates:",
          options: [{ text: "How many shares traded", icon: "📊" }, { text: "Stock price", icon: "💰" }],
          correctAnswerIndex: 0,
          explanation: "Volume shows trading activity - high volume often confirms trends."
        },
        {
          question: "Support level is:",
          options: [{ text: "Price floor", icon: "⬇️" }, { text: "Price ceiling", icon: "⬆️" }],
          correctAnswerIndex: 0,
          explanation: "A price level where a stock tends to stop falling."
        },
        {
          question: "Technical analysis:",
          options: [{ text: "Studies price patterns", icon: "📊" }, { text: "Analyzes company finances", icon: "📋" }],
          correctAnswerIndex: 0,
          explanation: "It focuses on price movements and trading patterns, not fundamentals."
        }
      ];
    }
  }

  // Unit 8: Real Estate
  if (id.startsWith('8-')) {
    if (topic.includes('Buying vs Renting')) {
      return [
        {
          question: "Buying a home:",
          options: [{ text: "Builds equity", icon: "🏠" }, { text: "Is always cheaper", icon: "💰" }],
          correctAnswerIndex: 0,
          explanation: "Homeownership builds wealth through equity, but isn't always cheaper than renting."
        },
        {
          question: "Renting is better when:",
          options: [{ text: "You move frequently", icon: "✈️" }, { text: "You want to build equity", icon: "📈" }],
          correctAnswerIndex: 0,
          explanation: "Renting offers flexibility without the commitment and costs of ownership."
        },
        {
          question: "The 5% rule suggests:",
          options: [{ text: "Buy if rent > 5% of home value", icon: "📊" }, { text: "Always buy", icon: "✅" }],
          correctAnswerIndex: 0,
          explanation: "If annual rent exceeds 5% of home value, buying may be better financially."
        },
        {
          question: "Homeownership costs include:",
          options: [{ text: "Just the mortgage", icon: "💳" }, { text: "Maintenance, taxes, insurance", icon: "🏠" }],
          correctAnswerIndex: 1,
          explanation: "Total cost includes mortgage, property taxes, insurance, and maintenance."
        },
        {
          question: "Renting means:",
          options: [{ text: "No equity building", icon: "📉" }, { text: "You own the property", icon: "🏠" }],
          correctAnswerIndex: 0,
          explanation: "Rent payments don't build ownership - you're paying for temporary use."
        }
      ];
    }
    if (topic.includes('Mortgage')) {
      return [
        {
          question: "A mortgage is:",
          options: [{ text: "A loan for a home", icon: "🏠" }, { text: "Home insurance", icon: "🛡️" }],
          correctAnswerIndex: 0,
          explanation: "It's a loan specifically for purchasing real estate."
        },
        {
          question: "Down payment typically is:",
          options: [{ text: "0%", icon: "0️⃣" }, { text: "10-20%", icon: "💰" }],
          correctAnswerIndex: 1,
          explanation: "Most mortgages require 10-20% down, though some programs allow less."
        },
        {
          question: "Fixed vs adjustable rate:",
          options: [{ text: "Fixed stays same", icon: "⚓" }, { text: "Both change", icon: "🌊" }],
          correctAnswerIndex: 0,
          explanation: "Fixed rate mortgages have constant payments; adjustable rates can change."
        },
        {
          question: "PMI is required when:",
          options: [{ text: "Down payment < 20%", icon: "💰" }, { text: "You have good credit", icon: "✅" }],
          correctAnswerIndex: 0,
          explanation: "Private Mortgage Insurance protects lenders when down payment is less than 20%."
        },
        {
          question: "30-year vs 15-year mortgage:",
          options: [{ text: "15-year has higher payments", icon: "📈" }, { text: "Same monthly payment", icon: "➖" }],
          correctAnswerIndex: 0,
          explanation: "Shorter terms mean higher monthly payments but less total interest paid."
        }
      ];
    }
    if (topic.includes('REIT')) {
      return [
        {
          question: "REIT stands for:",
          options: [{ text: "Real Estate Investment Trust", icon: "🏢" }, { text: "Real Estate Income Tax", icon: "📊" }],
          correctAnswerIndex: 0,
          explanation: "REITs are companies that own and operate income-producing real estate."
        },
        {
          question: "REITs allow you to:",
          options: [{ text: "Invest in real estate without buying property", icon: "📈" }, { text: "Avoid all risk", icon: "🛡️" }],
          correctAnswerIndex: 0,
          explanation: "You can invest in real estate through stocks without property management."
        },
        {
          question: "REITs must pay:",
          options: [{ text: "90% of income as dividends", icon: "💰" }, { text: "No dividends", icon: "❌" }],
          correctAnswerIndex: 0,
          explanation: "By law, REITs must distribute at least 90% of taxable income to shareholders."
        },
        {
          question: "REIT types include:",
          options: [{ text: "Residential, commercial, industrial", icon: "🏢" }, { text: "Only houses", icon: "🏠" }],
          correctAnswerIndex: 0,
          explanation: "REITs can focus on apartments, offices, warehouses, malls, and more."
        },
        {
          question: "REITs provide:",
          options: [{ text: "Diversification", icon: "🌐" }, { text: "Guaranteed returns", icon: "✅" }],
          correctAnswerIndex: 0,
          explanation: "They add real estate exposure to your portfolio without direct property ownership."
        }
      ];
    }
  }

  // Unit 9: Insurance
  if (id.startsWith('9-')) {
    if (topic.includes('Health Insurance')) {
      return [
        {
          question: "Health insurance protects you from:",
          options: [{ text: "Medical expenses", icon: "🏥" }, { text: "All costs", icon: "💰" }],
          correctAnswerIndex: 0,
          explanation: "It helps cover medical costs, though you still pay deductibles and copays."
        },
        {
          question: "A deductible is:",
          options: [{ text: "What you pay before insurance kicks in", icon: "💳" }, { text: "Your monthly premium", icon: "📅" }],
          correctAnswerIndex: 0,
          explanation: "You pay the deductible amount out-of-pocket before insurance covers costs."
        },
        {
          question: "Copay is:",
          options: [{ text: "Fixed amount per visit", icon: "💰" }, { text: "Your total bill", icon: "🧾" }],
          correctAnswerIndex: 0,
          explanation: "A copay is a fixed fee you pay for each medical service or prescription."
        },
        {
          question: "High-deductible plans:",
          options: [{ text: "Have lower premiums", icon: "💰" }, { text: "Cover everything", icon: "✅" }],
          correctAnswerIndex: 0,
          explanation: "You pay less monthly but more out-of-pocket when you need care."
        },
        {
          question: "HSA stands for:",
          options: [{ text: "Health Savings Account", icon: "🏦" }, { text: "Health Spending Allowance", icon: "💵" }],
          correctAnswerIndex: 0,
          explanation: "HSAs let you save pre-tax money for medical expenses."
        },
        {
          question: "Preventive care is often:",
          options: [{ text: "Free with insurance", icon: "🆓" }, { text: "Never covered", icon: "❌" }],
          correctAnswerIndex: 0,
          explanation: "Annual checkups and screenings are typically covered at no cost."
        }
      ];
    }
    if (topic.includes('Life Insurance')) {
      return [
        {
          question: "Life insurance provides:",
          options: [{ text: "Money to beneficiaries", icon: "💰" }, { text: "Health coverage", icon: "🏥" }],
          correctAnswerIndex: 0,
          explanation: "It pays a death benefit to your beneficiaries when you pass away."
        },
        {
          question: "Term life insurance:",
          options: [{ text: "Covers a set period", icon: "📅" }, { text: "Lasts forever", icon: "♾️" }],
          correctAnswerIndex: 0,
          explanation: "It provides coverage for a specific term (e.g., 20 years) at lower cost."
        },
        {
          question: "Whole life insurance:",
          options: [{ text: "Lasts your lifetime", icon: "♾️" }, { text: "Is temporary", icon: "⏰" }],
          correctAnswerIndex: 0,
          explanation: "It provides permanent coverage and builds cash value, but costs more."
        },
        {
          question: "You need life insurance if:",
          options: [{ text: "Others depend on your income", icon: "👨‍👩‍👧" }, { text: "You're single", icon: "👤" }],
          correctAnswerIndex: 0,
          explanation: "If your death would cause financial hardship, you likely need coverage."
        },
        {
          question: "Beneficiary is:",
          options: [{ text: "Who receives the payout", icon: "👤" }, { text: "The insurance company", icon: "🏢" }],
          correctAnswerIndex: 0,
          explanation: "The person or people you designate to receive the death benefit."
        }
      ];
    }
    if (topic.includes('Premiums') || topic.includes('Deductibles')) {
      return [
        {
          question: "Premium is:",
          options: [{ text: "Your monthly payment", icon: "💰" }, { text: "Your deductible", icon: "💳" }],
          correctAnswerIndex: 0,
          explanation: "The premium is what you pay regularly to keep insurance active."
        },
        {
          question: "Higher deductible usually means:",
          options: [{ text: "Lower premium", icon: "📉" }, { text: "Higher premium", icon: "📈" }],
          correctAnswerIndex: 0,
          explanation: "Taking on more risk (higher deductible) reduces your monthly cost."
        },
        {
          question: "Out-of-pocket maximum is:",
          options: [{ text: "Most you'll pay in a year", icon: "💰" }, { text: "Your premium", icon: "📅" }],
          correctAnswerIndex: 0,
          explanation: "Once you hit this limit, insurance covers 100% of remaining costs."
        },
        {
          question: "Coinsurance is:",
          options: [{ text: "Your share after deductible", icon: "📊" }, { text: "Your premium", icon: "💰" }],
          correctAnswerIndex: 0,
          explanation: "A percentage you pay for covered services after meeting your deductible."
        },
        {
          question: "Comparing plans means looking at:",
          options: [{ text: "Premium, deductible, coverage", icon: "📊" }, { text: "Just the premium", icon: "💰" }],
          correctAnswerIndex: 0,
          explanation: "Consider total cost including premiums, deductibles, and what's covered."
        }
      ];
    }
  }

  // Unit 10: Financial Freedom
  if (id.startsWith('10-')) {
    if (topic.includes('Passive Income')) {
      return [
        {
          question: "Passive income is:",
          options: [{ text: "Money earned with minimal effort", icon: "💰" }, { text: "Your salary", icon: "💼" }],
          correctAnswerIndex: 0,
          explanation: "Income that continues with little ongoing work, like dividends or rental income."
        },
        {
          question: "Examples include:",
          options: [{ text: "Dividends, rentals, royalties", icon: "📊" }, { text: "Only salary", icon: "💼" }],
          correctAnswerIndex: 0,
          explanation: "Passive income sources include investments, real estate, and intellectual property."
        },
        {
          question: "Building passive income:",
          options: [{ text: "Takes time and initial investment", icon: "⏰" }, { text: "Happens instantly", icon: "⚡" }],
          correctAnswerIndex: 0,
          explanation: "It requires upfront work or investment, then generates ongoing returns."
        },
        {
          question: "Passive income helps achieve:",
          options: [{ text: "Financial independence", icon: "🆓" }, { text: "Only retirement", icon: "👴" }],
          correctAnswerIndex: 0,
          explanation: "It can cover living expenses, allowing you to work less or retire early."
        },
        {
          question: "The goal is:",
          options: [{ text: "Passive income > Expenses", icon: "📈" }, { text: "More debt", icon: "💳" }],
          correctAnswerIndex: 0,
          explanation: "When passive income exceeds expenses, you achieve financial independence."
        },
        {
          question: "Starting requires:",
          options: [{ text: "Saving and investing", icon: "💰" }, { text: "Winning the lottery", icon: "🎰" }],
          correctAnswerIndex: 0,
          explanation: "Build passive income by consistently saving and investing over time."
        }
      ];
    }
    if (topic.includes('Side Hustles')) {
      return [
        {
          question: "A side hustle is:",
          options: [{ text: "Extra income source", icon: "💰" }, { text: "Your main job", icon: "💼" }],
          correctAnswerIndex: 0,
          explanation: "Work you do outside your primary job to earn additional income."
        },
        {
          question: "Side hustles can become:",
          options: [{ text: "Passive income sources", icon: "🔄" }, { text: "Only temporary", icon: "⏰" }],
          correctAnswerIndex: 0,
          explanation: "Many successful businesses started as side hustles that scaled up."
        },
        {
          question: "Good side hustles:",
          options: [{ text: "Use your skills", icon: "🎯" }, { text: "Require no effort", icon: "😴" }],
          correctAnswerIndex: 0,
          explanation: "Leverage existing skills and interests to maximize earning potential."
        },
        {
          question: "Side hustle income should:",
          options: [{ text: "Be saved or invested", icon: "💰" }, { text: "Only be spent", icon: "💸" }],
          correctAnswerIndex: 0,
          explanation: "Use extra income to accelerate savings and investment goals."
        },
        {
          question: "Examples include:",
          options: [{ text: "Freelancing, selling, tutoring", icon: "📚" }, { text: "Only full-time jobs", icon: "💼" }],
          correctAnswerIndex: 0,
          explanation: "Many options exist: online services, selling products, teaching, consulting."
        }
      ];
    }
    if (topic.includes('FIRE')) {
      return [
        {
          question: "FIRE stands for:",
          options: [{ text: "Financial Independence, Retire Early", icon: "🔥" }, { text: "Fast Income Return", icon: "💰" }],
          correctAnswerIndex: 0,
          explanation: "A movement focused on saving aggressively to retire much earlier than traditional age."
        },
        {
          question: "FIRE requires:",
          options: [{ text: "High savings rate", icon: "💰" }, { text: "High income only", icon: "💼" }],
          correctAnswerIndex: 0,
          explanation: "Saving 50-70% of income allows you to retire in 10-20 years instead of 40."
        },
        {
          question: "The 4% rule in FIRE:",
          options: [{ text: "Withdraw 4% annually", icon: "💰" }, { text: "Save 4% of income", icon: "💵" }],
          correctAnswerIndex: 0,
          explanation: "Withdraw 4% of your portfolio annually - if you have 25x expenses, you're set."
        },
        {
          question: "Lean FIRE means:",
          options: [{ text: "Retiring with minimal expenses", icon: "🏕️" }, { text: "Working forever", icon: "💼" }],
          correctAnswerIndex: 0,
          explanation: "Achieving FIRE with lower expenses, requiring less total savings."
        },
        {
          question: "Fat FIRE means:",
          options: [{ text: "Retiring with luxury lifestyle", icon: "💰" }, { text: "Never retiring", icon: "♾️" }],
          correctAnswerIndex: 0,
          explanation: "Saving enough to maintain a high standard of living in retirement."
        },
        {
          question: "FIRE is about:",
          options: [{ text: "Freedom and choice", icon: "🆓" }, { text: "Only early retirement", icon: "👴" }],
          correctAnswerIndex: 0,
          explanation: "It's about having the freedom to work on what matters to you, not just stopping work."
        }
      ];
    }
  }

  return defaultQuestions;
};

// Helper to generate static guides for the first 10 units
export interface GuideContent {
  title: string;
  description: string;
  sections: Array<{
    title: string;
    text?: string;
    highlight?: string;
    items?: Array<{ label: string; desc: string; icon: string }>;
  }>;
}

export const getStaticGuide = (unitId: string, unitTitle: string): GuideContent => {

  const guides: Record<string, GuideContent> = {
    '1': {
      title: "Intro to Investing",
      description: "Learn how to make your money work for you through smart investment strategies and asset allocation.",
      sections: [
        {
          title: "What is Investing?",
          text: "Investing is the act of allocating resources, usually money, with the expectation of generating an income or profit. Unlike saving, which is setting money aside for safety, investing involves taking calculated risks to grow wealth over time."
        },
        {
          title: "Risk vs. Reward",
          text: "There is always a trade-off in investing. Higher risk investments generally offer the potential for higher returns, while lower risk investments offer stability but lower growth potential.",
          highlight: "Pro Tip: Diversification (buying different types of assets) is the best way to manage risk without sacrificing all your potential gains."
        },
        {
          title: "Key Asset Classes",
          items: [
            { label: "Stocks (Equities)", desc: "Buying a small piece of ownership in a company. High potential growth, higher risk.", icon: "trending_up" },
            { label: "Bonds (Fixed Income)", desc: "Loaning money to a government or company in exchange for interest payments. Lower risk, steady income.", icon: "account_balance" },
            { label: "ETFs", desc: "A basket of securities that trades on an exchange like a stock. Instant diversification.", icon: "pie_chart" },
            { label: "Mutual Funds", desc: "Professionally managed portfolios of stocks and bonds. Easy diversification for beginners.", icon: "folder_managed" }
          ]
        }
      ]
    },
    '2': {
      title: "Smart Budgeting",
      description: "Master the art of managing your money with the proven 50/30/20 rule and smart spending habits.",
      sections: [
        {
          title: "The 50/30/20 Rule",
          text: "This simple framework divides your after-tax income into three categories: 50% for needs (housing, food, utilities), 30% for wants (entertainment, dining out), and 20% for savings and debt repayment."
        },
        {
          title: "Needs vs. Wants",
          text: "Understanding the difference is crucial. Needs are essential for survival and basic well-being. Wants enhance your life but aren't necessary. Learning to distinguish between them helps you prioritize spending.",
          highlight: "Quick Test: If you can't live without it, it's a need. If you can wait or find alternatives, it's likely a want."
        },
        {
          title: "Budgeting Tools & Strategies",
          items: [
            { label: "Track Everything", desc: "Record every expense for at least one month to understand your spending patterns.", icon: "receipt_long" },
            { label: "Use Apps", desc: "Budgeting apps automatically categorize spending and show where your money goes.", icon: "phone_iphone" },
            { label: "Review Monthly", desc: "Check your budget monthly and adjust as your income or expenses change.", icon: "calendar_month" },
            { label: "Emergency Fund", desc: "Build 3-6 months of expenses in savings before investing heavily.", icon: "savings" }
          ]
        }
      ]
    },
    '3': {
      title: "Credit & Debt",
      description: "Understand how credit scores work, manage debt effectively, and use credit as a tool for financial growth.",
      sections: [
        {
          title: "Understanding Credit Scores",
          text: "Your credit score is a three-digit number (typically 300-850) that represents your creditworthiness. Lenders use it to decide whether to approve loans and what interest rates to offer. Higher scores mean better rates and more financial opportunities."
        },
        {
          title: "Building Good Credit",
          text: "Payment history (35%) and credit utilization (30%) are the biggest factors. Pay bills on time, keep credit card balances below 30% of limits, and maintain a mix of credit types.",
          highlight: "Pro Tip: Set up automatic payments for at least the minimum amount to never miss a payment deadline."
        },
        {
          title: "Managing Debt Strategically",
          items: [
            { label: "Snowball Method", desc: "Pay off smallest debts first for quick wins and motivation.", icon: "snowflake" },
            { label: "Avalanche Method", desc: "Pay off highest interest debts first to save the most money.", icon: "landscape" },
            { label: "Debt Consolidation", desc: "Combine multiple debts into one loan with a lower interest rate.", icon: "merge" },
            { label: "Good vs Bad Debt", desc: "Good debt (mortgage, education) builds wealth. Bad debt (credit cards for wants) drains it.", icon: "compare_arrows" }
          ]
        }
      ]
    },
    '4': {
      title: "Banking Basics",
      description: "Master the fundamentals of checking accounts, savings accounts, and the power of compound interest.",
      sections: [
        {
          title: "Checking vs. Savings Accounts",
          text: "Checking accounts are for daily transactions - paying bills, using debit cards, and writing checks. Savings accounts earn interest and are better for money you don't need immediately. Both are FDIC insured up to $250,000."
        },
        {
          title: "The Power of Compound Interest",
          text: "Compound interest is earning interest on your interest. Over time, this creates exponential growth. Starting early and letting money compound is one of the most powerful wealth-building strategies.",
          highlight: "The Rule of 72: Divide 72 by your interest rate to estimate how many years it takes to double your money."
        },
        {
          title: "Banking Best Practices",
          items: [
            { label: "Online Banking", desc: "Use mobile apps to track spending, pay bills, and transfer money 24/7.", icon: "account_balance" },
            { label: "High-Yield Savings", desc: "Shop around for accounts offering higher interest rates than traditional banks.", icon: "savings" },
            { label: "Avoid Fees", desc: "Maintain minimum balances, use in-network ATMs, and opt out of overdraft protection.", icon: "money_off" },
            { label: "Emergency Fund", desc: "Keep 3-6 months of expenses in a high-yield savings account for emergencies.", icon: "shield" }
          ]
        }
      ]
    },
    '5': {
      title: "Taxes 101",
      description: "Learn how taxes work, understand tax brackets, and discover legitimate ways to reduce your tax burden.",
      sections: [
        {
          title: "Understanding Income Tax",
          text: "Income tax is a percentage of your earnings paid to the government. Your taxable income (after deductions) determines which tax bracket you're in. The US uses a progressive system where higher earners pay higher rates on additional income."
        },
        {
          title: "Tax Brackets Explained",
          text: "Being in a 'higher tax bracket' doesn't mean all your income is taxed at that rate. Only income above each threshold is taxed at that bracket's rate. Your effective tax rate (average) is usually lower than your top bracket.",
          highlight: "Remember: Moving to a higher bracket only affects the income above that threshold, not your entire income."
        },
        {
          title: "Reducing Your Tax Bill",
          items: [
            { label: "Standard Deduction", desc: "Automatic deduction ($14,600+ for singles) - no receipts needed.", icon: "receipt" },
            { label: "Itemized Deductions", desc: "If your deductions exceed the standard, itemize (mortgage interest, charity, medical).", icon: "list" },
            { label: "Tax Credits", desc: "Better than deductions - they reduce tax dollar-for-dollar (education, child tax credit).", icon: "stars" },
            { label: "Retirement Contributions", desc: "401(k) and IRA contributions reduce taxable income now.", icon: "account_balance_wallet" }
          ]
        }
      ]
    },
    '6': {
      title: "Retirement Planning",
      description: "Start planning for retirement early and understand the different retirement accounts available to you.",
      sections: [
        {
          title: "Why Start Early?",
          text: "Time is your greatest asset in retirement planning. Starting 10 years earlier can result in 2-3x more retirement savings due to compound interest. Even small amounts invested early can grow into substantial sums over decades."
        },
        {
          title: "The 4% Rule",
          text: "This rule suggests you can safely withdraw 4% of your retirement savings annually. To retire, aim to save 25 times your annual expenses. For example, if you need $40,000/year, save $1 million.",
          highlight: "Starting at 25 vs 35 can mean the difference between retiring at 55 or 65 with the same monthly savings."
        },
        {
          title: "Retirement Account Types",
          items: [
            { label: "401(k) / EPF", desc: "Employer-sponsored plans with potential matching - contribute enough to get full match (free money!).", icon: "work" },
            { label: "Traditional IRA", desc: "Tax-deductible contributions, but withdrawals are taxed in retirement.", icon: "account_circle" },
            { label: "Roth IRA", desc: "Pay taxes now, but withdrawals in retirement are completely tax-free.", icon: "savings" },
            { label: "Pension Plans", desc: "Employer-funded plans that provide guaranteed income in retirement.", icon: "payments" }
          ]
        }
      ]
    },
    '7': {
      title: "Stock Market",
      description: "Learn how stocks work, understand market indices, dividends, and how to read stock charts effectively.",
      sections: [
        {
          title: "What is a Stock?",
          text: "A stock represents ownership in a company. When you buy shares, you own a small piece of that business. Stock prices fluctuate based on supply and demand, company performance, and market sentiment."
        },
        {
          title: "Market Indices & ETFs",
          text: "Indices like the S&P 500 track groups of stocks to measure overall market performance. Index funds and ETFs let you invest in entire markets with one purchase, providing instant diversification at low cost.",
          highlight: "Most experts recommend index funds for beginners - they're low-cost, diversified, and historically outperform most actively managed funds."
        },
        {
          title: "Key Stock Market Concepts",
          items: [
            { label: "Dividends", desc: "Regular payments companies make to shareholders from profits - like rental income from stocks.", icon: "payments" },
            { label: "Market Volatility", desc: "Price fluctuations are normal. Long-term investors ride out short-term ups and downs.", icon: "show_chart" },
            { label: "Dollar-Cost Averaging", desc: "Investing fixed amounts regularly reduces the impact of market timing.", icon: "calendar_today" },
            { label: "Long-Term Investing", desc: "Holding stocks for years, not days. Time in market beats timing the market.", icon: "schedule" }
          ]
        }
      ]
    },
    '8': {
      title: "Real Estate",
      description: "Explore real estate as an investment, understand mortgages, and learn about REITs as an alternative.",
      sections: [
        {
          title: "Buying vs. Renting",
          text: "Buying builds equity and can be a good investment, but comes with maintenance, taxes, and less flexibility. Renting offers mobility without property management responsibilities. The 5% rule: if annual rent exceeds 5% of home value, buying may be better financially."
        },
        {
          title: "Understanding Mortgages",
          text: "A mortgage is a loan specifically for purchasing real estate. Fixed-rate mortgages have constant payments, while adjustable rates can change. Most require 10-20% down payment, and PMI (Private Mortgage Insurance) is required if down payment is less than 20%.",
          highlight: "A 15-year mortgage has higher monthly payments but saves tens of thousands in interest compared to 30-year loans."
        },
        {
          title: "Real Estate Investment Options",
          items: [
            { label: "Rental Properties", desc: "Buy property to rent out - provides income and potential appreciation, but requires management.", icon: "home" },
            { label: "REITs", desc: "Real Estate Investment Trusts let you invest in real estate through stocks without property management.", icon: "apartment" },
            { label: "House Hacking", desc: "Live in one unit of a multi-family property while renting others to cover costs.", icon: "key" },
            { label: "Real Estate Crowdfunding", desc: "Pool money with others to invest in larger properties with lower capital requirements.", icon: "groups" }
          ]
        }
      ]
    },
    '9': {
      title: "Insurance",
      description: "Protect your wealth and loved ones by understanding different types of insurance and how they work.",
      sections: [
        {
          title: "Health Insurance Essentials",
          text: "Health insurance helps cover medical expenses, protecting you from catastrophic healthcare costs. Key terms: premium (monthly cost), deductible (what you pay before insurance kicks in), copay (fixed fee per visit), and out-of-pocket maximum (most you'll pay annually)."
        },
        {
          title: "Life Insurance Basics",
          text: "Life insurance provides money to beneficiaries when you die. Term life covers a set period (20-30 years) at lower cost. Whole life lasts your lifetime and builds cash value but costs more. You need it if others depend on your income.",
          highlight: "Rule of thumb: Buy term life insurance equal to 10-15x your annual income to protect your family."
        },
        {
          title: "Insurance Types & Tips",
          items: [
            { label: "Health Insurance", desc: "High-deductible plans have lower premiums but higher out-of-pocket costs when you need care.", icon: "local_hospital" },
            { label: "Life Insurance", desc: "Term is usually best for most people - it's affordable and covers your working years.", icon: "favorite" },
            { label: "Disability Insurance", desc: "Protects your income if you can't work due to illness or injury - often overlooked but crucial.", icon: "accessible" },
            { label: "Renters/Home Insurance", desc: "Protects your belongings and provides liability coverage - essential for financial security.", icon: "home" }
          ]
        }
      ]
    },
    '10': {
      title: "Financial Freedom",
      description: "Learn how to build passive income, explore side hustles, and understand the FIRE movement for early financial independence.",
      sections: [
        {
          title: "Building Passive Income",
          text: "Passive income is money earned with minimal ongoing effort. Examples include dividends from stocks, rental income, royalties, and online businesses. The goal is to have passive income exceed your expenses, giving you financial freedom."
        },
        {
          title: "The FIRE Movement",
          text: "FIRE (Financial Independence, Retire Early) focuses on saving 50-70% of income to retire in 10-20 years instead of 40. The 4% rule: if you have 25x your annual expenses saved, you can withdraw 4% annually indefinitely.",
          highlight: "Lean FIRE = minimal expenses. Fat FIRE = luxury lifestyle. Both achieve freedom, just at different spending levels."
        },
        {
          title: "Paths to Financial Freedom",
          items: [
            { label: "Side Hustles", desc: "Extra income sources that can scale into businesses or passive income streams.", icon: "work" },
            { label: "Investing", desc: "Stocks, bonds, and real estate generate returns that can eventually cover living expenses.", icon: "trending_up" },
            { label: "Business Ownership", desc: "Build systems that generate income without your daily involvement.", icon: "store" },
            { label: "High Savings Rate", desc: "Save 50%+ of income to accelerate the path to financial independence.", icon: "savings" }
          ]
        }
      ]
    }
  };

  return guides[unitId] || {
    title: unitTitle,
    description: "A comprehensive guide to help you master this financial topic.",
    sections: [
      {
        title: "Getting Started",
        text: "This unit will help you build a strong foundation in financial literacy. Complete the lessons and quizzes to test your understanding.",
        highlight: "Tip: Review this guide before starting the lessons for better comprehension."
      }
    ]
  };
};