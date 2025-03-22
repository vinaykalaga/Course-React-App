import { useParams } from "react-router-dom";

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1 className="text-2xl font-bold">Course Details</h1>
      <p>Details for Course ID: {id}</p>
    </div>
  );
};

export default CourseDetail;