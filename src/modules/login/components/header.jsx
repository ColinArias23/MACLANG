import React, { useState, useEffect } from "react";

const Header = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleString("en-US", {
        weekday: "long", // Day (e.g., Monday)
        day: "numeric", // Date (e.g., 4)
        month: "long", // Month (e.g., October)
        year: "numeric", // Year (e.g., 2025)
        hour: "2-digit", // Hour (e.g., 14)
        minute: "2-digit", // Minute (e.g., 30)
        second: "2-digit", // Second (e.g., 45)
      });
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="w-full bg-[#2e3192] h-16 text-white px-6 py-2 fixed top-0 left-0 z-10 flex items-center justify-between">
      {/* Left side content */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold">Rosario Maclang Bautista General Hospital</h1>
      </div>

      {/* Right side content (Day, Date, and Time) */}
      <div className="flex items-center gap-4">
        <div className="text-sm">{currentTime}</div>
      </div>
    </div>
  );
};

export default Header;
