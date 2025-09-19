"use client";

import { Settings, BarChart3, Zap, Globe, Tag } from "lucide-react";
import { EnhancedBotFormData } from "@/types/bot-creation";

interface Props {
  data: EnhancedBotFormData;
  onChange: (field: keyof EnhancedBotFormData, value: any) => void;
  onTagAdd: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}

const integrationOptions = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Connect to Slack channels',
    icon: '💬',
    available: true
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Deploy to Discord servers',
    icon: '🎮',
    available: true
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'WhatsApp Business API',
    icon: '📱',
    available: false
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Telegram bot integration',
    icon: '✈️',
    available: true
  },
  {
    id: 'facebook',
    name: 'Facebook Messenger',
    description: 'Facebook Messenger platform',
    icon: '📘',
    available: false
  },
  {
    id: 'website',
    name: 'Website Widget',
    description: 'Embeddable chat widget',
    icon: '🌐',
    available: true
  }
];

export default function AdvancedSettingsStep({ 
  data, 
  onChange, 
  onTagAdd, 
  onTagRemove 
}: Props) {
  const handleIntegrationToggle = (integrationId: string) => {
    const currentIntegrations = data.integrations || [];
    const isSelected = currentIntegrations.includes(integrationId);
    
    if (isSelected) {
      onChange('integrations', currentIntegrations.filter(id => id !== integrationId));
    } else {
      onChange('integrations', [...currentIntegrations, integrationId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Advanced Settings</h2>
        <p className="text-gray-400">Configure additional features and integrations</p>
      </div>

      <div className="space-y-6">
        {/* Visibility Settings */}
        <div className="bg-gray-800/50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Visibility</h3>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-black rounded-lg">
            <div>
              <h4 className="text-white font-medium">Make bot public</h4>
              <p className="text-sm text-gray-400">Allow others to discover and use your bot</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={data.isPublic}
                onChange={(e) => onChange("isPublic", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-gray-800/50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Tags</h3>
          </div>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Add a tag and press Enter"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onTagAdd(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            {data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-600 text-white"
                  >
                    {tag}
                    <button
                      onClick={() => onTagRemove(tag)}
                      className="ml-2 text-blue-200 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            <p className="text-xs text-gray-500">
              Tags help users discover your bot and categorize it properly
            </p>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-gray-800/50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Integrations</h3>
          </div>
          
          <p className="text-gray-400 text-sm mb-4">
            Choose where you want to deploy your bot
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {integrationOptions.map((integration) => (
              <div
                key={integration.id}
                onClick={() => integration.available && handleIntegrationToggle(integration.id)}
                className={`p-4 border-2 rounded-lg transition-all ${
                  !integration.available
                    ? "border-gray-700 opacity-50 cursor-not-allowed"
                    : data.integrations?.includes(integration.id)
                    ? "border-blue-500 bg-blue-500/10 cursor-pointer"
                    : "border-gray-600 hover:border-gray-500 cursor-pointer"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-white font-medium">{integration.name}</h4>
                      {!integration.available && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{integration.description}</p>
                  </div>
                  {integration.available && (
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      data.integrations?.includes(integration.id)
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-500"
                    }`}>
                      {data.integrations?.includes(integration.id) && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-gray-800/50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Analytics</h3>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-black rounded-lg">
            <div>
              <h4 className="text-white font-medium">Enable Analytics</h4>
              <p className="text-sm text-gray-400">Track conversations, user interactions, and performance metrics</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={data.analytics}
                onChange={(e) => onChange("analytics", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-500/20">
          <h3 className="text-lg font-semibold text-white mb-4">Configuration Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Bot Type:</span>
              <span className="text-white ml-2 capitalize">{data.botType.replace('-', ' ')}</span>
            </div>
            <div>
              <span className="text-gray-400">Websites:</span>
              <span className="text-white ml-2">{data.websites.length} added</span>
            </div>
            <div>
              <span className="text-gray-400">Language:</span>
              <span className="text-white ml-2 uppercase">{data.language}</span>
            </div>
            <div>
              <span className="text-gray-400">Theme:</span>
              <span className="text-white ml-2">{data.theme?.name}</span>
            </div>
            <div>
              <span className="text-gray-400">Integrations:</span>
              <span className="text-white ml-2">{data.integrations?.length || 0} selected</span>
            </div>
            <div>
              <span className="text-gray-400">Public:</span>
              <span className="text-white ml-2">{data.isPublic ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}