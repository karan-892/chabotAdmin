"use client";

import { BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/common/components/Button';

export default function UsagePage() {
  const usageData = [
    { label: 'Bot Count', current: 1, limit: 1, percentage: 100, color: 'red' },
    { label: 'Messages', current: 24, limit: 500, percentage: 4.8, color: 'blue' },
    { label: 'AI Spend', current: 0.34, limit: 5.00, percentage: 6.8, color: 'green' },
    { label: 'Storage', current: 946.3, limit: 100000, percentage: 0.9, color: 'purple' },
  ];

  const monthlyUsage = [
    { month: 'Jan', messages: 120, aiSpend: 2.4 },
    { month: 'Feb', messages: 180, aiSpend: 3.2 },
    { month: 'Mar', messages: 240, aiSpend: 4.1 },
    { month: 'Apr', messages: 320, aiSpend: 5.8 },
    { month: 'May', messages: 280, aiSpend: 4.9 },
    { month: 'Jun', messages: 350, aiSpend: 6.2 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Usage Analytics</h1>
          <p className="text-gray-400">Monitor your workspace usage and performance</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Current Usage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {usageData.map((item, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400">{item.label}</h3>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            
            <div className="mb-4">
              <div className="text-2xl font-bold text-white mb-1">
                {item.label === 'AI Spend' ? `$${item.current}` : 
                 item.label === 'Storage' ? `${item.current}kB` : item.current}
              </div>
              <div className="text-sm text-gray-400">
                of {item.label === 'AI Spend' ? `$${item.limit}` : 
                    item.label === 'Storage' ? `${item.limit}kB` : item.limit}
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
            {monthlyUsage.map((month, index) => (
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
            {monthlyUsage.map((month, index) => (
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
            <div className="text-2xl font-bold text-green-400 mb-1">↑ 23%</div>
            <div className="text-sm text-gray-400">Messages this month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">↑ 15%</div>
            <div className="text-sm text-gray-400">AI efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">↓ 8%</div>
            <div className="text-sm text-gray-400">Response time</div>
          </div>
        </div>
      </div>
    </div>
  );
}