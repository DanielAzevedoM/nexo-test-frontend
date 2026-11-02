import React from 'react';

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  badge?: string | number;
  badgeVariant?: 'primary' | 'warning' | 'neutral';
  onClick?: () => void;
  title?: string;
  className?: string;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon,
  label,
  isActive = false,
  badge,
  badgeVariant = 'primary',
  onClick,
  title,
  className = '',
}) => {
  const getBadgeClass = () => {
    switch (badgeVariant) {
      case 'warning':
        return 'bg-amber-100 text-amber-700';
      case 'neutral':
        return 'bg-[#F0F2F5] text-[#5B6472]';
      case 'primary':
      default:
        return 'bg-[#0285F71A] text-[#0069C7]';
    }
  };

  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-full h-[36px] flex items-center justify-between px-[10px] rounded-[8px] transition-all text-left group ${
        isActive
          ? 'bg-[#0285F714] text-[#0069C7] font-semibold shadow-xs'
          : 'text-[#3D4656] font-medium hover:bg-[#F6F7F9] hover:text-[#1B2431]'
      } ${className}`}
    >
      <div className="flex items-center gap-[10px] min-w-0">
        <span
          className={`shrink-0 transition-colors ${
            isActive ? 'text-[#0069C7]' : 'text-[#5B6472] group-hover:text-[#1B2431]'
          }`}
        >
          {icon}
        </span>
        <span className="text-[13.5px] truncate">{label}</span>
      </div>

      {badge !== undefined && badge !== null && (
        <span
          className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${getBadgeClass()}`}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

