"use client";

import { Menu, Bell, Search, User, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession,signOut } from 'next-auth/react';
import { Button } from '../common/components/Button';
import AuthModal from '../common/modals/AuthModal';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from '../common/components/Avatar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FiSidebar } from "react-icons/fi";



interface HeaderProps {
  onMobileMenuToggle: () => void;
  sidebarCollapsed: boolean;
}

export default function Header({ onMobileMenuToggle, sidebarCollapsed }: HeaderProps) {
  const [notifications, setNotifications] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const {data:session}=useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);

    const router = useRouter();

  // Simulate notification updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 30000);

    return () => clearInterval(interval);
  }, []);
  const handleLogout = async () => {
    // Clear the authToken cookie
    Cookies.remove('authToken', {
      path: '/',
      secure: true,
      sameSite: 'Strict',
    });

    // Sign out from NextAuth
    await signOut({ redirect: false });

    // Refresh the page to clear any client-side state
    router.push('/');
    router.refresh();
  };

  return (
    <>

      {/* Main header */}
      <header className="bg-black border-b border-gray-700">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
       {/* <button className='hidden lg:block'>
         <FiSidebar className='text-gray300 cursor-pointer '/>
       </button> */}
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden -ml-2 mr-2 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
                onClick={onMobileMenuToggle}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <button 
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-black transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
                
                {searchOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-black border border-gray-800 rounded-lg shadow-lg z-50">
                    <div className="p-4">
                      <input
                        type="text"
                        placeholder="Search bots, settings, or help..."
                        className="w-full px-3 py-2 bg-black border border-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        autoFocus
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-black transition-colors">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>

              {/* User Profile */}
             {session?( <div className="flex items-center space-x-4">
                  <div
                    className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={session?.user?.image || ''}
                        alt={session?.user?.name || 'User'}
                        className='rounded-full'
                      />
                      <AvatarFallback className="bg-purple-600 text-white">
                        {session?.user?.name
                          ?.split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-white font-medium">{session?.user?.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    className="bg-purple-600 hover:bg-purple-700 hover:text-white text-white font-medium flex items-center space-x-2"
                    onClick={handleLogout}
                  >
                    <span>Logout</span>
                  </Button>
                </div>): (
                <Button
                  variant="default"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium"
                  onClick={() => setShowAuthModal(true)}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

