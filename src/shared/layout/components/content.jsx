import React from "react";

const Content = ({ children, isCollapsed }) => {
  return (
    <div
      className={`transition-all duration-300 bg-white rounded-xl p-4 ${
        isCollapsed ? "ml-16 w-[calc(100%-4rem)]" : "ml-64 w-[calc(100%-16rem)]"
      }`}
    >
      {children}
    </div>
  );
};

export default Content;
