import React, { useState, ChangeEvent, DragEvent } from "react";
import { SlCloudUpload } from "react-icons/sl";

const FileInput: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert("Please select a PDF file.");
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert("Please drop a PDF file.");
    }
  };

  const handleClick = () => {
    document.getElementById("file-upload")?.click();
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full gap-4 flex flex-col justify-center items-center mt-1 p-4 border-2 border-dashed rounded-md ${
        dragging ? "border-blue-500" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className="mb-2 text-sm text-gray-500">
        Drag and drop a PDF file here or click to browse
      </p>
      <SlCloudUpload className="text-primary" size={80} />
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        className="sr-only"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer text-blue-600 hover:text-blue-500"
      >
        Choose File
      </label>
      {selectedFile && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">{selectedFile.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileInput;
