import React from 'react';
import { formatTicketStatus, formatTicketPriority, formatTicketCategory } from '../../utils/formatters';

interface TicketCardProps {
  ticket: {
    id: string;
    code: string;
    title: string;
    description: string;
    category: string;
    priority: string;
    status: string;
    openedAt: string;
    lastUpdatedAt: string;
    isOverdue?: boolean;
    overdueText?: string;
  };
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  return (
    <div className="w-full max-w-[620px] bg-white rounded-[16px] border border-[#1B243117] shadow-[0px_1px_2px_#1B24310D,_0px_6px_18px_#1B24310A] overflow-hidden my-2">
      {/* Body */}
      <div className="p-[16px_18px_14px_18px] flex flex-col gap-[6px]">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 pb-[2px]">
          <span className="text-[12.5px] font-medium text-[#5B6472]">Chamado</span>
          <div className="w-[3px] h-[3px] rounded-full bg-[#E6E8EC]" />
          <span className="text-[12.5px] text-[#5B6472]">{ticket.code}</span>
          <div className="flex-1" />
          <div className="flex items-center gap-[6px]">
            <div className="w-[6px] h-[6px] rounded-full bg-[#F5A500]" />
            <span className="text-[12.5px] font-medium text-[#946300]">
              {formatTicketStatus(ticket.status)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[18px] leading-[23px] font-semibold text-[#1B2431] tracking-[-0.2px]">
          {ticket.title}
        </h3>

        {/* Description */}
        <p className="text-[13.5px] leading-[20px] text-[#3D4656]">
          {ticket.description}
        </p>
      </div>

      {/* Grid */}
      <div className="px-[18px] pb-[16px]">
        <div className="border-t border-[#E6E8EC] pt-3 grid grid-cols-4 gap-4">
          {/* Categoria */}
          <div className="flex flex-col gap-1">
            <span className="text-[12.5px] text-[#5B6472]">Categoria</span>
            <span className="text-[14.5px] font-medium text-[#1B2431] truncate">
              {formatTicketCategory(ticket.category)}
            </span>
          </div>

          {/* Prioridade */}
          <div className="flex flex-col gap-1">
            <span className="text-[12.5px] text-[#5B6472]">Prioridade</span>
            <div className="flex items-center gap-[6px]">
              <div className="w-[6px] h-[6px] rounded-full bg-[#1B243166]" />
              <span className="text-[14.5px] font-medium text-[#1B2431]">
                {formatTicketPriority(ticket.priority)}
              </span>
            </div>
          </div>

          {/* Aberto em */}
          <div className="flex flex-col gap-1">
            <span className="text-[12.5px] text-[#5B6472]">Aberto em</span>
            <span className="text-[14.5px] font-medium text-[#1B2431] truncate">
              {ticket.openedAt}
            </span>
          </div>

          {/* Última atualização */}
          <div className="flex flex-col gap-1">
            <span className="text-[12.5px] text-[#5B6472]">Última atualização</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[14.5px] font-medium text-[#946300]">
                {ticket.lastUpdatedAt}
              </span>
              {ticket.isOverdue && (
                <span className="text-[12.5px] text-[#C4161D] font-medium">
                  {ticket.overdueText || '· prazo vencido'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

