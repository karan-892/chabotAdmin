"use client";

import { Settings, User, Bell, Shield, Key, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/common/components/Button';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/components/Avatar';
import { useState } from 'react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'api', name: 'API Keys', icon: Key },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || 'User'} />
                    <AvatarFallback className="bg-blue-600 text-white text-lg">
                      {session?.user?.name?.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={session?.user?.name || ''}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={session?.user?.email || ''}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Workspace Name</label>
                  <input
                    type="text"
                    defaultValue={`${session?.user?.name}'s Workspace`}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about yourself..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Bot deployment notifications', description: 'Get notified when your bots are deployed' },
                  { label: 'Usage alerts', description: 'Receive alerts when approaching usage limits' },
                  { label: 'Security notifications', description: 'Important security updates and alerts' },
                  { label: 'Marketing emails', description: 'Product updates and promotional content' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                    <div>
                      <div className="text-white font-medium">{item.label}</div>
                      <div className="text-sm text-gray-400">{item.description}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-400">Add an extra layer of security to your account</div>
                    </div>
                    <Button variant="outline" size="sm">Enable 2FA</Button>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Active Sessions</div>
                      <div className="text-sm text-gray-400">Manage your active login sessions</div>
                    </div>
                    <Button variant="outline" size="sm">View Sessions</Button>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Login History</div>
                      <div className="text-sm text-gray-400">Review recent login activity</div>
                    </div>
                    <Button variant="outline" size="sm">View History</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">API Keys</h3>
              <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-yellow-300 text-sm">Keep your API keys secure and never share them publicly</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-medium">Production API Key</div>
                    <Button variant="outline" size="sm">Regenerate</Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="bg-gray-800 px-3 py-1 rounded text-sm text-gray-300 flex-1">
                      bp_prod_••••••••••••••••••••••••••••••••
                    </code>
                    <Button variant="ghost" size="sm">Copy</Button>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">Created on Jan 15, 2024</div>
                </div>
                
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Key className="w-4 h-4 mr-2" />
                  Generate New API Key
                </Button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <tab.icon className="mr-3 h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-700">
              <div className="flex items-center space-x-4">
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}