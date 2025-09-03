import React from "react";
import Header from "./components/header";
import LoginForm from "./components/loginform";
import RightPanel from "./components/rightpanel";
import Footer from "./components/footer";

function Login() {
  return (
    <div className="min-h-screen flex text-gray-900">
      <div className="flex flex-col bg-gray-100 justify-between flex-1">
        <Header />
        <LoginForm />
        <Footer />
      </div>
      <RightPanel />
    </div>
  );
}

export default Login;
