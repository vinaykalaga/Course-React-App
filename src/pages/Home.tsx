import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8">
      <div className="max-w-4xl mx-auto text-center mt-28">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-6 animate-pulse">
          Welcome to <span className="text-indigo-600">CourseHub</span> 🚀
        </h1>
        <p className="text-gray-700 text-lg mb-10 animate-fade-in">
          Unlock knowledge, explore top tech courses, and manage your learning all in one place.
        </p>

        <Link to="/courses">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105 duration-300">
            Explore Courses
          </button>
        </Link>
      </div>
    </div>
  );
}
