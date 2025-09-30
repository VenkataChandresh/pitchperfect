"use client";

import { useState } from "react";
import Flashcard from "@/components/FlashCard";
import { questions } from "@/data/questions";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">
        PitchPerfect Interview Coach
      </h1>

      {/* Progress Indicator */}
      <p className="text-gray-700 mb-6">
        Question {currentIndex + 1} of {questions.length}
      </p>

      {/* Flashcard */}
      <div className="flex flex-col items-center">
        <Flashcard question={currentQuestion} />

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300 disabled:opacity-50"
          >
            ◀ Previous
          </button>

          <button
            onClick={nextQuestion}
            disabled={currentIndex === questions.length - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      </div>
    </main>
  );
}
