"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Exam, ExamAnswer } from "../types";
import { AnswerCard } from "./AnswerCard";

interface Score {
  correct: number;
  total: number;
  percentage: number;
}

interface ExamAnswersProps {
  exam: Exam;
  answers: ExamAnswer[];
  score: Score;
  onRetake: () => void;
}

export function ExamAnswers({ exam, answers, score, onRetake }: ExamAnswersProps) {
  const isPassed = score.percentage >= 60;

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col">
      {/* Score Card */}
      <div className="max-w-2xl mx-auto w-full mb-8">
        <div
          className={cn(
            "rounded-2xl p-8 md:p-12 shadow-2xl text-center",
            isPassed ? "bg-gradient-to-br from-green-50 to-emerald-50" : "bg-gradient-to-br from-red-50 to-rose-50"
          )}
        >
          <div className="flex justify-center mb-6">
            {isPassed ? (
              <CheckCircle className="h-20 w-20 text-green-500" />
            ) : (
              <XCircle className="h-20 w-20 text-red-500" />
            )}
          </div>

          <h2 className={cn("text-3xl font-bold mb-2", isPassed ? "text-green-600" : "text-red-600")}>
            {isPassed ? "Great Job! 🎉" : "Need More Practice"}
          </h2>

          <p className="text-gray-600 mb-8 text-lg">You scored:</p>

          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <div className="text-5xl font-bold text-indigo-600 mb-2">{score.percentage}%</div>
            <div className="text-gray-600">
              <span className="font-semibold text-lg">{score.correct}</span>
              <span className="text-gray-500"> out of </span>
              <span className="font-semibold text-lg">{score.total}</span>
              <span className="text-gray-500"> questions correct</span>
            </div>
          </div>

          <p className={cn("text-sm mb-8", isPassed ? "text-green-600" : "text-red-600")}>
            {isPassed
              ? "You have successfully completed this exam! Congratulations!"
              : "You need 60% to pass. Review the material and try again."}
          </p>

          <div className="flex gap-4 justify-center">
            <Button onClick={onRetake} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 cursor-pointer">
              Retake Exam
            </Button>
          </div>
        </div>
      </div>

      {/* Answers Review */}
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Review Your Answers</h2>

        <div className="space-y-4">
          {exam.questions.map((question, index) => {
            const userAnswer = answers.find((a) => a.questionId === question.id);

            return <AnswerCard key={question.id} question={question} index={index} userAnswer={userAnswer} />;
          })}
        </div>
      </div>
    </div>
  );
}
