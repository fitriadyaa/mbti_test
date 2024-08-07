import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import MBTIQuestionComponent from "./MBTIQuestion";

// Enum untuk melacak langkah dalam alur
enum QuizStep {
  Start,
  ChooseQuiz,
  Instructions,
  Questions,
  Results,
}

// Tipe untuk hasil kuis
type QuizResult = {
  type: string;
  description: string;
};

const QuizFlow: React.FC = () => {
  const [step, setStep] = useState<QuizStep>(QuizStep.Start);
  const [selectedQuiz, setSelectedQuiz] = useState<string>("");
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleStart = () => {
    setStep(QuizStep.ChooseQuiz);
  };

  const handleQuizSelection = (quiz: string) => {
    setSelectedQuiz(quiz);
    setStep(QuizStep.Instructions);
  };

  const handleStartQuiz = () => {
    setStep(QuizStep.Questions);
  };

  const handleQuizComplete = (result: string) => {
    setQuizResult({
      type: result,
      description: `Anda adalah tipe ${result}. Ini adalah deskripsi singkat tentang tipe kepribadian Anda.`,
    });
    setStep(QuizStep.Results);
  };

  const renderStep = () => {
    switch (step) {
      case QuizStep.Start:
        return (
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                Kuesioner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-gray-700 text-center">
                Tes Kepribadian MBTI Bahasa Indonesia: Kenali Dirimu!
              </p>
              <Button onClick={handleStart} className="w-full text-lg py-6">
                Mulai
              </Button>
            </CardContent>
          </Card>
        );

      case QuizStep.ChooseQuiz:
        return (
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="p-8 border-b">
              <CardTitle className="text-3xl sm:text-4xl font-bold text-center text-gray-800">
                Pilih Kuesioner
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8 mb-8">
                <Button
                  onClick={() => handleQuizSelection("mbti")}
                  className=" mb-8 w-full py-6 text-lg sm:text-xl transition-all hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-800 border border-gray-300"
                  variant="outline"
                >
                  MBTI
                </Button>
                <Button
                  onClick={() => handleQuizSelection("love-language")}
                  className=" mb-8 w-full py-6 text-lg sm:text-xl transition-all hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-800 border border-gray-300"
                  variant="outline"
                >
                  Love Language
                </Button>
                <Button
                  onClick={() => handleQuizSelection("anxiety")}
                  className=" mb-8 w-full py-6 text-lg sm:text-xl transition-all hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-800 border border-gray-300"
                  variant="outline"
                >
                  Kecemasan
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case QuizStep.Instructions:
        return (
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="p-8 border-b">
              <CardTitle className="text-3xl sm:text-4xl font-bold text-center text-gray-800">
                Petunjuk {selectedQuiz.toUpperCase()}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <p className="text-lg sm:text-xl text-gray-700 mb-8">
                Ini adalah petunjuk untuk mengikuti kuesioner{" "}
                {selectedQuiz.toUpperCase()}. Bacalah setiap pertanyaan dengan
                seksama dan pilih jawaban yang paling sesuai dengan diri Anda.
              </p>
              <Button
                onClick={handleStartQuiz}
                className="px-8 py-4 text-lg sm:text-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                Mulai Kuesioner
              </Button>
            </CardContent>
          </Card>
        );

      case QuizStep.Questions:
        return <MBTIQuestionComponent onComplete={handleQuizComplete} />;

      case QuizStep.Results:
        return (
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="p-8 border-b">
              <CardTitle className="text-3xl sm:text-4xl font-bold text-center text-gray-800">
                Hasil Kuesioner
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">
                {quizResult?.type}
              </h2>
              <p className="text-lg sm:text-xl text-gray-700">
                {quizResult?.description}
              </p>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6 md:p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizFlow;
