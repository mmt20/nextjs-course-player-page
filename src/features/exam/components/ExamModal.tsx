"use client";

import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useExamLogic } from "../hooks";
import { formatTime } from "../utils";
import type { Exam } from "../types";

interface ExamModalProps {
  exam: Exam;
  isOpen: boolean;
  onClose: () => void;
}

export function ExamModal({ exam, isOpen, onClose }: ExamModalProps) {
  const {
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
  } = useExamLogic(exam, isOpen);

  if (!isOpen) return null;

  const handleClose = () => {
    resetExam();
    onClose();
  };

  // Results Screen
  if (isCompleted) {
    const score = calculateScore();
    const isPassed = score.percentage >= 60;

    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 overflow-auto">
        <div className="min-h-screen p-4 md:p-8 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-white hover:bg-white/20 cursor-pointer"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-white">Exam Results</h1>
            <div className="w-10" />
          </div>

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
                <Button
                  onClick={() => {
                    resetExam();
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 cursor-pointer"
                >
                  Retake Exam
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 cursor-pointer"
                >
                  Close
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
                const isCorrect = userAnswer?.selectedOption === question.correctAnswer;
                const answered = userAnswer !== undefined;

                return (
                  <div key={question.id} className="bg-white rounded-lg p-6 shadow-lg">
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
                              <span
                                className={cn(
                                  isCorrectAnswer ? "text-green-700" : isWrong ? "text-red-700" : "text-gray-700"
                                )}
                              >
                                {option}
                              </span>
                              {isCorrectAnswer && (
                                <span className="ml-auto text-green-600 font-semibold">Correct Answer</span>
                              )}
                              {isWrong && <span className="ml-auto text-red-600 font-semibold">Your Answer</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {!answered && <p className="ml-12 text-sm text-gray-500 italic mt-2">Not answered</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Questions Screen
  const currentQuestion = exam.questions[currentQuestionIndex];
  const selectedAnswer = answers.find((a) => a.questionId === currentQuestion.id);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 overflow-auto">
      <div className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-6 w-6" />
          </Button>

          <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2">
            <span className="text-lg">⏱</span>
            <span>{formatTime(timeRemaining)}</span>
          </div>

          <div className="w-10" />
        </div>

        {/* Question Navigation */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {exam.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToQuestion(index)}
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
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
            <h3 className="text-lg font-bold mb-6">
              {currentQuestionIndex + 1}. {currentQuestion.text}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer?.selectedOption === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestion.id, index)}
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
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="gap-2 bg-transparent cursor-pointer hover:bg-gray-100 hover:border-gray-300"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <Button
                onClick={nextQuestion}
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
    </div>
  );
}
