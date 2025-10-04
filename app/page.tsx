"use client";

import FlashCard from "@/components/FlashCard";
import VoiceRecorder from "@/components/VoiceRecorder";
import { questions } from "@/data/questions";
import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuestion = () => {
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const prevQuestion = () => {
    setCurrentIndex((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
  };

  return (
    <main
      className={`min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-gray-200 flex flex-col p-8 ${inter.className}`}
    >
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-blue-400 drop-shadow-md">
          🎤 PitchPerfect
        </h1>
        <p className="mt-3 text-gray-400 text-lg">
          Practice interviews with AI-powered feedback
        </p>
      </header>

      <section className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto gap-8">
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-[#242424] shadow-lg rounded-xl p-6 border border-gray-700 flex flex-col h-full">
            <div className="flex-1">
              <FlashCard question={questions[currentIndex]} />
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevQuestion}
                className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium shadow-sm"
              >
                ⬅ Prev
              </button>
              <button
                onClick={nextQuestion}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md"
              >
                Next ➡
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-px bg-gray-700"></div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-[#242424] shadow-lg rounded-xl p-6 border border-gray-700 h-full">
            <VoiceRecorder key={currentIndex} />
          </div>
        </div>
      </section>

      <footer className="mt-12 text-gray-500 text-sm text-center">
        Built with ❤️ using Next.js, TypeScript, Tailwind, and Web Speech API
      </footer>
    </main>
  );
}
