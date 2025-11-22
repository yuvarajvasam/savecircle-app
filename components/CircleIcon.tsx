
import React from 'react';
import { 
    Wallet, PiggyBank, Plane, Car, Home, Gift, GraduationCap, Heart, Laptop, Music, 
    Gamepad, Dog, Briefcase, Coffee, Sun, Star, Umbrella, Camera, Smartphone, MapPin, 
    Anchor, Bike, Zap, Crown, Lock, Users, Rocket, Sparkles, Target, Smile
} from 'lucide-react';

// Export map for selection UI
export const ICON_MAP: Record<string, React.ElementType> = {
    Wallet, PiggyBank, Plane, Car, Home, Gift, GraduationCap, Heart, Laptop, Music, 
    Gamepad, Dog, Briefcase, Coffee, Sun, Star, Umbrella, Camera, Smartphone, MapPin, 
    Anchor, Bike, Zap, Crown, Lock, Users, Rocket, Sparkles, Target, Smile
};

export const AVAILABLE_COLORS = [
    { id: 'text-white', bg: 'bg-white' },
    { id: 'text-red-400', bg: 'bg-red-400' },
    { id: 'text-orange-400', bg: 'bg-orange-400' },
    { id: 'text-yellow-400', bg: 'bg-yellow-400' },
    { id: 'text-green-400', bg: 'bg-green-400' },
    { id: 'text-emerald-400', bg: 'bg-emerald-400' },
    { id: 'text-teal-400', bg: 'bg-teal-400' },
    { id: 'text-cyan-400', bg: 'bg-cyan-400' },
    { id: 'text-sky-400', bg: 'bg-sky-400' },
    { id: 'text-blue-400', bg: 'bg-blue-400' },
    { id: 'text-indigo-400', bg: 'bg-indigo-400' },
    { id: 'text-purple-400', bg: 'bg-purple-400' },
    { id: 'text-fuchsia-400', bg: 'bg-fuchsia-400' },
    { id: 'text-pink-400', bg: 'bg-pink-400' },
    { id: 'text-rose-400', bg: 'bg-rose-400' },
    { id: 'text-gray-400', bg: 'bg-gray-400' },
];

interface CircleIconProps {
    icon?: string;
    type?: 'lucide' | 'emoji';
    color?: string;
    className?: string;
    fallback?: string;
}

export const CircleIcon: React.FC<CircleIconProps> = ({ icon, type, color, className = "", fallback = "?" }) => {
    if (!icon) {
        return <span className={`font-bold flex items-center justify-center ${className}`}>{fallback}</span>;
    }

    if (type === 'emoji') {
        // Emojis don't use the text color class usually, but we allow className for sizing
        return <span className={`flex items-center justify-center leading-none ${className}`} style={{ fontSize: '1em' }}>{icon}</span>;
    }

    const IconComponent = ICON_MAP[icon];
    if (IconComponent) {
        return <IconComponent className={`${className} ${color || 'text-white'}`} />;
    }

    return <span className={`font-bold flex items-center justify-center ${className}`}>{fallback}</span>;
};
