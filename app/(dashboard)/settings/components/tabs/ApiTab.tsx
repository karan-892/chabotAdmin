import ApiConfiguration from '@/components/settings/ApiConfiguration';

interface ApiTabProps {
  formData: any;
  setFormData: (data: any) => void;
}

const ApiTab = ({ formData, setFormData }: ApiTabProps) => {
  const handleRegenerateKey = async () => {
    try {
      const response = await fetch('/api/user/regenerate-key', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.apiKey) {
        setFormData({ ...formData, apiKey: data.apiKey });
      }
    } catch (error) {
      console.error('Error regenerating API key:', error);
    }
  };

  return (
    <div className="space-y-6">
      <ApiConfiguration
        botId={formData.selectedBotId}
        apiKey={formData.apiKey}
        onRegenerateKey={handleRegenerateKey}
      />
    </div>
  );
};

export default ApiTab;