import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Maclang from "../../images/Maclang.png";
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

const DefaultLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const Menus = [
    { title: "Dashboard", src: <HomeOutlined />, href: "/dashboard" },
    { title: "Department", src: <ShopOutlined />, href: "/department" },
    { title: "Inbox", src: <InboxOutlined />, href: "/inbox" },
    { title: "All", src: <TeamOutlined />, href: "/all" },
    { title: "Settings", src: <SettingOutlined />, href: "/settings" },
  ];

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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
       style={{ backgroundColor: "rgb(30, 60, 90)" }}
        className={`${
          isCollapsed ? "w-[80px]" : "w-[250px]"
        } bg-blue-900 h-full p-5 pt-7 duration-300 fixed flex flex-col justify-between border-r border-gray-500`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-10 h-10 rounded-md bg-green-600 text-white hover:bg-yellow-500 transition-all mb-6"
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
    <li key={index} className="relative group rounded-md hover:bg-yellow-500 transition-all">
      <NavLink
        to={menu.href}
        className={({ isActive }) =>
          `flex items-center gap-x-3 p-2 text-sm text-white rounded-md transition-all duration-300 ease-in-out
           transform hover:scale-[1.20]
          ${isActive ? "bg-yellow-500" : "hover:bg-yellow-500"}
          `
        }
      >
        <span className="text-xl">{menu.src}</span>
        <span
          className={`whitespace-nowrap transition-all duration-300 ${
            isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
          }`}
        >
          {menu.title}
        </span>
      </NavLink>

      {isCollapsed && (
        <span className="absolute left-full bottom-1 ml-3 px-3 py-1 bg-yellow-500 text-white text-lg rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {menu.title}
        </span>
      )}
    </li>
  ))}
</ul>

        {/* Profile */}
        <div className="mt-auto relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-x-3 p-2 rounded-md cursor-pointer hover:bg-yellow-500"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <UserOutlined className="text-white text-lg" />
            </div>
            <div
              className={`transition-all duration-300 ${
                isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto flex flex-col"
              }`}
            >
              <span className="text-white text-sm font-medium">John Doe</span>
              <span className="text-gray-300 text-xs">Admin</span>
            </div>
          </div>

          {/* Logout Button */}
          {profileOpen && (
            <div
              className={`absolute bottom-14 bg-red-600 rounded-lg shadow-md transition-all duration-300 ${
                isCollapsed ? "left-[85px] w-[200px]" : "left-0 w-full"
              }`}
            >
              <ul className="p-2">
                <li>
                  <button
                    onClick={() => (window.location.href = "/login")}
                    className="flex items-center gap-x-2 w-full text-left text-white text-sm bg-red-600 p-2 rounded-md hover:bg-white hover:text-red-600 transition-all"
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

      {/* Content Area */}
      <div
       style={{ backgroundColor: "rgb(30, 60, 90)" }}
        className={`flex-1 bg-blue-900 min-h-screen p-5 transition-all duration-300 ${
          isCollapsed ? "ml-[80px]" : "ml-[250px]"
        }`}
      >
        <div className="bg-white rounded-lg p-6 h-full shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
