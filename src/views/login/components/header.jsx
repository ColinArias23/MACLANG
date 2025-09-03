import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center">
        <img
          src="/images/Maclang.png"
          alt="Maclang Logo"
          className="w-12 h-12 mr-3 object-contain"
        />
        <span className="text-2xl font-bold text-gray-800">
          Rosario Maclang Bautista General Hospital
        </span>
      </div>
    </div>
  );
};

export default Header;
