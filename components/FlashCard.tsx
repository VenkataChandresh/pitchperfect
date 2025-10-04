import { Question } from "@/types/interfaces";

interface FlashcardProps {
  question: Question;
}

export default function Flashcard({ question }: FlashcardProps) {
  return (
    <div className="max-w-md mx-auto bg-[#1e1e1e] shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2 text-blue-400">
        {question.category} Question
      </h2>
      <p className="text-lg text-gray-200">{question.question}</p>
      <p className="text-sm text-gray-400 mt-2">{question.tips}</p>
    </div>
  );
}
