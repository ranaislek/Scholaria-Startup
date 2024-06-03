"use client";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import FileInput from "@/components/file-input";
import { useWorkspace } from "@/contexts/workspace.context";
import { MdDriveFileMoveOutline } from "react-icons/md";
import { useDialogBox } from "@/contexts/dialog.context";
import { getReadableTimestamp } from "@/helpers/date.helper";
import { API_BASE_URL } from "@/api";
import { usePDFViewer } from "@/contexts/pdf-viewer.context";
import { redirect, useRouter } from "next/navigation";
import Loader from "@/components/loader";
import { useToasts } from "@/contexts/toast.context";
import { FileData } from "@/models/file";

const WorkspacePicker = () => {
  const {
    workspaces,
    setSelectedWorkspacesIds,
    clearSelectedPapers,
    selectedWorkspacesIds,
    selectedPapersIds,
    getUserWorkspaces,
  } = useWorkspace();
  const { setIsDialogBoxOpen } = useDialogBox();
  const toasts = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (!selectedWorkspacesIds.includes(id)) {
      setSelectedWorkspacesIds([...selectedWorkspacesIds, id]);
    } else {
      setSelectedWorkspacesIds(
        selectedWorkspacesIds.filter((workspaceId) => workspaceId !== id)
      );
    }
  };

  const cancelAction = () => {
    setIsDialogBoxOpen(false);
  };

  const addPaperToWorkspace = async () => {
    setIsLoading(true);
    const paperId = selectedPapersIds[0];
    const token = localStorage.getItem("token");

    const promises = selectedWorkspacesIds.map(async (workspaceId) => {
      await fetch(`${API_BASE_URL}/workspaces/add-paper`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ workspaceId, paperId }),
      });
    });
    await Promise.all(promises);
    await getUserWorkspaces();
    clearSelectedPapers();
    setSelectedWorkspacesIds([]);
    setIsLoading(false);
    setIsDialogBoxOpen(false);
    toasts.success("Paper added to workspace successfully");
  };
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="font-bold text-2xl">Choose workspaces</div>
        {workspaces.map((w) => (
          <div key={w.id} className="flex gap-2">
            <input
              type="checkbox"
              id={w.id}
              name={w.name}
              value={w.name}
              checked={selectedWorkspacesIds.includes(w.id)}
              onChange={(e) => handleCheckboxChange(e, w.id)}
            />
            <label htmlFor={w.id}>{w.name}</label>
          </div>
        ))}
      </div>
      <div className="flex gap-4 self-end">
        <div
          onClick={isLoading ? () => null : cancelAction}
          style={{ borderWidth: 1 }}
          className={
            "flex justify-center items-center h-10 min-w-24 cursor-pointer text-gray-900 border-gray-900 gap-1 px-2 py-1 bg-gray-100 rounded-md " +
            (isLoading ? "opacity-50" : "")
          }
        >
          <div>Cancel</div>
        </div>
        <div
          onClick={isLoading ? () => null : addPaperToWorkspace}
          style={{ borderWidth: 1 }}
          className={
            "flex justify-center items-center h-10 min-w-24 cursor-pointer text-white gap-1 px-2 py-1 bg-primary rounded-md " +
            (isLoading ? "opacity-50" : "")
          }
        >
          <div>{isLoading ? <Loader size={10} /> : "Done"}</div>
        </div>
      </div>
    </>
  );
};

const MyLibraryPage = () => {
  const router = useRouter();
  const { setSelectedPapersIds, workspaces, getUserWorkspaces } =
    useWorkspace();
  const toasts = useToasts();
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const buttonRef = useRef(null);
  const { setIsDialogBoxOpen, setDialogBoxContent } = useDialogBox();
  const { setPDFDocumentUrl } = usePDFViewer();

  const handleFileSelect = async (newFile: File | null) => {
    if (!newFile) return;
    setMessage("Loading...");
    const { name, type } = newFile;

    const res = await fetch("/api/generateSignedUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName: name, fileType: type }),
    });

    const { publicUrl, url, fileName } = await res.json();

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": type,
      },
      body: newFile,
    });
    const token = localStorage.getItem("token");
    await fetch(`${API_BASE_URL}/library/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fileName: name, fileType: type, url: publicUrl }),
    });

    const newFileData = {
      fileName: newFile.name,
      createdOn: new Date(),
      id: newFile.name + Date.now(),
      type: newFile.type,
      fileUrl: publicUrl,
    };
    setFiles((prevFiles) => [newFileData, ...prevFiles]);
    await getUserLibrary();
    setMessage("");
    toasts.success("File uploaded successfully");
  };

  const deleteFile = (fileId: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  const viewPDF = (fileData: FileData) => {
    setPDFDocumentUrl(fileData.fileUrl);
    router.push("/pdf-viewer");
  };

  const openAddToWorkspacePicker = (paperId: string) => {
    if (workspaces.length === 0) {
      toasts.error("You don't have any workspaces!");
      return;
    }
    setSelectedPapersIds([paperId]);
    setDialogBoxContent(<WorkspacePicker />);
    setIsDialogBoxOpen(true);
  };

  const getUserLibrary = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/library/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setIsLoading(false);
    const data = await res.json();
    setFiles(
      data.map((f: any) => {
        return { id: f._id, ...f };
      })
    );
  };

  useEffect(() => {
    //  on mount fetch user workspaces
    getUserLibrary();
  }, []);
  return (
    <>
      <div className="text-2xl font-bold">My Library</div>
      <div className="text-gray-500">Handle all your paper uploads here.</div>
      <div className="mt-4 w-full">
        <FileInput onFileSelect={handleFileSelect} />
        <div className="mt-4 flex flex-col">
          <div className="my-6 text-center text-gray-500 text-xl">
            {message}
          </div>
          {isLoading ? (
            <div className="mt-10 flex w-full justify-center items-center">
              <Loader />
            </div>
          ) : (
            files.map((fileData) => (
              <div
                key={fileData.id}
                className="border p-4 rounded shadow-sm flex justify-between items-center"
              >
                <span
                  className="text-lg font-medium cursor-pointer mr-auto"
                  onClick={() => viewPDF(fileData)}
                >
                  {fileData.fileName}
                </span>
                <span className="text-sm text-gray-500 mx-2">
                  {getReadableTimestamp(new Date(fileData.createdOn))}
                </span>
                <div
                  ref={buttonRef}
                  onClick={() => openAddToWorkspacePicker(fileData.id)}
                  className="cursor-pointer text-blue-900 flex items-center gap-1 px-2 py-1 rounded-md mx-2 hover:bg-gray-100"
                >
                  <MdDriveFileMoveOutline />
                  <div>Add to workspace</div>
                </div>
                <AiOutlineDelete
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  size={24}
                  onClick={() => deleteFile(fileData.id)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyLibraryPage;
