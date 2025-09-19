"use client";

import { KnowledgeBaseItem } from "@/types/bot-creation";
import { Globe, MessageSquare } from "lucide-react";
import { Button } from "@/components/common/components/Button";

export default function KnowledgeBaseItemCard({ item, onRemove }: { item: KnowledgeBaseItem, onRemove: (id: string) => void }) {
  return (
    <div className="bg-black border border-gray-800 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {item.type === "url" ? (
          <Globe className="w-5 h-5 text-blue-400" />
        ) : (
          <MessageSquare className="w-5 h-5 text-green-400" />
        )}
        <div>
          <p className="text-white font-medium truncate max-w-xs">{item.content}</p>
          <p className="text-sm text-gray-400 capitalize">{item.type}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(item.id)}
        className="text-red-400 hover:text-red-300"
      >
        Remove
      </Button>
    </div>
  );
}
