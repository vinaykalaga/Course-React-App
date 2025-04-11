// src/pages/CourseDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/apiClient";
import { useAuth } from "../auth/AuthContext";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [enrolled, setEnrolled] = useState(false);
  const { role, token } = useAuth();

  useEffect(() => {
    apiClient.get(`/courses/getCourse/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error("Error loading course", err));
  }, [id]);

  const handleEnroll = async () => {
    try {
      await apiClient.post(`/courses/enroll/${id}`);
      setEnrolled(true);
    } catch (err) {
      alert("Failed to enroll");
    }
  };

  if (!course) return <div className="text-center mt-8 text-gray-600">Loading course...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">{course.title}</h1>
      <p className="text-gray-800 text-lg mb-2">{course.description}</p>
      <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
      <p className="text-sm text-gray-500">Level: {course.level}</p>
      <p className="text-sm text-gray-500 mb-4">Duration: {course.durationWeeks} weeks</p>

      {role === "ROLE_LEARNER" && !enrolled && (
        <button
          onClick={handleEnroll}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
        >
          Enroll
        </button>
      )}

      {enrolled && (
        <div className="text-green-600 mt-4 font-semibold">🎉 You are enrolled in this course!</div>
      )}
    </div>
  );
}
