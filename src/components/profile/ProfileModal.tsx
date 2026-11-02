import React, { useEffect, useState } from 'react';
import { X, User as UserIcon, Mail, Building, ShieldCheck, LogOut, Ticket as TicketIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ticketsApi } from '../../api/tickets.api';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMyTickets?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenMyTickets,
}) => {
  const { user, logout } = useAuth();
  const [ticketCount, setTicketCount] = useState<number | null>(null);
  const [loadingTickets, setLoadingTickets] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      loadUserTicketCount();
    }
  }, [isOpen, user]);

  const loadUserTicketCount = async () => {
    try {
      setLoadingTickets(true);
      const res = await ticketsApi.list();
      setTicketCount(res.total ?? (res.data ? res.data.length : 0));
    } catch (err) {
      console.error('Failed to load tickets count', err);
    } finally {
      setLoadingTickets(false);
    }
  };

  if (!isOpen || !user) return null;

  const getInitials = (name?: string) => {
    if (!name) return 'US';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const isAnalyst = user.role === 'ANALYST' || user.role === 'ADMIN';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-[460px] bg-white rounded-[16px] shadow-2xl border border-[#E6E8EC] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E8EC] bg-[#FAFAFC]">
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-[#0069C7]" />
            <h3 className="text-[15px] font-bold text-[#1B2431]">
              Meu Perfil Corporativo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5B6472] hover:bg-[#E6E8EC] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Avatar and Main Info Card */}
          <div className="flex items-center gap-4 p-4 rounded-[12px] bg-[#F6F8FB] border border-[#E1E6EE]">
            <div className="w-14 h-14 rounded-full bg-[#0285F71A] border-2 border-[#0285F740] flex items-center justify-center shrink-0">
              <span className="text-[18px] font-bold text-[#0069C7]">
                {getInitials(user.name)}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-bold text-[#1B2431] truncate">
                  {user.name}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#00BD6C1A] text-[#008A4F] border border-[#00BD6C33]">
                  Ativo
                </span>
              </div>
              <span className="text-[13px] text-[#5B6472] truncate">
                {user.email}
              </span>
              <div className="mt-1">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold ${
                    isAnalyst
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {isAnalyst
                    ? '🛡️ Analista de Suporte de TI'
                    : '👤 Colaborador / Usuário'}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-[13px]">
            <div className="p-3 rounded-[8px] bg-white border border-[#E6E8EC] flex flex-col gap-1">
              <span className="text-[11px] font-medium text-[#8C95A3] uppercase flex items-center gap-1">
                <Building className="w-3 h-3" /> Departamento
              </span>
              <span className="font-semibold text-[#1B2431]">
                {user.department || 'Operações'}
              </span>
            </div>

            <div className="p-3 rounded-[8px] bg-white border border-[#E6E8EC] flex flex-col gap-1">
              <span className="text-[11px] font-medium text-[#8C95A3] uppercase flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Empresa / Tenant
              </span>
              <span className="font-semibold text-[#1B2431]">
                Nexo (2.000 func.)
              </span>
            </div>
          </div>

          {/* User Tickets Summary Card */}
          <div className="p-4 rounded-[12px] border border-[#E6E8EC] bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[8px] bg-[#0285F714] flex items-center justify-center text-[#0069C7]">
                <TicketIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13.5px] font-semibold text-[#1B2431]">
                  Meus Chamados de TI
                </span>
                <span className="text-[12px] text-[#5B6472]">
                  {loadingTickets
                    ? 'Carregando chamados…'
                    : `${ticketCount ?? 0} chamados vinculados à sua conta`}
                </span>
              </div>
            </div>

            {onOpenMyTickets && (
              <button
                onClick={() => {
                  onClose();
                  onOpenMyTickets();
                }}
                className="text-[12.5px] font-semibold text-[#0069C7] hover:underline"
              >
                Ver lista
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E6E8EC] bg-[#FAFAFC]">
          <button
            onClick={() => {
              onClose();
              logout();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-[8px] text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Encerrar sessão</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-[8px] text-[13.5px] font-semibold bg-[#1B2431] hover:bg-[#2C384A] text-white transition-colors"
          >
            Concluído
          </button>
        </div>
      </div>
    </div>
  );
};

