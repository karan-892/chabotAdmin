"use client";

import { BotTemplate } from "@/types/bot-creation";

export default function TemplateCard({ template, onSelect }: { template: BotTemplate, onSelect: (template: BotTemplate) => void }) {
  return (
    <div
      onClick={() => onSelect(template)}
      className="bg-black border border-gray-800 rounded-lg p-8 cursor-pointer hover:border-purple-500 transition-all group"
    >
      <div className="text-4xl mb-4">{template.icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400">
        {template.name}
      </h3>
      <p className="text-gray-400 mb-4">{template.description}</p>
      <div className="flex flex-wrap gap-2">
        {template.features.map((feature, index) => (
          <span key={index} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}
