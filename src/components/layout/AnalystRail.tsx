import React from 'react';
import { MessageCircle, ArrowLeft, LogOut } from 'lucide-react';
import { NexoMark } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';

interface AnalystRailProps {
  needsHumanCount?: number;
  onBackToEmployeeChat?: () => void;
}

export const AnalystRail: React.FC<AnalystRailProps> = ({
  needsHumanCount = 3,
  onBackToEmployeeChat,
}) => {
  const { user } = useAuth();

  return (
    <aside className="w-[64px] shrink-0 h-screen flex flex-col items-center justify-between py-4 bg-[#F6F7F9] border-r border-[#E6E8EC]">
      <div className="flex flex-col items-center gap-3">
        {/* Nexo Mark */}
        <div className="w-10 h-10 flex items-center justify-center">
          <NexoMark className="w-[22px] h-[22px]" color="#037AF6" />
        </div>

        {/* Conversas Active Icon with Badge */}
        <div className="relative">
          <button
            className="w-10 h-10 rounded-[12px] bg-white shadow-sm flex items-center justify-center text-[#1B2431]"
            title="Conversas do Service Desk"
          >
            <MessageCircle className="w-[19px] h-[19px]" />
          </button>
          {needsHumanCount > 0 && (
            <span className="absolute -top-1 -right-1 px-[5px] h-[16px] bg-[#0062C4] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#F6F7F9]">
              {needsHumanCount}
            </span>
          )}
        </div>

        {/* Back to Employee Chat Shortcut */}
        {onBackToEmployeeChat && (
          <button
            onClick={onBackToEmployeeChat}
            className="w-10 h-10 rounded-[12px] text-[#5B6472] hover:bg-white hover:text-[#1B2431] transition-colors flex items-center justify-center"
            title="Voltar para visão do funcionário"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Analyst Avatar and Logout */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="relative cursor-pointer"
          title={`${user?.name || 'Analista'} (${user?.email})`}
        >
          <div className="w-9 h-9 rounded-full bg-[#0285F712] border border-[#0285F733] flex items-center justify-center text-[12.5px] font-bold text-[#0069C7]">
            {user?.name
              ?.split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase() || 'AN'}
          </div>
          <div className="absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full bg-[#00BD6C] ring-2 ring-[#F6F7F9]" />
        </div>

        <button
          onClick={() => {
            const { logout } = useAuth();
          }}
          className="hidden"
        />

        <AnalystLogoutButton />
      </div>
    </aside>
  );
};

const AnalystLogoutButton: React.FC = () => {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[#5B6472] hover:bg-red-50 hover:text-red-600 transition-colors"
      title="Sair da conta de analista"
    >
      <LogOut className="w-4 h-4" />
    </button>
  );
};

