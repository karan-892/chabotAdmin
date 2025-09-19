"use client";

import { BotTemplate } from "@/types/bot-creation";
import TemplateCard from "./TemplateCard";
import { Bot } from "lucide-react";

export default function TemplateSelection({ botTemplates, handleTemplateSelect }: { botTemplates: BotTemplate[], handleTemplateSelect: (template: BotTemplate) => void }) {
  return (
    <div className="text-center mb-12">
      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Bot className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-4">Create a new bot</h1>
      <p className="text-gray-400 text-lg">Choose a template to get started quickly</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {botTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} onSelect={handleTemplateSelect} />
        ))}
      </div>
    </div>
  );
}
