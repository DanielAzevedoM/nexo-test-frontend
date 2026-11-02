export type UserRole = 'EMPLOYEE' | 'ANALYST' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  department?: string;
  role: UserRole;
  avatarUrl?: string;
}

export type TicketType = 'INCIDENT' | 'REQUEST';

export type TicketCategory =
  | 'ACCESS'
  | 'NETWORK_VPN'
  | 'HARDWARE'
  | 'SOFTWARE'
  | 'EMAIL'
  | 'OTHER';

export type TicketPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type TicketStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'WAITING_ANALYST'
  | 'APPROVED'
  | 'RESOLVED'
  | 'CANCELLED';

export type ConversationStatus =
  | 'WITH_AGENT'
  | 'WAITING_HUMAN'
  | 'IN_ATTENDANCE'
  | 'RESOLVED'
  | 'CLOSED';

export type MessageSender = 'USER' | 'AGENT' | 'ANALYST' | 'SYSTEM';

export interface Ticket {
  id: string;
  code: string;
  title: string;
  description: string;
  type: TicketType;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  affectedScope?: string;
  slaDeadline?: string;
  isOverdue?: boolean;
  slaRemainingText?: string;
  dueEstimate?: string;
  assignedAnalystId?: string;
  assignedAnalyst?: User;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface AgentDecision {
  id: string;
  messageId: string;
  conversationId: string;
  intent: string;
  confidence: number;
  reasoning: string;
  rulesApplied?: string[];
  toolsCalled?: Array<{
    name: string;
    description: string;
    params?: any;
    resultSummary?: string;
    latencyMs?: number;
  }>;
  latencyMs: number;
  createdAt: string;
}

export interface MessageMetadata {
  quickReplies?: string[];
  draftTicket?: {
    code?: string;
    title: string;
    description: string;
    category: string;
    type: string;
    priority: string;
    affectedScope: string;
    dueEstimate?: string;
    existingTicketId?: string;
  };
  ticketChip?: {
    code: string;
    category: string;
    priority: string;
    dueEstimate: string;
    statusDotColor: string;
  };
  ticketSelectionList?: Array<{
    id: string;
    code: string;
    title: string;
    status: string;
    statusColor: string;
    dateFormatted: string;
  }>;
  ticketCard?: {
    id: string;
    code: string;
    title: string;
    description: string;
    category: string;
    priority: string;
    status: string;
    openedAt: string;
    lastUpdatedAt: string;
    isOverdue: boolean;
    overdueText?: string;
  };
  decisionId?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: MessageSender;
  content: string;
  actions?: string[];
  metadata?: MessageMetadata;
  decision?: AgentDecision;
  isNew?: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  status: ConversationStatus;
  agentPaused: boolean;
  messageCount: number;
  transferReason?: string;
  transferSummary?: string;
  lastMessageAt?: string;
  user: User;
  assignedAnalyst?: User;
  relatedTicket?: Ticket;
  messages?: Message[];
  lastMessage?: {
    content: string;
    sender: MessageSender;
    createdAt: string;
  };
}

