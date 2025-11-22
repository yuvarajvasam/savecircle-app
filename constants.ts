

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

  return defaultQuestions;
};