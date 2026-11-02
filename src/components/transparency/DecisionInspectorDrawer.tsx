import React from 'react';
import { X, ShieldCheck, Zap, Activity, BookOpen, Clock, Bot } from 'lucide-react';
import { AgentDecision } from '../../types';

interface DecisionInspectorDrawerProps {
  decision: AgentDecision | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DecisionInspectorDrawer: React.FC<DecisionInspectorDrawerProps> = ({
  decision,
  isOpen,
  onClose,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !decision) return null;

  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return { text: 'text-[#00804A]', bg: 'bg-[#00BD6C]', pill: 'bg-[#00BD6C18]' };
    if (conf >= 50) return { text: 'text-[#946300]', bg: 'bg-[#F5A500]', pill: 'bg-[#F5A50018]' };
    return { text: 'text-[#C4161D]', bg: 'bg-[#EE343B]', pill: 'bg-[#EE343B18]' };
  };

  const confColor = getConfidenceColor(decision.confidence);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      <div
        className="w-full sm:w-[480px] max-w-full h-full bg-white shadow-2xl flex flex-col justify-between border-l border-[#E6E8EC] overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E6E8EC] flex items-center justify-between bg-[#F6F7F9]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0285F714] flex items-center justify-center text-[#0069C7]">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[#1B2431]">
                Transparência da Decisão
              </h2>
              <span className="text-[12px] text-[#5B6472]">
                O que o Nexo Assist entendeu e por que agiu
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-200/60 flex items-center justify-center text-[#5B6472] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Card: Intenção e Confiança */}
          <div className="p-4 rounded-[12px] border border-[#E6E8EC] bg-white shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-semibold text-[#5B6472] uppercase tracking-wider">
                Intenção Detectada
              </span>
              <span
                className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${confColor.pill} ${confColor.text}`}
              >
                {decision.confidence}% de certeza
              </span>
            </div>
            <div className="text-[16px] font-bold text-[#1B2431] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#0062C4]" />
              <span>{decision.intent}</span>
            </div>

            {/* Confidence Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${confColor.bg}`}
                style={{ width: `${decision.confidence}%` }}
              />
            </div>
          </div>

          {/* Section: Raciocínio Detalhado */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#1B2431]">
              <Activity className="w-4 h-4 text-[#0062C4]" />
              <span>Raciocínio e Justificativa</span>
            </div>
            <div className="p-3.5 rounded-[10px] bg-[#F6F7F9] border border-[#E6E8EC] text-[13.5px] leading-[22px] text-[#3D4656]">
              {decision.reasoning}
            </div>
          </div>

          {/* Section: Regras do Service Desk Aplicadas */}
          {decision.rulesApplied && decision.rulesApplied.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#1B2431]">
                <BookOpen className="w-4 h-4 text-[#0062C4]" />
                <span>Regras do Service Desk Aplicadas (Anexo A)</span>
              </div>
              <ul className="space-y-1.5">
                {decision.rulesApplied.map((rule, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-[13px] text-[#3D4656] bg-white border border-[#E6E8EC] p-2.5 rounded-[8px]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#00804A] shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section: Ferramentas e Consultas Chamadas */}
          {decision.toolsCalled && decision.toolsCalled.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#1B2431]">
                <Clock className="w-4 h-4 text-[#0062C4]" />
                <span>Ferramentas e Consultas Executadas</span>
              </div>
              <div className="space-y-2">
                {decision.toolsCalled.map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-[8px] border border-[#E6E8EC] bg-white text-[12.5px] space-y-1"
                  >
                    <div className="flex items-center justify-between font-mono font-semibold text-[#0062C4]">
                      <span>{tool.name}()</span>
                      {tool.latencyMs && (
                        <span className="text-[11px] text-[#5B6472] font-sans font-normal">
                          {tool.latencyMs} ms
                        </span>
                      )}
                    </div>
                    <div className="text-[#3D4656]">{tool.description}</div>
                    {tool.resultSummary && (
                      <div className="text-[11.5px] text-[#5B6472] italic bg-[#F6F7F9] p-1.5 rounded">
                        Resultado: {tool.resultSummary}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E6E8EC] bg-[#F6F7F9] flex items-center justify-between text-[12px] text-[#5B6472]">
          <span>Latência total: {decision.latencyMs || 65} ms</span>
          <span>Decisão auditável · Nexo Assist</span>
        </div>
      </div>
    </div>
  );
};

