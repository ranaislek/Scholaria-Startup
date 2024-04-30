"use client";
import { Paper } from "@/models/paper";
import { IWorkspace } from "@/models/workspace";
import { usePathname } from "next/navigation";

import React, { useEffect } from "react";

const papers: Paper[] = [
  {
    id: "2",
    uploadDate: new Date("11/11/2020"),
    isCompleted: false,
    title: "B On the Content Bias in Frechet Video Distance",
    authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
    pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
  },
  {
    id: "4",
    uploadDate: new Date("11/12/2020"),
    isCompleted: false,
    title: "D Test of Fine-Tuning GPT by Astrophysical Data",
    authors: ["Yu Wang", "Shu-Rui Zhang"],
    pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
  },
  {
    id: "5",
    uploadDate: new Date("11/11/2024"),
    isCompleted: false,
    title: "On the Content Bias in Frechet Video Distance",
    authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
    pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
  },
  {
    id: "6",
    uploadDate: new Date("09/11/2020"),
    isCompleted: true,
    title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
    authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
    pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
  },
  {
    id: "3",
    uploadDate: new Date("11/11/2019"),
    isCompleted: false,
    title: "C Moving Object Segmentation: All You Need Is SAM (and Flow)",
    authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
    pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
  },
  {
    id: "7",
    uploadDate: new Date("11/11/2023"),
    isCompleted: true,
    title: "Test of Fine-Tuning GPT by Astrophysical Data",
    authors: ["Yu Wang", "Shu-Rui Zhang"],
    pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
  },
  {
    id: "8",
    uploadDate: new Date("11/08/2021"),
    isCompleted: false,
    title: "On the Content Bias in Frechet Video Distance",
    authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
    pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
  },
  {
    id: "9",
    uploadDate: new Date("11/02/2020"),
    isCompleted: true,
    title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
    authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
    pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
  },
  {
    id: "10",
    uploadDate: new Date("11/01/2020"),
    isCompleted: false,
    title: "Test of Fine-Tuning GPT by Astrophysical Data",
    authors: ["Yu Wang", "Shu-Rui Zhang"],
    pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
  },
  {
    id: "11",
    uploadDate: new Date("11/04/2020"),
    isCompleted: true,
    title: "On the Content Bias in Frechet Video Distance",
    authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
    pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
  },
  {
    id: "12",
    uploadDate: new Date("11/11/2011"),
    isCompleted: false,
    title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
    authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
    pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
  },
  {
    id: "13",
    uploadDate: new Date("01/01/2020"),
    isCompleted: false,
    title: "Test of Fine-Tuning GPT by Astrophysical Data",
    authors: ["Yu Wang", "Shu-Rui Zhang"],
    pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
  },
  {
    id: "1",
    uploadDate: new Date("01/02/2020"),
    isCompleted: false,
    title: "A Test of Fine-Tuning GPT by Astrophysical Data",
    authors: ["Yu Wang", "Shu-Rui Zhang"],
    pdfUrl: "https://arxiv.org/pdf/2404.10019.pdf",
  },
  {
    id: "14",
    uploadDate: new Date("02/03/2020"),
    isCompleted: false,
    title: "On the Content Bias in Frechet Video Distance",
    authors: ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar"],
    pdfUrl: "https://arxiv.org/pdf/2404.12391.pdf",
  },
  {
    id: "15",
    uploadDate: new Date("07/07/2020"),
    isCompleted: false,
    title: "Moving Object Segmentation: All You Need Is SAM (and Flow)",
    authors: ["Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"],
    pdfUrl: "https://arxiv.org/pdf/2404.12389.pdf",
  },
];

type IWorkspaceContext = {
  workspaces: IWorkspace[];
  selectedPapersIds: string[];
  setSelectedPapersIds: (v: string[]) => void;
  togglePaperSelect: (v: string) => void;
  isPaperSelected: (v: string) => boolean;
  addNewWorkspace: (workspace: IWorkspace) => void;
  clearSelectedPapers: () => void;
  removePapersFromWorkspace: (workspaceId: string) => void;
  markPapersAsCompletedInWorkspace: (workspaceId: string) => void;
  orderWorkspacePapersFromOldToNew: (workspaceId: string) => void;
  orderWorkspacePapersFromNewToOld: (workspaceId: string) => void;
  orderWorkspacePapersAlphabetically: (workspaceId: string) => void;
};

const WorkspaceContext = React.createContext<IWorkspaceContext>({
  workspaces: [],
  selectedPapersIds: [],
  setSelectedPapersIds: () => null,
  togglePaperSelect: () => null,
  isPaperSelected: () => false,
  addNewWorkspace: () => null,
  clearSelectedPapers: () => null,
  removePapersFromWorkspace: () => null,
  markPapersAsCompletedInWorkspace: () => null,
  orderWorkspacePapersFromOldToNew: () => null,
  orderWorkspacePapersFromNewToOld: () => null,
  orderWorkspacePapersAlphabetically: () => null,
});

