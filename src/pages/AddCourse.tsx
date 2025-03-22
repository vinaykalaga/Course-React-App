import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    level: "",
    durationWeeks: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    apiClient.post("/courses/addCourse", {
      ...form,
      durationWeeks: parseInt(form.durationWeeks)
    })
    .then(() => {
      alert("Course added ✅");
      navigate("/courses"); // ✅ Uses react-router instead of full reload
    })
    .catch(() => alert("Error adding course ❌"));
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-semibold">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="instructor"
          value={form.instructor}
          onChange={handleChange}
          placeholder="Instructor"
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <input
          type="number"
          name="durationWeeks"
          value={form.durationWeeks}
          onChange={handleChange}
          placeholder="Duration in Weeks"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}
