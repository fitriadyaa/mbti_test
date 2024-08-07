import { motion } from "framer-motion";
import "./App.css";
import QuizFlow from "./QuizFlow";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen"
      >
        <QuizFlow />
      </motion.div>
    </div>
  );
}

export default App;
