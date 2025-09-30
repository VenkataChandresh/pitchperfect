import { Question } from "@/types/interfaces";

interface FlashcardProps {
  question: Question;
}

export default function Flashcard({ question }: FlashcardProps) {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2 text-blue-700">
        {question.category} Question
      </h2>
      <p className="text-lg text-gray-900">{question.question}</p>
      <p className="text-sm text-gray-700 mt-2">{question.tips}</p>
    </div>
  );
}
