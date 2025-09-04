import React, { useState, useEffect, useRef } from "react";
import Maclang from "../../../../images/Maclang.png";
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

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const Menus = [
    { title: "Dashboard", src: <HomeOutlined /> },
    { title: "Department", src: <ShopOutlined /> },
    { title: "Inbox", src: <InboxOutlined /> },
    { title: "All", src: <TeamOutlined /> },
    { title: "Settings", src: <SettingOutlined /> },
  ];

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`${
        isCollapsed ? "w-[80px]" : "w-[250px]"
      } bg-blue-900 h-screen p-5 pt-7 duration-300 fixed flex flex-col justify-between border-r border-gray-500`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-center w-10 h-10 rounded-md bg-blue-800 text-white hover:bg-[#1f236d] transition-all mb-6"
      >
        {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </button>

      {/* Logo */}
      <div className="flex gap-x-3 items-center mb-10">
        <img
          src={Maclang}
          alt="Logo"
          className="w-[130px] h-[130px] object-contain"
        />
        <h1
          className={`text-white text-lg font-semibold whitespace-nowrap transition-all duration-300 ${
            isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
          }`}
        >
          RMBGH
        </h1>
      </div>

      {/* Menu Items */}
      <ul className="flex flex-col gap-y-2">
        {Menus.map((menu, index) => (
          <li
            key={index}
            className="relative group flex items-center gap-x-3 text-white text-sm cursor-pointer p-2 rounded-md hover:bg-[#1f236d] transition-all"
          >
            {/* Icon */}
            <span className="text-xl">{menu.src}</span>

            {/* Normal Text (visible only if expanded) */}
            <span
              className={`whitespace-nowrap transition-all duration-300 ${
                isCollapsed
                  ? "opacity-0 w-0 overflow-hidden"
                  : "opacity-100 w-auto"
              }`}
            >
              {menu.title}
            </span>

            {/* Floating Tooltip (visible only when collapsed + hover) */}
            {isCollapsed && (
              <span className="absolute left-full ml-3 px-3 py-1 bg-blue-800 text-white text-lg rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {menu.title}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Profile */}
      <div className="mt-auto relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-x-3 p-2 rounded-md cursor-pointer hover:bg-[#1f236d]"
          onClick={() => setProfileOpen(!profileOpen)}
        >
         <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1f236d] hover:shadow-md cursor-pointer transition duration-200">
  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
    <UserOutlined className="text-gray-800 text-lg" />
  </div>

  <div
    className={`transition-all duration-300 ${
      isCollapsed
        ? "opacity-0 w-0 overflow-hidden"
        : "opacity-100 w-auto flex flex-col"
    }`}
  >
    <span className="text-white text-sm font-medium">John Doe</span>
    <span className="text-gray-300 text-xs">Admin</span>
  </div>
</div>

        </div>

        {/* Logout Button */}
        {profileOpen && (
          <div
            className={`absolute bottom-20 bg-blue-800 rounded-lg shadow-md transition-all duration-300 ${
              isCollapsed ? "left-[85px] w-[200px]" : "left-0 w-full"
            }`}
          >
            <ul className="p-2">
              <li>
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="flex items-center gap-x-2 w-full text-left text-white text-sm p-2 rounded-md hover:bg-[#1f236d] shadow-m"
                >
                  <LogoutOutlined />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;