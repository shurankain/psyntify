import { jwtDecode, JwtPayload } from "jwt-decode";
import { useState } from "react";
import { FaApple, FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { loginUser, registerUser } from "../api/auth";
import login_background from "../assets/login_background.png";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const { token } = await loginUser(username, password);
      const decoded = jwtDecode<JwtPayload>(token);
      login(token, { username: decoded.sub ?? "unknown" });
    } catch (err: any) {
      console.error("Login failed:", err);
      setErrorMessage(err.message || "Login failed");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await registerUser(username, email, password);
      alert("Registration successful. You can now log in.");
      setActiveTab("login");
    } catch (err: any) {
      console.error("Registration failed:", err);
      setErrorMessage(err.message || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-900 text-white px-6">
        <h1 className="text-3xl font-bold mb-8">Welcome to Psyntify</h1>

        <div className="flex gap-4 mb-6">
          <button className="bg-white text-black p-3 rounded shadow flex items-center gap-2">
            <FcGoogle size={20} /> Google
          </button>
          <button className="bg-black text-white p-3 rounded shadow flex items-center gap-2">
            <FaApple size={20} /> Apple
          </button>
          <button className="bg-blue-700 text-white p-3 rounded shadow flex items-center gap-2">
            <FaMicrosoft size={20} /> Microsoft
          </button>
        </div>

        <div className="flex gap-6 mb-4">
          <button
            onClick={() => setActiveTab("login")}
            className={`pb-2 border-b-2 ${activeTab === "login" ? "border-white" : "border-transparent"}`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`pb-2 border-b-2 ${activeTab === "register" ? "border-white" : "border-transparent"}`}
          >
            Register
          </button>
        </div>

        {activeTab === "login" ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
            <input
              type="text"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-700"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-700"
              required
            />
            {errorMessage && <p className="text-red-400 text-sm -mt-2">{errorMessage}</p>}
            <button type="submit" className="bg-green-500 p-3 rounded hover:bg-green-600 transition">
              Log in
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full max-w-sm">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-700"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-700"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-700"
              required
            />
            {errorMessage && <p className="text-red-400 text-sm -mt-2">{errorMessage}</p>}
            <button type="submit" className="bg-blue-500 p-3 rounded hover:bg-blue-600 transition">
              Register
            </button>
          </form>
        )}
      </div>

      <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${login_background})` }} />
    </div>
  );
}
