"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Modal, ModalContent, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { getSafePdfUrl } from "../utils";
import PdfViewer from "./PdfViewer";

interface PdfViewerModalProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function PdfViewerModal({ pdfUrl, isOpen, onClose, title = "PDF Viewer" }: PdfViewerModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle URL changes
  useEffect(() => {
    if (isOpen) {
      const current = new URLSearchParams(searchParams.toString());
      current.set("PdfId", title);
      router.replace(`?${current.toString()}`);
    }
  }, [isOpen, title, router, searchParams]);

  const handleClose = () => {
    const current = new URLSearchParams(searchParams.toString());
    current.delete("PdfId");
    router.replace(`?${current.toString()}`);
    onClose();
  };

  if (!isOpen) return null;

  const safePdfUrl = getSafePdfUrl(pdfUrl);

  return (
    <Modal open={isOpen} onOpenChange={handleClose}>
      <ModalContent className="fixed inset-0 z-50 w-full h-screen max-w-none max-h-none translate-x-0 translate-y-0 top-0 left-0 overflow-hidden p-0">
        <div className="w-full h-full flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 md:px-8 bg-black/20 backdrop-blur-sm flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-bold text-white flex-1 truncate pr-4">{title}</h1>
            <ModalClose asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 cursor-pointer flex-shrink-0">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </ModalClose>
          </div>

          {/* PDF Viewer */}
          <PdfViewer fileUrl={safePdfUrl} />
        </div>
      </ModalContent>
    </Modal>
  );
}
