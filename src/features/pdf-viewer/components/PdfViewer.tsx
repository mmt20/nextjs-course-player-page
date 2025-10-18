"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PdfViewerProps {
  fileUrl: string;
}

export default function PdfViewer({ fileUrl }: PdfViewerProps) {
  // Version-matched CDN worker URL
  const workerUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.15.349/pdf.worker.min.js";

  return (
    <Worker workerUrl={workerUrl}>
      <div className="w-full h-full">
        <Viewer fileUrl={fileUrl} />
      </div>
    </Worker>
  );
}
