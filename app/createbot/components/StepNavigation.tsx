"use client"

import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/common/components/Button";

interface Props {
  currentStep: number;
  totalSteps: number;
  validateStep: (step: number) => boolean;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function StepNavigation({
  currentStep, totalSteps, validateStep, loading, onPrev, onNext, onSubmit
}: Props) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={currentStep === 1}
        className="flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Previous</span>
      </Button>

      {currentStep < totalSteps ? (
        <Button
          onClick={onNext}
          disabled={!validateStep(currentStep)}
          className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
        >
          <span>Next</span>
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          disabled={loading || !validateStep(currentStep)}
          className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
        >
          {loading
            ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Creating...</span></>)
            : (<><Sparkles className="w-4 h-4" /><span>Create Bot</span></>)
          }
        </Button>
      )}
    </div>
  );
}
