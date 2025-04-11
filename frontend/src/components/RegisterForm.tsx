import { useState, FormEvent } from "react";

export const RegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      alert("Registered successfully! You can log in.");
      setUsername("");
      setPassword("");
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
        Register
      </button>
    </form>
  );
};
