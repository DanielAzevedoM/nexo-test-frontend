import React from 'react';
import { NexoMark } from '../common/Icons';

interface SidebarHeaderProps {
  title?: string;
  subtitle?: string;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  title = 'Nexo Assist',
  subtitle,
}) => {
  return (
    <div className="flex items-center gap-[10px] px-2 py-1 select-none">
      <NexoMark className="w-5 h-5 shrink-0" color="#037AF6" />
      <div className="flex flex-col min-w-0">
        <span className="text-[16px] font-bold text-[#1B2431] tracking-[-0.2px] leading-tight">
          {title}
        </span>
        {subtitle && (
          <span className="text-[11px] text-[#5B6472] font-medium leading-tight">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

