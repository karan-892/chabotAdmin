export interface BotType {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  useCases: string[];
}

export interface WebsiteData {
  url: string;
  title?: string;
  description?: string;
  content?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  lastCrawled?: Date;
}

export interface ChatbotTheme {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  style: 'modern' | 'classic' | 'minimal' | 'corporate' | 'playful';
  features: string[];
}

export interface EnhancedBotFormData {
  // Step 1: Bot Type
  botType: string;
  name: string;
  description: string;
  
  // Step 2: Website Integration
  websites: WebsiteData[];
  crawlDepth: number;
  includeFiles: boolean;
  
  // Step 3: Conversation Setup
  welcomeMessage: string;
  fallbackMessage: string;
  language: string;
  personality: 'professional' | 'friendly' | 'casual' | 'formal';
  
  // Step 4: Design & Theme
  theme: ChatbotTheme;
  customizations: {
    logo?: string;
    brandColors?: {
      primary: string;
      secondary: string;
    };
    fontFamily: string;
    borderRadius: 'none' | 'small' | 'medium' | 'large';
    position: 'bottom-right' | 'bottom-left' | 'center';
  };
  
  // Step 5: Advanced Settings
  isPublic: boolean;
  tags: string[];
  integrations: string[];
  analytics: boolean;
}