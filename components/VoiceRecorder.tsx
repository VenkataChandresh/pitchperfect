"use client";

import { useState, useRef, useEffect } from "react";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptedSpeech, setTranscriptedSpeech] = useState("");
  const [elapsedSec, setElapsedSec] = useState(0);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  {
    /* all these are tester words */
  }
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

  return (
    <div>
      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition font-medium"
        >
          🎙️ Start
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 transition font-medium"
        >
          ⏹️ Stop
        </button>
        <button
          onClick={clearTranscript}
          className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-gray-200 transition font-medium"
        >
          🧹 Clear
        </button>
      </div>

      <p className="text-center text-lg mb-4 flex items-center justify-center gap-2">
        Recording:{" "}
        <span
          className={
            isRecording
              ? "text-green-400 font-semibold"
              : "text-red-400 font-semibold"
          }
        >
          {isRecording ? "Yes" : "No"}
        </span>
        {isRecording && (
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </p>

      <div className="mt-4 p-4 bg-[#1e1e1e] rounded-lg min-h-[120px] text-sm leading-relaxed overflow-y-auto border border-gray-700">
        {transcriptedSpeech
          ? transcriptedSpeech
              .trim()
              .split(/\s+/)
              .map((word, index) => (
                <span
                  key={index}
                  className={
                    fillerWords.includes(word.toLowerCase())
                      ? "text-red-400 font-semibold"
                      : ""
                  }
                >
                  {word}{" "}
                </span>
              ))
          : "🎧 Your transcript will appear here..."}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-[#1e1e1e] p-4 rounded-lg shadow text-center border border-gray-700">
          <p className="text-gray-400">Words</p>
          <p className="text-2xl font-bold text-gray-100">
            {analysis.wordCount}
          </p>
        </div>
        <div className="bg-[#1e1e1e] p-4 rounded-lg shadow text-center border border-gray-700">
          <p className="text-gray-400">Fillers</p>
          <p className="text-2xl font-bold text-red-400">{analysis.fillers}</p>
        </div>
        <div className="bg-[#1e1e1e] p-4 rounded-lg shadow text-center border border-gray-700">
          <p className="text-gray-400">WPM</p>
          <p className="text-2xl font-bold text-blue-400">{analysis.wpm}</p>
        </div>
      </div>
    </div>
  );
}
