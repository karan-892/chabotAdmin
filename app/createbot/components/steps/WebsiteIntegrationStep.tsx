"use client";

import { useState } from "react";
import { Globe, Plus, Trash2, RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";
import { EnhancedBotFormData, WebsiteData } from "@/types/bot-creation";
import { Button } from "@/components/common/components/Button";

interface Props {
  data: EnhancedBotFormData;
  onChange: (field: keyof EnhancedBotFormData, value: any) => void;
  onWebsiteAdd: (website: WebsiteData) => void;
  onWebsiteRemove: (index: number) => void;
}

export default function WebsiteIntegrationStep({ 
  data, 
  onChange, 
  onWebsiteAdd, 
  onWebsiteRemove 
}: Props) {
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("");
  const [crawling, setCrawling] = useState(false);

  const handleAddWebsite = async () => {
    if (!newWebsiteUrl.trim()) return;

    const website: WebsiteData = {
      url: newWebsiteUrl.trim(),
      status: 'pending'
    };

    onWebsiteAdd(website);
    setNewWebsiteUrl("");

    // Simulate crawling process
    setCrawling(true);
    setTimeout(() => {
      const updatedWebsites = [...data.websites];
      const lastIndex = updatedWebsites.length - 1;
      updatedWebsites[lastIndex] = {
        ...updatedWebsites[lastIndex],
        status: 'completed',
        title: 'Sample Website Title',
        description: 'Sample description from the website',
        lastCrawled: new Date()
      };
      onChange('websites', updatedWebsites);
      setCrawling(false);
    }, 3000);
  };

  const getStatusIcon = (status: WebsiteData['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: WebsiteData['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Website Integration</h2>
        <p className="text-gray-400">Add websites for your bot to learn from</p>
      </div>

      {/* Add Website */}
      <div className="bg-gray-800/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Add Website</h3>
        <div className="flex space-x-3">
          <input
            type="url"
            value={newWebsiteUrl}
            onChange={(e) => setNewWebsiteUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button
            onClick={handleAddWebsite}
            disabled={!newWebsiteUrl.trim() || crawling}
            className="bg-blue-600 hover:bg-blue-700 px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Enter the URL of a website you want your bot to learn from
        </p>
      </div>

      {/* Website List */}
      {data.websites.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Added Websites</h3>
          {data.websites.map((website, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(website.status)}
                      <span className="text-sm font-medium text-gray-300">
                        {getStatusText(website.status)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-white font-medium">{website.title || website.url}</p>
                    <p className="text-sm text-gray-400">{website.url}</p>
                    {website.description && (
                      <p className="text-sm text-gray-500 mt-1">{website.description}</p>
                    )}
                    {website.lastCrawled && (
                      <p className="text-xs text-gray-500 mt-1">
                        Last crawled: {website.lastCrawled.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onWebsiteRemove(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Crawl Settings */}
      <div className="bg-gray-800/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Crawl Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Crawl Depth
            </label>
            <select
              value={data.crawlDepth}
              onChange={(e) => onChange("crawlDepth", parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>1 level (homepage only)</option>
              <option value={2}>2 levels (recommended)</option>
              <option value={3}>3 levels (thorough)</option>
              <option value={4}>4 levels (comprehensive)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              How deep should we crawl your website? Higher levels take longer but gather more content.
            </p>
          </div>

          <div className="flex items-center justify-between p-4 bg-black rounded-lg">
            <div>
              <h4 className="text-white font-medium">Include Files</h4>
              <p className="text-sm text-gray-400">Crawl PDFs, documents, and other files</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={data.includeFiles}
                onChange={(e) => onChange("includeFiles", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {data.websites.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-600 rounded-lg">
          <Globe className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No websites added yet</h3>
          <p className="text-gray-500">Add at least one website to continue</p>
        </div>
      )}
    </div>
  );
}