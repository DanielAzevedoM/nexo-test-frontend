import React, { useState, useEffect } from 'react';
import { AnalystRail } from '../components/layout/AnalystRail';
import { ConversationSidebar } from '../components/analyst/ConversationSidebar';
import { ConversationHeader } from '../components/analyst/ConversationHeader';
import { AnalystComposer } from '../components/analyst/AnalystComposer';
import { EmployeeTicketsDrawer } from '../components/analyst/EmployeeTicketsDrawer';
import { MessageList } from '../components/chat/MessageList';
import { DecisionInspectorDrawer } from '../components/transparency/DecisionInspectorDrawer';
import { Conversation, Message, AgentDecision } from '../types';
import { conversationsApi } from '../api/conversations.api';
import { useAuth } from '../context/AuthContext';

interface AnalystPageProps {
  onBackToEmployeeChat?: () => void;
}

export const AnalystPage: React.FC<AnalystPageProps> = ({ onBackToEmployeeChat }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'needs_human' | 'with_agent' | 'my_chats'>(
    'needs_human',
  );
  const [counts, setCounts] = useState({ all: 0, needsHuman: 0, withAgent: 0, myChats: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [isTicketsDrawerOpen, setIsTicketsDrawerOpen] = useState(true);
  const [selectedDecision, setSelectedDecision] = useState<AgentDecision | null>(null);
  const [isDecisionDrawerOpen, setIsDecisionDrawerOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadConversations();

    // Sincronização em tempo real (Push/Polling Inteligente compatível com Hostinger)
    const syncInterval = setInterval(async () => {
      try {
        const res = await conversationsApi.list({
          tab: activeTab,
          search: searchQuery,
        });
        setConversations(res.data);
        setCounts(res.counts);

        if (selectedConversation?.id) {
          const fresh = await conversationsApi.getById(selectedConversation.id);
          if (fresh && fresh.messages && fresh.messages.length !== messages.length) {
            const existingIds = new Set(messages.map((m) => m.id));
            const updated = fresh.messages.map((m) =>
              existingIds.has(m.id) ? m : { ...m, isNew: true },
            );
            setSelectedConversation(fresh);
            setMessages(updated);
          }
        }
      } catch {
        // Silencioso em caso de oscilação momentânea de rede
      }
    }, 3500);

    return () => clearInterval(syncInterval);
  }, [activeTab, searchQuery, selectedConversation?.id, messages.length]);

  const loadConversations = async () => {
    try {
      setIsLoading(true);
      const res = await conversationsApi.list({
        tab: activeTab,
        search: searchQuery,
      });
      setConversations(res.data);
      setCounts(res.counts);

      // Se nenhuma estiver selecionada, seleciona a primeira
      if (!selectedConversation && res.data.length > 0) {
        selectConversation(res.data[0]);
      } else if (selectedConversation) {
        // Atualiza a selecionada na lista
        const updated = res.data.find((c) => c.id === selectedConversation.id);
        if (updated) setSelectedConversation(updated);
      }
    } catch (e) {
      console.error('Failed to load conversations', e);
    } finally {
      setIsLoading(false);
    }
  };

  const selectConversation = async (conv: Conversation) => {
    try {
      setSelectedConversation(conv);
      setIsMobileChatOpen(true);
      const full = await conversationsApi.getById(conv.id);
      setSelectedConversation(full);
      setMessages(full.messages || []);
    } catch (e) {
      console.error('Failed to get conversation details', e);
    }
  };

  const handleAssign = async () => {
    if (!selectedConversation) return;
    try {
      setIsLoading(true);
      await conversationsApi.assignAnalyst(selectedConversation.id);
      await selectConversation(selectedConversation);
      await loadConversations();
    } catch (e) {
      console.error('Failed to assign analyst', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnToAgent = async () => {
    if (!selectedConversation) return;
    try {
      setIsLoading(true);
      await conversationsApi.returnToAgent(selectedConversation.id);
      await selectConversation(selectedConversation);
      await loadConversations();
    } catch (e) {
      console.error('Failed to return to agent', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseConversation = async () => {
    if (!selectedConversation) return;
    try {
      setIsLoading(true);
      await conversationsApi.close(selectedConversation.id);
      await selectConversation(selectedConversation);
      await loadConversations();
    } catch (e) {
      console.error('Failed to close conversation', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendAnalystMessage = async (content: string) => {
    if (!selectedConversation) return;
    try {
      setIsLoading(true);
      const msg = await conversationsApi.sendAnalystMessage(
        selectedConversation.id,
        content,
      );
      setMessages((prev) => [...prev, msg]);
      await loadConversations();
    } catch (e) {
      console.error('Failed to send analyst message', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDecision = (decision: AgentDecision) => {
    setSelectedDecision(decision);
    setIsDecisionDrawerOpen(true);
  };

  return (
    <div className="w-full h-screen flex bg-white overflow-hidden">
      {/* Left Icon Rail */}
      <AnalystRail
        needsHumanCount={counts.needsHuman}
        onBackToEmployeeChat={onBackToEmployeeChat}
      />

      {/* Conversations List Sidebar */}
      <ConversationSidebar
        conversations={conversations}
        selectedId={selectedConversation?.id}
        onSelect={selectConversation}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        className={`${isMobileChatOpen ? 'hidden md:flex' : 'flex'} w-full md:w-[350px] lg:w-[380px]`}
      />

      {/* Main Conversation Center */}
      <div
        className={`${
          isMobileChatOpen ? 'flex' : 'hidden md:flex'
        } flex-1 h-full flex-col bg-[#EEF1F5] overflow-hidden`}
      >
        {selectedConversation ? (
          <>
            <ConversationHeader
              conversation={selectedConversation}
              onAssign={handleAssign}
              onReturnToAgent={handleReturnToAgent}
              onCloseConversation={handleCloseConversation}
              isTicketsDrawerOpen={isTicketsDrawerOpen}
              onToggleTicketsDrawer={() =>
                setIsTicketsDrawerOpen(!isTicketsDrawerOpen)
              }
              isLoading={isLoading}
              onBackToList={() => setIsMobileChatOpen(false)}
            />

            {/* Conversation Messages */}
            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white">
              <MessageList
                messages={messages}
                onOpenDecision={handleOpenDecision}
              />

              {/* Composer */}
              <AnalystComposer
                onSendMessage={handleSendAnalystMessage}
                isLoading={isLoading}
                disabled={selectedConversation.status === 'CLOSED'}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#5B6472]">
            Selecione uma conversa ao lado para visualizar o atendimento.
          </div>
        )}
      </div>

      {/* Right Panel: Employee Tickets Drawer */}
      {selectedConversation && (
        <EmployeeTicketsDrawer
          conversation={selectedConversation}
          isOpen={isTicketsDrawerOpen}
          onClose={() => setIsTicketsDrawerOpen(false)}
        />
      )}

      {/* Decision Transparency Inspector Drawer */}
      <DecisionInspectorDrawer
        decision={selectedDecision}
        isOpen={isDecisionDrawerOpen}
        onClose={() => setIsDecisionDrawerOpen(false)}
      />
    </div>
  );
};

