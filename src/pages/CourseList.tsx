import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useAuth } from "../auth/AuthContext";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const { token } = useAuth();

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await apiClient.delete(`/courses/deleteCourse/${id}`);
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert("Failed to delete course");
    }
  };

  useEffect(() => {
    apiClient.get("/courses/getCourse")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <ul className="space-y-4">
        {courses.map((course: any) => (
          <li key={course.id} className="bg-white shadow p-6 rounded">
            <h2 className="font-bold text-xl mb-1">{course.title}</h2>
            <p className="text-gray-700">{course.description}</p>

            <div className="mt-3 flex gap-2">
              <Link
                to={`/courses/${course.id}`}
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                View
              </Link>

              {token && (
                <>
                  <Link
                    to={`/edit-course/${course.id}`}
                    className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
