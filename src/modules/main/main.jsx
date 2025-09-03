// import React, { useState } from "react";
// import { Avatar, Badge, Tooltip } from "antd";
// import {
//   HomeFilled,
//   TeamOutlined,
//   MessageFilled,
//   BellFilled,
//   UserOutlined,
//   SearchOutlined,
//   PlusOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
// } from "@ant-design/icons";

// const Sidebar = () => {
//   const [activeItem, setActiveItem] = useState("home");
//   const [collapsed, setCollapsed] = useState(true);

//   const menuItems = [
//     {
//       key: "home",
//       icon: <HomeFilled className="text-xl text-inherit" />,
//       label: "Home",
//       badge: null,
//     },
//     {
//       key: "groups",
//       icon: <TeamOutlined className="text-xl text-inherit" />,
//       label: "Groups",
//       badge: null,
//     },
//     {
//       key: "messages",
//       icon: <MessageFilled className="text-xl text-inherit" />,
//       label: "Messages",
//       badge: 3,
//     },
//     {
//       key: "notifications",
//       icon: <BellFilled className="text-xl text-inherit" />,
//       label: "Notifications",
//       badge: 5,
//     },
//   ];

//   const handleMenuClick = (key) => {
//     setActiveItem(key);
//   };

//   const toggleCollapsed = () => {
//     setCollapsed((c) => !c);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div
//         className={`flex flex-col items-center py-4 shadow-lg bg-blue-900 transition-all duration-200 ${
//           collapsed ? "w-20" : "w-64"
//         }`}
//       >
//         {/* Toggle button */}
//         <div className="w-full mb-4 mt-2">
//           <Tooltip title={collapsed ? "Expand" : "Minimize"} placement="right">
//             <div
//               onClick={toggleCollapsed}
//               className="p-2 bg-gray-200 hover:bg-gray-300 cursor-pointer text-black transition-colors flex justify-center items-center"
//             >
//               {collapsed ? (
//                 <MenuUnfoldOutlined className="text-lg" />
//               ) : (
//                 <MenuFoldOutlined className="text-lg" />
//               )}
//             </div>
//           </Tooltip>
//         </div>

//         {/* Logo / Avatar */}
//         <div className="mb-6">
//           <div
//             className={`${
//               collapsed ? "w-12 h-12" : "w-24 h-24"
//             } rounded-full overflow-hidden border-2 border-gray-300 transition-all duration-300`}
//           >
//             <img
//               src="./images/Maclang.png"
//               alt="Maclang Logo"
//               className="w-full h-full object-contain"
//             />
//           </div>
//         </div>

//         {/* Navigation Items */}
//         <nav className="flex flex-col space-y-4 flex-1 w-full px-2">
//           {menuItems.map((item) => {
//             const content = (
//               <div
//                 className={`flex items-center w-full rounded-lg cursor-pointer transition-all duration-200 p-2 ${
//                   activeItem === item.key
//                     ? "bg-gray-200 text-black"
//                     : "text-white hover:bg-gray-200 hover:text-black"
//                 }`}
//                 onClick={() => handleMenuClick(item.key)}
//               >
//                 <div className="relative">
//                   {item.badge ? (
//                     <Badge count={item.badge} size="small" offset={[6, -6]}>
//                       {item.icon}
//                     </Badge>
//                   ) : (
//                     item.icon
//                   )}
//                 </div>

//                 {!collapsed && (
//                   <span className="ml-4 font-medium">{item.label}</span>
//                 )}
//               </div>
//             );

//             return collapsed ? (
//               <Tooltip key={item.key} title={item.label} placement="right">
//                 {content}
//               </Tooltip>
//             ) : (
//               <div key={item.key}>{content}</div>
//             );
//           })}
//         </nav>

//         {/* Bottom Section */}
//         <div className="mt-auto space-y-4 w-full px-2">
//           <div className="flex flex-col items-center">
//             <Tooltip title="Search" placement="right">
//               <div className="p-3 text-black hover:bg-gray-200 rounded-lg cursor-pointer transition-all duration-200">
//                 <SearchOutlined className="text-xl" />
//               </div>
//             </Tooltip>

//             <Tooltip title="Add" placement="right">
//               <div className="mt-2 p-3 text-black hover:bg-gray-200 rounded-lg cursor-pointer transition-all duration-200">
//                 <PlusOutlined className="text-xl" />
//               </div>
//             </Tooltip>

//             <div className="pt-4 border-t border-gray-200 w-full flex justify-center">
//               <Avatar
//                 size={40}
//                 icon={<UserOutlined />}
//                 className="bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 bg-white p-6 overflow-auto">
//         <div className="w-full">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">
//             Welcome to RMBGH Intranet Portal
//           </h1>

//           <div className="bg-gray-50 rounded-lg p-8 text-center">
//             <div className="text-6xl mb-4">🏥</div>
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">
//               Select a menu item from the sidebar
//             </h2>
//             <p className="text-gray-500">
//               Currently viewing:{" "}
//               <span className="font-medium capitalize">{activeItem}</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import { useState } from "react";
import Sidebar from "../../shared/layout/components/sidebar";
import Content from "../../shared/layout/components/content";

const Main = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Already has fixed positioning in its component */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Content - Adjust padding based on sidebar width */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          isCollapsed ? "pl-[80px]" : "pl-[280px]"
        }`}
      >
        <Content />
      </div>
    </div>
  );
};

export default Main;
