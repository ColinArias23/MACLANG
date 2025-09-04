import React from "react";
import { Button, Popconfirm, Typography } from "antd";
import { PushpinOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

const MessageItem = ({ message, onSelect, onDelete, onTogglePin }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <div onClick={onSelect} className="flex items-center gap-4 flex-1 cursor-pointer">
        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Text className="font-medium text-gray-900 text-sm">{message.sender}</Text>
            {message.isPinned && (
              <PushpinOutlined className="text-orange-500 text-xs" />
            )}
          </div>
          <Text className="text-gray-700 text-sm block truncate">
            {message.subject}
            {message.department && (
              <span className="ml-2 text-xs text-blue-500">[{message.department}]</span>
            )}
          </Text>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-500 text-sm">{message.date || "No Date"}</span>
        <Button
          type="text"
          icon={<PushpinOutlined />}
          onClick={onTogglePin}
          className={`${message.isPinned ? "text-orange-500" : "text-gray-400"}`}
        />
        <Popconfirm title="Delete this message?" onConfirm={onDelete} okText="Yes" cancelText="No">
          <Button type="text" icon={<DeleteOutlined />} className="text-red-400" />
        </Popconfirm>
      </div>
    </div>
  );
};

export default MessageItem;
