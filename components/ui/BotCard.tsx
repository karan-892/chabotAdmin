"use client";

import { useState } from 'react';
import { Bot, Play, Heart, MoreVertical, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/common/components/Button';
import { useRouter } from 'next/navigation';
import { useAsyncAction } from '@/hooks/useApi';
import { deployBot, deleteBot } from '@/lib/api';

interface BotCardProps {
  bot: {
     id: string;
  name: string;
  description?: string;
  avatar?: string;
  status: string;
  totalMessages: number;
  totalConversations: number;
  deploymentUrl?: string;
  views?: number;
  likes?: number;
  image?: string;
  };
  onDelete: (botId: string) => void;
  onDeploy: (botId: string) => void;
  onLike: (botId: string) => void;
}

export default function BotCard({ bot, onDelete, onDeploy, onLike }: BotCardProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  
  const { execute: handleDeploy, loading: deploying } = useAsyncAction(deployBot);
  const { execute: handleDelete, loading: deleting } = useAsyncAction(deleteBot);

  const handleEdit = () => {
    router.push(`/bots/${bot.id}`);
  };

  const handleDeployClick = async () => {
    const result = await handleDeploy(bot.id);
    if (result) {
      onDeploy(bot.id);
    }
  };

  const handleDeleteClick = async () => {
    if (confirm('Are you sure you want to delete this bot?')) {
      const result = await handleDelete(bot.id);
      if (result) {
        onDelete(bot.id);
      }
    }
  };

  const handleOpenBot = () => {
    if (bot.deploymentUrl) {
      window.open(bot.deploymentUrl, '_blank');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'deployed':
        return 'bg-green-900 text-green-300';
      case 'draft':
        return 'bg-yellow-900 text-yellow-300';
      case 'published':
        return 'bg-blue-900 text-blue-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-750 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-10">
              <button
                onClick={handleEdit}
                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Bot
              </button>
              {bot.deploymentUrl && (
                <button
                  onClick={handleOpenBot}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-600 hover:text-white flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Bot
                </button>
              )}
              <button
                onClick={handleDeleteClick}
                disabled={deleting}
                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-600 hover:text-red-300 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {deleting ? 'Deleting...' : 'Delete Bot'}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">{bot.name}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{bot.description || 'No description provided'}</p>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex space-x-4">
          <span>{bot.totalConversations} conversations</span>
          <span>{bot.totalMessages} messages</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bot.status)}`}>
          {bot.status}
        </span>
      </div>
      
      <div className="flex space-x-2">
        <Button
          onClick={handleDeployClick}
          disabled={deploying || bot.status === 'DEPLOYED'}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm"
        >
          <Play className="w-4 h-4 mr-1" />
          {deploying ? 'Deploying...' : bot.status === 'DEPLOYED' ? 'Deployed' : 'Deploy'}
        </Button>
        
        <Button
          onClick={() => onLike(bot.id)}
          variant="outline"
          size="sm"
          className="p-2"
        >
          <Heart className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={handleEdit}
          variant="outline"
          size="sm"
          className="p-2"
        >
          <Edit className="w-4 h-4" />
        </Button>
      </div>
      
      {showMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}