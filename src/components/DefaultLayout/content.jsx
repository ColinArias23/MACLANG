import React from "react";

const Content = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-full bg-white rounded-lg p-4 ml-5 mr-5 mb-5">
      { children }
    </div>
  );
};

export default Content;
