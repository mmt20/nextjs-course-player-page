"use client";

import { useState } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalClose, ModalTitle, ModalDescription } from "@/components/ui/modal";

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AskQuestionModal({ isOpen, onClose }: AskQuestionModalProps) {
  const [question, setQuestion] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    // Submit question logic here
    console.log("Question submitted:", question);
    setQuestion("");
    onClose();
  };

  return (
    <Modal open={isOpen} onOpenChange={handleClose}>
      <ModalContent className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Hidden title and description for accessibility */}
        <VisuallyHidden.Root>
          <ModalTitle>Ask a Question</ModalTitle>
          <ModalDescription>Submit your question to get help from the community</ModalDescription>
        </VisuallyHidden.Root>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-lg">
          <h2 className="text-2xl font-bold">Ask a Question</h2>
          <ModalClose asChild>
            <Button className="cursor-pointer" variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </ModalClose>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Question</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Write your question here..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                rows={6}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button className="cursor-pointer" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!question.trim()}
                className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer"
              >
                Submit Question
              </Button>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
