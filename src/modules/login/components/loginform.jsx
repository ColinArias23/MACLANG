import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="text-center max-w-xs mx-auto">
      {/* Logo from public folder */}
      <img
  src="/images/Maclang.png"
  alt="Logo"
  className="w-28 h- mx-auto mb-4 rounded-full border border-gray-300 shadow-md"
/>

    
      {/* Title */}
      <h2 className="text-xl font-semibold text-[#2e3192] mb-6">
        RMBGH Intranet
      </h2>

      {/* Login Form */}
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#2e3192]"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#2e3192]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-[#2e3192] text-white font-semibold py-2 rounded-full hover:bg-[#1f236d] transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
