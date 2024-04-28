import React from "react";
import { useRouter } from "next/navigation";
import PDFCard, { PDF } from "./pdf-card";

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

function PDFList({ pdfs, title, subtitle, button }: PDFListProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-start pb-4">
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
      <div className="flex gap-8">
        {pdfs.map((pdf, index) => (
          <PDFCard
            size="md"
            key={index}
            title={pdf.title}
            authors={pdf.authors}
            pdfUrl={pdf.pdfUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default PDFList;
