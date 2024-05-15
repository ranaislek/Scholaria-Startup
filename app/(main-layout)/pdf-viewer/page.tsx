"use client";
import { usePDFViewer } from "@/contexts/pdf-viewer.context";
import { useRef, useEffect } from "react";

export default function PDFViewerPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { PDFDocumentUrl } = usePDFViewer();

  useEffect(() => {
    const container = containerRef.current;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(
      PDFDocumentUrl
    )}`;

    fetch(proxyUrl)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Network response was not ok.");
      })
      .catch((error) => console.error("Error fetching the PDF:", error));
    if (container && typeof window !== "undefined") {
      import("pspdfkit").then((PSPDFKit: any) => {
        if (PSPDFKit) {
          PSPDFKit.unload(container);
        }

        PSPDFKit.load({
          container,
          document: proxyUrl,
          baseUrl: `${window.location.protocol}//${window.location.host}/`,
        });
      });
    }
  }, [PDFDocumentUrl]);

  return <div ref={containerRef} style={{ height: "100vh", width: "100%" }} />;
}
