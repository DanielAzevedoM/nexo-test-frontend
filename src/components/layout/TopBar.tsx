import React from 'react';
import { ChevronRight, Menu } from 'lucide-react';

interface TopBarProps {
  breadcrumbTitle?: string;
  isHumanAssigned?: boolean;
  onOpenMobileMenu?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  breadcrumbTitle = 'Atendimento',
  isHumanAssigned = false,
  onOpenMobileMenu,
}) => {
  return (
    <header className="w-full h-[64px] shrink-0 border-b border-[#E6E8EC] px-4 sm:px-8 flex items-center justify-between bg-white">
      {/* Breadcrumb & Mobile Menu */}
      <div className="flex items-center gap-2">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-1.5 -ml-1.5 mr-1 rounded-[8px] hover:bg-gray-100 text-[#1B2431] transition-colors"
            title="Abrir menu"
          >
            <Menu className="w-5 h-5 text-[#1B2431]" />
          </button>
        )}
        <span className="text-[13.5px] text-[#5B6472] hidden sm:inline">Service desk de TI</span>
        <ChevronRight className="w-[14px] h-[14px] text-[#5B6472] hidden sm:inline" />
        <span className="text-[13.5px] font-semibold text-[#1B2431]">
          {breadcrumbTitle}
        </span>
      </div>

      {/* Status Badge */}
      {isHumanAssigned ? (
        <div className="flex items-center gap-[7px] px-[10px] py-[5px] bg-[#F5A50014] rounded-full shrink-0">
          <div className="w-[7px] h-[7px] rounded-full bg-[#F5A500]" />
          <span className="text-[11.5px] sm:text-[12.5px] font-semibold text-[#946300]">
            Analista em atendimento
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-[7px] px-[10px] py-[5px] bg-[#00BD6C14] rounded-full shrink-0">
          <div className="w-[7px] h-[7px] rounded-full bg-[#00BD6C] animate-pulse" />
          <span className="text-[11.5px] sm:text-[12.5px] font-semibold text-[#00804A]">
            Assistente online
          </span>
        </div>
      )}
    </header>
  );
};

