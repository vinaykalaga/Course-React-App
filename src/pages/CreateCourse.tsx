import { useState } from "react";
import { addCourse } from "@/services/course";
import { useAuth } from "@/context/AuthContext"; // ✅ Ensure authentication context is used

const CreateCourse: React.FC = () => {
  const { user } = useAuth(); // ✅ Get user session
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to add a course.");
      return;
    }

    try {
      const response = await addCourse(title, description);
      console.log("Course added successfully:", response.data);
      alert("Course added!");
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course. You may need to log in again.");
    }
  };

  return (
    <div className="container mx-auto mt-10 px-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Create Course</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Title"
          className="border p-2 w-full mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Course Description"
          className="border p-2 w-full mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
