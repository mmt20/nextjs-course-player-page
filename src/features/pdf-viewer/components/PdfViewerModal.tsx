"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Modal, ModalPortal, ModalClose, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { getSafePdfUrl } from "../utils";
import dynamic from "next/dynamic";
const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

interface PdfViewerModalProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function PdfViewerModal({ pdfUrl, isOpen, onClose, title = "PDF Viewer" }: PdfViewerModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
      <ModalPortal>
        <div className="fixed inset-0 z-50 w-full h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 overflow-hidden flex flex-col">
          {/* Hidden title and description for accessibility */}
          <VisuallyHidden.Root>
            <ModalTitle>{title}</ModalTitle>
            <ModalDescription>PDF document viewer</ModalDescription>
          </VisuallyHidden.Root>

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
      </ModalPortal>
    </Modal>
  );
}
