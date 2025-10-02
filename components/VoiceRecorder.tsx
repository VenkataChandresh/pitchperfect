"use client";

import { useState, useRef, useEffect } from "react";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptedSpeech, setTranscriptedSpeech] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

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
            .join("");
          setTranscriptedSpeech(transcript);
        };
        recognitionRef.current = recognition;
      }
    }
  }, []);

  const startRecording = () => {
    recognitionRef.current?.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    setTranscriptedSpeech("");
  };

  return (
    <div className="mt-6 p-4 bg-gray-900 rounded-xl shadow-md text-white">
      {/* Buttons */}
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
      </div>

      {/* Status */}
      <p className="text-center text-lg mb-2">
        Recording:{" "}
        <span className={isRecording ? "text-green-400" : "text-red-400"}>
          {isRecording ? "Yes" : "No"}
        </span>
      </p>

      {/* Transcript */}
      <div className="mt-4 p-3 bg-gray-800 rounded-lg min-h-[80px] text-sm leading-relaxed overflow-y-auto">
        {transcriptedSpeech || "🎧 Your transcript will appear here..."}
      </div>
    </div>
  );
}
