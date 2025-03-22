const Home: React.FC = () => {
  return (
    <div className="container mx-auto text-center mt-10">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Courses App</h1>
      <p className="text-lg text-gray-700 mt-4">
        Discover amazing courses and enhance your skills.
      </p>
      <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition">
        Explore Courses
      </button>
    </div>
  );
};

export default Home;
