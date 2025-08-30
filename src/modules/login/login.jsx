import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const LoginForm = () => {
  const [now, setNow] = useState(new Date());
  const [form] = Form.useForm();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const onFinish = (values) => {
    console.log("Login attempt:", values);
  };

  return (
    <div className="min-h-screen flex">
      {/*Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <img
              src="/images/Maclang.png"
              alt="Maclang Logo"
              className="w-12 h-12 mr-3 object-contain"
            />
            <span className="text-2xl font-bold text-gray-800">
              Rosario Maclang Bautista General Hospital
            </span>
          </div>
        </div>

        {/* Main Form Content */}
        <div className="flex-1 flex items-center justify-center px-8 pb-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Title
                level={1}
                className="!text-4xl !font-bold !text-gray-800 !mb-4"
              >
                Welcome Back !
              </Title>
              <Text className="text-lg text-gray-600">
                Access your Account.
              </Text>
            </div>

            <div className="mb-6">
              <Text className="text-gray-700 font-medium text-lg">
                Secure Login
              </Text>
            </div>

            <Form
              form={form}
              name="login"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              className="space-y-4"
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please enter your username",
                  },
                ]}
                className="mb-4"
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Username"
                  className="!border-gray-200 !rounded-xl hover:!border-blue-400 focus:!border-blue-500 !py-4 !text-lg"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
                className="mb-6"
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? (
                      <EyeTwoTone twoToneColor="#6b7280" />
                    ) : (
                      <EyeInvisibleOutlined className="text-gray-400" />
                    )
                  }
                  className="!border-gray-200 !rounded-xl hover:!border-blue-400 focus:!border-blue-500 !py-4 !text-lg"
                  size="large"
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full !bg-gradient-to-r !from-blue-500 !to-blue-700 hover:!from-blue-600 hover:!to-blue-800 !border-none !rounded-xl !py-4 !h-auto !font-semibold !text-lg !shadow-lg hover:!shadow-xl transition-all duration-300"
                  size="large"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.6), rgba(37, 99, 235, 0.7)), 
                              url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-8 right-8 bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white text-right">
          <div className="text-sm font-medium">{formattedDate}</div>
          <div className="text-2xl font-bold font-mono">{formattedTime}</div>
        </div>

        <div className="flex flex-col justify-center items-center w-full px-12 text-center text-white relative z-10">
          {/* Footer */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <Text className="text-white/60 text-sm">
              © 2025 IT Department. All rights reserved.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
