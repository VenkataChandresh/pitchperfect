"use client";

import FlashCard from "@/components/FlashCard";
import VoiceRecorder from "@/components/VoiceRecorder";
import { questions } from "@/data/questions";
import { useState } from "react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuestion = () => {
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const prevQuestion = () => {
    setCurrentIndex((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 text-gray-900 flex flex-col items-center p-8">
      {/* Heading */}
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-indigo-600 drop-shadow-sm">
          🎤 PitchPerfect
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          Practice interviews with AI-powered feedback
        </p>
      </header>

      {/* Flashcard Section */}
      <section className="w-full max-w-2xl">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-indigo-100">
          <FlashCard question={questions[currentIndex]} />
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={prevQuestion}
            className="px-5 py-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium shadow-sm"
          >
            ⬅ Prev
          </button>
          <button
            onClick={nextQuestion}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md"
          >
            Next ➡
          </button>
        </div>
      </section>

      {/* Voice Recorder */}
      <section className="w-full max-w-2xl mt-10">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-indigo-100">
          <VoiceRecorder key={currentIndex} />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        Built with ❤️ using Next.js, TypeScript, Tailwind, and Web Speech API
      </footer>
    </main>
  );
}
