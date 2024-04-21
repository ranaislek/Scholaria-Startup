import React from "react";

interface PDF {
  title: string;
  authors: string[];
  pdfUrl: string;
}

const PDFCard: React.FC<PDF> = ({ title, authors, pdfUrl }) => {
  const embedPdfUrl = pdfUrl + "#toolbar=0&page=1";

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-sm mb-8">
      <div className="md:flex flex-col">
        <iframe src={embedPdfUrl} title={title} width="100%" height="300" />

        <div className="p-2">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {title}
          </div>
          <p className="mt-2 text-gray-500">{authors.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

interface PDFListProps {
  pdfs: PDF[];
}

const PDFList: React.FC<PDFListProps> = ({ pdfs }) => {
  return (
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
  );
};

export default PDFList;
