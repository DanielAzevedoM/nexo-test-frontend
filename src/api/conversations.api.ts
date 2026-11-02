import { apiClient } from './client';
import { Conversation, Message } from '../types';

export const conversationsApi = {
  createOrResume: async (relatedTicketId?: string, forceNew = false): Promise<Conversation> => {
    return await apiClient.post('/conversations', { relatedTicketId, forceNew });
  },

  list: async (filters?: {
    tab?: 'all' | 'needs_human' | 'with_agent' | 'my_chats';
    search?: string;
  }): Promise<{
    data: Conversation[];
    counts: { all: number; needsHuman: number; withAgent: number; myChats: number };
  }> => {
    return await apiClient.get('/conversations', { params: filters });
  },

  getById: async (id: string): Promise<Conversation> => {
    return await apiClient.get(`/conversations/${id}`);
  },

  assignAnalyst: async (id: string): Promise<{ conversation: Conversation }> => {
    return await apiClient.post(`/conversations/${id}/assign`);
  },

  returnToAgent: async (id: string): Promise<{ conversation: Conversation }> => {
    return await apiClient.post(`/conversations/${id}/return-to-agent`);
  },

  close: async (id: string): Promise<{ conversation: Conversation }> => {
    return await apiClient.post(`/conversations/${id}/close`);
  },

  sendAnalystMessage: async (id: string, content: string): Promise<Message> => {
    return await apiClient.post(`/conversations/${id}/analyst-message`, { content });
  },
};

