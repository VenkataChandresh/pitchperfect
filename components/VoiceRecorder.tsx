"use client";

import { useState, useRef, useEffect } from "react";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptedSpeech, setTranscriptedSpeech] = useState("");
  const [elapsedSec, setElapsedSec] = useState(0);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fillerWords = [
    "um",
    "uh",
    "like",
    "so",
    "yeah so",
    "basically",
    "actually",
    "well",
    "okay",
    "right",
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map((result: SpeechRecognitionResult) => result[0].transcript)
            .join(" ");
          setTranscriptedSpeech(transcript);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const startRecording = () => {
    if (!isRecording && recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
      setElapsedSec(0);
      timerRef.current = setInterval(() => {
        setElapsedSec((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const clearTranscript = () => {
    setTranscriptedSpeech("");
    setElapsedSec(0);
  };

  function analyzeSpeech(transcript: string, elapsedSec: number) {
    const words = transcript.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const fillers = words.filter((w) =>
      fillerWords.includes(w.toLowerCase())
    ).length;
    const minutes = elapsedSec > 0 ? elapsedSec / 60 : 1;
    const wpm = Math.round(wordCount / minutes);
    return { wordCount, fillers, wpm };
  }

  const analysis = analyzeSpeech(transcriptedSpeech, elapsedSec);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="relative bg-black/40 backdrop-blur-md border border-[#1f2937] rounded-2xl shadow-[0_0_20px_rgba(0,198,255,0.15)] p-6">
      {/* Title */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-[#00c6ff] font-semibold text-lg tracking-wide">
          Speech Analyzer
        </h2>
        <span
          className={`text-sm font-medium ${
            isRecording ? "text-[#22c55e]" : "text-gray-400"
          }`}
        >
          {isRecording ? "● Recording" : "Idle"}
        </span>
      </div>

      {/* Timer */}
      <div className="flex items-center justify-between bg-[#0f0f0f]/80 rounded-xl px-4 py-2 mb-6 border border-[#1f2937]">
        <span className="text-gray-400 text-sm">Timer</span>
        <span className="text-[#00c6ff] font-mono text-lg tracking-widest">
          {formatTime(elapsedSec)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className="flex-1 px-5 py-2 rounded-xl bg-[#00c6ff]/20 text-[#00c6ff] font-semibold border border-[#00c6ff] hover:bg-[#00c6ff]/30 hover:shadow-[0_0_15px_rgba(0,198,255,0.4)] disabled:opacity-40 transition-all"
        >
          🎙 Start
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="flex-1 px-5 py-2 rounded-xl bg-[#ef4444]/20 text-[#ef4444] font-semibold border border-[#ef4444] hover:bg-[#ef4444]/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] disabled:opacity-40 transition-all"
        >
          ⏹ Stop
        </button>
        <button
          onClick={clearTranscript}
          className="flex-1 px-5 py-2 rounded-xl bg-transparent text-gray-300 border border-[#1f2937] hover:bg-[#1f2937]/40 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all"
        >
          🧹 Clear
        </button>
      </div>

      {/* Transcript */}
      <div className="mt-2 p-4 bg-black/30 rounded-xl min-h-[120px] text-sm leading-relaxed overflow-y-auto border border-[#1f2937]">
        {transcriptedSpeech ? (
          transcriptedSpeech
            .trim()
            .split(/\s+/)
            .map((word, index) => (
              <span
                key={index}
                className={
                  fillerWords.includes(word.toLowerCase())
                    ? "text-[#00c6ff] font-semibold"
                    : "text-gray-200"
                }
              >
                {word}{" "}
              </span>
            ))
        ) : (
          <span className="text-gray-500">
            Your transcript will appear here...
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-black/30 p-4 rounded-xl text-center border border-[#1f2937]">
          <p className="text-gray-500 text-sm">Words</p>
          <p className="text-2xl font-semibold text-gray-100">
            {analysis.wordCount}
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded-xl text-center border border-[#1f2937]">
          <p className="text-gray-500 text-sm">Fillers</p>
          <p className="text-2xl font-semibold text-[#00c6ff]">
            {analysis.fillers}
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded-xl text-center border border-[#1f2937]">
          <p className="text-gray-500 text-sm">WPM</p>
          <p className="text-2xl font-semibold text-[#00c6ff]">
            {analysis.wpm}
          </p>
        </div>
      </div>
    </div>
  );
}
