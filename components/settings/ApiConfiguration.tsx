import { useState } from 'react';
import { Key, Copy, RefreshCw, Eye, EyeOff, Globe, Code } from 'lucide-react';
import { Button } from '@/components/common/components/Button';

interface ApiConfigurationProps {
  botId?: string;
  apiKey?: string;
  onRegenerateKey: () => void;
}

export default function ApiConfiguration({ 
  botId, 
  apiKey, 
  onRegenerateKey 
}: ApiConfigurationProps) {
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState<'keys' | 'endpoints' | 'examples'>('keys');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  const maskedApiKey = apiKey ? `${apiKey.substring(0, 8)}${'•'.repeat(24)}${apiKey.substring(-4)}` : '';

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: `/api/chat/${botId}`,
      description: 'Send a message to the bot',
      params: ['message', 'sessionId', 'userId (optional)']
    },
    {
      method: 'GET',
      endpoint: `/api/bots/${botId}`,
      description: 'Get bot information',
      params: []
    },
    {
      method: 'GET',
      endpoint: `/api/bots/${botId}/analytics`,
      description: 'Get bot analytics',
      params: ['days (optional)']
    }
  ];

  const exampleCode = `// JavaScript Example
const response = await fetch('${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/chat/${botId}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${apiKey}'
  },
  body: JSON.stringify({
    message: 'Hello, how can you help me?',
    sessionId: 'user-session-123',
    userId: 'user-456' // optional
  })
});

const data = await response.json();
console.log(data.response);`;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Key className="w-5 h-5 text-green-400" />
        <h3 className="text-lg font-semibold text-white">API Configuration</h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-zinc-800 rounded-lg p-1">
        {[
          { id: 'keys', label: 'API Keys', icon: Key },
          { id: 'endpoints', label: 'Endpoints', icon: Globe },
          { id: 'examples', label: 'Examples', icon: Code }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'keys' && (
        <div className="space-y-4">
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Key className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-yellow-300 font-medium">Security Notice</span>
            </div>
            <p className="text-yellow-200 text-sm">
              Keep your API keys secure and never share them publicly. Use environment variables in production.
            </p>
          </div>

          {apiKey && (
            <div className="bg-black border border-zinc-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-white font-medium">Bot API Key</div>
                  <div className="text-xs text-zinc-400">Use this key to authenticate API requests</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setShowApiKey(!showApiKey)}
                    variant="ghost"
                    size="sm"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    onClick={onRegenerateKey}
                    variant="outline"
                    size="sm"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <code className="bg-zinc-800 px-3 py-2 rounded text-sm text-zinc-300 flex-1 font-mono">
                  {showApiKey ? apiKey : maskedApiKey}
                </code>
                <Button
                  onClick={() => copyToClipboard(apiKey)}
                  variant="ghost"
                  size="sm"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="bg-zinc-800/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Rate Limits</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Requests per minute:</span>
                <span className="text-white">100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Requests per hour:</span>
                <span className="text-white">1,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Requests per day:</span>
                <span className="text-white">10,000</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'endpoints' && (
        <div className="space-y-4">
          <div className="text-sm text-zinc-400 mb-4">
            Base URL: <code className="bg-zinc-800 px-2 py-1 rounded">{process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}</code>
          </div>

          {apiEndpoints.map((endpoint, index) => (
            <div key={index} className="bg-black border border-zinc-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  endpoint.method === 'GET' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'
                }`}>
                  {endpoint.method}
                </span>
                <code className="text-white font-mono">{endpoint.endpoint}</code>
              </div>
              <p className="text-zinc-400 text-sm mb-2">{endpoint.description}</p>
              {endpoint.params.length > 0 && (
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Parameters:</div>
                  <div className="flex flex-wrap gap-1">
                    {endpoint.params.map((param, i) => (
                      <code key={i} className="bg-zinc-800 px-2 py-1 rounded text-xs text-zinc-300">
                        {param}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'examples' && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">JavaScript Example</h4>
              <Button
                onClick={() => copyToClipboard(exampleCode)}
                variant="outline"
                size="sm"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <pre className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-sm text-zinc-300 overflow-x-auto">
              <code>{exampleCode}</code>
            </pre>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-blue-300 font-medium mb-2">Response Format</h4>
            <pre className="text-sm text-zinc-300">
{`{
  "response": {
    "id": "msg_123",
    "type": "bot",
    "text": "Hello! How can I help you today?",
    "timestamp": "2024-01-01T12:00:00Z",
    "quickReplies": ["Option 1", "Option 2"]
  },
  "context": {
    "sessionId": "user-session-123",
    "lastIntent": "greeting"
  },
  "conversationId": "conv_456"
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}