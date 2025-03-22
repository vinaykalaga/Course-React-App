import { useState } from "react";
import apiClient from "../api/apiClient";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/courses/addCourse", { title, description });
      alert("Course added!");
    } catch (err) {
      alert("Failed to add course.");
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}
               className="w-full border p-2 rounded" required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}
                  className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Course
        </button>
      </form>
    </div>
  );
}
