"use client";
import { API_BASE_URL } from "@/api";
import { IWorkspace } from "@/models/workspace";
import { usePathname } from "next/navigation";

import React, { useEffect } from "react";

type IWorkspaceContext = {
  workspaces: IWorkspace[];
  selectedPapersIds: string[];
  setSelectedPapersIds: (v: string[]) => void;
  togglePaperSelect: (v: string) => void;
  isPaperSelected: (v: string) => boolean;
  addNewWorkspace: (workspace: IWorkspace) => Promise<string | undefined>;
  deleteWorkspace: (workspaceId: string) => Promise<void>;
  clearSelectedPapers: () => void;
};

const mockWorkspaces = [
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
];

const WorkspaceContext = React.createContext<IWorkspaceContext>({
  workspaces: [],
  selectedPapersIds: [],
  setSelectedPapersIds: () => null,
  togglePaperSelect: () => null,
  isPaperSelected: () => false,
  addNewWorkspace: async () => undefined,
  deleteWorkspace: async () => undefined,
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

  const [workspaces, setWorkspaces] = React.useState<IWorkspace[]>([]);

  useEffect(() => {
    //  on mount fetch user workspaces
    const getUserWorkspaces = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/workspaces/my-workspaces`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const workspacesData = data.map((w: any) => {
        return { ...w, id: w._id };
      });
      setWorkspaces(workspacesData);
    };

    getUserWorkspaces();
  }, []);

  const deleteWorkspace = async (workspaceId: string): Promise<void> => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/workspaces/delete`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ workspaceId }),
    });

    setWorkspaces((prev) => prev.filter((w) => w.id !== workspaceId));
  };

  const addNewWorkspace = async (
    newWorkspace: IWorkspace
  ): Promise<string | undefined> => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/workspaces/new`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newWorkspace),
    });

    const newWorkspaceRes = await res.json();

    setWorkspaces([
      ...workspaces,
      { ...newWorkspace, id: newWorkspaceRes.workspaceId },
    ]);

    return newWorkspaceRes.workspaceId;
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

  useEffect(() => {}, []);
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
        deleteWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export { WorkspaceContext, WorkspacesProvider, useWorkspace };
