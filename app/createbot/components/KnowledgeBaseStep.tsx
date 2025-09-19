"use client";

import { Button } from "@/components/common/components/Button";
import { KnowledgeBaseItem, SimpleBotFormData } from "@/types/bot-creation";
import KnowledgeBaseItemCard from "./KnowledgeBaseItem";
import { Globe, MessageSquare, Plus, Sparkles } from "lucide-react";

export default function KnowledgeBaseStep({
  formData,
  error,
  handleAddKnowledge,
  handleRemoveKnowledge,
  handleSubmit,
  setStep,
  loading
}: {
  formData: SimpleBotFormData,
  error: string,
  handleAddKnowledge: (type: "url" | "text") => void,
  handleRemoveKnowledge: (id: string) => void,
  handleSubmit: () => void,
  setStep: any,
  loading: boolean
}) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Add Knowledge (Optional)</h1>
        <p className="text-gray-400">Train your bot with your content to make it smarter</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Add Knowledge Buttons */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => handleAddKnowledge("url")}
            variant="outline"
            className="flex-1 border-gray-800 text-gray-400 hover:text-white hover:border-blue-500"
          >
            <Globe className="w-4 h-4 mr-2" />
            Add Website
          </Button>
          <Button
            onClick={() => handleAddKnowledge("text")}
            variant="outline"
            className="flex-1 border-gray-800 text-gray-400 hover:text-white hover:border-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Text
          </Button>
        </div>

        {/* Knowledge Base Items */}
        {formData.knowledgeBase.length > 0 && (
          <div className="space-y-3 mb-8">
            {formData.knowledgeBase.map((item: KnowledgeBaseItem) => (
              <KnowledgeBaseItemCard key={item.id} item={item} onRemove={handleRemoveKnowledge} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {formData.knowledgeBase.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-800 rounded-lg mb-8">
            <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No knowledge added yet</h3>
            <p className="text-gray-500">Add websites or text content to train your bot</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(2)} className="border-gray-800 text-gray-400 hover:text-white">
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Create Bot</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
