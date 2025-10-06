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
      className={`min-h-screen bg-gradient-to-br from-[#000000] to-[#0a0f1a] text-gray-200 flex flex-col p-8 ${inter.className}`}
    >
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-white">
          PitchPerfect
        </h1>
        <p className="mt-3 text-gray-400 text-lg">
          Practice interviews with real-time speech analysis
        </p>
      </header>

      {/* Main Section */}
      <section className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto gap-8 items-stretch">
        {/* Flashcard Panel */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col h-full bg-black/40 backdrop-blur-md rounded-2xl border border-[#1f2937] p-6 shadow-[0_0_20px_rgba(0,198,255,0.15)]">
            <div className="flex-1">
              <FlashCard question={questions[currentIndex]} />
            </div>

            {/* Buttons */}
            <div className="mt-6 mb-10 flex justify-between">
              <button
                onClick={prevQuestion}
                className="px-5 py-2 rounded-lg bg-white hover:bg-gray-200 text-black font-medium transition-all shadow-[0_0_10px_rgba(255,255,255,0.15)]"
              >
                ⬅ Prev
              </button>
              <button
                onClick={nextQuestion}
                className="px-5 py-2 rounded-lg bg-white hover:bg-gray-200 text-black font-medium transition-all shadow-[0_0_10px_rgba(255,255,255,0.15)]"
              >
                Next ➡
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-[#1f2937]"></div>

        {/* Voice Recorder Panel */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-[#1f2937] p-6 shadow-[0_0_20px_rgba(0,198,255,0.15)] h-full">
            <VoiceRecorder key={currentIndex} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-400 text-sm border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} PitchPerfect — Designed & Developed by{" "}
        <span className="text-blue-400 font-semibold">
          Venkata Chandresh Adapa
        </span>
      </footer>
    </main>
  );
}
