import React from "react";

interface Props { 
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: Props) {
  const stepNames = [
    'Bot Type',
    'Website Data',
    'Conversation',
    'Design',
    'Settings'
  ];

  return (
    <div className="flex items-center space-x-4">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step === currentStep
                ? "bg-blue-600 text-white"
                : step < currentStep
                ? "bg-green-600 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
          >
            {step < currentStep ? "✓" : step}
          </div>
          <div className="ml-2 hidden sm:block">
            <div className={`text-sm font-medium ${
              step === currentStep ? "text-blue-400" : 
              step < currentStep ? "text-green-400" : "text-gray-400"
            }`}>
              {stepNames[step - 1]}
            </div>
          </div>
          {step < totalSteps && (
            <div className="w-8 h-0.5 bg-gray-600 ml-4 hidden sm:block" />
          )}
        </div>
      ))}
    </div>
  );
}
