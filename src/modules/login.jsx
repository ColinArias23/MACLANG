import React, { useState, useEffect } from "react";

const CurrentDate = () => {
  const [now, setNow] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen text-3xl font-bold">
      {/* DATE AND TIME */}
      <header className="bg-blue-900 text-white p-4 md:p-8 flex items-center justify-between">
        <div className="w-full md:w-1/2">{formattedDate}</div>
        <div className="w-full md:w-1/2 text-right">
          {now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      </header>

      {/* LOGIN FORM */}
      <main className="flex flex-1 items-center justify-center bg-gray-200 p-4 md:p-8">
        <form className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-base font-normal flex flex-col items-center">
          {/* Logo */}
          <img
            src="/images/Maclang.png"
            alt="Maclang Logo"
            className="w-24 h-24 mb-4"
          />

          {/* Hospital Name */}
          <h2 className="text-2xl font-bold mb-6 text-center">
            Rosario Maclang Bautista General Hospital
          </h2>

          {/* Username Field */}
          <div className="mb-4 w-full">
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6 w-full relative">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {/* Eye icon toggle */}
            <button
              type="button"
              className="absolute right-4 top-10 md:top-10 text-gray-500"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-3xl hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center p-4 flex items-center justify-center">
        © 2025 IT DEPT. All Rights Reserved
      </footer>
    </div>
  );
};

export default CurrentDate;
