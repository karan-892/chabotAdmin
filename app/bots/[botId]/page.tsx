"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Bot, Save, Play, Settings, BarChart3, Code, Trash2 } from 'lucide-react';
import { Button } from '@/components/common/components/Button';
import Layout from '@/components/layout/Layout';

interface BotData {
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

export default function BotEditorPage() {
  const params = useParams();
  const router = useRouter();
  const [bot, setBot] = useState<BotData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [activeTab, setActiveTab] = useState('flows');

  useEffect(() => {
    fetchBot();
  }, [params.botId]);

  const fetchBot = async () => {
    try {
      const response = await fetch(`/api/bots/${params.botId}`);
      if (response.ok) {
        const data = await response.json();
        setBot(data.bot);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching bot:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const saveBot = async () => {
    if (!bot) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/bots/${params.botId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bot),
      });

      if (response.ok) {
        const data = await response.json();
        setBot(data.bot);
      }
    } catch (error) {
      console.error('Error saving bot:', error);
    } finally {
      setSaving(false);
    }
  };

  const deployBot = async () => {
    if (!bot) return;
    
    setDeploying(true);
    try {
      const response = await fetch(`/api/bots/${params.botId}/deploy`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setBot(data.bot);
      }
    } catch (error) {
      console.error('Error deploying bot:', error);
    } finally {
      setDeploying(false);
    }
  };

  const deleteBot = async () => {
    if (!bot || !confirm('Are you sure you want to delete this bot?')) return;
    
    try {
      const response = await fetch(`/api/bots/${params.botId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error deleting bot:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!bot) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Bot not found</h2>
            <Button onClick={() => router.push('/')}>Go back to dashboard</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const tabs = [
    { id: 'flows', name: 'Flows', icon: Bot },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'deploy', name: 'Deploy', icon: Code },
  ];

  return (
    <Layout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{bot.name}</h1>
                <p className="text-sm text-gray-400">
                  {bot.status} • {bot.totalMessages} messages • {bot.totalConversations} conversations
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={saveBot}
                disabled={saving}
                className="flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save'}</span>
              </Button>
              
              <Button
                onClick={deployBot}
                disabled={deploying}
                className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>{deploying ? 'Deploying...' : 'Deploy'}</span>
              </Button>
              
              <Button
                variant="destructive"
                onClick={deleteBot}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 border-b border-gray-700 px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'flows' && (
            <div className="h-full p-6">
              <div className="bg-gray-800 rounded-lg p-8 text-center h-full flex items-center justify-center">
                <div>
                  <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Visual Flow Builder</h3>
                  <p className="text-gray-400 mb-6">
                    Create conversational flows with our drag-and-drop interface.
                  </p>
                  <div className="bg-gray-700 rounded-lg p-4 text-left max-w-md mx-auto">
                    <h4 className="text-white font-medium mb-2">Current Flow Structure:</h4>
                    <pre className="text-sm text-gray-300 overflow-auto">
                      {JSON.stringify(bot.flows, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="h-full p-6 overflow-y-auto">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Bot Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bot Name
                      </label>
                      <input
                        type="text"
                        value={bot.name}
                        onChange={(e) => setBot({ ...bot, name: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={bot.description}
                        onChange={(e) => setBot({ ...bot, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Messages</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Welcome Message
                      </label>
                      <input
                        type="text"
                        value={bot.config?.welcomeMessage || ''}
                        onChange={(e) => setBot({
                          ...bot,
                          config: { ...bot.config, welcomeMessage: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Fallback Message
                      </label>
                      <input
                        type="text"
                        value={bot.config?.fallbackMessage || ''}
                        onChange={(e) => setBot({
                          ...bot,
                          config: { ...bot.config, fallbackMessage: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Primary Color
                      </label>
                      <input
                        type="color"
                        value={bot.config?.theme?.primaryColor || '#0ea5e9'}
                        onChange={(e) => setBot({
                          ...bot,
                          config: {
                            ...bot.config,
                            theme: { ...bot.config?.theme, primaryColor: e.target.value }
                          }
                        })}
                        className="w-full h-10 bg-gray-700 border border-gray-600 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="h-full p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Total Messages</h3>
                  <p className="text-3xl font-bold text-white">{bot.totalMessages}</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Conversations</h3>
                  <p className="text-3xl font-bold text-white">{bot.totalConversations}</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Status</h3>
                  <p className="text-3xl font-bold text-white">{bot.status}</p>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Detailed Analytics</h3>
                <p className="text-gray-400">
                  Advanced analytics and insights will be available here.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="h-full p-6">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Deployment Status</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-3 h-3 rounded-full ${
                      bot.status === 'DEPLOYED' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-white font-medium">
                      {bot.status === 'DEPLOYED' ? 'Deployed' : 'Not Deployed'}
                    </span>
                  </div>
                  
                  {bot.deploymentUrl && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bot URL
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={bot.deploymentUrl}
                          readOnly
                          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                        <Button
                          onClick={() => window.open(bot.deploymentUrl, '_blank')}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Open
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Embed Code</h3>
                  <p className="text-gray-400 mb-4">
                    Copy this code to embed the chat widget on your website:
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400 text-sm">
                      {`<script src="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/embed/${bot.id}/widget.js"></script>`}
                    </code>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">API Key</h3>
                  <p className="text-gray-400 mb-4">
                    Use this API key to integrate with your bot programmatically:
                  </p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={bot.apiKey}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white font-mono text-sm"
                    />
                    <Button
                      onClick={() => navigator.clipboard.writeText(bot.apiKey)}
                      variant="outline"
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}