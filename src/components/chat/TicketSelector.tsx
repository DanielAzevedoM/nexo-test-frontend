import React from 'react';
import { formatTicketStatus } from '../../utils/formatters';

interface TicketItem {
  id: string;
  code: string;
  title: string;
  status: string;
  statusColor: string;
  dateFormatted: string;
}

interface TicketSelectorProps {
  tickets: TicketItem[];
  selectedCode?: string;
  onSelect: (ticket: TicketItem) => void;
}

export const TicketSelector: React.FC<TicketSelectorProps> = ({
  tickets,
  selectedCode,
  onSelect,
}) => {
  return (
    <div className="w-full max-w-[620px] bg-white rounded-[16px] border border-[#1B243117] shadow-[0px_1px_2px_#1B24310D,_0px_6px_18px_#1B24310A] overflow-hidden my-2 divide-y divide-[#E6E8EC]">
      {tickets.map((t) => {
        const isSelected = selectedCode?.toUpperCase() === t.code.toUpperCase();

        return (
          <div
            key={t.code}
            onClick={() => onSelect(t)}
            className={`w-full h-[46px] px-4 flex items-center gap-[14px] cursor-pointer transition-colors ${
              isSelected ? 'bg-[#0062C40A]' : 'hover:bg-gray-50'
            }`}
          >
            {/* Custom Radio */}
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                isSelected
                  ? 'border-[5px] border-[#0062C4] bg-white'
                  : 'border-[#1B243133] bg-white'
              }`}
            />

            {/* Number Code */}
            <span className="text-[12.5px] font-medium text-[#5B6472] w-20 shrink-0">
              {t.code}
            </span>

            {/* Title */}
            <span className="text-[14.5px] font-medium text-[#1B2431] flex-1 truncate">
              {t.title}
            </span>

            {/* Status with Dot */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: t.statusColor || '#F5A500' }}
              />
              <span className="text-[12.5px] text-[#5B6472]">{formatTicketStatus(t.status)}</span>
            </div>

            {/* Date */}
            <span className="text-[12.5px] text-[#5B6472] w-12 text-right shrink-0">
              {t.dateFormatted}
            </span>
          </div>
        );
      })}
    </div>
  );
};

