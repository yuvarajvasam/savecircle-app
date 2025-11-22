
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  
  // Hide navbar on lesson, guide, create-circle, and invest pages for immersive experience
  if (
    location.pathname.startsWith('/lesson/') || 
    location.pathname.startsWith('/guide/') || 
    location.pathname === '/create-circle' ||
    location.pathname.startsWith('/invest/')
  ) {
    return null;
  }
  
  const navItems = [
    { path: '/', icon: 'home', label: 'Home', id: 'nav-home' },
    { path: '/circles', icon: 'donut_large', label: 'Circles', id: 'nav-circles' },
    { path: '/learn', icon: 'school', label: 'Learn', id: 'nav-learn' },
    { path: '/profile', icon: 'person', label: 'Profile', id: 'nav-profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-border-light dark:border-white/5 transition-colors duration-300 safe-area-inset-bottom">
      <nav className="flex justify-between items-center px-6 py-2 max-w-md mx-auto">
        {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/circles' && location.pathname.startsWith('/circles'));
            
            return (
              <Link 
                key={item.path} 
                to={item.path}
                id={item.id}
                className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 group ${isActive ? 'text-primary-content dark:text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                <span className={`material-symbols-outlined text-[28px] ${isActive ? 'filled scale-110' : 'scale-100'} transition-transform duration-300`}>
                  {item.icon}
                </span>
                {/* Minimal active indicator dot */}
                <span className={`absolute bottom-2 w-1 h-1 rounded-full bg-current transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></span>
              </Link>
            );
          })}
      </nav>
    </div>
  );
};
