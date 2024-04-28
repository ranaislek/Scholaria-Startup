"use client";
import { usePDFViewer } from "@/contexts/pdf-viewer.context";
import { useRouter } from "next/navigation";

export interface PDF {
  title: string;
  authors: string[];
  pdfUrl: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const cardSize = {
  xs: 250,
  sm: 350,
  md: 400,
  lg: 500,
};

function PDFCard({ title, authors, pdfUrl, size = "sm" }: PDF) {
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
      style={{
        width: `${cardSize[size]}px`,
        height: `${cardSize[size]}px`,
      }}
      className={
        "flex flex-col cursor-pointer bg-white rounded-xl shadow-md overflow-hidden mb-8 "
      }
    >
      <iframe src={embedPdfUrl} title={title} width="100%" height="70%" />

      <div
        className="p-4"
        style={{
          height: "30%",
        }}
      >
        <div className="uppercase tracking-wide text-sm text-primary font-semibold">
          {title}
        </div>
        <p className="mt-2 text-gray-500 overflow-hidden truncate">
          {authors.join(", ")}
        </p>
      </div>
    </div>
  );
}

export default PDFCard;
