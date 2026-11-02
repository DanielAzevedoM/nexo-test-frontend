import React from 'react';

interface SidebarUserCardProps {
  name?: string;
  email?: string;
  department?: string;
  roleLabel?: string;
  onClick?: () => void;
}

export const SidebarUserCard: React.FC<SidebarUserCardProps> = ({
  name = 'Colaborador Nexo',
  email = 'usuario@nexo.com.br',
  department,
  roleLabel,
  onClick,
}) => {
  const getInitials = (userName: string) => {
    return userName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'US';
  };

  return (
    <div
      onClick={onClick}
      className={`border-t border-[#E6E8EC] pt-[14px] pb-1 px-2 flex items-center gap-[10px] rounded-[8px] transition-colors ${
        onClick ? 'cursor-pointer hover:bg-[#F6F7F9]' : ''
      }`}
      title={onClick ? 'Clique para ver seu perfil completo' : undefined}
    >
      <div className="w-[34px] h-[34px] rounded-full bg-[#0285F714] border border-[#0285F733] flex items-center justify-center shrink-0">
        <span className="text-[12.5px] font-bold text-[#0069C7]">
          {getInitials(name)}
        </span>
      </div>
      <div className="flex flex-col min-w-0">
        <div className="text-[13.5px] font-semibold text-[#1B2431] truncate">
          {name}
        </div>
        <div className="text-[11.5px] text-[#5B6472] truncate">
          {email}
        </div>
        {(department || roleLabel) && (
          <div className="text-[10.5px] text-[#8C95A3] truncate mt-0.5">
            {[department, roleLabel].filter(Boolean).join(' · ')}
          </div>
        )}
      </div>
    </div>
  );
};

