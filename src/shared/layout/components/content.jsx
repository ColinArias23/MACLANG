import React from "react";

const Content = ({ children }) => {
  return (
    // <div className="flex flex-col h-[calc(100vh-40px)] bg-white rounded-lg p-4 m-5 overflow-hidden">
    <div className="flex-1 w-full">{children}</div>
    // </div>
  );
};

export default Content;
