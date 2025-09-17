"use client";

import { useState, useEffect } from 'react';
import MainContent from '@/components/layout/MainContent';
import RightSidebar from '@/components/layout/RightSidebar';
import Layout from '@/components/layout/Layout';
import { Bot, Activity, UsageStat } from '@/types';

export default function Dashboard() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [usageStats, setUsageStats] = useState<UsageStat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBots([
        {
          id: '1',
          name: 'Titans Legacy - Brand AI Assistant',
          status: 'deployed',
          deployedAt: new Date(Date.now() - 39 * 60 * 1000),
          views: 12,
          likes: 0,
          image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          description: 'AI assistant for brand management and customer support'
        }
      ]);

      setUsageStats([
        {
          label: 'Bot Count',
          value: 1,
          max: 1,
          color: 'red',
          percentage: 100,
          unit: ''
        },
        {
          label: 'Incoming Messages & Events',
          value: 24,
          max: 500,
          color: 'blue',
          percentage: 4.8,
          unit: ''
        },
        {
          label: 'AI Spend',
          value: 0.34,
          max: 5.00,
          color: 'green',
          percentage: 6.8,
          unit: '$'
        },
        {
          label: 'File Storage',
          value: 946.3,
          max: 100000,
          color: 'purple',
          percentage: 0.9,
          unit: 'kB'
        },
      ]);

      setActivities([
        {
          id: '1',
          user: 'K',
          action: 'updated the bot information of',
          target: 'Titans Legacy - Brand AI Assistant',
          time: new Date(Date.now() - 34 * 60 * 1000),
          type: 'update'
        },
        {
          id: '2',
          user: 'K',
          action: 'updated a bot channel for',
          target: 'Titans Legacy - Brand AI Assistant',
          time: new Date(Date.now() - 34 * 60 * 1000),
          type: 'update'
        },
        {
          id: '3',
          user: 'K',
          action: 'updated the bot information of',
          target: 'Titans Legacy - Brand AI Assistant',
          time: new Date(Date.now() - 39 * 60 * 1000),
          type: 'update'
        },
      ]);

      setLoading(false);
    };

    initializeData();
  }, []);

  // Auto-refresh activities every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new activity
      const newActivity: Activity = {
        id: Date.now().toString(),
        user: 'K',
        action: 'checked bot status for',
        target: 'Titans Legacy - Brand AI Assistant',
        time: new Date(),
        type: 'view'
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateBot = () => {
    const newBot: Bot = {
      id: Date.now().toString(),
      name: `New Bot ${bots.length + 1}`,
      status: 'draft',
      deployedAt: new Date(),
      views: 0,
      likes: 0,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'New AI assistant bot'
    };

    setBots(prev => [...prev, newBot]);
    
    // Add activity
    const newActivity: Activity = {
      id: Date.now().toString(),
      user: 'K',
      action: 'created a new bot',
      target: newBot.name,
      time: new Date(),
      type: 'create'
    };
    
    setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
  };

  const handleDeleteBot = (botId: string) => {
    const bot = bots.find(b => b.id === botId);
    if (!bot) return;

    setBots(prev => prev.filter(b => b.id !== botId));
    
    // Add activity
    const newActivity: Activity = {
      id: Date.now().toString(),
      user: 'K',
      action: 'deleted bot',
      target: bot.name,
      time: new Date(),
      type: 'delete'
    };
    
    setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
  };

  const handleDeployBot = (botId: string) => {
    setBots(prev => prev.map(bot => 
      bot.id === botId 
        ? { ...bot, status: 'deployed', deployedAt: new Date() }
        : bot
    ));

    const bot = bots.find(b => b.id === botId);
    if (bot) {
      const newActivity: Activity = {
        id: Date.now().toString(),
        user: 'K',
        action: 'deployed bot',
        target: bot.name,
        time: new Date(),
        type: 'deploy'
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }
  };

  const handleLikeBot = (botId: string) => {
    setBots(prev => prev.map(bot => 
      bot.id === botId 
        ? { ...bot, likes: bot.likes + 1 }
        : bot
    ));
  };

  const filteredBots = bots.filter(bot =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex-1 flex overflow-hidden">
        {/* Main content */}
        <MainContent 
          bots={filteredBots}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateBot={handleCreateBot}
          onDeleteBot={handleDeleteBot}
          onDeployBot={handleDeployBot}
          onLikeBot={handleLikeBot}
          loading={loading}
        />
        
        {/* Right sidebar */}
        <RightSidebar 
          usageStats={usageStats}
          activities={activities}
        />
      </div>
    </Layout>
  );
}