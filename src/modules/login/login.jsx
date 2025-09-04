import React from "react";
import Header from "./components/header";
import LoginForm from "./components/loginform";
import Footer from "./components/footer";
import backgroundImage from "../../assets/bg/rosario-maclang-hospital.jpg"; // Import image from assets

function Login() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage}), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`, // Dim the image with gradient overlay
      }}
    >
      <Header />

      {/* Form container with subtle gray overlay to make form content stand out */}
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md border border-blue-400 w-96 text-center mt-10 z-10 h-104 relative">
        <LoginForm />
      </div>

      <Footer />
    </div>
  );
}

export default Login;
