import React from "react";

const Content = ({ children }) => {
  return (
    <div className="w-full ml-64 bg-white rounded-xl p-4 mb-5 mr-5">
      {children}
    </div>
  );
};

export default Content;
