import { useState } from "react";
import { addCourse } from "../services/course";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCourse(title, description);
      alert("Course added successfully");
      navigate("/"); // ✅ Redirect to course list after adding
    } catch (error) {
      alert("Failed to add course. You may need to log in again.");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Add a New Course</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg max-w-lg mx-auto">
        <input type="text" className="border p-2 w-full mb-4" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="border p-2 w-full mb-4" placeholder="Course Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
