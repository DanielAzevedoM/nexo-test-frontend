import React, { useState, useEffect } from 'react';
import { X, Search, Ticket as TicketIcon, Clock, AlertTriangle, CheckCircle2, MessageSquare, RefreshCw } from 'lucide-react';
import { Ticket } from '../../types';
import { ticketsApi } from '../../api/tickets.api';
import { formatTicketStatus, formatTicketCategory } from '../../utils/formatters';

interface UserTicketsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTicketForChat: (ticketCode: string, ticketTitle: string) => void;
  ticketsVersion?: number;
}

export const UserTicketsDrawer: React.FC<UserTicketsDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTicketForChat,
  ticketsVersion,
}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPEN' | 'RESOLVED'>('ALL');

  useEffect(() => {
    if (isOpen) {
      loadTickets();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, ticketsVersion]);

  const loadTickets = async () => {
    try {
      setIsLoading(true);
      const res = await ticketsApi.list();
      setTickets(res.data || []);
    } catch (err) {
      console.error('Failed to load tickets in drawer', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'OPEN') {
      return t.status !== 'RESOLVED' && t.status !== 'CANCELLED';
    }
    if (statusFilter === 'RESOLVED') {
      return t.status === 'RESOLVED';
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN':
        return (
          <span className="px-2 py-0.5 rounded-[4px] text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            Aberto
          </span>
        );
      case 'WAITING_ANALYST':
        return (
          <span className="px-2 py-0.5 rounded-[4px] text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            Aguardando analista
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="px-2 py-0.5 rounded-[4px] text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            Em andamento
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="px-2 py-0.5 rounded-[4px] text-[11px] font-semibold bg-green-50 text-green-800 border border-green-200">
            Resolvido
          </span>
        );
      case 'APPROVED':
        return (
          <span className="px-2 py-0.5 rounded-[4px] text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-200">
            Aprovado
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-[4px] text-[11px] font-semibold bg-gray-100 text-gray-700">
            {formatTicketStatus(status)}
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return <span className="text-[11.5px] font-bold text-red-600">● Crítica</span>;
      case 'HIGH':
        return <span className="text-[11.5px] font-bold text-amber-600">● Alta</span>;
      case 'MEDIUM':
        return <span className="text-[11.5px] font-semibold text-[#0069C7]">● Média</span>;
      default:
        return <span className="text-[11.5px] font-medium text-gray-500">● Baixa</span>;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-[480px] h-full bg-white shadow-2xl flex flex-col border-l border-[#E6E8EC] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E6E8EC] bg-[#FAFAFC]">
          <div className="flex items-center gap-2.5">
            <TicketIcon className="w-5 h-5 text-[#0069C7]" />
            <h3 className="text-[15px] sm:text-[16px] font-bold text-[#1B2431]">
              Meus Chamados
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#0285F714] text-[#0069C7]">
              {tickets.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={loadTickets}
              title="Atualizar lista"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#5B6472] hover:bg-[#E6E8EC] transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#5B6472] hover:bg-[#E6E8EC] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-3 sm:p-4 border-b border-[#E6E8EC] flex flex-col gap-2.5 sm:gap-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C95A3]" />
            <input
              type="text"
              placeholder="Buscar por código ou problema…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[38px] pl-9 pr-3 rounded-[8px] bg-[#F6F8FB] border border-[#E1E6EE] text-[13.5px] text-[#1B2431] outline-none focus:border-[#0062C4]"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#F0F2F5] p-1 rounded-[8px]">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`flex-1 py-1 text-[12px] font-semibold rounded-[6px] transition-colors ${
                statusFilter === 'ALL'
                  ? 'bg-white text-[#1B2431] shadow-xs'
                  : 'text-[#5B6472] hover:text-[#1B2431]'
              }`}
            >
              Todos ({tickets.length})
            </button>
            <button
              onClick={() => setStatusFilter('OPEN')}
              className={`flex-1 py-1 text-[12px] font-semibold rounded-[6px] transition-colors ${
                statusFilter === 'OPEN'
                  ? 'bg-white text-[#1B2431] shadow-xs'
                  : 'text-[#5B6472] hover:text-[#1B2431]'
              }`}
            >
              Abertos ({tickets.filter((t) => t.status !== 'RESOLVED' && t.status !== 'CANCELLED').length})
            </button>
            <button
              onClick={() => setStatusFilter('RESOLVED')}
              className={`flex-1 py-1 text-[12px] font-semibold rounded-[6px] transition-colors ${
                statusFilter === 'RESOLVED'
                  ? 'bg-white text-[#1B2431] shadow-xs'
                  : 'text-[#5B6472] hover:text-[#1B2431]'
              }`}
            >
              Resolvidos ({tickets.filter((t) => t.status === 'RESOLVED').length})
            </button>
          </div>
        </div>

        {/* Tickets List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {isLoading && tickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-[#5B6472] gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-[#0069C7]" />
              <span className="text-[13px]">Buscando seus chamados…</span>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center text-[#5B6472] gap-1 p-6">
              <TicketIcon className="w-8 h-8 text-[#8C95A3] mb-1" />
              <span className="text-[14px] font-semibold text-[#1B2431]">
                Nenhum chamado encontrado
              </span>
              <span className="text-[12.5px] text-[#8C95A3]">
                Você pode abrir um chamado a qualquer momento conversando com o Nexo Assist no chat.
              </span>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-4 rounded-[12px] border border-[#E6E8EC] hover:border-[#0285F755] bg-white transition-all shadow-xs flex flex-col gap-2.5"
              >
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-[#1B2431] font-mono">
                      {ticket.code}
                    </span>
                    <span className="text-[12px] text-[#8C95A3]">·</span>
                    <span className="text-[12px] font-medium text-[#5B6472]">
                      {formatTicketCategory(ticket.category)}
                    </span>
                  </div>
                  {getStatusBadge(ticket.status)}
                </div>

                {/* Title and Description */}
                <div>
                  <h4 className="text-[14px] font-semibold text-[#1B2431] line-clamp-1">
                    {ticket.title}
                  </h4>
                  {ticket.description && (
                    <p className="text-[12.5px] text-[#5B6472] line-clamp-2 mt-0.5 leading-snug">
                      {ticket.description}
                    </p>
                  )}
                </div>

                {/* Priority & SLA row */}
                <div className="flex flex-col gap-1.5 pt-2 border-t border-[#F0F2F5] text-[12px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(ticket.priority)}
                      {ticket.isOverdue && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                          <AlertTriangle className="w-3 h-3" /> SLA Vencido
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectTicketForChat(ticket.code, ticket.title);
                      }}
                      className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0069C7] hover:underline"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ver no chat</span>
                    </button>
                  </div>

                  {ticket.assignedAnalyst && (
                    <div className="text-[11px] font-medium text-[#0069C7] flex items-center gap-1">
                      <span>👤 Atendente responsável: {ticket.assignedAnalyst.name}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

