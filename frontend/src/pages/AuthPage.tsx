import { useState } from "react";
import login_background from "../assets/login_background.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaMicrosoft } from "react-icons/fa";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

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
            className={`pb-2 border-b-2 ${
              activeTab === "login" ? "border-white" : "border-transparent"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`pb-2 border-b-2 ${
              activeTab === "register" ? "border-white" : "border-transparent"
            }`}
          >
            Register
          </button>
        </div>

        {activeTab === "login" ? (
          <form className="flex flex-col gap-4 w-full max-w-sm">
            <input
              type="text"
              placeholder="Username or Email"
              className="p-3 rounded bg-gray-800 border border-gray-700"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded bg-gray-800 border border-gray-700"
            />
            <button className="bg-green-500 p-3 rounded hover:bg-green-600 transition">
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
      <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${login_background})` }} />
    </div>
  );
}
