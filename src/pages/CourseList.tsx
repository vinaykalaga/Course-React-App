import { useEffect, useState } from "react";
import { getCourses } from "../services/course";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="bg-white p-4 shadow-lg rounded-lg">
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className="text-gray-700">{course.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No courses available</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
