import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    level: "",
    durationWeeks: 0,
  });

  useEffect(() => {
    apiClient.get(`/courses/getCourse/${id}`).then(res => setCourse(res.data));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiClient.put(`/courses/updateCourse/${id}`, course);
    navigate("/courses");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={course.title} onChange={handleChange} placeholder="Title" required className="w-full border p-2 rounded" />
        <input name="description" value={course.description} onChange={handleChange} placeholder="Description" required className="w-full border p-2 rounded" />
        <input name="instructor" value={course.instructor} onChange={handleChange} placeholder="Instructor" required className="w-full border p-2 rounded" />
        <select name="level" value={course.level} onChange={handleChange} required className="w-full border p-2 rounded">
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input name="durationWeeks" type="number" value={course.durationWeeks} onChange={handleChange} placeholder="Duration (weeks)" required className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Update</button>
      </form>
    </div>
  );
}
