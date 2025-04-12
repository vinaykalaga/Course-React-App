import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";
import { useAuth } from "../auth/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function InstructorDashboard() {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    apiClient
      .get("/instructor/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Failed to load instructor courses", err));
  }, [token]);

  const exportToCSV = async (courseId: number) => {
    try {
      const res = await apiClient.get(`/instructor/dashboard/export/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `course_${courseId}_learners.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("❌ Failed to export learners");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">👨‍🏫 Instructor Dashboard</h2>

      {courses.length === 0 ? (
        <p className="text-gray-600">You haven't added any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any) => (
            <div
              key={course.id}
              className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-blue-600 truncate">
                {course.title}
              </h3>
              <p className="text-gray-700 line-clamp-2 mb-2">
                {course.description}
              </p>
              <p className="text-sm text-gray-500">
                Enrollments: {course.enrollmentCount || 0} <br />
                Completed: {course.completedCount || 0} <br />
                Certificates: {course.certificateCount || 0}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to={`/edit-course/${course.id}`}
                  className="text-white bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <Link
                  to={`/courses/${course.id}`}
                  className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                >
                  View
                </Link>
                <button
                  onClick={() => exportToCSV(course.id)}
                  className="text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700"
                >
                  Export Learners 📥
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {courses.length > 0 && (
        <div className="space-y-10">
          <h3 className="text-2xl font-semibold mt-10 text-gray-800">📊 Course Stats Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded shadow">
              <h4 className="font-semibold mb-2">Enrollments per Course</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={courses}>
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enrollmentCount" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-50 p-4 rounded shadow">
              <h4 className="font-semibold mb-2">Completions per Course</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={courses}>
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="completedCount" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
