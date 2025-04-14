import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, role, username, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CoursesApp
        </Link>

        <div className="flex items-center gap-6">
          {/* Common Links */}
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/courses" className="text-gray-700 hover:text-blue-600">
            Courses
          </Link>

          {/* Instructor-only link */}
          {token && role === "ROLE_INSTRUCTOR" && (
            <Link
              to="/add-course"
              className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Add Course
            </Link>
          )}
        {role === "ROLE_INSTRUCTOR" && (
              <Link to="/instructor/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
            )}

          {/* Learner-only link */}
          {token && role === "ROLE_LEARNER" && (
            <Link
              to="/my-courses"
              className="text-gray-700 hover:text-blue-600"
            >
              My Courses
            </Link>
          )}

          {/* Auth Links */}
          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* Greeting */}
              <span className="text-gray-600 font-medium">
                👋 Hey {username?.toUpperCase()}!
              </span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
