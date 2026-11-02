import React from 'react';
import { Check, Info } from 'lucide-react';

interface AgentStatusLineProps {
  actions?: string[];
  decisionId?: string;
  onOpenDecision?: () => void;
}

export const AgentStatusLine: React.FC<AgentStatusLineProps> = ({
  actions = [],
  decisionId,
  onOpenDecision,
}) => {
  return (
    <div className="w-fit flex flex-wrap items-center gap-3">
      {/* Agent Name */}
      <span className="text-[12.5px] font-semibold text-[#1B2431]">
        Nexo Assist
      </span>

      {/* Action Chips */}
      {actions.map((act, idx) => (
        <div key={idx} className="flex items-center gap-[5px]">
          <Check className="w-[12px] h-[12px] text-[#5B6472]" />
          <span className="text-[12.5px] text-[#5B6472]">{act}</span>
        </div>
      ))}

      {/* Decision Transparency Button */}
      {onOpenDecision && (
        <button
          onClick={onOpenDecision}
          className="flex items-center gap-1 px-2 py-[2px] rounded-full bg-[#0285F710] text-[#0069C7] hover:bg-[#0285F720] text-[11.5px] font-medium transition-colors"
          title="Ver o que o agent entendeu, ações tomadas e grau de segurança"
        >
          <Info className="w-3 h-3" />
          <span>Ver decisão</span>
        </button>
      )}
    </div>
  );
};

