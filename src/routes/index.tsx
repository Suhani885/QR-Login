import { createFileRoute } from '@tanstack/react-router'
import type { FormProps } from 'antd';
import { Button, Form, Input, Typography } from 'antd';
import { MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, QrcodeOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;

type FieldType = {
  email?: string;
  password?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Login attempt:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Login failed:', errorInfo);
};

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-gray-200 to-zinc-400 flex items-center justify-center">
      
      <div className="relative w-full max-w-2xl mx-5">
        <div className="text-center mb-10 mt-2">
          <Title>
            Welcome to OurWebApp
          </Title>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex bg-gray-50/50 border-b border-gray-200/50">
            <button
              onClick={() => setShowQR(false)}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                !showQR 
                  ? 'bg-gradient-to-r from-slate-500 to-slate-950 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100/50'
              }`}
            >
              <MailOutlined className="mr-2" />
              Email Login
            </button>
            <button
              onClick={() => setShowQR(true)}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                showQR 
                  ? 'bg-gradient-to-r from-slate-500 to-slate-950 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100/50'
              }`}
            >
              <QrcodeOutlined className="mr-2" />
              QR Code
            </button>
          </div>

          <div className="p-20">
            {!showQR ? (
              <div className="space-y-6">
                <div className="text-center mb-10">
                  <Title level={3} className="text-black mb-2">
                    Sign in to your account
                  </Title>
                  <Text className="text-gray-600">
                    Enter your email and password to continue
                  </Text>
                </div>

                <Form
                  name="login"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  size="large"
                  layout="vertical"
                  className="space-y-4"
                >
                  <Form.Item<FieldType>
                    label="Email Address"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined className="text-gray-400" />}
                      placeholder="Enter your email address"
                      className="rounded-xl border-gray-200 hover:border-slate-600 focus:border-black"
                      style={{ 
                        height: '48px',
                        fontSize: '16px'
                      }}
                    />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: 'Please enter your password' },
                      { min: 6, message: 'Password must be at least 6 characters' }
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder="Enter your password"
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      className="rounded-xl border-gray-200 hover:border-slate-600 focus:border-black"
                      style={{ 
                        height: '48px',
                        fontSize: '16px'
                      }}
                    />
                  </Form.Item>
                  <br />
                  <Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="h-12 w-full rounded-xl bg-gradient-to-r from-slate-500 to-slate-950 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 border-none">
                        Sign In
                      </Button>
                    </Form.Item>
                  </Form.Item>
                </Form>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="mb-10">
                  <Title level={3} className="text-gray-800 mb-2">
                    Sign in with QR code
                  </Title>
                  <Text className="text-gray-600 block mb-4">
                    Scan this with your phone's OurWebApp scanner to login
                  </Text>
                </div>

                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-60 h-56 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                      <div className="w-52 h-52 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                        <QrcodeOutlined className="text-6xl text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-slate-500 rounded-full mt-2"></div>
                    <div className="text-left">
                      <Text className="text-slate-700 font-medium block">
                        Open OurWebApp on your phone
                      </Text>
                      <Text className="text-slate-600 text-sm">
                        Tap Link a Device
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}