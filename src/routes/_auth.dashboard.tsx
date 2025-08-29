import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import {
  Settings,
  User,
  LogOut,
  QrCode,
  MessageCircle,
  Search,
  MoreVertical,
  Menu,
  X,
} from 'lucide-react';
import { Layout, Input, Avatar, Badge, Typography, Dropdown, Drawer } from 'antd';
import type { MenuProps } from 'antd';

const { Sider, Content, Header } = Layout;
const { Title, Text } = Typography;
import { useIsMobile } from '@/hooks/useIsMobile';
export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const isMobile = useIsMobile();

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

  const menuItems: MenuProps['items'] = isMobile ? [
    {
      key: 'profile',
      label: (
        <button
          onClick={() => handleMenuClick('profile')}
          className="w-full flex items-center space-x-3 py-1"
        >
          <User size={16} className="text-gray-600" />
          <span className="text-gray-800 font-medium">Profile</span>
        </button>
      ),
    },
    {
      key: 'link-device',
      label: (
        <button
          onClick={() => handleMenuClick('link-device')}
          className="w-full flex items-center space-x-3 py-1"
        >
          <QrCode size={16} className="text-gray-600" />
          <span className="text-gray-800 font-medium">Link Device</span>
        </button>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <button
          onClick={() => handleMenuClick('logout')}
          className="w-full flex items-center space-x-3 py-1"
        >
          <LogOut size={16} className="text-red-600" />
          <span className="text-red-600 font-medium">Logout</span>
        </button>
      ),
    },
  ]
    :
    [
      {
        key: 'profile',
        label: (
          <button
            onClick={() => handleMenuClick('profile')}
            className="w-full flex items-center space-x-3 py-1"
          >
            <User size={16} className="text-gray-600" />
            <span className="text-gray-800 font-medium">Profile</span>
          </button>
        ),
      },

      {
        type: 'divider',
      },
      {
        key: 'logout',
        label: (
          <button
            onClick={() => handleMenuClick('logout')}
            className="w-full flex items-center space-x-3 py-1"
          >
            <LogOut size={16} className="text-red-600" />
            <span className="text-red-600 font-medium">Logout</span>
          </button>
        ),
      },
    ];

  const handleChatClick = (chatId: number) => {
    setSelectedChat(chatId);
    setMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white">
      <div className="bg-zinc-50/50 px-4 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-black via-gray-900 to-slate-700 rounded-full flex items-center justify-center">
            <MessageCircle className="text-white" size={20} />
          </div>
          <Title level={4} className="!mb-0 !text-gray-800">NexTalk</Title>
        </div>

        <div className="flex items-center space-x-2">
          <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
            open={dropdownVisible}
            onOpenChange={setDropdownVisible}
            placement="bottomRight"
          >
            <button
              className="p-2 hover:bg-gray-200 rounded-full transition-all duration-200"
            >
              <Settings size={20} className="text-gray-600" />
            </button>
          </Dropdown>

          <button
            className="p-2 hover:bg-gray-200 rounded-full transition-all duration-200 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4 bg-zinc-50/30">
        <Input
          placeholder="Search or start new chat"
          prefix={<Search size={16} className="text-gray-400" />}
          className="rounded-xl border-gray-200 hover:border-blue-900 focus:border-zinc-700"
          style={{ height: '40px' }}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center p-4 hover:bg-gray-100/50 cursor-pointer border-b border-gray-100/50 transition-all duration-200 ${selectedChat === chat.id ? 'bg-slate-100 border-l-4 border-l-blue-900' : ''
              }`}
            onClick={() => handleChatClick(chat.id)}
          >
            <Avatar
              size={48}
              icon={<User size={20} />}
              className="mr-3 bg-gradient-to-br from-gray-300 to-gray-400"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <Text strong className="text-sm truncate text-gray-800">{chat.name}</Text>
                <Text className="text-xs text-gray-500">{chat.time}</Text>
              </div>
              <div className="flex justify-between items-center">
                <Text className="text-sm text-gray-600 truncate">{chat.message}</Text>
                {chat.unread > 0 && (
                  <Badge
                    count={chat.unread}
                    style={{
                      backgroundColor: '#1f2937',
                      marginLeft: '8px'
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Layout className="h-screen">
      {isMobile ?
        <Drawer
          title={null}
          placement="left"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          width="100%"
          className="md:hidden"
          closable={false}
          styles={{
            body: { padding: 0 },
            header: { display: 'none' }
          }}
        >
          <SidebarContent />
        </Drawer>
        :
        <Sider
          width={320}
          className="!bg-white shadow-2xl hidden md:block"
          style={{
            borderRight: '1px solid #e5e7eb',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)'
          }}
        >
          <SidebarContent />
        </Sider>
      }



      <Layout>
        <Header className="bg-white border-b border-gray-200 px-4 flex items-center justify-between md:hidden shadow-sm">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
          <Title level={4} className="!mb-0 !text-gray-800">NexTalk</Title>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </Header>

        <Content>
          <div className="bg-white px-6 py-4 border-b border-gray-200 items-center justify-between shadow-sm hidden md:flex"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)'
            }}>
            <div className="flex items-center space-x-4">
              <Text className="text-gray-600 text-xl font-bold">
                {selectedChat ? `Chat with ${chats.find(c => c.id === selectedChat)?.name}` : 'Choose a conversation to start messaging'}
              </Text>
            </div>
          </div>

          <div className="h-full flex items-center justify-center bg-white"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(4px)',
              height: 'calc(100vh - 64px)'
            }}>
            <div className="text-center px-4">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageCircle size={48} className="text-gray-400 md:w-15 md:h-15" />
              </div>
              <Title level={2} className="!text-gray-800 !mb-4 drop-shadow-sm text-xl md:text-3xl">
                Welcome to NexTalk
              </Title>
              <Text className="text-gray-600 text-base md:text-lg">
                {selectedChat ? 'Start typing to send a message' : 'Select a chat to start messaging'}
              </Text>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;