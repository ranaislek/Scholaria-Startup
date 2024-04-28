"use client";
import PDFGrid from "@/components/pdf-grid";
import { BsFilter } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GoCheckCircle } from "react-icons/go";
import { PiSortAscendingBold } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { PDF } from "@/components/pdf-card";
import Loader from "@/components/loader";
function WorkspacePage({ params }: { params: { id: string } }) {
  const [workspacePapers, setWorkspacePapers] = useState([
    {
      id: "2",
      date: new Date(),
      isCompleted: false,
      title: "B On the Content Bias in Frechet Video Distance",
      authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
      pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
    },
    {
      id: "4",
      date: new Date(),
      isCompleted: false,
      title: "D Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
    {
      id: "5",
      date: new Date(),
      isCompleted: false,
      title: "On the Content Bias in Frechet Video Distance",
      authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
      pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
    },
    {
      id: "6",
      date: new Date(),
      isCompleted: false,
      title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
      authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
      pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
    },
    {
      id: "3",
      date: new Date(),
      isCompleted: false,
      title: "C Moving Object Segmentation: All You Need Is SAM (and Flow)",
      authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
      pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
    },
    {
      id: "7",
      date: new Date(),
      isCompleted: false,
      title: "Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
    {
      id: "8",
      date: new Date(),
      isCompleted: false,
      title: "On the Content Bias in Frechet Video Distance",
      authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
      pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
    },
    {
      id: "9",
      date: new Date(),
      isCompleted: false,
      title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
      authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
      pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
    },
    {
      id: "10",
      date: new Date(),
      isCompleted: false,
      title: "Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
    {
      id: "11",
      date: new Date(),
      isCompleted: false,
      title: "On the Content Bias in Frechet Video Distance",
      authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
      pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
    },
    {
      id: "12",
      date: new Date(),
      isCompleted: false,
      title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
      authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
      pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
    },
    {
      id: "13",
      date: new Date(),
      isCompleted: false,
      title: "Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
    {
      id: "1",
      date: new Date(),
      isCompleted: false,
      title: "A Test of Fine-Tuning GPT by Astrophysical Data",
      authors: ["Yu Wang", "Shu-Rui Zhang"],
      pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
    },
    {
      id: "14",
      date: new Date(),
      isCompleted: false,
      title: "On the Content Bias in Frechet Video Distance",
      authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
      pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
    },
    {
      id: "15",
      date: new Date(),
      isCompleted: false,
      title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
      authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
      pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
    },
  ]);

  const filtersRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // TODO: Move this to a context
  const [selectedPapersIds, setSelectedPapersIds] = useState<string[]>([
    "some_paper_id",
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isSortListOpen, setIsSortListOpen] = useState<boolean>(false);

  const toggleSortList = () => {
    setIsSortListOpen(!isSortListOpen);
  };

  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const markAsCompleted = () => {
    setIsLoading(true);

    setTimeout(() => {
      setWorkspacePapers((prevPapers) => {
        return prevPapers.map((paper) => {
          if (selectedPapersIds.includes(paper.id)) {
            return { ...paper, isCompleted: true };
          }
          return paper;
        });
      });
      setIsLoading(false);
    }, 1000);
  };

  const removeFromWorkspace = () => {
    setIsLoading(true);

    setTimeout(() => {
      setWorkspacePapers((prevPapers) => {
        return prevPapers.filter(
          (paper) => !selectedPapersIds.includes(paper.id)
        );
      });
      setIsLoading(false);
    }, 1000);
  };

  const orderAlphatically = () => {
    setIsLoading(true);

    setTimeout(() => {
      setWorkspacePapers((prevPapers) => {
        return [...prevPapers].sort((a, b) => a.title.localeCompare(b.title));
      });
      setIsLoading(false);
    }, 1000);
  };

  const orderFromNewToOld = () => {
    setIsLoading(true);

    setTimeout(() => {
      setWorkspacePapers((prevPapers) => {
        return [...prevPapers].sort(
          (a, b) => b.date.getTime() - a.date.getTime()
        );
      });
      setIsLoading(false);
    }, 1000);
  };

  const orderFromOldToNew = () => {
    setIsLoading(true);

    setTimeout(() => {
      setWorkspacePapers((prevPapers) => {
        return [...prevPapers].sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        );
      });
      setIsLoading(false);
    }, 1000);
  };

  const showCompletedOnly = () => {
    setIsLoading(true);

    setTimeout(() => {
      setWorkspacePapers((prevPapers) => {
        return prevPapers.filter((paper) => paper.isCompleted);
      });
      setIsLoading(false);
    }, 1000);
  };

  const showUnreadPapers = () => {
    setIsLoading(true);

    setTimeout(() => {
      setWorkspacePapers((prevPapers) => {
        return prevPapers.filter((paper) => !paper.isCompleted);
      });
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        setIsFiltersOpen(false);
      }
    };

    if (isFiltersOpen) {
      document.body.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFiltersOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortListOpen(false);
      }
    };

    if (isSortListOpen) {
      document.body.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSortListOpen]);

  useEffect(() => {
    const getRandomDate = (start: Date, end: Date) => {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    };

    const generateRandomDates = () => {
      const startDate = new Date(2000, 0, 1);
      const endDate = new Date();

      const updatedPapers = workspacePapers.map((paper) => {
        const randomDate = getRandomDate(startDate, endDate);
        return { ...paper, date: randomDate };
      });

      setWorkspacePapers(updatedPapers);
    };

    generateRandomDates();
  }, []);

  return (
    <div className="w-full h-full p-6">
      {/* TODO: change the title to the name the user picked */}
      <div className="flex justify-between">
        <div>
          <div className="text-2xl font-bold">{`Workspace #${params?.id?.toString()}`}</div>
          <div className="text-xs text-gray-500">
            Created on {new Date().toDateString()}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {selectedPapersIds.length > 0 && (
            <>
              <div
                onClick={markAsCompleted}
                className="h-10 cursor-pointer text-green-900 flex items-center gap-1 px-2 py-1 bg-green-100 rounded-md"
              >
                <GoCheckCircle />
                <div>Mark as Completed</div>
              </div>
              <div
                onClick={removeFromWorkspace}
                className="h-10 cursor-pointer text-red-900 flex items-center gap-1 px-2 py-1 bg-red-100 rounded-md"
              >
                <IoIosCloseCircleOutline />
                <div>Remove from Workspace</div>
              </div>
            </>
          )}
          <div
            ref={filtersRef}
            onClick={toggleFilters}
            className="relative h-10 cursor-pointer text-gray-900 flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md"
          >
            <BsFilter />
            <div>Filter</div>
            {isFiltersOpen && (
              <div className="top-11 right-0 bg-gray-50 p-2 flex flex-col absolute w-max rounded-md">
                <div
                  onClick={showCompletedOnly}
                  className="rounded-md py-1 px-2 bg-gray-50 hover:bg-gray-200"
                >
                  Completed Papers
                </div>
                <div
                  onClick={showUnreadPapers}
                  className="rounded-md py-1 px-2 bg-gray-50 hover:bg-gray-200"
                >
                  Unread Papers
                </div>
              </div>
            )}
          </div>
          <div
            ref={sortRef}
            onClick={toggleSortList}
            className="h-10 relative cursor-pointer text-blue-900 flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-md"
          >
            <PiSortAscendingBold />
            <div>Sort</div>
            {isSortListOpen && (
              <div className="top-11 right-0 bg-gray-50 p-2 flex flex-col absolute w-max rounded-md">
                <div
                  onClick={orderAlphatically}
                  className="rounded-md py-1 px-2 bg-gray-50 hover:bg-gray-200"
                >
                  Alphabetically (A-Z)
                </div>
                <div
                  onClick={orderFromNewToOld}
                  className="rounded-md py-1 px-2 bg-gray-50 hover:bg-gray-200"
                >
                  Newer to Older
                </div>
                <div
                  onClick={orderFromOldToNew}
                  className="rounded-md py-1 px-2 bg-gray-50 hover:bg-gray-200"
                >
                  Older to Newer
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {!isLoading && (
        <PDFGrid
          pdfs={workspacePapers.map((i) => {
            return { ...i } as PDF;
          })}
        />
      )}
      {isLoading && (
        <div className="flex justify-center items-center w-full h-96">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default WorkspacePage;
