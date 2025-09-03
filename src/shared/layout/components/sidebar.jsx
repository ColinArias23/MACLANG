import React, { useState, useEffect, useRef } from "react";
import { Layout, Menu, Avatar, Dropdown, Button, Tooltip } from "antd";
import {
  HomeOutlined,
  ShopOutlined,
  InboxOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import Maclang from "../../../../images/Maclang.png";

const { Sider } = Layout;

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const [selectedKey, setSelectedKey] = useState("1");

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined className="text-lg" />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <ShopOutlined className="text-lg" />,
      label: "Department",
    },
    {
      key: "3",
      icon: <InboxOutlined className="text-lg" />,
      label: "Inbox",
    },
    {
      key: "4",
      icon: <TeamOutlined className="text-lg" />,
      label: "All",
    },
    {
      key: "5",
      icon: <SettingOutlined className="text-lg" />,
      label: "Settings",
    },
  ];

  const profileMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Account Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => (window.location.href = "/login"),
      className: "text-red-400 hover:text-red-300",
    },
  ];

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    // Add your navigation logic here
    console.log("Menu clicked:", e.key);
  };

  return (
    <Sider
      collapsed={isCollapsed}
      onCollapse={setIsCollapsed}
      width={280}
      collapsedWidth={80}
      className="shadow-xl border-r border-blue-200"
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        background:
          "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)",
      }}
    >
      <div className="flex flex-col h-full">
        {/* Header with Toggle and Logo */}
        <div className="p-5 pt-7 border-b border-blue-200">
          {/* Toggle Button */}
          <div className="flex justify-center mb-6">
            <Button
              type="text"
              icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="!text-blue-600 hover:!text-blue-800 hover:!bg-blue-50 !border-none !w-10 !h-10 !rounded-md transition-all duration-300"
              size="large"
            />
          </div>

          {/* Logo Section - Centered */}
          <div className="flex justify-center items-center mb-10 transition-all duration-300">
            <div className="flex-shrink-0">
              <img
                src={Maclang}
                alt="RMBGH Logo"
                className={`object-contain transition-all duration-300 ${
                  isCollapsed ? "w-10 h-10" : "w-30 h-30"
                }`}
              />
            </div>
            {/* Conditional rendering for the text */}
            {!isCollapsed && (
              <div className="ml-4 text-lg font-semibold">RMBGH</div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 py-4 px-1">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Tooltip
                key={item.key}
                title={isCollapsed ? item.label : ""}
                placement="right"
                classNames={{ popper: "sidebar-tooltip" }}
              >
                <div
                  onClick={() => handleMenuClick({ key: item.key })}
                  className={`group relative flex items-center cursor-pointer transition-all duration-200 ${
                    isCollapsed
                      ? "justify-center p-3 mx-2 rounded-lg"
                      : "gap-3 px-3 py-3 mx-1 rounded-lg"
                  } ${
                    selectedKey === item.key
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                  }`}
                >
                  <span
                    className={`text-lg flex-shrink-0 ${
                      selectedKey === item.key ? "text-white" : ""
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span
                      className={`whitespace-nowrap font-medium ${
                        selectedKey === item.key ? "text-white" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-t border-blue-200">
          <Dropdown
            menu={{
              items: profileMenuItems,
              onClick: ({ key }) => {
                if (key === "logout") {
                  window.location.href = "/login";
                }
              },
            }}
            trigger={["click"]}
            placement={isCollapsed ? "topRight" : "top"}
            classNames={{ popper: "profile-dropdown" }}
          >
            <div
              className={`flex items-center cursor-pointer hover:bg-blue-100 transition-all duration-200 rounded-lg ${
                isCollapsed ? "justify-center p-3" : "gap-3 p-3"
              }`}
            >
              <Avatar
                size={isCollapsed ? 32 : 40}
                icon={<UserOutlined />}
                className="bg-blue-600 text-white flex-shrink-0 shadow-md"
              />
              {!isCollapsed && (
                <div className="flex flex-col text-blue-700 overflow-hidden">
                  <span className="text-sm font-semibold truncate">
                    John Doe
                  </span>
                  <span className="text-xs text-blue-500 truncate opacity-80">
                    Administrator
                  </span>
                </div>
              )}
            </div>
          </Dropdown>
        </div>
      </div>

      <style>{`
        .sidebar-tooltip .ant-tooltip-inner {
          background: #1e40af;
          color: white;
          font-weight: 500;
          border-radius: 6px;
        }

        .sidebar-tooltip .ant-tooltip-arrow::before {
          background: #1e40af;
        }

        .profile-dropdown .ant-dropdown-menu {
          background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        .profile-dropdown .ant-dropdown-menu-item {
          color: #334155;
          padding: 10px 16px;
          border-radius: 8px;
          margin: 4px;
          transition: all 0.2s ease;
        }

        .profile-dropdown .ant-dropdown-menu-item:hover {
          background-color: #e2e8f0;
          color: #1e40af;
        }

        .profile-dropdown .ant-dropdown-menu-divider {
          border-color: #cbd5e1;
          margin: 8px 4px;
        }

        /* Scrollbar styling for the sidebar */
        .ant-layout-sider::-webkit-scrollbar {
          width: 4px;
        }

        .ant-layout-sider::-webkit-scrollbar-track {
          background: rgba(59, 130, 246, 0.1);
          border-radius: 2px;
        }

        .ant-layout-sider::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 2px;
        }

        .ant-layout-sider::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </Sider>
  );
}

export default Sidebar;
