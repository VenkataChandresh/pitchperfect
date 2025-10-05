import { Question } from "@/types/interfaces";

interface FlashcardProps {
  question: Question;
}

export default function Flashcard({ question }: FlashcardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-black/40 backdrop-blur-md border border-[#1f2937] rounded-2xl p-8 shadow-[0_0_25px_rgba(0,198,255,0.15)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,198,255,0.25)]">
      <h2 className="text-[#00c6ff] font-semibold text-2xl tracking-wide mb-4">
        {question.category} Question
      </h2>
      <p className="text-lg text-gray-200 leading-relaxed">
        {question.question}
      </p>
      <p className="text-base text-gray-500 mt-4 italic">💡 {question.tips}</p>
    </div>
  );
}
