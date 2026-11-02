import React from 'react';
import { formatTicketPriority, formatAffectedScope, formatTicketCategory } from '../../utils/formatters';

interface ConfirmationCardProps {
  draft: {
    code?: string;
    title: string;
    description: string;
    category: string;
    type?: string;
    priority: string;
    affectedScope: string;
    dueEstimate?: string;
  };
  onConfirm: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
  isConfirmed?: boolean;
}

export const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  draft,
  onConfirm,
  onEdit,
  onCancel,
  isConfirmed = false,
}) => {
  return (
    <div className="w-full max-w-[620px] bg-white rounded-[16px] border border-[#1B243117] shadow-[0px_1px_2px_#1B24310D,_0px_6px_18px_#1B24310A] overflow-hidden my-2">
      {/* Body */}
      <div className="p-[16px_18px_14px_18px] flex flex-col gap-[6px]">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 pb-[2px]">
          <span className="text-[12.5px] font-medium text-[#5B6472]">Novo chamado</span>
          <div className="w-[3px] h-[3px] rounded-full bg-[#E6E8EC]" />
          <span className="text-[12.5px] text-[#5B6472]">
            Rascunho {draft.code || 'D-381'}
          </span>
          <div className="flex-1" />
          <div className="flex items-center gap-[6px]">
            <div
              className={`w-[6px] h-[6px] rounded-full ${
                isConfirmed ? 'bg-[#00BD6C]' : 'bg-[#F5A500]'
              }`}
            />
            <span
              className={`text-[12.5px] font-medium ${
                isConfirmed ? 'text-[#00804A]' : 'text-[#946300]'
              }`}
            >
              {isConfirmed ? 'Criado com sucesso' : 'Aguardando confirmação'}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[18px] leading-[23px] font-semibold text-[#1B2431] tracking-[-0.2px]">
          {draft.title}
        </h3>

        {/* Description */}
        <p className="text-[13.5px] leading-[20px] text-[#3D4656]">
          {draft.description}
        </p>
      </div>

      {/* Fields Grid */}
      <div className="px-4 sm:px-[18px] pb-3.5 sm:pb-[16px]">
        <div className="border-t border-[#E6E8EC] pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6">
          {/* Categoria */}
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="text-[12px] sm:text-[12.5px] text-[#5B6472]">Categoria</span>
            <span className="text-[14px] sm:text-[14.5px] font-medium text-[#1B2431]">
              {formatTicketCategory(draft.category)}
            </span>
          </div>

          {/* Prioridade */}
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="text-[12px] sm:text-[12.5px] text-[#5B6472]">Prioridade</span>
            <div className="flex items-center gap-[6px] flex-wrap">
              <div className="w-[6px] h-[6px] rounded-full bg-[#F5A500]" />
              <span className="text-[14px] sm:text-[14.5px] font-medium text-[#1B2431]">
                {formatTicketPriority(draft.priority)}
              </span>
              <span className="text-[12.5px] sm:text-[13.5px] text-[#5B6472]">
                · {draft.dueEstimate || 'resposta em até 4h'}
              </span>
            </div>
          </div>

          {/* Afetados */}
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="text-[12px] sm:text-[12.5px] text-[#5B6472]">Afetados</span>
            <span className="text-[14px] sm:text-[14.5px] font-medium text-[#1B2431]">
              {formatAffectedScope(draft.affectedScope)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      {!isConfirmed && (
        <div className="bg-[#F6F7F9] border-t border-[#E6E8EC] px-3 sm:px-4 py-2 sm:py-2.5 flex flex-wrap items-center gap-2">
          <button
            onClick={onConfirm}
            className="h-[36px] px-3.5 bg-[#0062C4] hover:bg-[#0052a3] text-white rounded-[8px] font-semibold text-[13px] sm:text-[13.5px] flex items-center gap-2 transition-colors"
          >
            <span>Confirmar</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-white/20 text-white/90 text-[11px] rounded">
              ⌘↵
            </kbd>
          </button>

          {onEdit && (
            <button
              onClick={onEdit}
              className="h-[36px] px-3.5 bg-white hover:bg-gray-50 border border-[#1B24311F] text-[#1B2431] rounded-[8px] font-medium text-[13px] sm:text-[13.5px] transition-colors"
            >
              Editar
            </button>
          )}

          {onCancel && (
            <button
              onClick={onCancel}
              className="h-[36px] px-3.5 text-[#3D4656] hover:bg-gray-200/50 rounded-[8px] font-medium text-[13px] sm:text-[13.5px] transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

