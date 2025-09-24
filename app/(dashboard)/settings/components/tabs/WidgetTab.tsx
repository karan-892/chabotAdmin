import { useState } from 'react';
import ChatWidgetConfig from '@/components/settings/ChatWidgetConfig';

interface WidgetTabProps {
  formData: any;
  setFormData: (data: any) => void;
}

const WidgetTab = ({ formData, setFormData }: WidgetTabProps) => {
  const handleConfigChange = (widgetConfig: any) => {
    setFormData({ ...formData, widgetConfig });
  };

  return (
    <div className="space-y-6">
      <ChatWidgetConfig
        botId={formData.selectedBotId}
        currentConfig={formData.widgetConfig}
        onConfigChange={handleConfigChange}
      />
      
      {!formData.selectedBotId && (
        <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
          <p className="text-yellow-300 text-sm">
            Select a bot from your dashboard to configure its widget settings.
          </p>
        </div>
      )}
    </div>
  );
};

export default WidgetTab;