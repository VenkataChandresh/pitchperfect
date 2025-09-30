import { Question } from "@/types/interfaces";

export const questions: Question[] = [
  {
    id: 1,
    category: "Behavioral",
    question: "Tell me about yourself.",
    tips: "Keep it under 2 minutes. Highlight strengths and relevant experience.",
  },
  {
    id: 2,
    category: "Behavioral",
    question: "Describe a time you worked in a team.",
    tips: "Use STAR method (Situation, Task, Action, Result).",
  },
  {
    id: 3,
    category: "Technical",
    question: "What is the difference between REST and GraphQL?",
    tips: "Explain in terms of data fetching and flexibility.",
  },
  {
    id: 4,
    category: "Technical",
    question: "Explain how closures work in JavaScript.",
    tips: "Talk about lexical scope and inner functions.",
  },
  {
    id: 5,
    category: "Career",
    question: "Why do you want to work at this company?",
    tips: "Mention company values, culture, and align with your goals.",
  },
];
