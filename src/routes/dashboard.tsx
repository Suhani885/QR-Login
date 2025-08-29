import { createFileRoute } from '@tanstack/react-router'

import React, { useState } from 'react';
import {
  Settings,
  User,
  LogOut,
  QrCode,
  MessageCircle,
  Search,
  MoreVertical,
  Mail,
  Lock
} from 'lucide-react';
export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})





function Dashboard() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMenuClick = (action: string) => {
    console.log('Menu clicked:', action);
    setDropdownVisible(false);
  };

  const chats = [
    { id: 1, name: 'John Doe', message: 'Hey, how are you?', time: '10:30', unread: 2 },
    { id: 2, name: 'Sarah Wilson', message: 'Can we schedule a meeting?', time: '09:15', unread: 0 },
    { id: 3, name: 'Team Project', message: 'Updated the requirements', time: 'Yesterday', unread: 5 },
    { id: 4, name: 'Mike Johnson', message: 'Thanks for the help!', time: 'Yesterday', unread: 0 },
    { id: 5, name: 'Design Team', message: 'New mockups ready', time: 'Monday', unread: 1 },
  ];

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Same animated background from login */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-slate-700">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s ease-in-out infinite alternate'
          }}
        />

        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
            `,
            animation: 'gradientShift 15s ease-in-out infinite alternate'
          }}
        />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      <div className="relative z-10 h-screen flex">
        {/* Sidebar */}
        <div className="w-80 bg-white/95 backdrop-blur-lg border-r border-gray-300 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="bg-zinc-50/50 px-4 py-4 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-black via-gray-900 to-slate-700 rounded-full flex items-center justify-center">
                <User className="text-white" size={20} />
              </div>
              <span className="font-semibold text-gray-800">OurWebApp</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className="p-2 hover:bg-gray-200 rounded-full transition-all duration-200"
              >
                <Settings size={20} className="text-gray-600" />
              </button>

              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => handleMenuClick('profile')}
                    className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100/50 transition-all duration-200"
                  >
                    <User size={16} className="text-gray-600" />
                    <span className="text-gray-800 font-medium">Profile</span>
                  </button>
                  <button
                    onClick={() => handleMenuClick('link-device')}
                    className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100/50 transition-all duration-200"
                  >
                    <QrCode size={16} className="text-gray-600" />
                    <span className="text-gray-800 font-medium">Link Device</span>
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={() => handleMenuClick('logout')}
                    className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-all duration-200"
                  >
                    <LogOut size={16} className="text-red-600" />
                    <span className="text-red-600 font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="p-4 bg-zinc-50/30">
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-200 hover:border-blue-900 focus-within:border-zinc-700 transition-all duration-200">
              <Search size={16} className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search or start new chat"
                className="flex-1 outline-none text-sm bg-transparent"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div key={chat.id} className="flex items-center p-4 hover:bg-gray-100/50 cursor-pointer border-b border-gray-100/50 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center mr-3 shadow-sm">
                  <User size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-sm truncate text-gray-800">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 truncate">{chat.message}</p>
                    {chat.unread > 0 && (
                      <span className="bg-gradient-to-r from-black via-gray-900 to-slate-700 text-white text-xs rounded-full px-2 py-1 ml-2 shadow-sm">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white/95 backdrop-blur-lg px-6 py-4 border-b border-gray-200 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-black via-gray-900 to-slate-700 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Welcome to OurWebApp</h3>
                <p className="text-sm text-gray-600">Choose a conversation to start messaging</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200">
              <MoreVertical size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Welcome Message */}
          <div className="flex-1 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageCircle size={60} className="text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 drop-shadow-sm">Welcome to OurWebApp</h2>
              <p className="text-gray-600 text-lg">Select a chat to start messaging</p>

              <div className="mt-8 space-y-3">
                <button className="px-8 py-3 bg-gradient-to-r from-black via-gray-900 to-slate-700 hover:from-blue-700 hover:to-zinc-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
                  <Mail className="inline mr-2" size={16} />
                  Start New Chat
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Backdrop for dropdown */}
        {dropdownVisible && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdownVisible(false)}
          />
        )}
      </div>


    </div>
  );
}

export default Dashboard;