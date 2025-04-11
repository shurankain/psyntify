import React from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Psyntify 🌱</h1>
        <div className="space-y-6">
          <LoginForm />
          <hr className="my-4" />
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
