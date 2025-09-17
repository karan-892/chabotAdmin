export interface Bot {
  id: string;
  name: string;
  status: 'draft' | 'deployed' | 'error';
  deployedAt: Date;
  views: number;
  likes: number;
  image: string;
  description: string;
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
  color: 'red' | 'blue' | 'green' | 'purple';
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