import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/apiClient";
import { useAuth } from "../auth/AuthContext";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { role, token } = useAuth();

  useEffect(() => {
    if (!id) return;

    apiClient.get(`/courses/getCourse/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error("Error loading course", err));

    apiClient.get(`/courses/status/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setEnrolled(true);
        setCompleted(res.data.completed);
      })
      .catch(() => setEnrolled(false));
  }, [id, token]);

  const handleEnroll = async () => {
    try {
      await apiClient.post(`/courses/enroll/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnrolled(true);
    } catch (err) {
      alert("❌ Failed to enroll");
    }
  };

  const handleMarkCompleted = async () => {
    try {
      await apiClient.post(`/courses/complete/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCompleted(true);
      alert("🎓 Course marked as completed!");
    } catch (err) {
      alert("❌ Failed to mark as completed");
    }
  };

  if (!course) return <div className="text-center mt-8 text-gray-600">Loading course...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">{course.title}</h1>
      <p className="text-gray-800 text-lg mb-2">{course.description}</p>
      <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
      <p className="text-sm text-gray-500">Level: {course.level}</p>
      <p className="text-sm text-gray-500 mb-4">Duration: {course.durationWeeks} weeks</p>

      {/* ✅ Content Viewer */}
      <div className="mt-6 prose max-w-none" dangerouslySetInnerHTML={{ __html: course.content || "<p>No content provided yet.</p>" }} />

      {role === "ROLE_LEARNER" && (
        <div className="mt-6">
          {enrolled ? (
            completed ? (
              <span className="text-green-600 font-semibold text-lg">🎓 Course Completed!</span>
            ) : (
              <>
                <div className="text-blue-600 font-medium">🎉 You are enrolled</div>
                <button
                  onClick={handleMarkCompleted}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Mark as Completed
                </button>
              </>
            )
          ) : (
            <button
              onClick={handleEnroll}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Enroll
            </button>
          )}
        </div>
      )}
    </div>
  );
}
