"use client";

import { BarChart3, TrendingUp, Calendar, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/common/components/Button';
import { useApi } from '@/hooks/useApi';
import UsagePageSkeleton from '@/components/skeletons/UsagePageSkeleton';

export default function UsagePage() {
  const { data: usageData, loading, error, refetch } = useApi(async () => {
    const response = await fetch('/api/usage');
    if (!response.ok) throw new Error('Failed to fetch usage data');
    return response.json();
  });

  const handleExportReport = async () => {
    try {
      // Implement export functionality
      const data = {
        usageStats: usageData?.usageStats,
        monthlyData: usageData?.monthlyData,
        insights: usageData?.insights,
        exportDate: new Date().toISOString(),
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `usage-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  if (loading) {
    return <UsagePageSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Failed to load usage data</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <Button onClick={refetch} className="bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Usage Analytics</h1>
          <p className="text-gray-400">Monitor your workspace usage and performance</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          <span onClick={handleExportReport}>Export Report</span>
        </Button>
      </div>

      {/* Current Usage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {usageData?.usageStats?.map((item, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400">{item.label}</h3>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            
            <div className="mb-4">
              <div className="text-2xl font-bold text-white mb-1">
                {item.unit === '$' ? `$${item.value.toFixed(2)}` : 
                 item.unit === 'kB' ? `${item.value.toFixed(1)}${item.unit}` : item.value}
              </div>
              <div className="text-sm text-gray-400">
                of {item.unit === '$' ? `$${item.max.toFixed(2)}` : 
                    item.unit === 'kB' ? `${item.max}${item.unit}` : item.max}
              </div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  item.color === 'red' ? 'bg-red-500' :
                  item.color === 'blue' ? 'bg-blue-500' :
                  item.color === 'green' ? 'bg-green-500' : 'bg-purple-500'
                }`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">{item.percentage}% used</div>
          </div>
        ))}
      </div>

      {/* Usage Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Messages Chart */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Message Usage</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {usageData?.monthlyData?.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-400 text-sm w-12">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(month.messages / 400) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-white text-sm w-16 text-right">{month.messages}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Spend Chart */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">AI Spend</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {usageData?.monthlyData?.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-400 text-sm w-12">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(month.aiSpend / 8) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-white text-sm w-16 text-right">${month.aiSpend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Insights */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Usage Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              ↑ {usageData?.insights?.messagesGrowth || 0}%
            </div>
            <div className="text-sm text-gray-400">Messages this month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              ↑ {usageData?.insights?.aiEfficiency || 0}%
            </div>
            <div className="text-sm text-gray-400">AI efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              ↓ {Math.abs(usageData?.insights?.responseTimeImprovement || 0)}%
            </div>
            <div className="text-sm text-gray-400">Response time</div>
          </div>
        </div>
      </div>
    </div>
  );
}