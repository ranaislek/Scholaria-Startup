"use client";
import { Paper } from "@/models/paper";
import { IWorkspace } from "@/models/workspace";
import { usePathname } from "next/navigation";

import React, { useEffect } from "react";

type IWorkspaceContext = {
  workspaces: IWorkspace[];
  selectedPapersIds: string[];
  setSelectedPapersIds: (v: string[]) => void;
  togglePaperSelect: (v: string) => void;
  isPaperSelected: (v: string) => boolean;
  addNewWorkspace: (workspace: IWorkspace) => void;
  clearSelectedPapers: () => void;
};

const WorkspaceContext = React.createContext<IWorkspaceContext>({
  workspaces: [],
  selectedPapersIds: [],
  setSelectedPapersIds: () => null,
  togglePaperSelect: () => null,
  isPaperSelected: () => false,
  addNewWorkspace: () => null,
  clearSelectedPapers: () => null,
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
      createdOn: new Date("10/08/2023"),
    },
    {
      name: "Adam's Thesis",
      id: "1234",
      createdOn: new Date("10/10/2023"),
    },
  ]);

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
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export { WorkspaceContext, WorkspacesProvider, useWorkspace };
