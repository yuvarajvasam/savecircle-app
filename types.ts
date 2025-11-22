

export interface User {
  name: string;
  avatar: string; // URL or emoji
  streak: number;
  dailyGoal: number;
  currency: string;
  savedThisMonth: number;
  totalSaved: number;
  savedToday: number;
  consistencyScore: number; // Percentage
  level: number;
  xp: number;
  nextLevelXp: number;
  gems: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
  type: 'msg' | 'event';
}

export interface Circle {
  id: string;
  name: string;
  membersCount: number;
  streak: number;
  consistency: number;
  poolTotal: number; // Liquid Cash Available
  isUserMember: boolean;
  theme?: string; // 'obsidian' | 'lime' | 'sky' | 'purple' | 'sunset'
  inviteCode?: string;
  members: CircleMember[];
  activity: ActivityItem[];
  messages?: ChatMessage[];
  // Extended fields for Goals/Circles
  targetAmount?: number;
  targetDate?: string;
  contribution?: number;
  frequency?: string;
  mode?: 'solo' | 'social';
  // Icon Support
  icon?: string; // Lucide icon name or Emoji char
  iconType?: 'lucide' | 'emoji';
  iconColor?: string; // Tailwind text color class
  // Investment Support
  investedAmount?: number;
  investmentPlanId?: string;
}

export interface CircleMember {
  id: string;
  name: string;
  avatar: string;
  consistency: number; // Percentage
  hasPaid?: boolean;
}

export interface ActivityItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: 'saved' | 'joined' | 'missed' | 'invested';
  timestamp: string;
  reactions: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  daysTotal: number;
  daysCompleted: number;
  rewardXP: number;
  rewardGold: number;
  active: boolean;
  category: 'active' | 'new' | 'completed';
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  streak: number;
  isCurrentUser: boolean;
  movement?: 'up' | 'down' | 'same';
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "5 min"
  completed: boolean;
  xp: number;
  status: 'completed' | 'current' | 'locked';
  content: LessonContent[];
}

export interface LessonContent {
  type: 'slide' | 'quiz';
  text?: string;
  image?: string;
  question?: string;
  options?: string[];
  correctOption?: number;
}

export enum AppMode {
  SOLO = 'SOLO',
  CIRCLE = 'CIRCLE'
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any; // Lucide icon
  earned: boolean;
  dateEarned?: string;
}

export interface GraphData {
  label: string;
  value: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  type: 'powerup' | 'cosmetic';
  purchased: boolean;
}

export interface InvestmentPlan {
  id: string;
  name: string;
  risk: 'Low' | 'Medium' | 'High';
  minReturn: number; // Percentage
  maxReturn: number; // Percentage
  description: string;
  tags: string[];
  color: string;
}