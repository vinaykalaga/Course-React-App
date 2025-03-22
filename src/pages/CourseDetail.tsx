// src/pages/CourseDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    apiClient.get(`/courses/getCourse/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error("Error loading course", err));
  }, [id]);

  if (!course) return <div className="text-center mt-8 text-gray-600">Loading course...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">{course.title}</h1>
      <p className="text-gray-800 text-lg">{course.description}</p>
    </div>
  );
}
