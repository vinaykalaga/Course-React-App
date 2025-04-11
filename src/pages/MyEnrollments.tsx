import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export default function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    apiClient.get("/courses/my-courses")
      .then(res => setEnrollments(res.data))
      .catch(err => console.error("Failed to load enrollments", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 My Enrolled Courses</h1>

      {enrollments.length === 0 ? (
        <p className="text-center text-gray-600">You haven't enrolled in any courses yet.</p>
      ) : (
        <ul className="space-y-4">
          {enrollments.map((enroll: any) => (
            <li key={enroll.id} className="bg-white shadow p-6 rounded">
              <h2 className="text-xl font-semibold text-blue-700">{enroll.course.title}</h2>
              <p className="text-gray-700 mt-2">{enroll.course.description}</p>
              <div className="text-sm text-gray-500 mt-2">
                👨‍🏫 Instructor: {enroll.course.instructor} | 🎯 Level: {enroll.course.level} | ⏱️ Duration: {enroll.course.durationWeeks} weeks
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
