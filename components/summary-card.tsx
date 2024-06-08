import { API_BASE_URL } from "@/api";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import Loader from "./loader";

function SummaryCard({ url, onClose }: { url: string; onClose: () => void }) {
  const [summary, setSummary] = useState("");
  const [typedSummary, setTypedSummary] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cachedSummary = localStorage.getItem(`summary_${url}`);
    if (cachedSummary) {
      setSummary(cachedSummary);
      setIsLoading(false);
    } else {
      const fetchSummary = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`${API_BASE_URL}/workspaces/summary`, {
            method: "POST",
            body: JSON.stringify({ url }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem(`summary_${url}`, data.summary);
            setSummary(data.summary);
          } else {
            throw new Error("Failed to fetch summary");
          }
        } catch (error) {
          console.error("Error fetching the summary:", error);
        }
        setIsLoading(false);
      };
      fetchSummary();
    }
  }, [url]);

  useEffect(() => {
    if (!summary) return;
    setTypedSummary(summary[0]);
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < summary.length - 1) {
        setTypedSummary(
          (prevTypedSummary) => prevTypedSummary + summary[index]
        );
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [summary]);

  return (
    <div className="fixed bottom-10 right-10 w-96 z-50 p-8 bg-white shadow-xl rounded-lg border-primary border-2">
      <button className="absolute top-2 right-2 text-primary" onClick={onClose}>
        <IoCloseCircle size={25} />
      </button>
      <div className="text-xl font-bold mb-2">Summary</div>
      <div className="summary-content">
        {isLoading ? (
          <div className="flex justify-center items-center">
            {" "}
            <Loader />{" "}
          </div>
        ) : (
          typedSummary
        )}
      </div>
    </div>
  );
}

export default SummaryCard;
