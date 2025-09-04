import React, { useState } from "react";
import Header from "./components/header";
import LoginForm from "./components/loginform";
import RightPanel from "./components/rightpanel";
import Footer from "./components/footer";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const { username, password } = values;
    if (username === "admin" && password === "password") {
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex text-gray-900">
      <div className="w-full lg:w-1/2 bg-gray-200 flex flex-col">
        <Header />
        <LoginForm handleLogin={handleLogin} />
        <Footer />
      </div>
      <RightPanel />
    </div>
  );
}

export default Login;
