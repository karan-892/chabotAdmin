"use client";

import { Activity } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItemProps {
  activity: Activity;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create':
        return '🆕';
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

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'create':
        return 'bg-green-500';
      case 'update':
        return 'bg-blue-500';
      case 'delete':
        return 'bg-red-500';
      case 'deploy':
        return 'bg-purple-500';
      case 'view':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-start space-x-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 ${getActivityColor(activity.type)}`}>
        {activity.user}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-300">
          <span className="font-medium">{activity.user}</span>{' '}
          <span>{activity.action}</span>{' '}
          <span className="font-medium text-white">{activity.target}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
        </p>
      </div>
      <div className="text-lg flex-shrink-0">
        {getActivityIcon(activity.type)}
      </div>
    </div>
  );
}