"use client";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import FileInput from "@/components/file-input";
import { useWorkspace } from "@/contexts/workspace.context";
import { MdDriveFileMoveOutline } from "react-icons/md";
import { useDialogBox } from "@/contexts/dialog.context";
import { getReadableTimestamp } from "@/helpers/date.helper";

type FileData = {
  fileName: string;
  uploadDate: Date;
  id: string;
  fileUrl: string;
};

const WorkplacePicker = () => {
  const { workspaces } = useWorkspace();

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold text-2xl">Choose workspaces</div>
      {workspaces.map((w) => (
        <div key={w.id} className="flex gap-2">
          <input type="checkbox" id={w.id} name={w.name} value={w.name} />
          <label htmlFor={w.id}>{w.name}</label>
        </div>
      ))}
    </div>
  );
};

const MyLibraryPage = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const buttonRef = useRef(null);
  const { setIsDialogBoxOpen, setDialogBoxContent } = useDialogBox();

  // useEffect(() => {
  //   const loadedFiles = JSON.parse(
  //     sessionStorage.getItem("uploadedFiles") || "[]"
  //   );
  //   setFiles(loadedFiles.map((file: FileData) => ({ ...file, fileUrl: "" })));
  // }, []);

  // useEffect(() => {
  //   const filesToStore = files.map(({ fileUrl, ...rest }) => rest);
  //   sessionStorage.setItem("uploadedFiles", JSON.stringify(filesToStore));
  // }, [files]);

  const handleFileSelect = (newFile: File | null) => {
    if (!newFile) return;

    const fileUrl = URL.createObjectURL(newFile);
    const newFileData = {
      fileName: newFile.name,
      uploadDate: new Date(),
      id: newFile.name + Date.now(),
      fileUrl: fileUrl,
    };
    setFiles((prevFiles) => [newFileData, ...prevFiles]);
    setMessage("Upload successful!");
    setTimeout(() => setMessage(""), 3000);
  };

  const deleteFile = (fileId: string) => {
    setFiles((prevFiles) => {
      const fileToDelete = prevFiles.find((file) => file.id === fileId);
      if (fileToDelete) URL.revokeObjectURL(fileToDelete.fileUrl);
      return prevFiles.filter((file) => file.id !== fileId);
    });
  };

  const viewPDF = (fileData: FileData) => {
    window.open(fileData.fileUrl, "_blank");
  };

  const addToWorkspace = () => {
    setDialogBoxContent(<WorkplacePicker />);
    setIsDialogBoxOpen(true);
  };

  const hidePopup = () => {
    setShowPopup(false);
  };

  const workspaceSelected = () => {
    hidePopup();
  };
  return (
    <>
      <div className="text-2xl font-bold">My Library</div>
      <div className="text-gray-500">Handle all your paper uploads here.</div>
      <div className="mt-4 w-full">
        <FileInput onFileSelect={handleFileSelect} />
        {message && (
          <div className="text-green-500 text-center my-2">{message}</div>
        )}
        <div className="mt-4 flex flex-col">
          {files.map((fileData) => (
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
                {getReadableTimestamp(fileData.uploadDate)}
              </span>
              <div
                ref={buttonRef}
                onClick={addToWorkspace}
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
          ))}
        </div>
      </div>
    </>
  );
};

export default MyLibraryPage;
