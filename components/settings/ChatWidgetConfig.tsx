import { useState } from 'react';
import { Copy, Eye, Code, Palette, MessageSquare } from 'lucide-react';
import { Button } from '@/components/common/components/Button';

interface ChatWidgetConfigProps {
  botId?: string;
  currentConfig?: {
    primaryColor?: string;
    position?: 'bottom-right' | 'bottom-left';
    welcomeMessage?: string;
    placeholder?: string;
    showBranding?: boolean;
  };
  onConfigChange: (config: any) => void;
}

export default function ChatWidgetConfig({ 
  botId, 
  currentConfig = {}, 
  onConfigChange 
}: ChatWidgetConfigProps) {
  const [config, setConfig] = useState({
    primaryColor: '#0ea5e9',
    position: 'bottom-right',
    welcomeMessage: 'Hello! How can I help you today?',
    placeholder: 'Type your message...',
    showBranding: true,
    ...currentConfig
  });

  const [activeTab, setActiveTab] = useState<'appearance' | 'behavior' | 'embed'>('appearance');

  const handleConfigUpdate = (updates: Partial<typeof config>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  const embedCode = botId ? `<!-- Chatbot Widget -->
<script>
  window.chatbotConfig = {
    botId: '${botId}',
    primaryColor: '${config.primaryColor}',
    position: '${config.position}',
    welcomeMessage: '${config.welcomeMessage}',
    placeholder: '${config.placeholder}',
    showBranding: ${config.showBranding}
  };
</script>
<script src="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/embed/${botId}/widget.js"></script>` : '';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <MessageSquare className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Chat Widget Configuration</h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-zinc-800 rounded-lg p-1">
        {[
          { id: 'appearance', label: 'Appearance', icon: Palette },
          { id: 'behavior', label: 'Behavior', icon: MessageSquare },
          { id: 'embed', label: 'Embed Code', icon: Code }
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
      {activeTab === 'appearance' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => handleConfigUpdate({ primaryColor: e.target.value })}
                className="w-12 h-10 rounded border border-zinc-600 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={config.primaryColor}
                onChange={(e) => handleConfigUpdate({ primaryColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-black border border-zinc-600 rounded-md text-white"
                placeholder="#0ea5e9"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Widget Position
            </label>
            <select
              value={config.position}
              onChange={(e) => handleConfigUpdate({ position: e.target.value as any })}
              className="w-full px-3 py-2 bg-black border border-zinc-600 rounded-md text-white"
            >
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Show Branding</div>
              <div className="text-sm text-zinc-400">Display "Powered by YourApp" text</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.showBranding}
                onChange={(e) => handleConfigUpdate({ showBranding: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      )}

      {activeTab === 'behavior' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Welcome Message
            </label>
            <textarea
              value={config.welcomeMessage}
              onChange={(e) => handleConfigUpdate({ welcomeMessage: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-black border border-zinc-600 rounded-md text-white resize-none"
              placeholder="Hello! How can I help you today?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Input Placeholder
            </label>
            <input
              type="text"
              value={config.placeholder}
              onChange={(e) => handleConfigUpdate({ placeholder: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-zinc-600 rounded-md text-white"
              placeholder="Type your message..."
            />
          </div>
        </div>
      )}

      {activeTab === 'embed' && (
        <div className="space-y-4">
          {botId ? (
            <>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Embed Code
                </label>
                <div className="relative">
                  <pre className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-sm text-zinc-300 overflow-x-auto">
                    <code>{embedCode}</code>
                  </pre>
                  <Button
                    onClick={() => copyToClipboard(embedCode)}
                    className="absolute top-2 right-2 bg-zinc-700 hover:bg-zinc-600"
                    size="sm"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
                <h4 className="text-blue-300 font-medium mb-2">Installation Instructions</h4>
                <ol className="text-sm text-zinc-300 space-y-1 list-decimal list-inside">
                  <li>Copy the embed code above</li>
                  <li>Paste it before the closing &lt;/body&gt; tag on your website</li>
                  <li>The chat widget will appear automatically</li>
                </ol>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
              <p className="text-zinc-400">Please save your bot first to generate embed code</p>
            </div>
          )}
        </div>
      )}

      {/* Preview */}
      <div className="bg-zinc-800/50 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3 flex items-center">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </h4>
        <div className="bg-white rounded-lg p-4 relative h-64 overflow-hidden">
          <div className="absolute bottom-4 right-4">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg"
              style={{ backgroundColor: config.primaryColor }}
            >
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}