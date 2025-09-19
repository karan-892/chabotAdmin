"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/common/components/Button";
import Layout from "@/components/layout/Layout";
import StepIndicator from "./components/StepIndicator";
import StepNavigation from "./components/StepNavigation";
import BotTypeStep from "./components/steps/BotTypeStep";
import WebsiteIntegrationStep from "./components/steps/WebsiteIntegrationStep";
import ConversationSetupStep from "./components/steps/ConversationSetupStep";
import DesignThemeStep from "./components/steps/DesignThemeStep";
import AdvancedSettingsStep from "./components/steps/AdvancedSettingsStep";
import { EnhancedBotFormData, WebsiteData, ChatbotTheme } from "@/types/bot-creation";

const TOTAL_STEPS = 5;

const defaultTheme: ChatbotTheme = {
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
};

export default function CreateBotPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState<EnhancedBotFormData>({
    // Step 1: Bot Type
    botType: "",
    name: "",
    description: "",
    
    // Step 2: Website Integration
    websites: [],
    crawlDepth: 2,
    includeFiles: false,
    
    // Step 3: Conversation Setup
    welcomeMessage: "Hello! How can I help you today?",
    fallbackMessage: "I'm sorry, I didn't understand that. Could you please rephrase?",
    language: "en",
    personality: "friendly",
    
    // Step 4: Design & Theme
    theme: defaultTheme,
    customizations: {
      fontFamily: "Inter",
      borderRadius: "medium",
      position: "bottom-right",
    },
    
    // Step 5: Advanced Settings
    isPublic: false,
    tags: [],
    integrations: [],
    analytics: true,
  });

  const handleInputChange = (field: keyof EnhancedBotFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWebsiteAdd = (website: WebsiteData) => {
    setFormData(prev => ({
      ...prev,
      websites: [...prev.websites, website]
    }));
  };

  const handleWebsiteRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      websites: prev.websites.filter((_, i) => i !== index)
    }));
  };

  const handleTagAdd = (tag: string) => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag.trim()] }));
    }
  };

  const handleTagRemove = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.botType.length > 0 && formData.name.trim().length > 0;
      case 2:
        return formData.websites.length > 0;
      case 3:
        return formData.welcomeMessage.trim().length > 0 && formData.fallbackMessage.trim().length > 0;
      case 4:
        return !!formData.theme;
      case 5:
        return true; // Advanced settings are optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
      setError("");
    } else {
      setError("Please fill in all required fields");
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError("");
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          config: {
            botType: formData.botType,
            websites: formData.websites,
            crawlDepth: formData.crawlDepth,
            includeFiles: formData.includeFiles,
            welcomeMessage: formData.welcomeMessage,
            fallbackMessage: formData.fallbackMessage,
            language: formData.language,
            personality: formData.personality,
            theme: formData.theme,
            customizations: formData.customizations,
            analytics: formData.analytics,
          },
          isPublic: formData.isPublic,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push(`/bots/${data.bot.id}`);
      } else {
        setError(data.error || "Failed to create bot");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BotTypeStep
            data={formData}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <WebsiteIntegrationStep
            data={formData}
            onChange={handleInputChange}
            onWebsiteAdd={handleWebsiteAdd}
            onWebsiteRemove={handleWebsiteRemove}
          />
        );
      case 3:
        return (
          <ConversationSetupStep
            data={formData}
            onChange={handleInputChange}
          />
        );
      case 4:
        return (
          <DesignThemeStep
            data={formData}
            onChange={handleInputChange}
          />
        );
      case 5:
        return (
          <AdvancedSettingsStep
            data={formData}
            onChange={handleInputChange}
            onTagAdd={handleTagAdd}
            onTagRemove={handleTagRemove}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="bg-black border-b border-gray-700 px-6 py-4">
          <div className="mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-white flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </div>
        </div>

        {/* Body */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-black border border-gray-700 rounded-lg p-8">
            {renderStep()}

            {error && (
              <div className="mt-6 bg-red-900/20 border border-red-700 rounded-lg p-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <StepNavigation
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              validateStep={validateStep}
              loading={loading}
              onPrev={handlePrev}
              onNext={handleNext}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}