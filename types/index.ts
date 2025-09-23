export interface Bot {
  id: string;
  name: string;
  status: 'DRAFT' | 'PUBLISHED' | 'DEPLOYED' | 'ARCHIVED';
  deploymentUrl?: string;
  views: number;
  likes: number;
  avatar?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  apiKey: string;
  config: any;
  userId: string;
  isPublic: boolean;
  knowledgeBase: KnowledgeBaseItem[];
  totalMessages: number;
  totalConversations: number;
}

export interface KnowledgeBaseItem {
  id: string;
  type: 'url' | 'text';
  content: string;
  status: 'pending' | 'processing' | 'ready' | 'error';
  metadata?: {
    title?: string;
    sourceUrl?: string;
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;
}


export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: Date;
  type: 'create' | 'update' | 'delete' | 'deploy' | 'view';
}

export interface UsageStat {
  label: string;
  value: number;
  max: number;
  color: 'red' | 'blue' | 'green' | 'blue';
  percentage: number;
  unit: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  workspace: string;
  emailVerified: boolean;
}

export interface BotFormData {
  name: string;
  description: string;
  avatar: string;
  category: string;
  language: string;
  welcomeMessage: string;
  fallbackMessage: string;
  primaryColor: string;
  fontFamily: string;
  isPublic: boolean;
  tags: string[];
}
export interface BotData {
  id: string;
  name: string;
  description: string;
  avatar: string;
  status: string;
  config: any;
  flows: any[];
  deploymentUrl?: string;
  apiKey: string;
  totalMessages: number;
  totalConversations: number;
}