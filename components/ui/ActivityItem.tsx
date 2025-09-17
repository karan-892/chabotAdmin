"use client";

import { Activity } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItemProps {
  activity: Activity;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'create':
        return '🎉';
      case 'update':
        return '✏️';
      case 'delete':
        return '🗑️';
      case 'deploy':
        return '🚀';
      case 'view':
        return '👁️';
      default:
        return '📝';
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'create':
        return 'text-green-400';
      case 'update':
        return 'text-blue-400';
      case 'delete':
        return 'text-red-400';
      case 'deploy':
        return 'text-purple-400';
      case 'view':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors group">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-medium">{activity.user}</span>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm">{getActivityIcon(activity.type)}</span>
          <span className={`text-xs font-medium ${getActivityColor(activity.type)}`}>
            {activity.type.toUpperCase()}
          </span>
        </div>
        
        <p className="text-sm text-gray-300 leading-relaxed">
          <span className="font-medium text-white">{activity.user}</span>
          {' '}
          <span>{activity.action}</span>
          {' '}
          <span className="font-medium text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">
            {activity.target}
          </span>
        </p>
        
        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(activity.time, { addSuffix: true })}
        </p>
      </div>
      
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-gray-400 hover:text-white p-1 rounded transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}