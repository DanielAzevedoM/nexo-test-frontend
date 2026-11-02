import { apiClient } from './client';
import { AgentDecision, Conversation, Message } from '../types';

export const agentApi = {
  sendMessage: async (
    conversationId: string,
    message: string,
    selectedTicketCode?: string,
  ): Promise<{
    userMessage?: Message;
    agentMessage?: Message;
    conversation: Conversation;
    isPaused?: boolean;
  }> => {
    return await apiClient.post('/agent/chat', {
      conversationId,
      message,
      selectedTicketCode,
    });
  },

  confirmDraft: async (
    conversationId: string,
    action: 'CONFIRM' | 'EDIT' | 'CANCEL',
    editedDraft?: any,
  ): Promise<{
    status: string;
    ticket?: any;
    message: Message;
    decision?: AgentDecision;
  }> => {
    return await apiClient.post('/agent/confirm-draft', {
      conversationId,
      action,
      editedDraft,
    });
  },

  getDecision: async (decisionId: string): Promise<AgentDecision> => {
    return await apiClient.get(`/agent/decision/${decisionId}`);
  },
};

