import React from "react";
import PDFCard, { PDF } from "./pdf-card";

export interface PDFGridButtonProps {
  label: string;
  onClick: () => void;
}

export interface PDFGridProps {
  title?: string;
  subtitle?: string;
  button?: PDFGridButtonProps;
  pdfs: PDF[];
}

const PDFGrid: React.FC<PDFGridProps> = ({ pdfs, title, subtitle, button }) => {
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
      <div className="flex flex-wrap gap-x-4 gap-y-2">
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

export default PDFGrid;
