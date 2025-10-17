"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Exam, ExamAnswer } from "../types";
import { ExamTimer } from "./ExamTimer";

interface ExamQuestionsProps {
  exam: Exam;
  currentQuestionIndex: number;
  selectedAnswer: ExamAnswer | undefined;
  timeRemaining: number;
  onAnswerSelect: (questionId: string, optionIndex: number) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onGoToQuestion: (index: number) => void;
}

export function ExamQuestions({
  exam,
  currentQuestionIndex,
  selectedAnswer,
  timeRemaining,
  onAnswerSelect,
  onNextQuestion,
  onPrevQuestion,
  onGoToQuestion,
}: ExamQuestionsProps) {
  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <ExamTimer timeRemaining={timeRemaining} />
      </div>

      {/* Question Navigation */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {exam.questions.map((_, index) => (
          <button
            key={index}
            onClick={() => onGoToQuestion(index)}
            className={cn(
              "w-12 h-12 rounded-full border-2 font-semibold transition-all cursor-pointer",
              index === currentQuestionIndex
                ? "bg-white text-indigo-600 border-white"
                : "bg-transparent text-white border-white/50 hover:border-white"
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
          <h3 className="text-lg font-bold mb-6">
            {currentQuestionIndex + 1}. {currentQuestion.text}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer?.selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => onAnswerSelect(currentQuestion.id, idx)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left cursor-pointer",
                    isSelected
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "bg-white border-gray-200 hover:border-indigo-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0",
                      isSelected ? "bg-white border-white" : "border-gray-300"
                    )}
                  >
                    {isSelected && <div className="w-3 h-3 bg-indigo-500 rounded-sm" />}
                  </div>
                  <span className="font-medium">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              onClick={onPrevQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="gap-2 bg-transparent cursor-pointer hover:bg-gray-100 hover:border-gray-300"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              onClick={onNextQuestion}
              disabled={!selectedAnswer}
              className="gap-2 bg-indigo-600 hover:bg-indigo-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === exam.questions.length - 1 ? "View Results" : "Next"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
