import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="space-x-4">
        {token && (
          <>
            <Link to="/courses" className="hover:underline">Courses</Link>
            <Link to="/add-course" className="hover:underline">Add Course</Link>
          </>
        )}
      </div>
      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        )}
      </div>
    </nav>
  );
}
