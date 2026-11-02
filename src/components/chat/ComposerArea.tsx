import React, { useState, KeyboardEvent } from 'react';
import { ArrowUp, Loader2, PauseCircle } from 'lucide-react';

interface ComposerAreaProps {
  onSendMessage: (message: string) => void;
  messageCount?: number;
  maxMessages?: number;
  disabled?: boolean;
  isLoading?: boolean;
  isAgentPaused?: boolean;
}

export const ComposerArea: React.FC<ComposerAreaProps> = ({
  onSendMessage,
  messageCount = 0,
  maxMessages = 30,
  disabled = false,
  isLoading = false,
  isAgentPaused = false,
}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim() || disabled || isLoading) return;
    onSendMessage(text.trim());
    setText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-[6px] px-3 sm:px-6 md:px-8 pb-3 sm:pb-5 pt-2 bg-white">
      {isAgentPaused && (
        <div className="w-full max-w-[800px] mb-1 px-3 py-1.5 rounded-[8px] bg-[#F5A50014] border border-[#F5A50033] flex items-center gap-2 text-[12px] sm:text-[12.5px] text-[#946300]">
          <PauseCircle className="w-4 h-4 text-[#F5A500] shrink-0" />
          <span>
            Conversa com analista humano. O Nexo Assist está pausado até ser liberado.
          </span>
        </div>
      )}

      {/* Composer Input Box */}
      <div className="w-full max-w-[800px] h-[48px] flex items-center gap-2 px-2 pl-3.5 sm:pl-4 bg-white border border-[#1B24311F] rounded-[12px] shadow-sm focus-within:border-[#0062C4] focus-within:ring-1 focus-within:ring-[#0062C4] transition-all">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isLoading}
          placeholder={isAgentPaused ? 'Envie sua mensagem ao analista…' : 'Escreva para o Nexo…'}
          className="flex-1 bg-transparent border-none outline-none text-[13.5px] sm:text-[14.5px] text-[#1B2431] placeholder-[#5B6472]"
        />

        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled || isLoading}
          className="h-[36px] px-2.5 sm:px-3 bg-[#0062C4] hover:bg-[#0052a3] disabled:opacity-40 disabled:hover:bg-[#0062C4] text-white rounded-[6px] font-semibold text-[13px] sm:text-[13.5px] flex items-center gap-1.5 transition-colors shrink-0"
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <ArrowUp className="w-3.5 h-3.5" />
          )}
          <span>Enviar</span>
        </button>
      </div>

      {/* Session Message Counter */}
      <div className="w-full max-w-[800px] flex justify-end">
        <span className="text-[11.5px] sm:text-[12.5px] text-[#5B6472]">
          {messageCount}/{maxMessages} mensagens nesta sessão
        </span>
      </div>
    </div>
  );
};

