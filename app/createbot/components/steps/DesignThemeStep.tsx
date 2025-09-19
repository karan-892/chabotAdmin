"use client";

import { Palette, Monitor, Smartphone, Eye } from "lucide-react";
import { EnhancedBotFormData, ChatbotTheme } from "@/types/bot-creation";

interface Props {
  data: EnhancedBotFormData;
  onChange: (field: keyof EnhancedBotFormData, value: any) => void;
}

const themes: ChatbotTheme[] = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Clean and professional design',
    preview: '/themes/modern-blue.png',
    colors: {
      primary: '#0ea5e9',
      secondary: '#64748b',
      background: '#ffffff',
      text: '#1e293b',
      accent: '#06b6d4'
    },
    style: 'modern',
    features: ['Rounded corners', 'Gradient effects', 'Modern typography']
  },
  {
    id: 'classic-green',
    name: 'Classic Green',
    description: 'Traditional and trustworthy',
    preview: '/themes/classic-green.png',
    colors: {
      primary: '#10b981',
      secondary: '#6b7280',
      background: '#f9fafb',
      text: '#111827',
      accent: '#059669'
    },
    style: 'classic',
    features: ['Clean lines', 'Professional look', 'High contrast']
  },
  {
    id: 'minimal-gray',
    name: 'Minimal Gray',
    description: 'Simple and elegant',
    preview: '/themes/minimal-gray.png',
    colors: {
      primary: '#6b7280',
      secondary: '#9ca3af',
      background: '#ffffff',
      text: '#374151',
      accent: '#4b5563'
    },
    style: 'minimal',
    features: ['Minimalist design', 'Subtle colors', 'Clean typography']
  },
  {
    id: 'corporate-navy',
    name: 'Corporate Navy',
    description: 'Professional and authoritative',
    preview: '/themes/corporate-navy.png',
    colors: {
      primary: '#1e40af',
      secondary: '#64748b',
      background: '#f8fafc',
      text: '#0f172a',
      accent: '#3b82f6'
    },
    style: 'corporate',
    features: ['Business-focused', 'Professional colors', 'Structured layout']
  },
  {
    id: 'playful-purple',
    name: 'Playful Purple',
    description: 'Fun and engaging',
    preview: '/themes/playful-purple.png',
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      background: '#faf5ff',
      text: '#581c87',
      accent: '#7c3aed'
    },
    style: 'playful',
    features: ['Vibrant colors', 'Rounded elements', 'Friendly design']
  },
  {
    id: 'dark-theme',
    name: 'Dark Theme',
    description: 'Modern dark interface',
    preview: '/themes/dark-theme.png',
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      background: '#111827',
      text: '#f9fafb',
      accent: '#60a5fa'
    },
    style: 'modern',
    features: ['Dark mode', 'Easy on eyes', 'Modern aesthetics']
  }
];

const fontFamilies = [
  { name: 'Inter', description: 'Modern and clean' },
  { name: 'Roboto', description: 'Google\'s signature font' },
  { name: 'Open Sans', description: 'Friendly and readable' },
  { name: 'Lato', description: 'Professional and warm' },
  { name: 'Montserrat', description: 'Geometric and modern' },
  { name: 'Poppins', description: 'Rounded and friendly' }
];

const borderRadiusOptions = [
  { value: 'none', name: 'Sharp', description: 'No rounded corners' },
  { value: 'small', name: 'Subtle', description: 'Slightly rounded' },
  { value: 'medium', name: 'Rounded', description: 'Moderately rounded' },
  { value: 'large', name: 'Very Rounded', description: 'Highly rounded' }
];

const positionOptions = [
  { value: 'bottom-right', name: 'Bottom Right', description: 'Traditional position' },
  { value: 'bottom-left', name: 'Bottom Left', description: 'Alternative corner' },
  { value: 'center', name: 'Center', description: 'Centered overlay' }
];

export default function DesignThemeStep({ data, onChange }: Props) {
  const handleThemeChange = (theme: ChatbotTheme) => {
    onChange('theme', theme);
  };

  const handleCustomizationChange = (field: string, value: any) => {
    onChange('customizations', {
      ...data.customizations,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Design & Theme</h2>
        <p className="text-gray-400">Choose how your chatbot looks and feels</p>
      </div>

      {/* Theme Selection */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Choose a Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => handleThemeChange(theme)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                data.theme?.id === theme.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            >
              {/* Theme Preview */}
              <div className="bg-gray-700 rounded-lg p-3 mb-3">
                <div 
                  className="w-full h-24 rounded border-2 flex items-center justify-center"
                  style={{ 
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.primary 
                  }}
                >
                  <div 
                    className="px-3 py-1 rounded text-xs font-medium"
                    style={{ 
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.background 
                    }}
                  >
                    Chat Preview
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-1">{theme.name}</h4>
                <p className="text-sm text-gray-400 mb-2">{theme.description}</p>
                
                {/* Color Palette */}
                <div className="flex space-x-1 mb-2">
                  {Object.values(theme.colors).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-600"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {theme.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customizations */}
      <div className="bg-gray-800/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Customizations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Font Family
            </label>
            <select
              value={data.customizations.fontFamily}
              onChange={(e) => handleCustomizationChange('fontFamily', e.target.value)}
              className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {fontFamilies.map((font) => (
                <option key={font.name} value={font.name}>
                  {font.name} - {font.description}
                </option>
              ))}
            </select>
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Corner Style
            </label>
            <select
              value={data.customizations.borderRadius}
              onChange={(e) => handleCustomizationChange('borderRadius', e.target.value)}
              className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {borderRadiusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name} - {option.description}
                </option>
              ))}
            </select>
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Chat Position
            </label>
            <select
              value={data.customizations.position}
              onChange={(e) => handleCustomizationChange('position', e.target.value)}
              className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {positionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name} - {option.description}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Custom Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={data.customizations.brandColors?.primary || data.theme?.colors.primary}
                onChange={(e) => handleCustomizationChange('brandColors', {
                  ...data.customizations.brandColors,
                  primary: e.target.value
                })}
                className="w-12 h-12 bg-black border border-gray-600 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={data.customizations.brandColors?.primary || data.theme?.colors.primary}
                onChange={(e) => handleCustomizationChange('brandColors', {
                  ...data.customizations.brandColors,
                  primary: e.target.value
                })}
                className="flex-1 px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-gray-800/50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Eye className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Live Preview</h3>
        </div>
        
        <div className="flex space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <Monitor className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Desktop</span>
          </div>
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Mobile</span>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="max-w-sm mx-auto">
            <div 
              className="rounded-lg shadow-lg overflow-hidden"
              style={{ 
                backgroundColor: data.customizations.brandColors?.primary || data.theme?.colors.background,
                fontFamily: data.customizations.fontFamily
              }}
            >
              {/* Chat Header */}
              <div 
                className="p-4 text-white"
                style={{ 
                  backgroundColor: data.customizations.brandColors?.primary || data.theme?.colors.primary 
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">🤖</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{data.name || "Your Bot"}</h4>
                    <p className="text-xs opacity-90">Online</p>
                  </div>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="p-4 space-y-3" style={{ backgroundColor: data.theme?.colors.background }}>
                <div 
                  className="bg-gray-100 rounded-lg p-3 max-w-xs"
                  style={{ 
                    borderRadius: data.customizations.borderRadius === 'none' ? '0' :
                                 data.customizations.borderRadius === 'small' ? '4px' :
                                 data.customizations.borderRadius === 'medium' ? '8px' : '16px'
                  }}
                >
                  <p className="text-sm" style={{ color: data.theme?.colors.text }}>
                    {data.welcomeMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}