"use client";

import { CheckCircle, Bot, Globe, MessageSquare, Settings, Tag } from "lucide-react";
import { BotFormData } from "../CreateBotWizard";

interface Props {
  formData: BotFormData;
}

export default function ReviewStep({ formData }: Props) {
  const getBotTypeName = (type: string) => {
    const types: Record<string, string> = {
      'customer-support': 'Customer Support',
      'sales-assistant': 'Sales Assistant',
      'lead-generation': 'Lead Generation',
      'knowledge-base': 'Knowledge Base',
      'appointment-booking': 'Appointment Booking',
      'custom': 'Custom Bot'
    };
    return types[type] || type;
  };

  const getPersonalityName = (personality: string) => {
    const personalities: Record<string, string> = {
      'professional': 'Professional',
      'friendly': 'Friendly',
      'helpful': 'Helpful'
    };
    return personalities[personality] || personality;
  };

  // const getLanguageName = (code: string) => {
  //   const languages: Record<string, string> = {
  //     'en': 'English',
  //     'es': 'Spanish',
  //     'fr': 'French',
  //     'de': 'German',
  //     'it': 'Italian',
  //     'pt': 'Portuguese'
  //   };
  //   return languages[code] || code;
  // };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
       
        <h2 className="text-2xl font-bold text-white mb-2">Review Your Bot</h2>
        <p className="text-zinc-400">Review your configuration before creating the bot</p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-zinc-800/50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Bot className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Basic Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-400">Bot Name</label>
              <p className="text-white font-medium">{formData.name}</p>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Bot Type</label>
              <p className="text-white font-medium">{getBotTypeName(formData.botType)}</p>
            </div>
            {formData.description && (
              <div className="md:col-span-2">
                <label className="text-sm text-zinc-400">Description</label>
                <p className="text-white">{formData.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Knowledge Base */}
        <div className="bg-zinc-800/50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Knowledge Base</h3>
          </div>
          {formData.knowledgeBase.length > 0 ? (
            <div className="space-y-3">
              {formData.knowledgeBase.map((item, index) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-black rounded-lg">
                  {item.type === 'url' ? (
                    <Globe className="w-4 h-4 text-blue-400" />
                  ) : (
                    <MessageSquare className="w-4 h-4 text-green-400" />
                  )}
                  <div>
                    <p className="text-white text-sm font-medium">
                      {item.title || (item.type === 'url' ? 'Website' : 'Text Content')}
                    </p>
                    <p className="text-zinc-400 text-xs">
                      {item.type === 'url' ? item.content : `${item.content.substring(0, 50)}...`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-400">No knowledge sources added</p>
          )}
        </div>

        {/* Configuration */}
        <div className="bg-zinc-800/50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Configuration</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div>
              <label className="text-sm text-zinc-400">Language</label>
              <p className="text-white font-medium">{getLanguageName(formData.language)}</p>
            </div> */}
            <div>
              <label className="text-sm text-zinc-400">Personality</label>
              <p className="text-white font-medium">{getPersonalityName(formData.personality)}</p>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Visibility</label>
              <p className="text-white font-medium">{formData.isPublic ? 'Public' : 'Private'}</p>
            </div>
            {formData.tags.length > 0 && (
              <div>
                <label className="text-sm text-zinc-400">Tags</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="bg-zinc-800/50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Messages</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400">Welcome Message</label>
              <div className="bg-black rounded-lg p-3 mt-1">
                <p className="text-white text-sm">{formData.welcomeMessage}</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Fallback Message</label>
              <div className="bg-black rounded-lg p-3 mt-1">
                <p className="text-white text-sm">{formData.fallbackMessage}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gradient-to-r from-blue-900/20 to-blue-900/20 rounded-lg p-6 border border-blue-500/20">
          <h3 className="text-lg font-semibold text-white mb-4">Chat Preview</h3>
          <div className="bg-white rounded-lg p-4 max-w-sm mx-auto">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-800">{formData.name}</div>
                <div className="text-xs text-zinc-500">Online • {getPersonalityName(formData.personality)}</div>
              </div>
            </div>
            <div className="bg-zinc-100 rounded-lg p-3">
              <p className="text-sm text-zinc-800">{formData.welcomeMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}