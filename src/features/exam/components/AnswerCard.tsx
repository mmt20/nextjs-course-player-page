"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question, ExamAnswer } from "../types";

interface AnswerCardProps {
  question: Question;
  index: number;
  userAnswer: ExamAnswer | undefined;
}

export function AnswerCard({ question, index, userAnswer }: AnswerCardProps) {
  const isCorrect = userAnswer?.selectedOption === question.correctAnswer;
  const answered = userAnswer !== undefined;

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      {/* Question Number and Text */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-full font-semibold flex-shrink-0",
            isCorrect ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          )}
        >
          {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {index + 1}. {question.text}
          </h3>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2 ml-12">
        {question.options.map((option, optionIndex) => {
          const isUserSelected = userAnswer?.selectedOption === optionIndex;
          const isCorrectAnswer = optionIndex === question.correctAnswer;
          const isWrong = isUserSelected && !isCorrectAnswer;

          return (
            <div
              key={optionIndex}
              className={cn(
                "p-3 rounded-lg border-2 text-sm",
                isCorrectAnswer
                  ? "bg-green-50 border-green-300"
                  : isWrong
                  ? "bg-red-50 border-red-300"
                  : "bg-gray-50 border-gray-200"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "font-medium",
                    isCorrectAnswer ? "text-green-600" : isWrong ? "text-red-600" : "text-gray-600"
                  )}
                >
                  {String.fromCharCode(65 + optionIndex)}.
                </span>
                <span className={cn(isCorrectAnswer ? "text-green-700" : isWrong ? "text-red-700" : "text-gray-700")}>
                  {option}
                </span>
                {isCorrectAnswer && <span className="ml-auto text-green-600 font-semibold">Correct Answer</span>}
                {isWrong && <span className="ml-auto text-red-600 font-semibold">Your Answer</span>}
              </div>
            </div>
          );
        })}
      </div>

      {!answered && <p className="ml-12 text-sm text-gray-500 italic mt-2">Not answered</p>}
    </div>
  );
}
