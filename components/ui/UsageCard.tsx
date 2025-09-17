"use client";

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { UsageStat } from '@/types';

interface UsageCardProps {
  stat: UsageStat;
}

export default function UsageCard({ stat }: UsageCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return {
          bg: 'bg-red-500',
          text: 'text-red-400',
          light: 'bg-red-900/20'
        };
      case 'blue':
        return {
          bg: 'bg-blue-500',
          text: 'text-blue-400',
          light: 'bg-blue-900/20'
        };
      case 'green':
        return {
          bg: 'bg-green-500',
          text: 'text-green-400',
          light: 'bg-green-900/20'
        };
      case 'purple':
        return {
          bg: 'bg-purple-500',
          text: 'text-purple-400',
          light: 'bg-purple-900/20'
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-gray-400',
          light: 'bg-gray-900/20'
        };
    }
  };

  const colors = getColorClasses(stat.color);
  
  const formatValue = (value: number, unit: string) => {
    if (unit === '$') return `$${value.toFixed(2)}`;
    if (unit === 'kB' && value > 1000) return `${(value / 1000).toFixed(1)} MB`;
    return `${value}${unit}`;
  };

  const formatMax = (max: number, unit: string) => {
    if (unit === '$') return `$${max.toFixed(2)}`;
    if (unit === 'kB' && max > 1000) return `${(max / 1000).toFixed(0)} MB`;
    return `${max}${unit}`;
  };

  // Simulate trend (random for demo)
  const trend = Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable';
  const trendValue = Math.floor(Math.random() * 20) + 1;

  return (
    <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-650 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-300">{stat.label}</h4>
        <div className="flex items-center space-x-1">
          {trend === 'up' && <TrendingUp className="w-3 h-3 text-green-400" />}
          {trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
          {trend === 'stable' && <Minus className="w-3 h-3 text-gray-400" />}
          <span className={`text-xs ${
            trend === 'up' ? 'text-green-400' : 
            trend === 'down' ? 'text-red-400' : 
            'text-gray-400'
          }`}>
            {trend !== 'stable' && `${trendValue}%`}
          </span>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex items-baseline space-x-2">
          <span className="text-lg font-semibold text-white">
            {formatValue(stat.value, stat.unit)}
          </span>
          <span className="text-sm text-gray-400">
            of {formatMax(stat.max, stat.unit)}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="w-full bg-gray-600 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ease-out ${colors.bg}`}
            style={{ width: `${Math.min(stat.percentage, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`text-xs font-medium ${colors.text}`}>
            {stat.percentage.toFixed(1)}% used
          </span>
          {stat.percentage > 80 && (
            <span className="text-xs text-yellow-400 font-medium">
              {stat.percentage > 95 ? 'Critical' : 'Warning'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}