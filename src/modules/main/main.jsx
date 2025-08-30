import React, { useState } from "react";
import { Avatar, Badge, Tooltip } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  MessageOutlined,
  BellOutlined,
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("home");

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined className="text-xl" />,
      label: "Home",
      badge: null,
    },
    {
      key: "groups",
      icon: <TeamOutlined className="text-xl" />,
      label: "Groups",
      badge: null,
    },
    {
      key: "messages",
      icon: <MessageOutlined className="text-xl" />,
      label: "Messages",
      badge: 3,
    },
    {
      key: "notifications",
      icon: <BellOutlined className="text-xl" />,
      label: "Notifications",
      badge: 5,
    },
  ];

  const handleMenuClick = (key) => {
    setActiveItem(key);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-20 bg-indigo-600 flex flex-col items-center py-4 shadow-lg">
        <div className="mb-8">
          <Avatar
            size={48}
            src="https://via.placeholder.com/48/4F46E5/FFFFFF?text=RM"
            className="border-2 border-white"
          />
        </div>

        <nav className="flex flex-col space-y-4 flex-1">
          {menuItems.map((item) => (
            <Tooltip key={item.key} title={item.label} placement="right">
              <div
                className={`relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeItem === item.key
                    ? "bg-white bg-opacity-20 text-white"
                    : "text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white"
                }`}
                onClick={() => handleMenuClick(item.key)}
              >
                {item.badge ? (
                  <Badge count={item.badge} size="small" offset={[8, -8]}>
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </div>
            </Tooltip>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <Tooltip title="Search" placement="right">
            <div className="p-3 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white rounded-lg cursor-pointer transition-all duration-200">
              <SearchOutlined className="text-xl" />
            </div>
          </Tooltip>

          <Tooltip title="Add" placement="right">
            <div className="p-3 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white rounded-lg cursor-pointer transition-all duration-200">
              <PlusOutlined className="text-xl" />
            </div>
          </Tooltip>

          <div className="pt-4 border-t border-indigo-500">
            <Avatar
              size={40}
              icon={<UserOutlined />}
              className="bg-indigo-400 hover:bg-indigo-300 cursor-pointer transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome to RMBGH Intranet Portal
          </h1>

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🏥</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Select a menu item from the sidebar
            </h2>
            <p className="text-gray-500">
              Currently viewing:{" "}
              <span className="font-medium capitalize">{activeItem}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
