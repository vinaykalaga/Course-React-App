// src/pages/AddCourse.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [level, setLevel] = useState("");
  const [durationWeeks, setDurationWeeks] = useState(4);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/courses/addCourse", {
        title,
        description,
        content,
        level,
        durationWeeks,
      });
      alert("✅ Course added successfully!");
      navigate("/courses");
    } catch {
      alert("❌ Failed to add course.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded space-y-6">
      <h2 className="text-2xl font-bold text-blue-700">📚 Create a New Course</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <div>
          <label className="font-semibold block mb-1">📖 Add Learning Content</label>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <input
          type="number"
          min={1}
          value={durationWeeks}
          onChange={(e) => setDurationWeeks(parseInt(e.target.value))}
          className="w-full border p-2 rounded"
          placeholder="Duration (weeks)"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          ➕ Add Course
        </button>
      </form>
    </div>
  );
}
