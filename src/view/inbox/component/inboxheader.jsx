import React, { useState } from "react";
import { Button, Input } from "antd";
import { EditOutlined, SyncOutlined } from "@ant-design/icons";

const InboxHeader = ({
  tabs,
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  setIsComposeOpen,
}) => {
  const [isReloading, setIsReloading] = useState(false);

  const handleReloadClick = () => {
    if (isReloading) return;
    setIsReloading(true);
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0 gap-4">
      <div className="flex border-b-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200 cursor-pointer ${
              activeTab === tab.key
                ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button
          icon={<SyncOutlined spin={isReloading} />}
          onClick={handleReloadClick}
          title="Reload messages"
          className="border border-gray-300 hover:border-gray-400"
        />
        <Input.Search
          placeholder="Search messages"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          className="w-64"
          enterButton={false}
        />
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => setIsComposeOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 border-0"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default InboxHeader;
