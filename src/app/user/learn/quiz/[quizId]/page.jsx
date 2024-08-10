"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  tsunamiPrecautionQuiz,
  earthquakePrecautionQuiz,
  floodPrecautionQuiz,
  hurricanePrecautionQuiz,
  wildfirePrecautionQuiz,
} from "@/lib/questions";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hook/useWindowSize"; // Custom hook for window size

export default function QuizPage({ params }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestion] = useState(tsunamiPrecautionQuiz);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const [score, setScore] = useState(0); // State for storing the score
  const { width, height } = useWindowSize(); // Get window size for Confetti
  const progress = (currentQuestion / questions.length) * 100; // Update progress calculation

  useEffect(() => {
    switch (params.quizId) {
      case "tsunami":
        setQuestion(tsunamiPrecautionQuiz);
        break;
      case "earthquake":
        setQuestion(earthquakePrecautionQuiz);
        break;
      case "flood":
        setQuestion(floodPrecautionQuiz);
        break;
      case "hurricane":
        setQuestion(hurricanePrecautionQuiz);
        break;
      case "wildfire":
        setQuestion(wildfirePrecautionQuiz);
        break;
      default:
        setQuestion(tsunamiPrecautionQuiz);
    }
  }, [params.quizId]);

  const handleAnswer = (index) => {
    const correct = index === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setSelectedOption(index);

    if (correct) setScore(score + 1); // Increment score for correct answers

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        // Show modal after the last question
        setShowModal(true);
      }
    }, 1000); // Wait for animation before moving to next question
  };

  return (
    <div className="h-full flex flex-col items-center p-4 relative overflow-hidden">
      <AnimatePresence>
        {isCorrect === true && (
          <motion.div
            className="absolute top-20 flex items-center justify-center z-10 pointer-events-none w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Confetti width={width} height={height} />
            <div className="absolute flex items-center justify-center z-20">
              <h1 className="text-3xl font-bold text-green-500">Correct!</h1>
            </div>
          </motion.div>
        )}
        {isCorrect === false && (
          <motion.div
            className="absolute flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute flex items-center justify-center z-20">
              <h1 className="text-3xl font-bold text-red-500">Wrong!</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-row items-center gap-4 w-full">
        <Link href={"/user/learn/quiz"} className="h-full">
          <X />
        </Link>
        <div className="w-3/4 bg-gray-300 h-3 mb-6 rounded-xl mt-4">
          <motion.div
            className="bg-black h-full rounded-xl"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="rounded-lg p-8 w-full max-w-4xl mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Question {currentQuestion + 1}
        </h2>
        <AnimatePresence>
          <motion.p
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-black"
          >
            {questions[currentQuestion].question}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="rounded-lg p-8 w-full max-w-4xl">
        <div className="flex flex-col gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full border-2 border-b-4 border-black text-white p-4 rounded-xl transition flex items-center gap-8 ${
                selectedOption === index
                  ? isCorrect
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-transparent"
              }`}
              onClick={() => handleAnswer(index)}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="border-2 text-black border-black rounded-lg px-4 py-2">
                {index + 1}
              </div>
              <p className="text-black">{option}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
              <div className="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
                Quiz Completed!
              </div>
              <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
                You have completed the quiz! Your final score is{" "}
                <strong>{score} / {questions.length}</strong>.
              </div>
              <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
                <Link
                  href="/user/learn/quiz"
                  className="middle none center rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Go to all quiz
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
