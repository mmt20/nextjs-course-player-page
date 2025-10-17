export interface Exam {
  id: string;
  title: string;
  duration: number; // in seconds
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface ExamAnswer {
  questionId: string;
  selectedOption: number;
}
