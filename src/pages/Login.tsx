import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/"); // ✅ Redirect after login
    } catch (error) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="text" className="border rounded-lg p-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" className="border rounded-lg p-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="bg-blue-600 text-white rounded-lg p-2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
