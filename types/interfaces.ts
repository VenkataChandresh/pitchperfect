export interface Question {
  id: number;
  category: "Behavioral" | "Technical" | "Career";
  question: string;
  tips: string;
}

export interface AnalysisResult {
  wordCount: number;
  fillerCount: number;
  score: number;
  feedback: string[];
  duration?: number;
}

export interface PracticeAttempt {
  questionId: number;
  transcript: string;
  analysis: AnalysisResult;
  timestamp: Date;
}
