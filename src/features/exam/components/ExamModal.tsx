"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Modal, ModalPortal, ModalClose, ModalTitle, ModalDescription } from "@/components/ui/modal";
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
  const router = useRouter();
  const searchParams = useSearchParams();

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

  useEffect(() => {
    if (isOpen) {
      const current = new URLSearchParams(searchParams.toString());
      current.set("ExamId", exam.id);
      router.replace(`?${current.toString()}`);
    }
  }, [isOpen, exam.id, router, searchParams]);

  const handleClose = () => {
    resetExam();
    const current = new URLSearchParams(searchParams.toString());
    current.delete("ExamId");
    router.replace(`?${current.toString()}`);
    onClose();
  };

  const currentQuestion = exam.questions[currentQuestionIndex];
  const selectedAnswer = answers.find((a) => a.questionId === currentQuestion?.id);
  const score = calculateScore();

  return (
    <Modal open={isOpen} onOpenChange={handleClose}>
      <ModalPortal>
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 overflow-auto flex flex-col">
          {/* Hidden accessibility elements */}
          <VisuallyHidden.Root>
            <ModalTitle>{isCompleted ? `Exam Results: ${exam.title}` : `Exam: ${exam.title}`}</ModalTitle>
            <ModalDescription>
              {isCompleted ? "Review your exam answers and score" : "Complete the exam questions"}
            </ModalDescription>
          </VisuallyHidden.Root>

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
        </div>
      </ModalPortal>
    </Modal>
  );
}
