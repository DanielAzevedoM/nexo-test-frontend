import React from 'react';
import { Bot, UserCheck, CheckCircle2, RotateCcw, PanelRightOpen, PanelRightClose, ArrowLeft } from 'lucide-react';
import { Conversation } from '../../types';

interface ConversationHeaderProps {
  conversation: Conversation;
  onAssign: () => void;
  onReturnToAgent: () => void;
  onCloseConversation: () => void;
  isTicketsDrawerOpen: boolean;
  onToggleTicketsDrawer: () => void;
  isLoading?: boolean;
  onBackToList?: () => void;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
  onAssign,
  onReturnToAgent,
  onCloseConversation,
  isTicketsDrawerOpen,
  onToggleTicketsDrawer,
  isLoading = false,
  onBackToList,
}) => {
  const getInitials = (name?: string) => {
    if (!name) return 'AS';
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const isWaiting = conversation.status === 'WAITING_HUMAN';
  const isInAttendance = conversation.status === 'IN_ATTENDANCE';

  return (
    <header className="w-full h-[64px] shrink-0 border-b border-[#E6E8EC] px-3.5 sm:px-5 flex items-center justify-between bg-white">
      {/* Left: Avatar + Name + Meta */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onBackToList && (
          <button
            onClick={onBackToList}
            className="md:hidden p-1.5 -ml-1 rounded-[8px] hover:bg-gray-100 text-[#5B6472] transition-colors"
            title="Voltar às conversas"
          >
            <ArrowLeft className="w-5 h-5 text-[#1B2431]" />
          </button>
        )}
        <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-[#DCE9F7] text-[#0062C4] font-semibold text-[13px] sm:text-[14.5px] flex items-center justify-center shrink-0">
          {getInitials(conversation.user?.name)}
        </div>
        <div className="flex flex-col">
          <div className="text-[14px] sm:text-[15.5px] font-semibold text-[#1B2431] line-clamp-1">
            {conversation.user?.name || 'Funcionário'}
          </div>
          <div className="text-[11.5px] sm:text-[12.5px] text-[#5B6472] line-clamp-1">
            online · {conversation.user?.department || 'Geral'}
            {conversation.relatedTicket?.code ? ` · ${conversation.relatedTicket.code}` : ''}
          </div>
        </div>
      </div>

      {/* Right: Status Mode Badge + Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap justify-end">
        {/* Status Mode Badge */}
        {isWaiting && (
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#F5A50018] text-[#946300] rounded-full text-[11.5px] sm:text-[12.5px] font-semibold whitespace-nowrap shrink-0">
            <Bot className="w-3.5 h-3.5 text-[#946300]" />
            <span className="hidden sm:inline">Aguardando atendente</span>
            <span className="sm:hidden">Aguardando</span>
          </div>
        )}

        {isInAttendance && (
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#0062C414] text-[#0062C4] rounded-full text-[11.5px] sm:text-[12.5px] font-semibold whitespace-nowrap shrink-0">
            <UserCheck className="w-3.5 h-3.5 text-[#0062C4]" />
            <span className="hidden sm:inline">
              Em atendimento: {conversation.assignedAnalyst?.name || 'Você'} (Agent pausado)
            </span>
            <span className="sm:hidden">
              {conversation.assignedAnalyst?.name?.split(' ')[0] || 'Atendendo'}
            </span>
          </div>
        )}

        {/* Action Button: Assumir atendimento */}
        {isWaiting && (
          <button
            onClick={onAssign}
            disabled={isLoading}
            className="h-8 sm:h-9 px-2.5 sm:px-3.5 bg-[#0062C4] hover:bg-[#0052a3] text-white text-[12px] sm:text-[13px] font-semibold rounded-[8px] flex items-center gap-1.5 transition-colors shadow-sm shrink-0 whitespace-nowrap"
          >
            <UserCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span className="hidden sm:inline">Assumir atendimento</span>
            <span className="sm:hidden">Assumir</span>
          </button>
        )}

        {/* Action Button: Devolver ao agent */}
        {isInAttendance && (
          <button
            onClick={onReturnToAgent}
            disabled={isLoading}
            className="h-8 sm:h-9 px-2.5 sm:px-3 bg-white hover:bg-gray-50 border border-[#E6E8EC] text-[#1B2431] text-[12px] sm:text-[13px] font-medium rounded-[8px] flex items-center gap-1.5 transition-colors shadow-sm shrink-0 whitespace-nowrap"
            title="Devolver controle para o assistente automático"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#5B6472]" />
            <span className="hidden sm:inline">Devolver ao agent</span>
            <span className="sm:hidden">Devolver</span>
          </button>
        )}

        {/* Action Button: Encerrar conversa */}
        {conversation.status !== 'CLOSED' && (
          <button
            onClick={onCloseConversation}
            disabled={isLoading}
            className="h-8 sm:h-9 px-2.5 sm:px-3 bg-white hover:bg-red-50 border border-[#E6E8EC] hover:border-red-200 text-[#3D4656] hover:text-red-700 text-[12px] sm:text-[13px] font-medium rounded-[8px] flex items-center gap-1.5 transition-colors shadow-sm shrink-0 whitespace-nowrap"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Encerrar</span>
          </button>
        )}

        {/* Toggle Tickets Drawer Button */}
        <button
          onClick={onToggleTicketsDrawer}
          className={`h-8 sm:h-9 px-2.5 sm:px-3 rounded-[8px] border text-[12px] sm:text-[13px] font-medium flex items-center gap-1.5 transition-colors shrink-0 whitespace-nowrap ${
            isTicketsDrawerOpen
              ? 'bg-[#0285F712] border-[#0285F7] text-[#0069C7]'
              : 'bg-white border-[#E6E8EC] text-[#5B6472] hover:bg-gray-50'
          }`}
          title="Ver chamados do funcionário"
        >
          {isTicketsDrawerOpen ? (
            <PanelRightClose className="w-4 h-4 text-[#0069C7]" />
          ) : (
            <PanelRightOpen className="w-4 h-4 text-[#5B6472]" />
          )}
          <span className="hidden sm:inline">Chamados</span>
        </button>
      </div>
    </header>
  );
};

