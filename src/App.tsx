import React from 'react';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { ChatPage } from './pages/ChatPage';
import { AnalystPage } from './pages/AnalystPage';

export const App: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white text-[#1B2431]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0062C4] border-t-transparent rounded-full animate-spin" />
          <span className="text-[14px] font-medium text-[#5B6472]">
            Carregando Nexo Assist…
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  // Separação estrita dos fluxos baseada nas Roles / Permissões (Anexo A & GUIA_ARQUITETURA.md)
  // Colaborador / Usuário solicitante -> Fluxo de Atendimento e Meus Chamados
  // Analista de Suporte de TI -> Console de Triagem e Atendimento N1/N2
  if (user.role === 'ANALYST' || user.role === 'ADMIN') {
    return <AnalystPage />;
  }

  return <ChatPage />;
};
