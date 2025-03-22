import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    apiClient.get("/courses/getCourse")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <ul className="space-y-2">
        {courses.map((course: any) => (
          <li key={course.id} className="bg-white shadow p-4 rounded">
            <h2 className="font-bold text-lg">{course.title}</h2>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
