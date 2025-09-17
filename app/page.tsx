"use client";

import { useState, useEffect } from 'react';
import MainContent from '@/components/layout/MainContent';
import RightSidebar from '@/components/layout/RightSidebar';
import Layout from '@/components/layout/Layout';
import { Bot, Activity, UsageStat } from '@/types';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [bots, setBots] = useState<Bot[]>([]);
  // const [activities, setActivities] = useState<Activity[]>([]);
  // const [usageStats, setUsageStats] = useState<UsageStat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchBots = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bots');
      if (res.ok) {
        const data = await res.json();
        // Convert date strings to Date objects
        const botsWithDates = data.bots.map((bot: any) => ({
          ...bot,
          createdAt: bot.createdAt ? new Date(bot.createdAt) : undefined,
          updatedAt: bot.updatedAt ? new Date(bot.updatedAt) : undefined,
          deployedAt: bot.deployedAt ? new Date(bot.deployedAt) : undefined,
          views: bot.views ?? 0,
          likes: bot.likes ?? 0,
        }));
        setBots(botsWithDates);
      } else {
        setBots([]);
      }
    } catch (err) {
      setBots([]);
    }
    setLoading(false);
  };
  console.log("bots",bots)
  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      fetchBots();

      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));


      // setUsageStats([
      //   {
      //     label: 'Bot Count',
      //     value: 1,
      //     max: 1,
      //     color: 'red',
      //     percentage: 100,
      //     unit: ''
      //   },
      //   {
      //     label: 'Incoming Messages & Events',
      //     value: 24,
      //     max: 500,
      //     color: 'blue',
      //     percentage: 4.8,
      //     unit: ''
      //   },
      //   {
      //     label: 'AI Spend',
      //     value: 0.34,
      //     max: 5.00,
      //     color: 'green',
      //     percentage: 6.8,
      //     unit: '$'
      //   },
      //   {
      //     label: 'File Storage',
      //     value: 946.3,
      //     max: 100000,
      //     color: 'purple',
      //     percentage: 0.9,
      //     unit: 'kB'
      //   },
      // ]);

      // setActivities([
      //   {
      //     id: '1',
      //     user: 'K',
      //     action: 'updated the bot information of',
      //     target: 'Titans Legacy - Brand AI Assistant',
      //     time: new Date(Date.now() - 34 * 60 * 1000),
      //     type: 'update'
      //   },
      //   {
      //     id: '2',
      //     user: 'K',
      //     action: 'updated a bot channel for',
      //     target: 'Titans Legacy - Brand AI Assistant',
      //     time: new Date(Date.now() - 34 * 60 * 1000),
      //     type: 'update'
      //   },
      //   {
      //     id: '3',
      //     user: 'K',
      //     action: 'updated the bot information of',
      //     target: 'Titans Legacy - Brand AI Assistant',
      //     time: new Date(Date.now() - 39 * 60 * 1000),
      //     type: 'update'
      //   },
      // ]);

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

      // setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateBot = () => {
    router.push('/createbot');
  };

  const handleDeleteBot = async (botId: string) => {
    const bot = bots.find(b => b.id === botId);
    if (!bot) return;

    // Call API to delete bot from backend
    try {
      const res = await fetch(`/api/bots/${botId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
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
        // setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
      } else {
        // Optionally handle error
        alert('Failed to delete bot.');
      }
    } catch (error) {
      alert('Error deleting bot.');
    }
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

      // setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
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
        {/* <RightSidebar
          usageStats={usageStats}
          activities={activities}
        /> */}
      </div>
    </Layout>
  );
}