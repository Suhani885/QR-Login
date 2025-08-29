import { createFileRoute } from '@tanstack/react-router'
import type { FormProps } from 'antd';
import { Form, Input, Typography } from 'antd';
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
    <div className="min-h-screen relative overflow-hidden">
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

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="relative w-full max-w-2xl mx-5">
          <div className="text-center mb-10">
            <Title className="!text-white !mb-2 drop-shadow-lg" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
              Welcome to NexTalk
            </Title>
            <Text className="text-gray-300 text-lg">
              Connect, communicate, and collaborate seamlessly
            </Text>
          </div>

          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-900 overflow-hidden">
            <div className="flex bg-zinc-50/50">
              <button
                onClick={() => setShowQR(false)}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${!showQR
                  ? 'bg-gradient-to-r from-black via-gray-900 to-slate-700 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100/50'
                  }`}
              >
                <MailOutlined className="mr-2" />
                Email Login
              </button>
              <button
                onClick={() => setShowQR(true)}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${showQR
                  ? 'bg-gradient-to-r from-black via-gray-900 to-slate-700 text-white shadow-lg'
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
                    <Title level={1} className="text-black mb-2">
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
                        className="rounded-xl border-gray-200 hover:border-blue-900 focus:border-zinc-700"
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
                        className="rounded-xl border-gray-200 hover:border-blue-900 focus:border-zinc-700"
                        style={{
                          height: '48px',
                          fontSize: '16px'
                        }}
                      />
                    </Form.Item>

                    <br />

                    <Form.Item>
                      <button 
                        type="submit" 
                        className="h-12 w-full rounded-xl bg-gradient-to-r from-black via-gray-900 to-slate-700 font-semibold text-lg text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 border-none cursor-pointer"
                      >
                        Sign In
                      </button>
                    </Form.Item>
                  </Form>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="mb-8">
                    <Title level={1} className="text-gray-800">
                      Sign in with QR code
                    </Title>
                    <Text className="text-gray-600 block">
                      Scan this with your phone's NexTalk scanner to login
                    </Text>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-60 h-52 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                        <div className="w-52 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                          <QrcodeOutlined className="text-6xl text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-950 rounded-full mt-2"></div>
                      <div className="text-left">
                        <Text className="text-blue-950 font-medium block">
                          Open NexTalk on your phone
                        </Text>
                        <Text className="text-blue-950 text-sm">
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
    </div>
  );
}