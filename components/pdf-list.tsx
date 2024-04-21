import { usePDFViewer } from "@/contexts/pdf-viewer.context";
import React from "react";
import { useRouter } from "next/navigation";

interface PDF {
  title: string;
  authors: string[];
  pdfUrl: string;
}

const PDFCard: React.FC<PDF> = ({ title, authors, pdfUrl }) => {
  const embedPdfUrl = pdfUrl + "#toolbar=0&page=1";

  const { setPDFDocumentUrl } = usePDFViewer();
  const router = useRouter();

  const openPDFViewer = () => {
    setPDFDocumentUrl(pdfUrl);
    router.push("/pdf-viewer");
  };

  return (
    <div
      onClick={openPDFViewer}
      className="cursor-pointer max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-sm mb-8"
    >
      <div className="md:flex flex-col">
        <iframe src={embedPdfUrl} title={title} width="100%" height="300" />

        <div className="p-4">
          <div className="uppercase tracking-wide text-sm text-primary font-semibold">
            {title}
          </div>
          <p className="mt-2 text-gray-500">{authors.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export interface PDFListButtonProps {
  label: string;
  onClick: () => void;
}

export interface PDFListProps {
  title: string;
  subtitle?: string;
  button?: PDFListButtonProps;
  pdfs: PDF[];
}

const PDFList: React.FC<PDFListProps> = ({ pdfs, title, subtitle, button }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-start py-4">
        <div className="flex flex-col">
          <div className="text-2xl font-bold">{title}</div>
          {subtitle && <div className="text-gray-500">{subtitle}</div>}
        </div>
        {button && (
          <div
            className="cursor-pointer rounded-full py-2 px-4 text-gray-500 bg-gray-200 hover:bg-opacity-75"
            onClick={button.onClick}
          >
            {button.label}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pdfs.map((pdf, index) => (
          <PDFCard
            key={index}
            title={pdf.title}
            authors={pdf.authors}
            pdfUrl={pdf.pdfUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default PDFList;
