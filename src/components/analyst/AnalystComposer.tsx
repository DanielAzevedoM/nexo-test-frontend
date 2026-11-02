import React, { useState, KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface AnalystComposerProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const AnalystComposer: React.FC<AnalystComposerProps> = ({
  onSendMessage,
  disabled = false,
  isLoading = false,
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
    <div className="w-full p-4 border-t border-[#E6E8EC] bg-white flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled || isLoading}
        placeholder="Responder como analista de suporte…"
        className="flex-1 h-11 px-4 bg-[#F6F7F9] border border-[#E6E8EC] rounded-[10px] text-[14px] text-[#1B2431] placeholder-[#5B6472] outline-none focus:border-[#0062C4] focus:bg-white transition-all"
      />
      <button
        onClick={handleSend}
        disabled={!text.trim() || disabled || isLoading}
        className="h-11 px-4 bg-[#0062C4] hover:bg-[#0052a3] disabled:opacity-40 text-white rounded-[10px] font-semibold text-[13.5px] flex items-center gap-2 transition-colors shrink-0 shadow-sm"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        <span>Enviar</span>
      </button>
    </div>
  );
};

