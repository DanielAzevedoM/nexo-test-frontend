import React, { useEffect, useRef } from 'react';
import { Message, AgentDecision } from '../../types';
import { MessageBubble } from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  onSelectTicket?: (ticket: any) => void;
  onSelectQuickOption?: (option: string) => void;
  onConfirmDraft?: () => void;
  onEditDraft?: () => void;
  onCancelDraft?: () => void;
  onOpenDecision?: (decision: AgentDecision) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  onSelectTicket,
  onSelectQuickOption,
  onConfirmDraft,
  onEditDraft,
  onCancelDraft,
  onOpenDecision,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full flex-1 overflow-y-auto px-3 sm:px-6 md:px-12 lg:px-20 xl:px-[120px] 2xl:px-[180px] max-w-[1200px] mx-auto py-4 sm:py-6 flex flex-col justify-start">
      {messages.map((msg, idx) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isLatest={idx === messages.length - 1}
          onSelectTicket={onSelectTicket}
          onSelectQuickOption={onSelectQuickOption}
          onConfirmDraft={onConfirmDraft}
          onEditDraft={onEditDraft}
          onCancelDraft={onCancelDraft}
          onOpenDecision={onOpenDecision}
        />
      ))}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
};

