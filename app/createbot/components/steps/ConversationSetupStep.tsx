"use client";

import { MessageSquare, User, Smile } from "lucide-react";
import { EnhancedBotFormData } from "@/types/bot-creation";

interface Props {
  data: EnhancedBotFormData;
  onChange: (field: keyof EnhancedBotFormData, value: any) => void;
}

const personalities = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Formal and business-like tone',
    icon: '👔',
    example: 'Good day! I am here to assist you with your inquiries.'
  },
  {
    id: 'friendly',
    name: 'Friendly',
    description: 'Warm and approachable tone',
    icon: '😊',
    example: 'Hi there! I\'m excited to help you out today!'
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Relaxed and informal tone',
    icon: '😎',
    example: 'Hey! What can I help you with?'
  },
  {
    id: 'formal',
    name: 'Formal',
    description: 'Very polite and structured tone',
    icon: '🎩',
    example: 'Greetings. How may I be of service to you today?'
  }
];

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
];

export default function ConversationSetupStep({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Conversation Setup</h2>
        <p className="text-gray-400">Configure how your bot communicates</p>
      </div>

      <div className="space-y-6">
        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Language
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {languages.map((lang) => (
              <div
                key={lang.code}
                onClick={() => onChange("language", lang.code)}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                  data.language === lang.code
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              >
                <div className="text-2xl mb-1">{lang.flag}</div>
                <div className="text-sm text-white font-medium">{lang.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Personality Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Bot Personality
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalities.map((personality) => (
              <div
                key={personality.id}
                onClick={() => onChange("personality", personality.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  data.personality === personality.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{personality.icon}</span>
                  <div>
                    <h3 className="text-white font-medium">{personality.name}</h3>
                    <p className="text-sm text-gray-400">{personality.description}</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded p-2 mt-2">
                  <p className="text-xs text-gray-300 italic">"{personality.example}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Welcome Message */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Welcome Message <span className="text-red-400">*</span>
          </label>
          <textarea
            value={data.welcomeMessage}
            onChange={(e) => onChange("welcomeMessage", e.target.value)}
            placeholder="Hello! How can I help you today?"
            rows={3}
            className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">This message will be shown when users start a conversation</p>
        </div>

        {/* Fallback Message */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Fallback Message <span className="text-red-400">*</span>
          </label>
          <textarea
            value={data.fallbackMessage}
            onChange={(e) => onChange("fallbackMessage", e.target.value)}
            placeholder="I'm sorry, I didn't understand that. Could you please rephrase?"
            rows={3}
            className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">This message will be shown when the bot doesn't understand</p>
        </div>

        {/* Preview */}
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
          <div className="bg-white rounded-lg p-4 max-w-sm">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">{data.name || 'Your Bot'}</div>
                <div className="text-xs text-gray-500">Online</div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-sm text-gray-800">{data.welcomeMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}