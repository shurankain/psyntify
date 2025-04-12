import React from "react";
import { useAuth } from "./context/AuthContext";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import Home from "./pages/Home";

const App: React.FC = () => {
  const { user, logout } = useAuth();

  return user ? <Home /> : (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Psyntify Auth</h1>
      <LoginForm />
      <div className="my-6 border-t pt-4">
        <RegisterForm />
      </div>
    </div>
  );
};

export default App;
