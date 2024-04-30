"use client";
import PaperCarousel, { PaperCarouselProps } from "@/components/paper-carousel";

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
          pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
          id: "",
          uploadDate: new Date(),
        },
        {
          title: "On the Content Bias in Frechet Video Distance",
          authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
          pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
          id: "",
          uploadDate: new Date(),
        },
        {
          title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
          authors: [
            "Junyu Xie",
            "Charig Yang",
            "Weidi Xie",
            "Andrew Zisserman",
          ],
          pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
          id: "",
          uploadDate: new Date(),
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
          pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
          id: "",
          uploadDate: new Date(),
        },
        {
          title: "On the Content Bias in Frechet Video Distance",
          authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
          pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
          id: "",
          uploadDate: new Date(),
        },
        {
          title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
          authors: [
            "Junyu Xie",
            "Charig Yang",
            "Weidi Xie",
            "Andrew Zisserman",
          ],
          pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
          id: "",
          uploadDate: new Date(),
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
          pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
          id: "",
          uploadDate: new Date(),
        },
        {
          title: "On the Content Bias in Frechet Video Distance",
          authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
          pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
          id: "",
          uploadDate: new Date(),
        },
        {
          title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
          authors: [
            "Junyu Xie",
            "Charig Yang",
            "Weidi Xie",
            "Andrew Zisserman",
          ],
          pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
          id: "",
          uploadDate: new Date(),
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
          pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
          id: "",
          uploadDate: new Date(),
        },
        {
          title: "On the Content Bias in Frechet Video Distance",
          authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
          pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
          id: "",
          uploadDate: new Date(),
        },
        {
          title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
          authors: [
            "Junyu Xie",
            "Charig Yang",
            "Weidi Xie",
            "Andrew Zisserman",
          ],
          pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
          id: "",
          uploadDate: new Date(),
        },
      ],
    },
  ];

  return (
    <div className="p-6">
      {sectionsList.map((s, index) => (
        <PaperCarousel key={index} {...s} />
      ))}
    </div>
  );
};

export default App;
