import React from "react";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";

const App: React.FC = () => {
  const { user } = useAuth();
  // switch from LoginForm/RegisterForm to AuthPage
  return user ? <Home /> : <AuthPage />;
};

export default App;
