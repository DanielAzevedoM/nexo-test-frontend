import { apiClient } from './client';
import { Ticket } from '../types';

export const ticketsApi = {
  list: async (filters?: {
    userId?: string;
    status?: string;
    overdueOnly?: boolean;
    search?: string;
  }): Promise<{ data: Ticket[]; total: number }> => {
    return await apiClient.get('/tickets', { params: filters });
  },

  getById: async (id: string): Promise<Ticket> => {
    return await apiClient.get(`/tickets/${id}`);
  },

  create: async (data: any): Promise<Ticket> => {
    return await apiClient.post('/tickets', data);
  },

  update: async (id: string, data: any): Promise<Ticket> => {
    return await apiClient.patch(`/tickets/${id}`, data);
  },

  reopen: async (id: string, reason?: string): Promise<Ticket> => {
    return await apiClient.post(`/tickets/${id}/reopen`, { reason });
  },
};

