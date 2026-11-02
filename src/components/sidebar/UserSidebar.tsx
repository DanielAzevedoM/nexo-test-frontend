import React, { useState, useEffect } from 'react';
import { MessageSquare, Ticket as TicketIcon, User as UserIcon, LogOut, Plus } from 'lucide-react';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNav } from './SidebarNav';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarUserCard } from './SidebarUserCard';
import { useAuth } from '../../context/AuthContext';
import { ticketsApi } from '../../api/tickets.api';

interface UserSidebarProps {
  currentTab: 'chat' | 'tickets' | 'profile';
  onTabChange: (tab: 'chat' | 'tickets' | 'profile') => void;
  onNewConversation: () => void;
  onOpenProfile?: () => void;
  ticketsVersion?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const UserSidebar: React.FC<UserSidebarProps> = ({
  currentTab,
  onTabChange,
  onNewConversation,
  onOpenProfile,
  ticketsVersion,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const { user, logout } = useAuth();
  const [openTicketsCount, setOpenTicketsCount] = useState<number>(0);

  useEffect(() => {
    loadOpenTicketsCount();
  }, [user, ticketsVersion]);

  const loadOpenTicketsCount = async () => {
    try {
      const res = await ticketsApi.list();
      const openCount = (res.data || []).filter(
        (t) => t.status !== 'RESOLVED' && t.status !== 'CANCELLED',
      ).length;
      setOpenTicketsCount(openCount);
    } catch {
      // Ignore count fetch errors gracefully
    }
  };

  const handleTabClick = (tab: 'chat' | 'tickets' | 'profile') => {
    onTabChange(tab);
    onCloseMobile?.();
  };

  const handleNewConvClick = () => {
    onNewConversation();
    onCloseMobile?.();
  };

  const sidebarContent = (
    <>
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Componentized Header */}
        <SidebarHeader
          title="Nexo Assist"
          subtitle="Service desk de TI"
        />

        <div className="h-[20px]" />

        {/* Action: Nova Conversa */}
        <button
          onClick={handleNewConvClick}
          className="w-full h-[36px] flex items-center gap-[10px] px-[10px] rounded-[8px] text-[#0069C7] font-semibold bg-[#0285F70A] hover:bg-[#0285F714] border border-[#0285F720] transition-colors mb-3 shadow-xs"
          title="Iniciar nova conversa do zero com o assistente"
        >
          <Plus className="w-4 h-4 text-[#0069C7]" />
          <span className="text-[13.5px]">Nova conversa</span>
        </button>

        {/* Componentized Nav */}
        <SidebarNav>
          <SidebarNavItem
            icon={<MessageSquare className="w-4 h-4" />}
            label="Atendimento"
            isActive={currentTab === 'chat'}
            onClick={() => handleTabClick('chat')}
            title="Chat com o Nexo Assist"
          />

          <SidebarNavItem
            icon={<TicketIcon className="w-4 h-4" />}
            label="Meus Chamados"
            isActive={currentTab === 'tickets'}
            badge={openTicketsCount > 0 ? openTicketsCount : undefined}
            badgeVariant="warning"
            onClick={() => handleTabClick('tickets')}
            title="Ver meus chamados e prazos de SLA"
          />

          <SidebarNavItem
            icon={<UserIcon className="w-4 h-4" />}
            label="Meu perfil"
            isActive={currentTab === 'profile'}
            onClick={() => handleTabClick('profile')}
            title="Ver dados do colaborador e sessão"
          />
        </SidebarNav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-1">
        {/* Componentized User Card */}
        <SidebarUserCard
          name={user?.name}
          email={user?.email}
          department={user?.department}
          roleLabel="Colaborador"
          onClick={() => handleTabClick('profile')}
        />

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full h-[34px] flex items-center gap-[10px] px-[10px] rounded-[8px] text-[#5B6472] font-medium hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Encerrar sessão no Nexo Assist"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-[13px]">Sair da conta</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[240px] shrink-0 h-screen flex-col justify-between border-r border-[#E6E8EC] p-[20px_14px_14px_14px] bg-white select-none">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-50 flex md:hidden bg-black/40 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
          onClick={onCloseMobile}
        >
          <div
            className="w-[280px] max-w-[85vw] h-full bg-white flex flex-col justify-between p-[20px_14px_14px_14px] shadow-2xl border-r border-[#E6E8EC] animate-in slide-in-from-left duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

