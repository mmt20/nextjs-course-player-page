import { Exam } from "./types";

export const mockExam: Exam = {
  id: "exam-1",
  title: "Return Values From Functions",
  duration: 600, // 10 minutes in seconds
  questions: [
    {
      id: "q1",
      text: "Among the following status of India, which one has the oldest rock formations in the country?",
      options: ["Asam", "Bahar", "Kamaltake", "Utter Pradesh"],
      correctAnswer: 1,
    },
    {
      id: "q2",
      text: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
    },
    {
      id: "q3",
      text: "Which programming language is known for web development?",
      options: ["Python", "JavaScript", "C++", "Java"],
      correctAnswer: 1,
    },
    {
      id: "q4",
      text: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
      ],
      correctAnswer: 0,
    },
    {
      id: "q5",
      text: "Which company developed React?",
      options: ["Google", "Facebook", "Microsoft", "Apple"],
      correctAnswer: 1,
    },
  ],
};

// Utility function to format time in MM:SS format
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};
