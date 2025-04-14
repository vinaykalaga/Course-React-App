import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function Home() {
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    apiClient.get("/courses/popular").then((res) => {
      setPopularCourses(res.data);
    });
  }, []);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to CoursesApp 🚀</h1>
        <p className="text-lg">Empower your learning journey with top-rated courses!</p>
        <Link
          to="/courses"
          className="inline-block mt-6 bg-white text-blue-700 font-semibold px-6 py-2 rounded shadow hover:bg-gray-100"
        >
          Explore Courses
        </Link>
      </section>

      {/* Popular Courses */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-700 mb-8">🔥 Popular Courses</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {popularCourses.map((course: any) => (
            <div key={course.id} className="border rounded-lg shadow-md p-4 bg-white">
              <div className="h-32 bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-400">
                📘 Thumbnail
              </div>
              <h3 className="text-xl font-semibold text-blue-600">{course.title}</h3>
              <p className="text-gray-700 mb-2 line-clamp-3">{course.description}</p>
              <p className="text-sm text-gray-500">Level: {course.level}</p>
              <p className="text-sm text-gray-500 mb-4">Duration: {course.durationWeeks} weeks</p>
              <Link
                to={`/courses/${course.id}`}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">Why Learn With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-4">
              <div className="text-4xl mb-2">👨‍🏫</div>
              <h3 className="text-lg font-semibold text-gray-700">Expert Instructors</h3>
              <p className="text-sm text-gray-600">Learn from industry professionals with real-world experience.</p>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">📈</div>
              <h3 className="text-lg font-semibold text-gray-700">Progress Tracking</h3>
              <p className="text-sm text-gray-600">Track your learning journey and mark courses as completed.</p>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">🎓</div>
              <h3 className="text-lg font-semibold text-gray-700">Earn Certificates</h3>
              <p className="text-sm text-gray-600">Receive certificates for completed courses to showcase your skills.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
