import axios from 'axios';

export const addCourse = async (courseData) => {
    const token = localStorage.getItem("token"); // ✅ Get token from localStorage

    try {
        const response = await axios.post("http://localhost:8080/courses", courseData, {
            headers: {
                "Authorization": `Bearer ${token}`, // ✅ Send token in header
                "Content-Type": "application/json"
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error adding course:", error);
        throw error;
    }
};
