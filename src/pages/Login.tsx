import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import apiClient from "../api/apiClient";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/auth/login", { username, password });
      login(res.data.token);
      window.location.href = "/courses";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}
               placeholder="Username" className="w-full border p-2 rounded" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
               placeholder="Password" className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}
