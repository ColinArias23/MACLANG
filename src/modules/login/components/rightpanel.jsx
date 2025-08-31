import React, { useState, useEffect } from "react";

const RightPanel = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      style={{
        backgroundImage: `url('https://files01.pna.gov.ph/ograph/2021/10/28/rosario-maclang-hospital.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-8 right-8 bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white text-right">
        <div className="text-sm font-medium">{formattedDate}</div>
        <div className="text-2xl font-bold font-mono">{formattedTime}</div>
      </div>
    </div>
  );
};

export default RightPanel;
