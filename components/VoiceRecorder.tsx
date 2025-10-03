"use client";

import { useState, useRef, useEffect } from "react";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptedSpeech, setTranscriptedSpeech] = useState("");
  const [elapsedSec, setElapsedSec] = useState(0);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

    const fillers = words.filter(
      (w) => w.toLowerCase() === "um" || w.toLowerCase() === "uh"
    ).length;

    const minutes = elapsedSec > 0 ? elapsedSec / 60 : 1;
    const wpm = Math.round(wordCount / minutes);

    return { wordCount, fillers, wpm };
  }

  const analysis = analyzeSpeech(transcriptedSpeech, elapsedSec);

  return (
    <div className="mt-6 p-4 bg-gray-900 rounded-xl shadow-md text-white">
      <div className="flex gap-4 mb-4 justify-center">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 transition"
        >
          🎙️ Start
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 transition"
        >
          ⏹️ Stop
        </button>
        <button
          onClick={clearTranscript}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          🧹 Clear
        </button>
      </div>

      <p className="text-center text-lg mb-2">
        Recording:{" "}
        <span className={isRecording ? "text-green-400" : "text-red-400"}>
          {isRecording ? "Yes" : "No"}
        </span>
      </p>

      <div className="mt-4 p-3 bg-gray-800 rounded-lg min-h-[80px] text-sm leading-relaxed overflow-y-auto">
        {transcriptedSpeech || "🎧 Your transcript will appear here..."}
      </div>

      <div className="mt-4 p-3 rounded bg-gray-100 grid grid-cols-3 gap-4 text-black">
        <p>Words: {analysis.wordCount}</p>
        <p>Fillers: {analysis.fillers}</p>
        <p>WPM: {analysis.wpm}</p>
      </div>
    </div>
  );
}
