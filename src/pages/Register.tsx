import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, password);
      alert("Registration successful. Please log in.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="text" className="border rounded-lg p-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" className="border rounded-lg p-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="bg-green-600 text-white rounded-lg p-2">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
