import React, { useState, useEffect } from 'react';
import { UserSidebar } from '../components/sidebar/UserSidebar';
import { TopBar } from '../components/layout/TopBar';
import { MessageList } from '../components/chat/MessageList';
import { ComposerArea } from '../components/chat/ComposerArea';
import { ProfileView } from '../components/profile/ProfileView';
import { UserTicketsDrawer } from '../components/tickets/UserTicketsDrawer';
import { Conversation, Message } from '../types';
import { conversationsApi } from '../api/conversations.api';
import { agentApi } from '../api/agent.api';
import { useAuth } from '../context/AuthContext';

export const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'profile'>('chat');
  const [isTicketsDrawerOpen, setIsTicketsDrawerOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [ticketsVersion, setTicketsVersion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadConversation();
  }, []);

  // Sincronização em tempo real quando em atendimento ou aguardando analista humano
  useEffect(() => {
    if (!conversation?.id) return;
    if (conversation.status !== 'IN_ATTENDANCE' && conversation.status !== 'WAITING_HUMAN') return;

    const syncInterval = setInterval(async () => {
      try {
        const fresh = await conversationsApi.getById(conversation.id);
        if (fresh) {
          if (fresh.messages && fresh.messages.length > messages.length) {
            const existingIds = new Set(messages.map((m) => m.id));
            const updated = fresh.messages.map((m) =>
              existingIds.has(m.id) ? m : { ...m, isNew: true },
            );
            setConversation(fresh);
            setMessages(updated);
          } else if (fresh.status !== conversation.status) {
            setConversation(fresh);
          }
        }
      } catch {
        // Silencioso em caso de oscilação momentânea
      }
    }, 3000);

    return () => clearInterval(syncInterval);
  }, [conversation?.id, conversation?.status, messages.length]);

  const loadConversation = async () => {
    try {
      setIsLoading(true);
      const conv = await conversationsApi.createOrResume();
      setConversation(conv);
      if (conv.messages) {
        setMessages(conv.messages);
      }
    } catch (err) {
      console.error('Failed to load conversation', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = async () => {
    setActiveTab('chat');
    setIsTicketsDrawerOpen(false);
    try {
      setIsLoading(true);
      const conv = await conversationsApi.createOrResume(undefined, true);
      setConversation(conv);
      setMessages(conv.messages || []);
    } catch (err) {
      console.error('Failed to start new conversation', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text: string, selectedTicketCode?: string) => {
    if (!conversation) return;

    // Adiciona temporariamente a mensagem do usuário no estado local para resposta instantânea
    const tempUserMsg: Message = {
      id: `temp-${Date.now()}`,
      conversationId: conversation.id,
      sender: 'USER',
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      setIsLoading(true);
      const res = await agentApi.sendMessage(
        conversation.id,
        text,
        selectedTicketCode,
      );

      // Atualiza o estado da conversa e mensagens
      if (res.conversation) {
        setConversation(res.conversation);
      }

      if (res.agentMessage) {
        setMessages((prev) => [...prev, { ...res.agentMessage!, isNew: true }]);
        const meta = (res.agentMessage as any)?.metadata;
        if (meta?.ticketChip || meta?.draftTicket?.code) {
          setTicketsVersion((v) => v + 1);
        }
      }
    } catch (err: any) {
      console.error('Failed to send message', err);
      // Mensagem de erro amigável se exceder 30 mensagens ou falhar
      const errMsg: Message = {
        id: `err-${Date.now()}`,
        conversationId: conversation.id,
        sender: 'AGENT',
        content:
          err.response?.data?.message ||
          'Desculpe, ocorreu uma instabilidade temporária. Por favor, tente novamente.',
        isNew: true,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectQuickOption = (option: string) => {
    handleSendMessage(option);
  };

  const handleSelectTicket = (ticketItem: any) => {
    handleSendMessage(
      `${ticketItem.code} · ${ticketItem.title}`,
      ticketItem.code,
    );
  };

  const handleConfirmDraft = async () => {
    if (!conversation) return;

    try {
      setIsLoading(true);
      const res = await agentApi.confirmDraft(conversation.id, 'CONFIRM');
      if (res.message) {
        setMessages((prev) => [...prev, { ...res.message, isNew: true }]);
        setTicketsVersion((v) => v + 1);
      }
    } catch (err) {
      console.error('Failed to confirm draft', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelDraft = async () => {
    if (!conversation) return;

    try {
      setIsLoading(true);
      const res = await agentApi.confirmDraft(conversation.id, 'CANCEL');
      if (res.message) {
        setMessages((prev) => [...prev, { ...res.message, isNew: true }]);
      }
    } catch (err) {
      console.error('Failed to cancel draft', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex bg-white overflow-hidden">
      {/* Componentized User Sidebar */}
      <UserSidebar
        currentTab={isTicketsDrawerOpen ? 'tickets' : activeTab}
        onTabChange={(tab) => {
          if (tab === 'tickets') {
            setIsTicketsDrawerOpen(true);
          } else if (tab === 'profile') {
            setIsTicketsDrawerOpen(false);
            setActiveTab('profile');
          } else {
            setIsTicketsDrawerOpen(false);
            setActiveTab('chat');
          }
        }}
        onNewConversation={handleNewConversation}
        ticketsVersion={ticketsVersion}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Area: Dynamic between Chat and Profile View */}
      {activeTab === 'profile' ? (
        <ProfileView onOpenMobileMenu={() => setIsMobileSidebarOpen(true)} />
      ) : (
        <main className="flex-1 h-full flex flex-col bg-white">
          <TopBar
            breadcrumbTitle="Atendimento"
            isHumanAssigned={conversation?.status === 'IN_ATTENDANCE'}
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          />

          {/* Messages */}
          <MessageList
            messages={messages}
            onSelectTicket={handleSelectTicket}
            onSelectQuickOption={handleSelectQuickOption}
            onConfirmDraft={handleConfirmDraft}
            onCancelDraft={handleCancelDraft}
          />

          {/* Composer */}
          <ComposerArea
            onSendMessage={handleSendMessage}
            messageCount={conversation?.messageCount || 0}
            maxMessages={30}
            isLoading={isLoading}
            isAgentPaused={
              conversation?.status === 'IN_ATTENDANCE' ||
              (conversation?.status === 'WAITING_HUMAN' && conversation?.agentPaused)
            }
          />
        </main>
      )}

      {/* User Tickets Drawer */}
      <UserTicketsDrawer
        isOpen={isTicketsDrawerOpen}
        onClose={() => setIsTicketsDrawerOpen(false)}
        ticketsVersion={ticketsVersion}
        onSelectTicketForChat={(code, title) => {
          setActiveTab('chat');
          handleSendMessage(`Qual o status do meu chamado ${code} (${title})?`, code);
        }}
      />
    </div>
  );
};

