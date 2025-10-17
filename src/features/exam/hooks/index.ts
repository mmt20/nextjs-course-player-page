import { useState, useEffect } from "react";
import { Exam, ExamAnswer } from "../types";

export const useExamLogic = (exam: Exam, isOpen: boolean) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ExamAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(exam.duration);
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer logic
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Navigation logic
  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Exam completed
      setIsCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Answer selection logic
  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) => (a.questionId === questionId ? { ...a, selectedOption: optionIndex } : a));
      }
      return [...prev, { questionId, selectedOption: optionIndex }];
    });
  };

  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    exam.questions.forEach((question) => {
      const userAnswer = answers.find((a) => a.questionId === question.id);
      if (userAnswer && userAnswer.selectedOption === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: exam.questions.length,
      percentage: Math.round((correct / exam.questions.length) * 100),
    };
  };

  const resetExam = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimeRemaining(exam.duration);
    setIsCompleted(false);
  };

  return {
    currentQuestionIndex,
    answers,
    timeRemaining,
    isCompleted,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    handleAnswerSelect,
    calculateScore,
    resetExam,
  };
};
