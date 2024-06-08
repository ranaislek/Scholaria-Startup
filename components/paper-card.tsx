"use client";
import { API_BASE_URL } from "@/api";
import { usePDFViewer } from "@/contexts/pdf-viewer.context";
import { useWorkspace } from "@/contexts/workspace.context";
import { Paper } from "@/models/paper";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RiCheckboxLine } from "react-icons/ri";
import { RiCheckboxFill } from "react-icons/ri";
import LoaderGif from "@/assets/200w.gif";
import Image from "next/image";
import SummaryCard from "./summary-card";
import { PiSparkleFill } from "react-icons/pi";

export const cardSize = {
  xs: 250,
  sm: 350,
  md: 400,
  lg: 500,
};

function PDFViewer({ url }: { url: string }) {
  const [pdfUrl, setPDFUrl] = useState("");

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (response.ok) {
          setPDFUrl(proxyUrl);
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        console.error("Error fetching the PDF:", error);
      }
    };

    fetchPDF();
  }, [url]);

  return (
    <div className="flex justify-center items-center w-full h-[50vh]">
      {pdfUrl.length > 0 ? (
        <iframe
          src={pdfUrl + "#toolbar=0&navpanes=0&page=1"}
          title={url}
          className="w-full h-full border-none"
        />
      ) : (
        <Image src={LoaderGif.src} alt={""} width={100} height={100} />
      )}{" "}
    </div>
  );
}

function PaperCard({
  title,
  abstract,
  authors = [],
  pdf,
  isSelectable,
  isCompleted,
  publicationDate,
  size = "sm",
  _id,
}: Paper) {
  const { isPaperSelected, togglePaperSelect, selectedPapersIds } =
    useWorkspace();
  const { setPDFDocumentUrl } = usePDFViewer();
  const router = useRouter();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState(false);

  const openPaperViewer = () => {
    setPDFDocumentUrl(pdf ?? getRandomPDF());
    router.push("/pdf-viewer");
  };

  const logUserActivity = async () => {
    const token = localStorage.getItem("token");
    const res1 = await fetch(`${API_BASE_URL}/user/activity`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type: "READ_PAPER", paperId: _id }),
    });
  };

  const handlePaperCardClick = () => {
    logUserActivity();
    openPaperViewer();
  };

  useEffect(() => {
    setIsSelected(isPaperSelected(_id));
  }, [_id, isPaperSelected, selectedPapersIds.length]);

  return (
    <>
      <div
        style={{
          width: `${cardSize[size]}px`,
          height: `${cardSize[size] * 1.3}px`,
        }}
        className={
          "relative flex flex-col cursor-pointer bg-white rounded-xl shadow-md overflow-hidden mb-8 "
        }
      >
        <PDFViewer url={pdf ?? getRandomPDF()} />
        <div
          onClick={handlePaperCardClick}
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
          {publicationDate && (
            <p className="mt-2 text-gray-300 overflow-hidden text-xs">
              {new Date(publicationDate).toDateString()}
            </p>
          )}
        </div>
        <div
          onClick={() => setShowSummary(true)}
          className="opacity-25 hover:opacity-100 absolute top-2 right-2 text-primary flex border-primary border-2 p-1 rounded-md"
        >
          Ask AI
          <PiSparkleFill size={25} className="" />
        </div>
        {/* {isSelectable && (
          <div
            onClick={() => togglePaperSelect(_id)}
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
        )} */}
        {isCompleted && (
          <div className="absolute text-sm bottom-2 right-2 text-green-500 bg-green-200 rounded-sm px-2 py-1">
            Completed
          </div>
        )}
      </div>
      {showSummary && pdf && (
        <SummaryCard url={pdf} onClose={() => setShowSummary(false)} />
      )}
    </>
  );
}

export default PaperCard;

const getRandomPDF = () => {
  const list = [
    "https://arxiv.org/pdf/0704.0251",
    "https://arxiv.org/pdf/0704.0254",
    "https://arxiv.org/pdf/0704.0266",
    "https://arxiv.org/pdf/0704.0270",
    "https://arxiv.org/pdf/0704.0274",
    "https://arxiv.org/pdf/0704.0278",
    "https://arxiv.org/pdf/0704.0284",
    "https://arxiv.org/pdf/0704.0289",
    "https://arxiv.org/pdf/0704.0290",
    "https://arxiv.org/pdf/0704.0291",
    "https://arxiv.org/pdf/0704.0293",
    "https://arxiv.org/pdf/0704.0297",
  ];

  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};
