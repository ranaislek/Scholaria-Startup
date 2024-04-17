"use client";
import PDFList from "@/components/pdf-list";

const App: React.FC = () => {
  const pdfs = [
    {
      title: "Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
    {
      title: "Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
    {
      title: "Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
    {
      title: "Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
  ];

  return (
    <div className="p-6">
      <PDFList pdfs={pdfs} />
    </div>
  );
};

export default App;