const useWorkspace = () => React.useContext(WorkspaceContext);

const WorkspacesProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const location = usePathname();
  const [selectedPapersIds, setSelectedPapersIds] = React.useState<string[]>(
    []
  );
  const [workspaces, setWorkspaces] = React.useState<IWorkspace[]>([
    {
      name: "My PhD Thesis",
      id: "123",
      papers: papers,
      createdOn: new Date("10/08/2023"),
    },
    {
      name: "Adam's Thesis",
      id: "1234",
      papers: papers,
      createdOn: new Date("10/10/2023"),
    },
  ]);

  const removePapersFromWorkspace = (workspaceId: string) => {
    const targetWorkspace = workspaces.find((w) => w.id === workspaceId);
    if (!targetWorkspace) return;
    const targetWorkspaceNewPapers = targetWorkspace.papers.filter(
      (p) => !selectedPapersIds.includes(p.id)
    );
    const restOfWorkspaces = workspaces.filter((w) => w.id !== workspaceId);
    setWorkspaces([
      ...restOfWorkspaces,
      { ...targetWorkspace, papers: targetWorkspaceNewPapers },
    ]);
  };

  const markPapersAsCompletedInWorkspace = (workspaceId: string) => {
    const targetWorkspace = workspaces.find((w) => w.id === workspaceId);
    if (!targetWorkspace) return;

    const updatedPapers = targetWorkspace.papers.map((p) => {
      if (selectedPapersIds.includes(p.id)) {
        return { ...p, isCompleted: true };
      } else {
        return p;
      }
    });

    const restOfWorkspaces = workspaces.filter((w) => w.id !== workspaceId);
    setWorkspaces([
      ...restOfWorkspaces,
      {
        ...targetWorkspace,
        papers: updatedPapers,
      },
    ]);
  };

  const orderWorkspacePapersFromOldToNew = (workspaceId: string) => {
    const targetWorkspace = workspaces.find((w) => w.id === workspaceId);
    if (!targetWorkspace) return;
    const restOfWorkspaces = workspaces.filter((w) => w.id !== workspaceId);

    setWorkspaces([
      ...restOfWorkspaces,
      {
        ...targetWorkspace,
        papers: targetWorkspace.papers.sort(
          (a, b) => a.uploadDate.getTime() - b.uploadDate.getTime()
        ),
      },
    ]);
  };

  const orderWorkspacePapersFromNewToOld = (workspaceId: string) => {
    const targetWorkspace = workspaces.find((w) => w.id === workspaceId);
    if (!targetWorkspace) return;
    const restOfWorkspaces = workspaces.filter((w) => w.id !== workspaceId);

    setWorkspaces([
      ...restOfWorkspaces,
      {
        ...targetWorkspace,
        papers: targetWorkspace.papers.sort(
          (a, b) => b.uploadDate.getTime() - a.uploadDate.getTime()
        ),
      },
    ]);
  };

  const orderWorkspacePapersAlphabetically = (workspaceId: string) => {
    const targetWorkspace = workspaces.find((w) => w.id === workspaceId);
    if (!targetWorkspace) return;
    const restOfWorkspaces = workspaces.filter((w) => w.id !== workspaceId);

    setWorkspaces([
      ...restOfWorkspaces,
      {
        ...targetWorkspace,
        papers: targetWorkspace.papers.sort((a, b) =>
          a.title.localeCompare(b.title)
        ),
      },
    ]);
  };

  useEffect(() => {
    // TODO: on mount fetch user workspaces
  }, []);

  const addNewWorkspace = async (newWorkspace: IWorkspace) => {
    await setWorkspaces([...workspaces, newWorkspace]);
  };

  const isPaperSelected = (id: string): boolean =>
    selectedPapersIds.some((targetId) => targetId === id);

  const togglePaperSelect = (id: string) => {
    if (isPaperSelected(id)) {
      setSelectedPapersIds((prevSelectedPapersIds) =>
        prevSelectedPapersIds.filter((prevId) => prevId !== id)
      );
      return;
    }

    setSelectedPapersIds([...selectedPapersIds, id]);
  };
  const clearSelectedPapers = () => setSelectedPapersIds([]);

  useEffect(() => {
    clearSelectedPapers();
  }, [location]);

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        selectedPapersIds,
        setSelectedPapersIds,
        togglePaperSelect,
        isPaperSelected,
        addNewWorkspace,
        clearSelectedPapers,
        removePapersFromWorkspace,
        markPapersAsCompletedInWorkspace,
        orderWorkspacePapersFromNewToOld,
        orderWorkspacePapersFromOldToNew,
        orderWorkspacePapersAlphabetically,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export { WorkspaceContext, WorkspacesProvider, useWorkspace };
