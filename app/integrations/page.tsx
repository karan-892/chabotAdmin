"use client";

import { Zap, Plus, Settings, ExternalLink } from 'lucide-react';
import { Button } from '@/components/common/components/Button';

export default function IntegrationsPage() {
  const integrations = [
    {
      id: '1',
      name: 'Slack',
      description: 'Connect your bots to Slack channels',
      icon: '💬',
      status: 'available',
      category: 'Communication'
    },
    {
      id: '2',
      name: 'Discord',
      description: 'Deploy bots to Discord servers',
      icon: '🎮',
      status: 'available',
      category: 'Communication'
    },
    {
      id: '3',
      name: 'WhatsApp',
      description: 'Connect to WhatsApp Business API',
      icon: '📱',
      status: 'coming-soon',
      category: 'Communication'
    },
    {
      id: '4',
      name: 'Telegram',
      description: 'Deploy bots to Telegram',
      icon: '✈️',
      status: 'available',
      category: 'Communication'
    },
    {
      id: '5',
      name: 'Webhook',
      description: 'Custom webhook integrations',
      icon: '🔗',
      status: 'available',
      category: 'API'
    },
    {
      id: '6',
      name: 'Zapier',
      description: 'Connect with 5000+ apps',
      icon: '⚡',
      status: 'available',
      category: 'Automation'
    }
  ];

  const categories = ['All', 'Communication', 'API', 'Automation'];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Integrations</h1>
        <p className="text-gray-400">Connect your bots to external platforms and services</p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === 'All' ? 'default' : 'outline'}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{integration.icon}</div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                integration.status === 'available'
                  ? 'bg-green-900 text-green-300'
                  : 'bg-yellow-900 text-yellow-300'
              }`}>
                {integration.status === 'available' ? 'Available' : 'Coming Soon'}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">{integration.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{integration.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
                {integration.category}
              </span>
              <Button
                size="sm"
                disabled={integration.status !== 'available'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {integration.status === 'available' ? 'Connect' : 'Soon'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Integration */}
      <div className="mt-12 bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
        <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Need a Custom Integration?</h3>
        <p className="text-gray-400 mb-6">
          Can't find what you're looking for? We can help you build custom integrations.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <ExternalLink className="w-4 h-4 mr-2" />
          Contact Support
        </Button>
      </div>
    </div>
  );
}