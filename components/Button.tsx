
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'text' | 'danger' | 'success';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  size = 'md',
  className = '',
  ...props 
}) => {
  // Enhanced 3D feel: thicker bottom border, transform on active
  const baseStyles = "rounded-2xl font-bold tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2 active:border-b-0 active:translate-y-[4px] relative uppercase";
  
  const variants = {
    primary: "bg-primary text-background-dark border-b-[4px] border-[#a3cc39] hover:brightness-110",
    secondary: "bg-white dark:bg-[#2c2c2e] text-neo-black dark:text-white border-b-[4px] border-gray-200 dark:border-black/20 hover:bg-gray-50 dark:hover:bg-[#3a3a3c]",
    accent: "bg-sky-400 text-white border-b-[4px] border-sky-600 hover:brightness-110",
    danger: "bg-red-500 text-white border-b-[4px] border-red-700 hover:bg-red-400",
    success: "bg-green-500 text-white border-b-[4px] border-green-700 hover:bg-green-400",
    text: "bg-transparent border-transparent text-neo-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 shadow-none border-b-0 active:translate-y-0 normal-case"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs min-h-[40px]",
    md: "px-6 py-3 text-sm min-h-[52px]",
    lg: "px-8 py-4 text-lg min-h-[60px]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};