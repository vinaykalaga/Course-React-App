// src/pages/CourseList.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { useAuth } from "../auth/AuthContext";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/courses/getCourse")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await apiClient.delete(`/courses/deleteCourse/${id}`);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("❌ Failed to delete course");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <ul className="space-y-4">
        {courses.map((course: any) => (
          <li key={course.id} className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-semibold">{course.title}</h2>
            <p className="text-gray-700">{course.description}</p>

            <Link
              to={`/courses/${course.id}`}
              className="text-blue-500 hover:underline block mt-2"
            >
              View Details
            </Link>

            {role === "ROLE_INSTRUCTOR" && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => navigate(`/edit-course/${course.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
