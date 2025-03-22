import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);

  // 🟦 Scroll to top when visiting detail page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🟦 Fetch course detail
  useEffect(() => {
    apiClient.get(`/courses/getCourse/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error("Error loading course", err));
  }, [id]);

  if (!course) {
    return (
      <div className="text-center mt-10 text-gray-600">
        ⏳ Loading course...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{course.title}</h1>
      <p className="text-gray-800 text-lg mb-4">{course.description}</p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Instructor:</span> {course.instructor}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Level:</span> {course.level}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Duration:</span> {course.durationWeeks} weeks
      </p>

      <Link
        to="/courses"
        className="mt-6 inline-block text-blue-600 hover:underline text-sm"
      >
        ← Back to Course List
      </Link>
    </div>
  );
}
