import React from 'react';

interface SidebarNavProps {
  children: React.ReactNode;
  className?: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ children, className = '' }) => {
  return (
    <nav className={`flex flex-col gap-[3px] ${className}`}>
      {children}
    </nav>
  );
};

