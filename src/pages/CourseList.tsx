// src/pages/CourseList.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { useAuth } from "../auth/AuthContext";
import { motion } from "framer-motion";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState<number[]>([]);
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get("/courses/getCourse")
      .then(res => setCourses(res.data))
      .catch(err => console.error("❌ Error fetching courses:", err));

    if (role === "ROLE_LEARNER") {
      const stored = localStorage.getItem("enrolledIds");
      if (stored) {
        setEnrolledIds(JSON.parse(stored));
      } else {
        apiClient.get("/courses/my-courses")
          .then(res => {
            const ids = res.data.map((e: any) => e.course.id);
            setEnrolledIds(ids);
            localStorage.setItem("enrolledIds", JSON.stringify(ids));
          })
          .catch(err => console.error("❌ Error fetching enrolled courses:", err));
      }
    }
  }, [role]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await apiClient.delete(`/courses/deleteCourse/${id}`);
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch {
      alert("❌ Failed to delete course");
    }
  };

  const handleEnroll = async (courseId: number) => {
    try {
      await apiClient.post(`/courses/enroll/${courseId}`);
      const updated = [...enrolledIds, courseId];
      setEnrolledIds(updated);
      localStorage.setItem("enrolledIds", JSON.stringify(updated));
      alert("✅ Enrolled Successfully");
    } catch {
      alert("❌ Enrollment Failed");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <ul className="space-y-4">
        {courses.map((course: any, index) => (
          <motion.li
            key={course.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white shadow p-4 rounded"
          >
            <h2 className="text-lg font-semibold">{course.title}</h2>
            <p className="text-gray-700">{course.description}</p>
            <Link to={`/courses/${course.id}`} className="text-blue-500 hover:underline block mt-2">
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

            {role === "ROLE_LEARNER" && (
              <div className="mt-3">
                {enrolledIds.includes(course.id) ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
                    ✅ Enrolled
                  </span>
                ) : (
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Enroll
                  </button>
                )}
              </div>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
