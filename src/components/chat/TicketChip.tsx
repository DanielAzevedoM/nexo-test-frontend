import React from 'react';
import { formatTicketPriority, formatTicketCategory } from '../../utils/formatters';

interface TicketChipProps {
  code: string;
  category: string;
  priority: string;
  dueEstimate: string;
  statusDotColor?: string;
}

export const TicketChip: React.FC<TicketChipProps> = ({
  code,
  category,
  priority,
  dueEstimate,
  statusDotColor = '#F5A500',
}) => {
  return (
    <div className="w-fit flex items-center gap-2 p-[7px_12px] bg-white rounded-[12px] shadow-sm border border-[#E6E8EC] my-1">
      <div
        className="w-[7px] h-[7px] rounded-full shrink-0"
        style={{ backgroundColor: statusDotColor }}
      />
      <span className="text-[12.5px] font-semibold text-[#1B2431]">
        {code}
      </span>
      <span className="text-[12.5px] text-[#5B6472]">
        {formatTicketCategory(category)} · {formatTicketPriority(priority)} · {dueEstimate}
      </span>
    </div>
  );
};

