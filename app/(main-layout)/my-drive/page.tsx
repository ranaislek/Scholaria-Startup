"use client";
import FileInput from "@/components/file-input";

const MyDrivePage = () => {
  return (
    <>
      <div className="text-2xl font-bold">My Drive</div>
      <div className="text-gray-500">Handle all your paper uploads here.</div>
      <div className="mt-4 w-full">
        <FileInput />
      </div>
    </>
  );
};

export default MyDrivePage;
