import { apiClient } from './client';
import { User } from '../types';

export const authApi = {
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    return await apiClient.post('/auth/login', { email, password });
  },
  getMe: async (): Promise<User> => {
    return await apiClient.get('/auth/me');
  },
};

