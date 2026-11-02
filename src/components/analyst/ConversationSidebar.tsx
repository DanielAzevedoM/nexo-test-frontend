import React from 'react';
import { Search } from 'lucide-react';
import { Conversation } from '../../types';

interface ConversationSidebarProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (conv: Conversation) => void;
  activeTab: 'all' | 'needs_human' | 'with_agent' | 'my_chats';
  onTabChange: (tab: 'all' | 'needs_human' | 'with_agent' | 'my_chats') => void;
  counts: { all: number; needsHuman: number; withAgent: number; myChats: number };
  searchQuery: string;
  onSearchChange: (q: string) => void;
  className?: string;
}

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  selectedId,
  onSelect,
  activeTab,
  onTabChange,
  counts,
  searchQuery,
  onSearchChange,
  className = '',
}) => {
  const getInitials = (name?: string) => {
    if (!name) return 'AS';
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getAvatarBg = (name?: string) => {
    const char = (name || 'A').charCodeAt(0);
    const bgs = ['bg-[#DCE9F7]', 'bg-[#F6E3D3]', 'bg-[#E6E1F7]', 'bg-[#DDF0E6]', 'bg-[#F7E1E6]'];
    return bgs[char % bgs.length];
  };

  const getAvatarTextColor = (name?: string) => {
    const char = (name || 'A').charCodeAt(0);
    const colors = ['text-[#0062C4]', 'text-[#9A4A12]', 'text-[#5B3FC4]', 'text-[#1E7A4C]', 'text-[#A3324F]'];
    return colors[char % colors.length];
  };

  return (
    <aside className={`shrink-0 h-screen flex flex-col border-r border-[#E6E8EC] bg-white ${className || 'w-[330px] sm:w-[350px] md:w-[370px] lg:w-[380px]'}`}>
      {/* Header */}
      <div className="px-3 sm:px-4 pt-3.5 sm:pt-4 pb-2.5 flex flex-col gap-2.5">
        {/* Title and Availability */}
        <div className="flex items-center justify-between">
          <h1 className="text-[19px] sm:text-[20px] font-bold text-[#1B2431] tracking-[-0.3px]">
            Conversas
          </h1>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#00BD6C14] rounded-full">
            <div className="w-[7px] h-[7px] rounded-full bg-[#00BD6C]" />
            <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#00804A]">
              Disponível
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full h-[34px] sm:h-9 flex items-center gap-2.5 px-3 bg-[#F6F7F9] rounded-full border border-transparent focus-within:border-[#0285F744] focus-within:bg-white transition-all">
          <Search className="w-[14px] sm:w-[15px] h-[14px] sm:h-[15px] text-[#5B6472] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquisar conversa ou chamado"
            className="w-full bg-transparent border-none outline-none text-[13px] sm:text-[13.5px] text-[#1B2431] placeholder-[#5B6472]"
          />
        </div>

        {/* Tabs / Filter Options - 100% Responsive */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth w-full py-0.5 select-none">
          <button
            onClick={() => onTabChange('all')}
            className={`px-2.5 py-1 rounded-full text-[12px] whitespace-nowrap shrink-0 transition-all font-medium ${
              activeTab === 'all'
                ? 'bg-[#0285F714] text-[#0069C7] font-semibold border border-[#0285F72A] shadow-2xs'
                : 'bg-[#F6F7F9] text-[#5B6472] hover:bg-[#EEF1F4] hover:text-[#1B2431]'
            }`}
          >
            Todas
          </button>

          <button
            onClick={() => onTabChange('needs_human')}
            className={`px-2.5 py-1 rounded-full text-[12px] whitespace-nowrap shrink-0 transition-all font-medium flex items-center gap-1.5 ${
              activeTab === 'needs_human'
                ? 'bg-[#0285F714] text-[#0069C7] font-semibold border border-[#0285F72A] shadow-2xs'
                : 'bg-[#F6F7F9] text-[#5B6472] hover:bg-[#EEF1F4] hover:text-[#1B2431]'
            }`}
          >
            <span>Para você</span>
            {counts.needsHuman > 0 && (
              <span className="text-[11px] font-bold text-[#0069C7]">
                {counts.needsHuman}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('with_agent')}
            className={`px-2.5 py-1 rounded-full text-[12px] whitespace-nowrap shrink-0 transition-all font-medium flex items-center gap-1.5 ${
              activeTab === 'with_agent'
                ? 'bg-[#0285F714] text-[#0069C7] font-semibold border border-[#0285F72A] shadow-2xs'
                : 'bg-[#F6F7F9] text-[#5B6472] hover:bg-[#EEF1F4] hover:text-[#1B2431]'
            }`}
          >
            <span>Com o agent</span>
            <span className="text-[11px] font-medium text-[#8C95A3]">
              {counts.withAgent}
            </span>
          </button>

          <button
            onClick={() => onTabChange('my_chats')}
            className={`px-2.5 py-1 rounded-full text-[12px] whitespace-nowrap shrink-0 transition-all font-medium flex items-center gap-1.5 ${
              activeTab === 'my_chats'
                ? 'bg-[#0285F714] text-[#0069C7] font-semibold border border-[#0285F72A] shadow-2xs'
                : 'bg-[#F6F7F9] text-[#5B6472] hover:bg-[#EEF1F4] hover:text-[#1B2431]'
            }`}
          >
            <span>Minhas</span>
            <span className="text-[11px] font-medium text-[#8C95A3]">
              {counts.myChats}
            </span>
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {conversations.map((conv) => {
          const isSelected = selectedId === conv.id;
          const initials = getInitials(conv.user?.name);
          const bg = getAvatarBg(conv.user?.name);
          const textColor = getAvatarTextColor(conv.user?.name);

          // Tag indicators
          let tagColor = 'bg-[#00BD6C]';
          let tagText = 'text-[#5B6472]';
          let tagLabel = 'Agent atendendo';

          if (conv.status === 'WAITING_HUMAN') {
            if (conv.transferReason?.includes('41%')) {
              tagColor = 'bg-[#F5A500]';
              tagText = 'text-[#946300]';
              tagLabel = conv.transferReason || 'Agent pediu ajuda · confiança 41%';
            } else {
              tagColor = 'bg-[#EE343B]';
              tagText = 'text-[#C4161D]';
              tagLabel = conv.transferReason || 'Transferida · Aguardando analista';
            }
          } else if (conv.status === 'IN_ATTENDANCE') {
            tagColor = 'bg-[#0062C4]';
            tagText = 'text-[#0062C4]';
            tagLabel = 'Você está atendendo';
          } else if (conv.status === 'CLOSED') {
            tagColor = 'bg-[#1B243155]';
            tagText = 'text-[#5B6472]';
            tagLabel = 'Resolvida pelo agent';
          }

          return (
            <div
              key={conv.id}
              onClick={() => onSelect(conv)}
              className={`p-2.5 rounded-[12px] flex items-start gap-3 cursor-pointer transition-colors ${
                isSelected ? 'bg-[#F6F7F9]' : 'hover:bg-gray-50'
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className={`w-[46px] h-[46px] rounded-full flex items-center justify-center font-semibold text-[15.5px] ${bg} ${textColor}`}
                >
                  {initials}
                </div>
                <div className="absolute bottom-0 right-0 w-[11px] h-[11px] rounded-full bg-[#00BD6C] ring-2 ring-white" />
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] sm:text-[15.5px] font-semibold text-[#1B2431] truncate">
                    {conv.user?.name || 'Funcionário'}
                  </span>
                  <span className="text-[11.5px] sm:text-[12px] text-[#0062C4] font-medium shrink-0 ml-1">
                    {conv.lastMessageAt
                      ? new Date(conv.lastMessageAt).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-1">
                  <span className="text-[13.5px] text-[#5B6472] truncate">
                    {conv.lastMessage?.content || conv.transferSummary || 'Nova conversa iniciada'}
                  </span>
                  {conv.status === 'WAITING_HUMAN' && (
                    <span className="w-5 h-5 rounded-full bg-[#0062C4] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                  )}
                </div>

                {/* Tag */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${tagColor}`} />
                  <span className={`text-[11.5px] font-medium truncate ${tagText}`}>
                    {tagLabel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

