"use client";
import { API_BASE_URL } from "@/api";
import PaperCarousel, { PaperCarouselProps } from "@/components/paper-carousel";
import PlaceholderCard from "@/components/placeholder-card";
import { useAuth } from "@/contexts/auth.context";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const sectionsList: PaperCarouselProps[] = [
    {
      title: "Continue Reading",
      subtitle: "Papers you read in the past week",
      button: {
        label: "See all",
        onClick: () => {},
      },
      papers: [
        {
          title: "Test of Fine-Tuning GPT by Astrophysical Data",
          authors: ["Yu Wang", "Shu-Rui Zhang"],
          pdf: "https://arxiv.org/pdf/2404.10019.pdf",
          _id: "",
          publicationDate: new Date(),
        },
        {
          title: "On the Content Bias in Frechet Video Distance",
          authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
          pdf: "https://arxiv.org/pdf/2404.12391.pdf",
          _id: "",
          publicationDate: new Date(),
        },
        {
          title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
          authors: [
            "Junyu Xie",
            "Charig Yang",
            "Weidi Xie",
            "Andrew Zisserman",
          ],
          pdf: "https://arxiv.org/pdf/2404.12389.pdf",
          _id: "",
          publicationDate: new Date(),
        },
      ],
    },
    {
      title: "New Papers in Computer Science",
      subtitle: "Papers you might be interested in",
      button: {
        label: "More",
        onClick: () => {},
      },
      papers: [
        {
          title: "Test of Fine-Tuning GPT by Astrophysical Data",
          authors: ["Yu Wang", "Shu-Rui Zhang"],
          pdf: "https://arxiv.org/pdf/2404.10019.pdf",
          _id: "",
          publicationDate: new Date(),
        },
        {
          title: "On the Content Bias in Frechet Video Distance",
          authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
          pdf: "https://arxiv.org/pdf/2404.12391.pdf",
          _id: "",
          publicationDate: new Date(),
        },
        {
          title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
          authors: [
            "Junyu Xie",
            "Charig Yang",
            "Weidi Xie",
            "Andrew Zisserman",
          ],
          pdf: "https://arxiv.org/pdf/2404.12389.pdf",
          _id: "",
          publicationDate: new Date(),
        },
      ],
    },
    {
      title: "Continue Reading",
      subtitle: "Papers you read in the past week",
      button: {
        label: "See all",
        onClick: () => {},
      },
      papers: [
        {
          title: "Test of Fine-Tuning GPT by Astrophysical Data",
          authors: ["Yu Wang", "Shu-Rui Zhang"],
          pdf: "https://arxiv.org/pdf/2404.10019.pdf",
          _id: "",
          publicationDate: new Date(),
        },
        {
          title: "On the Content Bias in Frechet Video Distance",
          authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
          pdf: "https://arxiv.org/pdf/2404.12391.pdf",
          _id: "",
          publicationDate: new Date(),
        },
        {
          title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
          authors: [
            "Junyu Xie",
            "Charig Yang",
            "Weidi Xie",
            "Andrew Zisserman",
          ],
          pdf: "https://arxiv.org/pdf/2404.12389.pdf",
          _id: "",
          publicationDate: new Date(),
        },
      ],
    },
    {
      title: "New Papers in Computer Science",
      subtitle: "Papers you might be interested in",
      button: {
        label: "More",
        onClick: () => {},
      },
      papers: [
        {
          title: "Test of Fine-Tuning GPT by Astrophysical Data",
          authors: ["Yu Wang", "Shu-Rui Zhang"],
          pdf: "https://arxiv.org/pdf/2404.10019.pdf",
          _id: "",
          publicationDate: new Date(),
        },
        {
          title: "On the Content Bias in Frechet Video Distance",
          authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
          pdf: "https://arxiv.org/pdf/2404.12391.pdf",
          _id: "",
          publicationDate: new Date(),
        },
        {
          title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
          authors: [
            "Junyu Xie",
            "Charig Yang",
            "Weidi Xie",
            "Andrew Zisserman",
          ],
          pdf: "https://arxiv.org/pdf/2404.12389.pdf",
          _id: "",
          publicationDate: new Date(),
        },
      ],
    },
  ];
  const { user } = useAuth();
  const [sections, setSections] = useState<PaperCarouselProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/home`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setSections(await res.json());
      setIsLoading(false);
    };
    fetchHomeData();
  }, [user]);
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
        sections.map((s, index) => <PaperCarousel key={index} {...s} />)
      )}
    </div>
  );
};

export default App;
