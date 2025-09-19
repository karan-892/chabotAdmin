"use client";

import { Bot, MessageSquare, ShoppingCart, HeadphonesIcon, Users, Briefcase, Zap } from "lucide-react";
import { EnhancedBotFormData, BotType } from "@/types/bot-creation";

interface Props {
  data: EnhancedBotFormData;
  onChange: (field: keyof EnhancedBotFormData, value: any) => void;
}

const botTypes: BotType[] = [
  {
    id: "customer-support",
    name: "Customer Support",
    description: "Help customers resolve issues and answer questions",
    icon: "HeadphonesIcon",
    features: ["24/7 availability", "Ticket routing", "FAQ automation"],
    useCases: ["Support tickets", "Common questions", "Issue resolution"]
  },
  {
    id: "sales-assistant",
    name: "Sales Assistant",
    description: "Guide customers through the sales process",
    icon: "ShoppingCart",
    features: ["Product recommendations", "Lead qualification", "Order assistance"],
    useCases: ["Product discovery", "Purchase guidance", "Upselling"]
  },
  {
    id: "lead-generation",
    name: "Lead Generation",
    description: "Capture and qualify potential customers",
    icon: "Users",
    features: ["Contact collection", "Qualification questions", "CRM integration"],
    useCases: ["Newsletter signup", "Demo requests", "Contact forms"]
  },
  {
    id: "knowledge-base",
    name: "Knowledge Base",
    description: "Provide information from your documentation",
    icon: "MessageSquare",
    features: ["Document search", "Smart answers", "Content suggestions"],
    useCases: ["Documentation", "FAQs", "How-to guides"]
  },
  {
    id: "appointment-booking",
    name: "Appointment Booking",
    description: "Schedule meetings and appointments",
    icon: "Briefcase",
    features: ["Calendar integration", "Availability checking", "Reminders"],
    useCases: ["Meeting scheduling", "Service bookings", "Consultations"]
  },
  {
    id: "custom",
    name: "Custom Bot",
    description: "Create a bot with custom behavior",
    icon: "Zap",
    features: ["Flexible configuration", "Custom workflows", "API integrations"],
    useCases: ["Unique requirements", "Complex workflows", "Specialized tasks"]
  }
];

const iconMap = {
  HeadphonesIcon,
  ShoppingCart,
  Users,
  MessageSquare,
  Briefcase,
  Zap
};

export default function BotTypeStep({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Bot Type</h2>
        <p className="text-gray-400">Select the type of bot that best fits your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {botTypes.map((botType) => {
          const IconComponent = iconMap[botType.icon as keyof typeof iconMap];
          return (
            <div
              key={botType.id}
              onClick={() => onChange("botType", botType.id)}
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                data.botType === botType.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  data.botType === botType.id ? "bg-blue-600" : "bg-gray-700"
                }`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">{botType.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{botType.description}</p>
                  
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-xs font-medium text-gray-300 mb-1">Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {botType.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-medium text-gray-300 mb-1">Use Cases:</h4>
                      <ul className="text-xs text-gray-400 space-y-1">
                        {botType.useCases.map((useCase, index) => (
                          <li key={index}>• {useCase}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {data.botType && (
        <div className="space-y-4 mt-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bot Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Enter your bot name"
              className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={data.description}
              onChange={(e) => onChange("description", e.target.value)}
              placeholder="Describe what your bot does"
              rows={3}
              className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}