"use client";

import { Palette, Monitor, Smartphone, Eye, Settings } from "lucide-react";
import { BotFormData } from "../CreateBotWizard";
import { useState } from "react";

interface Props {
  formData: BotFormData;
  updateFormData: (field: keyof BotFormData, value: any) => void;
}

const fontFamilies = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Montserrat', label: 'Montserrat' },
];

const chatPositions = [
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'top-left', label: 'Top Left' },
];

const presetThemes = [
  {
    name: 'Modern Blue',
    colors: {
      primaryColor: '#0ea5e9',
      secondaryColor: '#64748b',
      backgroundColor: '#ffffff',
      textColor: '#1e293b',
    }
  },
  {
    name: 'Dark Mode',
    colors: {
      primaryColor: '#8b5cf6',
      secondaryColor: '#6b7280',
      backgroundColor: '#111827',
      textColor: '#f9fafb',
    }
  },
  {
    name: 'Green Nature',
    colors: {
      primaryColor: '#10b981',
      secondaryColor: '#6b7280',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
    }
  },
  {
    name: 'Orange Warm',
    colors: {
      primaryColor: '#f59e0b',
      secondaryColor: '#6b7280',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
    }
  },
];

export default function ThemeStep({ formData, updateFormData }: Props) {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const updateTheme = (field: string, value: string) => {
    updateFormData('theme', {
      ...formData.theme,
      [field]: value,
    });
  };

  const applyPresetTheme = (preset: typeof presetThemes[0]) => {
    updateFormData('theme', {
      ...formData.theme,
      ...preset.colors,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Customize Chat Theme</h2>
        <p className="text-zinc-400">Design your chatbot's appearance and behavior</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Theme Configuration */}
        <div className="space-y-6">
          {/* Preset Themes */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Themes</h3>
            <div className="grid grid-cols-2 gap-3">
              {presetThemes.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPresetTheme(preset)}
                  className="p-3 border border-zinc-600 rounded-lg hover:border-zinc-500 transition-colors text-left"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: preset.colors.primaryColor }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: preset.colors.backgroundColor }}
                    ></div>
                  </div>
                  <p className="text-sm text-white font-medium">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Color Settings */}
          <div className="bg-zinc-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Colors
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.theme.primaryColor}
                    onChange={(e) => updateTheme('primaryColor', e.target.value)}
                    className="w-12 h-10 rounded border border-zinc-600"
                  />
                  <input
                    type="text"
                    value={formData.theme.primaryColor}
                    onChange={(e) => updateTheme('primaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 bg-black border border-zinc-600 rounded text-white text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.theme.secondaryColor}
                    onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                    className="w-12 h-10 rounded border border-zinc-600"
                  />
                  <input
                    type="text"
                    value={formData.theme.secondaryColor}
                    onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 bg-black border border-zinc-600 rounded text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Background Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.theme.backgroundColor}
                    onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                    className="w-12 h-10 rounded border border-zinc-600"
                  />
                  <input
                    type="text"
                    value={formData.theme.backgroundColor}
                    onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                    className="flex-1 px-3 py-2 bg-black border border-zinc-600 rounded text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Text Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={formData.theme.textColor}
                    onChange={(e) => updateTheme('textColor', e.target.value)}
                    className="w-12 h-10 rounded border border-zinc-600"
                  />
                  <input
                    type="text"
                    value={formData.theme.textColor}
                    onChange={(e) => updateTheme('textColor', e.target.value)}
                    className="flex-1 px-3 py-2 bg-black border border-zinc-600 rounded text-white text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="bg-zinc-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Typography</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Font Family
                </label>
                <select
                  value={formData.theme.fontFamily}
                  onChange={(e) => updateTheme('fontFamily', e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-zinc-600 rounded text-white"
                >
                  {fontFamilies.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Font Size
                </label>
                <select
                  value={formData.theme.fontSize}
                  onChange={(e) => updateTheme('fontSize', e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-zinc-600 rounded text-white"
                >
                  <option value="12px">Small (12px)</option>
                  <option value="14px">Medium (14px)</option>
                  <option value="16px">Large (16px)</option>
                  <option value="18px">Extra Large (18px)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Layout Settings */}
          <div className="bg-zinc-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Layout</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Chat Position
                </label>
                <select
                  value={formData.theme.chatPosition}
                  onChange={(e) => updateTheme('chatPosition', e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-zinc-600 rounded text-white"
                >
                  {chatPositions.map((position) => (
                    <option key={position.value} value={position.value}>
                      {position.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Chat Width
                  </label>
                  <input
                    type="text"
                    value={formData.theme.chatWidth}
                    onChange={(e) => updateTheme('chatWidth', e.target.value)}
                    placeholder="400px"
                    className="w-full px-3 py-2 bg-black border border-zinc-600 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Chat Height
                  </label>
                  <input
                    type="text"
                    value={formData.theme.chatHeight}
                    onChange={(e) => updateTheme('chatHeight', e.target.value)}
                    placeholder="600px"
                    className="w-full px-3 py-2 bg-black border border-zinc-600 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Border Radius
                </label>
                <select
                  value={formData.theme.borderRadius}
                  onChange={(e) => updateTheme('borderRadius', e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-zinc-600 rounded text-white"
                >
                  <option value="0px">None (0px)</option>
                  <option value="4px">Small (4px)</option>
                  <option value="8px">Medium (8px)</option>
                  <option value="12px">Large (12px)</option>
                  <option value="16px">Extra Large (16px)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Custom CSS */}
          <div className="bg-zinc-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Custom CSS</h3>
            <textarea
              value={formData.theme.customCSS || ''}
              onChange={(e) => updateTheme('customCSS', e.target.value)}
              placeholder="/* Add your custom CSS here */"
              rows={6}
              className="w-full px-3 py-2 bg-black border border-zinc-600 rounded text-white font-mono text-sm resize-none"
            />
            <p className="text-xs text-zinc-500 mt-2">
              Advanced: Add custom CSS to further customize your chat widget
            </p>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Live Preview</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-blue-600' : 'bg-zinc-700'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-blue-600' : 'bg-zinc-700'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className={`bg-zinc-900 rounded-lg p-4 ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
            <div 
              className="rounded-lg shadow-lg overflow-hidden"
              style={{
                width: previewMode === 'mobile' ? '300px' : formData.theme.chatWidth,
                height: previewMode === 'mobile' ? '400px' : formData.theme.chatHeight,
                backgroundColor: formData.theme.backgroundColor,
                fontFamily: formData.theme.fontFamily,
                fontSize: formData.theme.fontSize,
                borderRadius: formData.theme.borderRadius,
              }}
            >
              {/* Chat Header */}
              <div 
                className="p-4 flex items-center space-x-3"
                style={{ backgroundColor: formData.theme.primaryColor }}
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {formData.name ? formData.name.charAt(0).toUpperCase() : 'B'}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">
                    {formData.name || 'Your Bot'}
                  </h4>
                  <p className="text-white/80 text-xs">Online now</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-3 flex-1">
                <div className="flex items-start space-x-2">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ 
                      backgroundColor: formData.theme.primaryColor,
                      color: 'white'
                    }}
                  >
                    B
                  </div>
                  <div 
                    className="max-w-xs p-3 rounded-lg text-sm"
                    style={{ 
                      backgroundColor: formData.theme.secondaryColor + '20',
                      color: formData.theme.textColor,
                      borderRadius: formData.theme.borderRadius,
                    }}
                  >
                    Hello! I'm your AI assistant. How can I help you today?
                  </div>
                </div>

                <div className="flex items-start space-x-2 justify-end">
                  <div 
                    className="max-w-xs p-3 rounded-lg text-sm"
                    style={{ 
                      backgroundColor: formData.theme.primaryColor,
                      color: 'white',
                      borderRadius: formData.theme.borderRadius,
                    }}
                  >
                    I need help with my account
                  </div>
                  <div className="w-6 h-6 bg-zinc-400 rounded-full"></div>
                </div>

                <div className="flex items-start space-x-2">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ 
                      backgroundColor: formData.theme.primaryColor,
                      color: 'white'
                    }}
                  >
                    B
                  </div>
                  <div 
                    className="max-w-xs p-3 rounded-lg text-sm"
                    style={{ 
                      backgroundColor: formData.theme.secondaryColor + '20',
                      color: formData.theme.textColor,
                      borderRadius: formData.theme.borderRadius,
                    }}
                  >
                    I'd be happy to help you with your account! What specific issue are you experiencing?
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-zinc-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    style={{ 
                      borderColor: formData.theme.secondaryColor,
                      borderRadius: formData.theme.borderRadius,
                      fontSize: formData.theme.fontSize,
                    }}
                    readOnly
                  />
                  <button 
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ 
                      backgroundColor: formData.theme.primaryColor,
                      borderRadius: formData.theme.borderRadius,
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}