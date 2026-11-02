export const formatTicketStatus = (status?: string): string => {
  if (!status) return 'Aberto';

  switch (status.toUpperCase()) {
    case 'WAITING_ANALYST':
      return 'Aguardando analista';
    case 'IN_PROGRESS':
      return 'Em andamento';
    case 'OPEN':
      return 'Aberto';
    case 'RESOLVED':
      return 'Resolvido';
    case 'APPROVED':
      return 'Aprovado';
    case 'REJECTED':
      return 'Rejeitado';
    case 'CLOSED':
      return 'Encerrado';
    case 'CANCELLED':
      return 'Cancelado';
    default:
      return status;
  }
};

export const formatTicketPriority = (priority?: string): string => {
  if (!priority) return 'Baixa';

  switch (priority.toUpperCase()) {
    case 'CRITICAL':
      return 'Crítica';
    case 'HIGH':
      return 'Alta';
    case 'MEDIUM':
      return 'Média';
    case 'LOW':
      return 'Baixa';
    default:
      return priority;
  }
};

export const formatTicketCategory = (category?: string): string => {
  if (!category) return 'Outros';

  switch (category.toUpperCase()) {
    case 'ACCESS':
      return 'Acesso';
    case 'NETWORK_VPN':
      return 'Rede e VPN';
    case 'HARDWARE':
      return 'Hardware';
    case 'SOFTWARE':
      return 'Software';
    case 'EMAIL':
      return 'E-mail';
    case 'OTHER':
      return 'Outros';
    default:
      return category;
  }
};

export const formatAffectedScope = (scope?: string): string => {
  if (!scope) return 'Só eu';

  switch (scope.toUpperCase()) {
    case 'ONLY_ME':
      return 'Só eu';
    case 'MY_TEAM':
      return 'Minha equipe';
    case 'COMPANY_WIDE':
      return 'Toda a empresa';
    case 'UNKNOWN':
      return 'Não sei';
    default:
      return scope;
  }
};

