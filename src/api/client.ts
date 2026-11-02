import axios from 'axios';

function getBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_URL?.trim();
  if (!envUrl) {
    return '/api';
  }
  // Se já for caminho relativo (/api) ou possuir protocolo (http/https), usa direto
  if (envUrl.startsWith('/') || envUrl.startsWith('http://') || envUrl.startsWith('https://')) {
    return envUrl.replace(/\/+$/, '');
  }
  // Caso tenha sido inserido apenas o domínio (ex: api.dominio.com/api), adiciona https://
  return `https://${envUrl}`.replace(/\/+$/, '');
}

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('nexo_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    // Se a resposta vier envelopada em { data: ... } pelo TransformInterceptor
    if (response.data && response.data.data !== undefined) {
      // Preserva metadados de paginação se existirem
      if (response.data.total !== undefined || response.data.counts !== undefined) {
        return response.data;
      }
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('nexo_token');
      localStorage.removeItem('nexo_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

