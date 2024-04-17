import { useRef, useEffect } from "react";

export default function PDFViewerPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && typeof window !== "undefined") {
      import("pspdfkit").then((PSPDFKit: any) => {
        if (PSPDFKit) {
          PSPDFKit.unload(container);
        }

        PSPDFKit.load({
          container,
          document: "/document.pdf",
          baseUrl: `${window.location.protocol}//${window.location.host}/`,
        });
      });
    }
  }, []);

  return <div ref={containerRef} style={{ height: "100vh" }} />;
}
