"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalClose } from "@/components/ui/modal";
import { useExamLogic } from "../hooks";
import type { Exam } from "../types";
import { ExamQuestions } from "./ExamQuestions";
import { ExamAnswers } from "./ExamAnswers";

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

  const handleClose = () => {
    resetExam();
    onClose();
  };

  const currentQuestion = exam.questions[currentQuestionIndex];
  const selectedAnswer = answers.find((a) => a.questionId === currentQuestion?.id);
  const score = calculateScore();

  return (
    <Modal open={isOpen} onOpenChange={handleClose}>
      <ModalContent className="fixed inset-0 z-50 w-full max-w-none max-h-none translate-x-0 translate-y-0 top-0 left-0 overflow-auto">
        {/* Close Button */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
          <ModalClose asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 cursor-pointer">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </ModalClose>
        </div>

        {/* Content */}
        {isCompleted ? (
          <ExamAnswers exam={exam} answers={answers} score={score} onRetake={resetExam} />
        ) : (
          <ExamQuestions
            exam={exam}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            timeRemaining={timeRemaining}
            onAnswerSelect={handleAnswerSelect}
            onNextQuestion={nextQuestion}
            onPrevQuestion={prevQuestion}
            onGoToQuestion={goToQuestion}
          />
        )}
      </ModalContent>
    </Modal>
  );
}
