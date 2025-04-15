import { useState } from "react";
import login_background from "../assets/login_background.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaMicrosoft } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";

export default function AuthPage() {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Added for login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoginError(null);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();

      // data.token should be your JWT
      const decoded = jwtDecode<JwtPayload>(data.token);
      login(data.token, { username: decoded.sub ?? "unknown" });

    } catch (err) {
      console.error("Login failed:", err);
      setLoginError("Invalid credentials.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left - Auth Form */}
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
            className={`pb-2 border-b-2 ${activeTab === "login" ? "border-white" : "border-transparent"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`pb-2 border-b-2 ${activeTab === "register" ? "border-white" : "border-transparent"
              }`}
          >
            Register
          </button>
        </div>

        {activeTab === "login" ? (
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 w-full max-w-sm"
          >
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
            {loginError && (
              <p className="text-red-400 text-sm -mt-2">{loginError}</p>
            )}
            <button
              type="submit"
              className="bg-green-500 p-3 rounded hover:bg-green-600 transition"
            >
              Log in
            </button>
            <p className="text-sm text-right text-gray-400 hover:underline cursor-pointer">
              Forgot your password?
            </p>
          </form>
        ) : (
          <form className="flex flex-col gap-4 w-full max-w-sm">
            <input
              type="text"
              placeholder="Username"
              className="p-3 rounded bg-gray-800 border border-gray-700"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded bg-gray-800 border border-gray-700"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded bg-gray-800 border border-gray-700"
            />
            <button className="bg-blue-500 p-3 rounded hover:bg-blue-600 transition">
              Register
            </button>
          </form>
        )}
      </div>

      {/* Right - Image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${login_background})` }}
      />
    </div>
  );
}
