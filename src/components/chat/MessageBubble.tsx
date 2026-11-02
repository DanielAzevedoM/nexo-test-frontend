import React, { useState, useEffect } from 'react';
import { Message, AgentDecision } from '../../types';
import { AgentStatusLine } from './AgentStatusLine';
import { ConfirmationCard } from './ConfirmationCard';
import { TicketChip } from './TicketChip';
import { TicketSelector } from './TicketSelector';
import { TicketCard } from './TicketCard';
import { QuickOptions } from './QuickOptions';

const TypewriterText: React.FC<{ text: string; shouldAnimate?: boolean }> = ({
  text,
  shouldAnimate = false,
}) => {
  const [displayedText, setDisplayedText] = useState(shouldAnimate ? text.slice(0, 4) : text);
  const [isTyping, setIsTyping] = useState(shouldAnimate);

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    let currentLength = Math.min(4, text.length);
    const interval = setInterval(() => {
      currentLength += 2;
      if (currentLength >= text.length) {
        setDisplayedText(text);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedText(text.slice(0, currentLength));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [text, shouldAnimate]);

  return (
    <span>
      {displayedText}
      {isTyping && <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-[#0062C4] animate-pulse align-middle" />}
    </span>
  );
};

interface MessageBubbleProps {
  message: Message;
  isLatest?: boolean;
  onSelectTicket?: (ticket: any) => void;
  onSelectQuickOption?: (option: string) => void;
  onConfirmDraft?: () => void;
  onEditDraft?: () => void;
  onCancelDraft?: () => void;
  onOpenDecision?: (decision: AgentDecision) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isLatest = false,
  onSelectTicket,
  onSelectQuickOption,
  onConfirmDraft,
  onEditDraft,
  onCancelDraft,
  onOpenDecision,
}) => {
  // 1. Mensagem do Sistema
  if (message.sender === 'SYSTEM') {
    return (
      <div className="w-full flex justify-center my-3">
        <div className="px-3.5 py-1.5 rounded-full bg-gray-100 border border-[#E6E8EC] text-[12px] text-[#5B6472]">
          {message.content}
        </div>
      </div>
    );
  }

  // 2. Mensagem do Usuário (Funcionário)
  if (message.sender === 'USER') {
    return (
      <div className="w-full flex justify-end my-2">
        <div className="max-w-[520px] px-4 py-[11px] bg-[#1B2431] text-white rounded-[12px_12px_4px_12px] text-[14.5px] leading-[21px] shadow-sm">
          {message.content}
        </div>
      </div>
    );
  }

  // 3. Mensagem do Analista Humano
  if (message.sender === 'ANALYST') {
    return (
      <div className="w-full flex flex-col gap-1.5 items-start my-2">
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] font-bold text-[#0062C4]">
            Analista de Suporte
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#0285F714] text-[#0062C4] font-medium">
            Humano
          </span>
        </div>
        <div className="max-w-[600px] px-4 py-3 bg-[#0285F70A] border border-[#0285F733] text-[#1B2431] rounded-[4px_12px_12px_12px] text-[14.5px] leading-[22px]">
          {message.content}
        </div>
      </div>
    );
  }

  // 4. Mensagem do Nexo Assist (Agent)
  return (
    <div className="w-full flex flex-col gap-[6px] items-start my-2">
      {/* Linha de Status de Ações */}
      <AgentStatusLine
        actions={message.actions}
        decisionId={message.decision?.id}
        onOpenDecision={
          message.decision && onOpenDecision
            ? () => onOpenDecision(message.decision!)
            : undefined
        }
      />

      {/* Bolha de Texto Principal */}
      {message.content && (
        <div className="max-w-[600px] p-[12px_16px] bg-white border border-[#E6E8EC] rounded-[4px_12px_12px_12px] text-[14.5px] leading-[22px] text-[#1B2431] shadow-sm whitespace-pre-wrap">
          <TypewriterText
            text={message.content}
            shouldAnimate={Boolean(message.isNew && message.sender === 'AGENT')}
          />

          {/* Quick Replies acopladas */}
          {message.metadata?.quickReplies && (
            <QuickOptions
              options={message.metadata.quickReplies}
              onSelect={onSelectQuickOption || (() => {})}
            />
          )}
        </div>
      )}

      {/* Ticket Chip */}
      {message.metadata?.ticketChip && (
        <TicketChip
          code={message.metadata.ticketChip.code}
          category={message.metadata.ticketChip.category}
          priority={message.metadata.ticketChip.priority}
          dueEstimate={message.metadata.ticketChip.dueEstimate}
          statusDotColor={message.metadata.ticketChip.statusDotColor}
        />
      )}

      {/* Card de Confirmação de Rascunho (Tela 2) */}
      {message.metadata?.draftTicket && (
        <ConfirmationCard
          draft={message.metadata.draftTicket}
          onConfirm={onConfirmDraft || (() => {})}
          onEdit={onEditDraft}
          onCancel={onCancelDraft}
        />
      )}

      {/* Seletor de Chamados Abertos (Tela 3) */}
      {message.metadata?.ticketSelectionList && (
        <TicketSelector
          tickets={message.metadata.ticketSelectionList}
          onSelect={onSelectTicket || (() => {})}
        />
      )}

      {/* Card de Detalhes de Chamado (Tela 3) */}
      {message.metadata?.ticketCard && (
        <TicketCard ticket={message.metadata.ticketCard} />
      )}
    </div>
  );
};

