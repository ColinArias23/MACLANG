import React from "react";
import { Form, Input, Button, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const LoginForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Login attempt:", values);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-8 pb-8">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Title level={1} className="!text-4xl !font-bold !text-gray-800">
            Welcome Back!
          </Title>
          <Text className="text-lg text-gray-600">Access your Account.</Text>
        </div>

        <Text className="text-gray-700 font-medium text-lg mb-6 block">
          Secure Login
        </Text>

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
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
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
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
