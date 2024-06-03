"use client";
import { useWorkspace } from "@/contexts/workspace.context";
import { papers } from "@/data/papers";
import { Paper } from "@/models/paper";
import { IWorkspace } from "@/models/workspace";
import { redirect } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { BsFilter } from "react-icons/bs";
import { GoCheckCircle } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { PiSortAscendingBold } from "react-icons/pi";
import Loader from "./loader";
import PaperGrid from "./paper-grid";
import { AiOutlineDelete } from "react-icons/ai";

export default function Workspace({ id }: { id: string }) {
  const {
    workspaces,
    selectedPapersIds,
    clearSelectedPapers,
    deleteWorkspace,
  } = useWorkspace();

  if (!workspaces.find((w) => w.id === id)) {
    redirect("/home");
  }

  const [targetWorkspace, setTargetWorkspace] = useState<
    IWorkspace | undefined
  >();

  const filtersRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const [workspacePapers, setWorkspacePapers] = useState<Paper[]>();
  const [filtersResults, setFiltersResults] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSortListOpen, setIsSortListOpen] = useState<boolean>(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [isFilteringMode, setIsFilteringMode] = useState<boolean>(false);

  const deleteCurrentWorkspace = async () => {
    if (!targetWorkspace?.id) return;
    await deleteWorkspace(targetWorkspace?.id);
  };
  const toggleSortList = () => {
    setIsSortListOpen(!isSortListOpen);
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  // TODO: Update these operations: markAsCompleted, removeFromWorkspace
  const markAsCompleted = () => {
    setIsLoading(true);
    setTimeout(() => {
      const updatedPapers = workspacePapers?.map((p) => {
        if (selectedPapersIds.includes(p?.id)) {
          return { ...p, isCompleted: true };
        } else {
          return p;
        }
      });

      setWorkspacePapers(updatedPapers || []);
      clearSelectedPapers();
      setIsLoading(false);
    }, 500);
  };

  const removeFromWorkspace = () => {
    setIsLoading(true);
    setTimeout(() => {
      const updatedPapers = workspacePapers?.filter(
        (p) => !selectedPapersIds.includes(p.id)
      );
      setWorkspacePapers(updatedPapers);
      clearSelectedPapers();
      setIsLoading(false);
    }, 500);
  };

  const orderAlphatically = () => {
    setIsFilteringMode(false);
    setIsLoading(true);
    setTimeout(() => {
      const updatedPapers = workspacePapers?.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setWorkspacePapers(updatedPapers);
      setIsLoading(false);
    }, 500);
  };

  const orderFromOldToNew = () => {
    setIsFilteringMode(false);
    setIsLoading(true);
    setTimeout(() => {
      const updatedPapers = workspacePapers?.sort((a, b) =>
        a.publicationDate && b.publicationDate
          ? a.publicationDate.getTime() - b.publicationDate.getTime()
          : 0
      );
      setWorkspacePapers(updatedPapers);
      setIsLoading(false);
    }, 500);
  };

  const orderFromNewToOld = () => {
    setIsFilteringMode(false);
    setIsLoading(true);
    setTimeout(() => {
      const updatedPapers = workspacePapers?.sort((a, b) =>
        a.publicationDate && b.publicationDate
          ? b.publicationDate.getTime() - a.publicationDate.getTime()
          : 0
      );
      setWorkspacePapers(updatedPapers);
      setIsLoading(false);
    }, 500);
  };

  const showCompletedOnly = () => {
    setIsFilteringMode(true);
    setIsLoading(true);
    setTimeout(() => {
      setFiltersResults(
        targetWorkspace?.papers?.filter((paper) => paper.isCompleted) || []
      );
      setIsLoading(false);
    }, 500);
  };

  const showUnreadPapers = () => {
    setIsFilteringMode(true);
    setIsLoading(true);
    setTimeout(() => {
      setFiltersResults(
        targetWorkspace?.papers?.filter((paper) => !paper.isCompleted) || []
      );

      setIsLoading(false);
    }, 500);
  };

  const clearFilters = () => {
    setIsFilteringMode(false);
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
    const workspace: IWorkspace | undefined = workspaces.find(
      (w) => w.id === id
    );

    if (!workspace) {
      redirect("/home");
    }

    setTargetWorkspace(workspace);
    setWorkspacePapers(workspace.papers);
  }, [id, workspaces]);
  return (
    <div className="w-full h-full p-6">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl font-bold">{`${targetWorkspace?.name} Workspace`}</div>
          {targetWorkspace?.createdOn && (
            <div className="text-xs text-gray-500">
              Created on {new Date(targetWorkspace?.createdOn).toDateString()}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {selectedPapersIds.length > 0 && (
            <>
              <div
                onClick={markAsCompleted}
                style={{ borderWidth: 1 }}
                className="h-10 cursor-pointer text-green-900 border-green-900 flex items-center gap-1 px-2 py-1 bg-green-100 rounded-md"
              >
                <GoCheckCircle />
                <div>Mark as Completed</div>
              </div>
              <div
                onClick={removeFromWorkspace}
                style={{ borderWidth: 1 }}
                className="h-10 cursor-pointer text-red-900 border-red-900 flex items-center gap-1 px-2 py-1 bg-red-100 rounded-md"
              >
                <IoIosCloseCircleOutline />
                <div>Remove from Workspace</div>
              </div>
            </>
          )}
          <div
            ref={filtersRef}
            onClick={toggleFilters}
            style={{ borderWidth: 1 }}
            className="relative h-10 cursor-pointer text-gray-900 border-gray-900 flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md"
          >
            <BsFilter />
            <div>Filter</div>
            {isFiltersOpen && (
              <div className="z-10 top-11 right-0 bg-gray-50 p-2 flex flex-col absolute w-max rounded-md">
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
                <div
                  onClick={clearFilters}
                  className="rounded-md py-1 px-2 bg-gray-50 hover:bg-gray-200"
                >
                  Clear Filters{" "}
                </div>
              </div>
            )}
          </div>
          <div
            ref={sortRef}
            onClick={toggleSortList}
            style={{ borderWidth: 1 }}
            className="h-10 relative cursor-pointer text-blue-900 border-blue-900 flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-md"
          >
            <PiSortAscendingBold />
            <div>Sort</div>
            {isSortListOpen && (
              <div className="z-10 top-11 right-0 bg-gray-50 p-2 flex flex-col absolute w-max rounded-md">
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
          <div
            onClick={deleteCurrentWorkspace}
            style={{ borderWidth: 1 }}
            className="h-10 relative cursor-pointer text-red-900 border-red-900 flex items-center gap-1 px-2 py-1 bg-red-100 rounded-md"
          >
            <AiOutlineDelete />
            <div>Delete Workspace</div>
          </div>
        </div>
      </div>
      {!isLoading && (
        <PaperGrid
          isSelectable={!isFilteringMode}
          papers={
            isFilteringMode ? filtersResults : targetWorkspace?.papers ?? []
          }
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
