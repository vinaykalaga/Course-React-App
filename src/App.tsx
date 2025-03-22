import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CourseList from "./pages/CourseList";
import AddCourse from "./pages/AddCourse";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./auth/ProtectedRoute";
import CourseDetail from "./pages/CourseDetail";
import EditCourse from "./pages/EditCourse";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/courses" element={
          <ProtectedRoute>
            <CourseList />
          </ProtectedRoute>
        } />
        <Route path="/add-course" element={
          <ProtectedRoute>
            <AddCourse />
          </ProtectedRoute>
        } />
        <Route path="/courses/:id" element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          } />
      <Route path="/edit-course/:id" element={
          <ProtectedRoute>
          <EditCourse />
          </ProtectedRoute>
          } />
      </Routes>
    </Router>
  );
}

export default App;
