"use client";
import { usePDFViewer } from "@/contexts/pdf-viewer.context";
import { useWorkspace } from "@/contexts/workspace.context";
import { Paper } from "@/models/paper";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RiCheckboxLine } from "react-icons/ri";
import { RiCheckboxFill } from "react-icons/ri";

export const cardSize = {
  xs: 250,
  sm: 350,
  md: 400,
  lg: 500,
};

function PaperCard({
  title,
  authors = [],
  pdf = "https://arxiv.org/pdf/2404.10019.pdf",
  isSelectable,
  isCompleted,
  publicationDate,
  size = "sm",
  id,
}: Paper) {
  const ensureHttpsUrl = (url: string) => {
    const parsedUrl = new URL(url);
    parsedUrl.protocol = "https:";
    return parsedUrl.toString();
  };

  const embedPdfUrl = ensureHttpsUrl(pdf + "#toolbar=0&page=1");

  const { isPaperSelected, togglePaperSelect, selectedPapersIds } =
    useWorkspace();
  const { setPDFDocumentUrl } = usePDFViewer();
  const router = useRouter();
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const openPaperViewer = () => {
    setPDFDocumentUrl(pdf);
    router.push("/pdf-viewer");
  };

  useEffect(() => {
    setIsSelected(isPaperSelected(id));
  }, [id, isPaperSelected, selectedPapersIds.length]);

  return (
    <div
      style={{
        width: `${cardSize[size]}px`,
        height: `${cardSize[size] * 1.3}px`,
      }}
      className={
        "relative flex flex-col cursor-pointer bg-white rounded-xl shadow-md overflow-hidden mb-8 "
      }
    >
      <iframe
        onClick={openPaperViewer}
        src={embedPdfUrl}
        title={title}
        width="100%"
        height="70%"
      />

      <div
        onClick={openPaperViewer}
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
        <p className="mt-2 text-gray-300 overflow-hidden text-xs">
          Uploaded on {publicationDate?.toDateString()}
        </p>
      </div>
      {isSelectable && (
        <div
          onClick={() => togglePaperSelect(id)}
          className="absolute top-2 right-2 text-primary"
        >
          {!isSelected && (
            <RiCheckboxLine
              size={25}
              className="opacity-25 hover:opacity-100"
            />
          )}
          {isSelected && (
            <RiCheckboxFill
              size={25}
              className="hover:opacity-75 opacity-100"
            />
          )}
        </div>
      )}
      {isCompleted && (
        <div className="absolute text-sm bottom-2 right-2 text-green-500 bg-green-200 rounded-sm px-2 py-1">
          Completed
        </div>
      )}
    </div>
  );
}

export default PaperCard;
