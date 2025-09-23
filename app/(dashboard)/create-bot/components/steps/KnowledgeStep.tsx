"use client";

import { useState } from "react";
import { Globe, FileText, Plus, Trash2, Upload, Link } from "lucide-react";
import { Button } from "@/components/common/components/Button";
import { BotFormData } from "../CreateBotWizard";

interface Props {
  formData: BotFormData;
  updateFormData: (field: keyof BotFormData, value: any) => void;
}

export default function KnowledgeStep({ formData, updateFormData }: Props) {
  const [activeTab, setActiveTab] = useState<'url' | 'text'>('url');
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [textTitle, setTextTitle] = useState('');


  const addUrl = () => {
    if (!urlInput.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      type: 'url' as const, 
      content: urlInput.trim(),
      status: 'pending' as const,
    };

    
    updateFormData('knowledgeBase', [...formData.knowledgeBase, newItem]);
    setUrlInput('');
  };

  const addText = () => {
    if (!textInput.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      type: 'text' as const,
      content: textInput.trim(),
      title: textTitle.trim() || 'Text Content',
      status: 'pending' as const,
    };

    updateFormData('knowledgeBase', [...formData.knowledgeBase, newItem]);
    setTextInput('');
    setTextTitle('');
  };

  const removeItem = (id: string) => {
    updateFormData('knowledgeBase', formData.knowledgeBase.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 w-full">
      <div className="text-center mb-8">
      
        <h2 className="text-2xl font-bold text-white mb-2">Add Knowledge Sources</h2>
        <p className="text-zinc-400">Train your bot with your content to make it smarter (optional)</p>
      </div>

      {/* Tab Selection */}
      <div className="flex w-full border-b border-zinc-800 mb-6">
        <button
          className={`flex items-center px-6 py-3 border-b-2 transition-colors ${
            activeTab === 'url'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('url')}
        >
          <Globe className="w-4 h-4 mr-2" />
          Website URLs
        </button>
        <button
          className={`flex items-center px-6 py-3 border-b-2 transition-colors ${
            activeTab === 'text'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('text')}
        >
          <FileText className="w-4 h-4 mr-2" />
          Text Content
        </button>
      </div>

      {/* URL Tab */}
      {activeTab === 'url' && (
        <div className="space-y-4">
          <div className="bg-zinc-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Add Website URL</h3>
            <div className="flex gap-3">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-4 py-3 bg-black border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                onClick={addUrl}
                disabled={!urlInput.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add URL
              </Button>
            </div>
            <p className="text-sm text-zinc-500 mt-2">
              We'll crawl this website and extract relevant content for your bot
            </p>
          </div>
        </div>
      )}

      {/* Text Tab */}
      {activeTab === 'text' && (
        <div className="space-y-4">
          <div className="bg-zinc-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Add Text Content</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Title (optional)
                </label>
                <input
                  type="text"
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                  placeholder="Content title"
                  className="w-full px-4 py-3 bg-black border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Content
                </label>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste your text content here..."
                  rows={6}
                  className="w-full px-4 py-3 bg-black border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <Button
                onClick={addText}
                disabled={!textInput.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Text
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Knowledge Base Items */}
      {formData.knowledgeBase.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Added Knowledge Sources</h3>
          <div className="space-y-3">
            {formData.knowledgeBase.map((item) => (
              <div key={item.id} className="bg-zinc-800/50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {item.type === 'url' ? (
                    <Link className="w-5 h-5 text-blue-400" />
                  ) : (
                    <FileText className="w-5 h-5 text-green-400" />
                  )}
                  <div>
                    <p className="text-white font-medium">
                      {item.title || (item.type === 'url' ? item.content : 'Text Content')}
                    </p>
                    <p className="text-sm text-zinc-400">
                      {item.type === 'url' ? item.content : `${item.content.substring(0, 100)}...`}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {formData.knowledgeBase.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-zinc-600 rounded-lg">
          <FileText className="w-16 h-16 text-zinc-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-zinc-400 mb-2">No knowledge sources added</h3>
          <p className="text-zinc-500">Add websites or text content to train your bot (optional)</p>
        </div>
      )}
    </div>
  );
}