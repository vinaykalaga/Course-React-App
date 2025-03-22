import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");

  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <a href="/" className="px-4">Home</a>
        {user && <a href="/add-course" className="px-4">Add Course</a>}
      </div>
      <div>
        {user ? (
          <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">Logout</button>
        ) : (
          <>
            <a href="/login" className="px-4">Login</a>
            <a href="/register" className="px-4">Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
