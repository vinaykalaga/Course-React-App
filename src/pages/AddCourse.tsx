// src/pages/AddCourse.tsx
import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AddCourse() {
  const { role } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    level: "",
    durationWeeks: ""
  });

  // 🔐 Redirect if not Instructor
  useEffect(() => {
    if (role !== "ROLE_INSTRUCTOR") {
      alert("Access denied. Only instructors can add courses.");
      navigate("/courses");
    }
  }, [role]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/courses/addCourse", {
        ...form,
        durationWeeks: parseInt(form.durationWeeks)
      });
      alert("✅ Course added successfully!");
      navigate("/courses");
    } catch (err) {
      alert("❌ Failed to add course.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Course Title"
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
          placeholder="Instructor Name"
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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}
