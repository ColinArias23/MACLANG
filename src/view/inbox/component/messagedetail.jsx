import React from "react";
import { Avatar, Typography, Button, Popconfirm } from "antd";
import {
  ArrowLeftOutlined,
  PushpinOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  LeftOutlined,
  RightOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const MessageDetail = ({
  message,
  onBack,
  onDelete,
  onTogglePin,
  totalMessages,
  currentIndex,
}) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={onBack} className="text-gray-500 hover:text-gray-700" />
          <Button type="text" icon={<PushpinOutlined />} onClick={() => onTogglePin(message.id)}
                  className={`${message.isPinned ? "text-orange-500" : "text-gray-400 hover:text-orange-500"}`} />
          <Popconfirm title="Delete this message?" onConfirm={() => onDelete(message.id)} okText="Yes" cancelText="No">
            <Button type="text" icon={<DeleteOutlined />} className="text-gray-500 hover:text-red-500" />
          </Popconfirm>
          <Button type="text" icon={<ClockCircleOutlined />} className="text-gray-500 hover:text-gray-700" />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{currentIndex + 1} of {totalMessages}</span>
          <Button type="text" icon={<LeftOutlined />} size="small" />
          <Button type="text" icon={<RightOutlined />} size="small" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex items-start gap-4">
          <Avatar size={48} className="bg-gray-400 text-white font-medium">{message.sender.charAt(0)}</Avatar>
          <div className="flex-1">
            <Title level={4} className="!mb-0 !text-lg font-semibold">{message.sender}</Title>
            <Text className="text-sm text-gray-500 block mb-1">{message.email}</Text>
          </div>
        </div>

        <div className="mb-6">
          <Text className="text-sm text-gray-500 block mb-1">Subject:</Text>
          <Title level={4} className="!mb-0 !text-base font-semibold">{message.subject}</Title>
          <Text className="text-sm text-blue-600 font-medium">
            {message.department === "All" ? "For All Departments" : `For ${message.department}`}
          </Text>
        </div>

        <div className="mb-6 text-gray-700 leading-relaxed whitespace-pre-line">
          {message.content}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <Button icon={<ShareAltOutlined />} className="text-gray-600 hover:text-blue-600">
            Forward
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
