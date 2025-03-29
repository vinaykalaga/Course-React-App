import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
      >
        Welcome to <span className="text-blue-600">Course Hub</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-700 text-lg md:text-xl max-w-xl mb-6"
      >
        Explore the world of backend & fullstack development through curated programming courses.
      </motion.p>
    </div>
  );
}
