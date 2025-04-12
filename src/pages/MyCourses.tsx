// src/pages/MyCourses.tsx
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useAuth } from "../auth/AuthContext";

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  durationWeeks: number;
  level: string;
  completed: boolean;
}

export default function MyCourses() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await apiClient.get("/courses/my-courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load enrolled courses", err);
        setError("Something went wrong loading your courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [token]);

  const handleDownloadCertificate = async (courseId: number) => {
    try {
      const response = await apiClient.get(`/certificate/download/${courseId}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Certificate_Course_${courseId}.pdf`;
      link.click();
    } catch (err) {
      alert("Failed to download certificate ❌");
    }
  };

  if (loading) return <div className="p-6 text-blue-500">Loading courses...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 My Enrolled Courses</h1>

      {courses.length === 0 ? (
        <p className="text-gray-600">You have not enrolled in any courses yet.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course.id} className="bg-white shadow p-4 rounded">
              <h2 className="text-lg font-semibold text-blue-800">{course.title}</h2>
              <p className="text-gray-700">{course.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                Instructor: {course.instructor} <br />
                Duration: {course.durationWeeks} weeks | Level: {course.level}
              </p>

              <div className="mt-3">
                {course.completed ? (
                  <>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      🎓 Course Completed
                    </span>
                    <button
                      onClick={() => handleDownloadCertificate(course.id)}
                      className="ml-4 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                    >
                      📥 Download Certificate
                    </button>
                  </>
                ) : (
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    ⏳ In Progress
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
