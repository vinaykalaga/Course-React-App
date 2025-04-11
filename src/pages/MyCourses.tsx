import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useAuth } from "../auth/AuthContext";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    apiClient
      .get("/courses/my-courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error loading enrolled courses:", err));
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎓 My Enrolled Courses</h1>
      {courses.length === 0 ? (
        <p className="text-gray-500">You have not enrolled in any courses yet.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course: any) => (
            <li key={course.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold text-blue-700">{course.title}</h2>
              <p className="text-gray-700">{course.description}</p>
              <div className="text-sm mt-2 text-gray-600">
                Instructor: <span className="font-medium">{course.instructor}</span> <br />
                Level: <span className="font-medium">{course.level}</span> <br />
                Duration: <span className="font-medium">{course.durationWeeks} weeks</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
