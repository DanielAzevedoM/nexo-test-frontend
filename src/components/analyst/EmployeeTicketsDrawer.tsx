import React, { useEffect, useState } from 'react';
import { X, Clock, Ticket as TicketIcon } from 'lucide-react';
import { Conversation, Ticket } from '../../types';
import { ticketsApi } from '../../api/tickets.api';
import { formatTicketStatus, formatTicketPriority } from '../../utils/formatters';

interface EmployeeTicketsDrawerProps {
  conversation: Conversation;
  isOpen: boolean;
  onClose: () => void;
}

export const EmployeeTicketsDrawer: React.FC<EmployeeTicketsDrawerProps> = ({
  conversation,
  isOpen,
  onClose,
}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && conversation.user?.id) {
      loadUserTickets();
    }
  }, [isOpen, conversation.user?.id]);

  const loadUserTickets = async () => {
    try {
      setIsLoading(true);
      const res = await ticketsApi.list({ userId: conversation.user.id });
      setTickets(res.data);
    } catch (e) {
      console.error('Error loading user tickets', e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile/Tablet Backdrop */}
      <div
        className="fixed inset-0 z-30 bg-black/30 backdrop-blur-xs xl:hidden animate-in fade-in duration-200"
        onClick={onClose}
      />

      <aside className="w-full sm:w-[360px] md:w-[380px] shrink-0 h-screen border-l border-[#E6E8EC] bg-[#F6F7F9] flex flex-col justify-between overflow-hidden shadow-xl animate-fadeIn fixed right-0 top-0 z-40 xl:relative xl:shadow-none">
      {/* Header */}
      <div className="p-4 border-b border-[#E6E8EC] bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TicketIcon className="w-5 h-5 text-[#0062C4]" />
          <div>
            <h3 className="text-[15px] font-bold text-[#1B2431]">
              Chamados do Funcionário
            </h3>
            <span className="text-[12px] text-[#5B6472]">
              {conversation.user?.name} · {conversation.user?.department}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#5B6472]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Tickets List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-[#1B2431]">
              Histórico de Chamados ({tickets.length})
            </span>
          </div>

          {isLoading ? (
            <div className="text-center py-6 text-[13px] text-[#5B6472]">
              Carregando chamados…
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-6 text-[13px] text-[#5B6472]">
              Nenhum chamado encontrado para este funcionário.
            </div>
          ) : (
            tickets.map((t) => {
              const isOverdue = t.isOverdue;

              return (
                <div
                  key={t.id}
                  className="p-3.5 bg-white rounded-[12px] border border-[#E6E8EC] shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] font-bold text-[#0062C4]">
                      {t.code}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        t.status === 'WAITING_ANALYST'
                          ? 'bg-[#F5A50014] text-[#946300]'
                          : t.status === 'RESOLVED'
                          ? 'bg-gray-100 text-[#5B6472]'
                          : 'bg-[#00BD6C14] text-[#00804A]'
                      }`}
                    >
                      {formatTicketStatus(t.status)}
                    </span>
                  </div>

                  <h4 className="text-[14px] font-semibold text-[#1B2431] leading-snug">
                    {t.title}
                  </h4>

                  <p className="text-[12.5px] text-[#5B6472] line-clamp-2">
                    {t.description}
                  </p>

                  <div className="pt-2 border-t border-[#E6E8EC] flex items-center justify-between text-[11.5px] text-[#5B6472]">
                    <div className="flex flex-col gap-0.5">
                      <span>Prioridade: {formatTicketPriority(t.priority)}</span>
                      {t.assignedAnalyst ? (
                        <span className="text-[10.5px] font-semibold text-[#0062C4] flex items-center gap-1">
                          👤 Responsável: {t.assignedAnalyst.name}
                        </span>
                      ) : (
                        <span className="text-[10.5px] text-[#8C95A3]">
                          Fila geral (sem atendente fixado)
                        </span>
                      )}
                    </div>
                    {isOverdue ? (
                      <span className="text-[#C4161D] font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Prazo Vencido
                      </span>
                    ) : (
                      <span>{t.slaRemainingText || 'No prazo'}</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#E6E8EC] bg-white text-center text-[12px] text-[#5B6472]">
        Console de Atendimento · Nexo Assist
      </div>
    </aside>
    </>
  );
};

