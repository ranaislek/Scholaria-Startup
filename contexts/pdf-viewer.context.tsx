"use client";
import React, { useEffect } from "react";

type ISPDFViewer = {
  PDFDocumentUrl: string;
  setPDFDocumentUrl: (value: string) => void;
};

const PDFViewerContext = React.createContext<ISPDFViewer>({
  PDFDocumentUrl: "",
  setPDFDocumentUrl: () => null,
});

const usePDFViewer = () => React.useContext(PDFViewerContext);

const PDFViewerProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [PDFDocumentUrl, setPDFDocumentUrl] = React.useState("");

  return (
    <PDFViewerContext.Provider value={{ PDFDocumentUrl, setPDFDocumentUrl }}>
      {children}
    </PDFViewerContext.Provider>
  );
};

export { PDFViewerContext, PDFViewerProvider, usePDFViewer };
