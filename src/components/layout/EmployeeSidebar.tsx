import React from 'react';
import { MessageSquare, User as UserIcon, LogOut, ShieldAlert, Plus } from 'lucide-react';
import { NexoMark } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';

interface EmployeeSidebarProps {
  currentTab?: 'chat' | 'profile';
  onTabChange?: (tab: 'chat' | 'profile') => void;
  onNavigateToConsole?: () => void;
  onNewConversation?: () => void;
}

export const EmployeeSidebar: React.FC<EmployeeSidebarProps> = ({
  currentTab = 'chat',
  onTabChange,
  onNavigateToConsole,
  onNewConversation,
}) => {
  const { user, logout } = useAuth();

  const getInitials = (name?: string) => {
    if (!name) return 'US';
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <aside className="w-[232px] shrink-0 h-screen flex flex-col justify-between border-r border-[#E6E8EC] p-[20px_14px_14px_14px] bg-white">
      <div className="flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-[10px] px-2 py-1">
          <NexoMark className="w-5 h-5 shrink-0" color="#037AF6" />
          <span className="text-[16px] font-bold text-[#1B2431] tracking-[-0.2px]">
            Nexo Assist
          </span>
        </div>

        {/* Gap */}
        <div className="h-[22px]" />

        {/* Navigation */}
        <nav className="flex flex-col gap-[2px]">
          {onNewConversation && (
            <button
              onClick={onNewConversation}
              className="w-full h-[36px] flex items-center gap-[10px] px-[10px] rounded-[8px] text-[#0069C7] font-semibold bg-[#0285F70A] hover:bg-[#0285F714] border border-[#0285F720] transition-colors mb-2"
              title="Iniciar novo atendimento do zero"
            >
              <Plus className="w-4 h-4 text-[#0069C7]" />
              <span className="text-[13.5px]">Nova conversa</span>
            </button>
          )}

          <button
            onClick={() => onTabChange && onTabChange('chat')}
            className={`w-full h-[36px] flex items-center gap-[10px] px-[10px] rounded-[8px] transition-colors ${
              currentTab === 'chat'
                ? 'bg-[#0285F712] text-[#0069C7] font-semibold'
                : 'text-[#3D4656] font-medium hover:bg-[#F6F7F9]'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#0069C7]" />
            <span className="text-[13.5px]">Atendimento</span>
          </button>

          <button
            onClick={() => onTabChange && onTabChange('profile')}
            className={`w-full h-[36px] flex items-center gap-[10px] px-[10px] rounded-[8px] transition-colors ${
              currentTab === 'profile'
                ? 'bg-[#0285F712] text-[#0069C7] font-semibold'
                : 'text-[#3D4656] font-medium hover:bg-[#F6F7F9]'
            }`}
          >
            <UserIcon className="w-4 h-4 text-[#5B6472]" />
            <span className="text-[13.5px]">Meu perfil</span>
          </button>

          {/* Atalho para Console do Analista */}
          {onNavigateToConsole && (
            <button
              onClick={onNavigateToConsole}
              className="w-full h-[36px] mt-2 flex items-center gap-[10px] px-[10px] rounded-[8px] text-[#5B6472] font-medium hover:bg-[#F6F7F9] hover:text-[#1B2431] transition-colors text-left"
              title="Acessar Console do Analista (Suporte N1/N2)"
            >
              <ShieldAlert className="w-4 h-4 text-[#F5A500]" />
              <span className="text-[12.5px]">Console Analista</span>
            </button>
          )}
        </nav>
      </div>

      {/* Bottom User Area */}
      <div className="flex flex-col gap-1">
        {/* User Card */}
        <div className="border-t border-[#E6E8EC] pt-[14px] pb-1 px-2 flex items-center gap-[10px]">
          <div className="w-[34px] h-[34px] rounded-full bg-[#0285F712] flex items-center justify-center shrink-0">
            <span className="text-[12.5px] font-bold text-[#0069C7]">
              {getInitials(user?.name)}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="text-[13.5px] font-semibold text-[#1B2431] truncate">
              {user?.name || 'Funcionário Nexo'}
            </div>
            <div className="text-[11.5px] text-[#5B6472] truncate">
              {user?.email || 'funcionario@nexo.com.br'}
            </div>
          </div>
        </div>

        {/* Sair */}
        <button
          onClick={logout}
          className="w-full h-[34px] flex items-center gap-[10px] px-[10px] rounded-[8px] text-[#3D4656] font-medium hover:bg-[#F6F7F9] transition-colors"
        >
          <LogOut className="w-4 h-4 text-[#5B6472]" />
          <span className="text-[13.5px]">Sair</span>
        </button>
      </div>
    </aside>
  );
};

