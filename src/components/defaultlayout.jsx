// src/components/defaultlayout.jsx
import React, { useState, useEffect } from "react";
import { Layout, Avatar, Dropdown, Button, Tooltip } from "antd";
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
  SoundOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Maclang from "../../images/maclang.png";

const { Sider, Content } = Layout;

const DefaultLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "1", icon: <HomeOutlined />, label: "Dashboard", path: "/dashboard" },
    { key: "2", icon: <ShopOutlined />, label: "Department", path: "/department" },
    { key: "3", icon: <SoundOutlined />, label: "Announcement", path: "/inbox" },
    { key: "4", icon: <MessageOutlined />, label: "Group Chat", path: "/all" },
    // { key: "5", icon: <SettingOutlined />, label: "Settings", path: "/settings" },
  ];

  // Map current path to selectedKey
  const currentKey =
    menuItems.find((item) => location.pathname.startsWith(item.path))?.key || "1";
  const [selectedKey, setSelectedKey] = useState(currentKey);

  useEffect(() => {
    setSelectedKey(currentKey);
  }, [location.pathname]);

  const handleMenuClick = (item) => {
    navigate(item.path);
  };

  const profileMenuItems = [
    {
      key: "logout",
      label: (
        <div className="flex items-center gap-2 px-4 py-2 hover:bg-red-500 hover:text-white rounded-md transition-colors cursor-pointer">
          <LogoutOutlined />
          <span>Logout</span>
        </div>
      ),
      onClick: () => (window.location.href = "/login"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sider
        collapsed={isCollapsed}
        width={280}
        collapsedWidth={80}
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)",
          transition: "width 0.3s ease, padding 0.3s ease",
          overflow: "hidden",
        }}
        className="shadow-xl border-r border-blue-200"
      >
        <div className="flex flex-col h-full">
          {/* Toggle + Logo */}
          <div className="p-5 pt-7 border-b border-blue-200">
            <div className="flex justify-center mb-6">
              <Button
                type="text"
                icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="!text-blue-600 hover:!text-blue-800 hover:!bg-blue-50 !border-none !w-10 !h-10 !rounded-md transition-all duration-300"
              />
            </div>

            <div className="flex justify-center items-center mb-10 transition-all duration-300">
              <img
                src={Maclang}
                alt="RMBGH Logo"
                className={`object-contain transition-all duration-300 ${
                  isCollapsed ? "w-10 h-10" : "w-30 h-30"
                }`}
              />
              {!isCollapsed && (
                <div className="ml-4 text-lg font-semibold transition-all duration-300">
                  RMBGH
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 py-4 px-1 overflow-auto">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Tooltip
                  key={item.key}
                  title={isCollapsed ? item.label : ""}
                  placement="right"
                >
                  <div
                    onClick={() => handleMenuClick(item)}
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
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <div
                      className={`transition-all duration-200 ${
                        isCollapsed ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                      }`}
                    >
                      {!isCollapsed && (
                        <span className="whitespace-nowrap font-medium">{item.label}</span>
                      )}
                    </div>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div className="p-4 border-t border-blue-200">
            <Dropdown
              menu={{ items: profileMenuItems }}
              trigger={["click"]}
              placement={isCollapsed ? "topRight" : "top"}
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
                    <span className="text-sm font-semibold truncate">John Doe</span>
                    <span className="text-xs text-blue-500 truncate opacity-80">
                      Administrator
                    </span>
                  </div>
                )}
              </div>
            </Dropdown>
          </div>
        </div>
      </Sider>

      {/* Main Content Area */}
      <Content className="flex-1 w-full h-[100vh] bg-gray-50 p-6 overflow-auto">
        <div
          className="bg-white shadow-lg rounded-xl p-6
        max-w-[100%] max-h-[100%]
        w-full h-full overflow-auto mx-auto"
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
