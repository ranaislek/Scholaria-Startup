"use client";
import { API_BASE_URL } from "@/api";
import PaperCarousel, { PaperCarouselProps } from "@/components/paper-carousel";
import PlaceholderCard from "@/components/placeholder-card";
import { useAuth } from "@/contexts/auth.context";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const { user } = useAuth();
  const [sections, setSections] = useState<PaperCarouselProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHomeData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/home`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data && data.length > 0) {
        setSections(data);
      } else {
        setSections([]);
      }
      setIsLoading(false);
    };
    fetchHomeData();
  }, []);

  return (
    <div className="p-6">
      {isLoading ? (
        <>
          <div className="p-4 pt-8">
            <div className="w-80 h-4 bg-gray-200 mb-2"></div>
            <div className="w-64 h-4 bg-gray-200 mb-2"></div>
          </div>
          <div className="flex flex-wrap gap-8">
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
          </div>
          <div className="p-4 pt-8">
            <div className="w-80 h-4 bg-gray-200 mb-2"></div>
            <div className="w-64 h-4 bg-gray-200 mb-2"></div>
          </div>
          <div className="flex flex-wrap gap-8">
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
          </div>
        </>
      ) : (
        sections?.map((s, index) => <PaperCarousel key={index} {...s} />)
      )}
    </div>
  );
};

export default App;
