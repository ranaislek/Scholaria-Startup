"use client";

import { useDialogBox } from "@/contexts/dialog.context";
import { useState } from "react";

export default function DialogBox() {
  const { setIsDialogBoxOpen, isDialogBoxOpen, dialogBoxContent, action } =
    useDialogBox();

  if (!isDialogBoxOpen) return;

  const cancelAction = () => {
    setIsDialogBoxOpen(false);
  };

  const completeAction = () => {
    if (action) {
      action();
    }
    setIsDialogBoxOpen(false);
  };

  return (
    <div className="absolute w-full h-full bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="flex flex-col gap-6 w-1/3 h-fit bg-white shadow-lg rounded-md p-8">
        {dialogBoxContent}
        <div className="flex gap-4 self-end">
          <div
            onClick={cancelAction}
            style={{ borderWidth: 1 }}
            className="flex justify-center items-center h-10 min-w-24 cursor-pointer text-gray-900 border-gray-900 gap-1 px-2 py-1 bg-gray-100 rounded-md"
          >
            <div>Cancel</div>
          </div>
          <div
            onClick={completeAction}
            style={{ borderWidth: 1 }}
            className="flex justify-center items-center h-10 min-w-24 cursor-pointer text-white gap-1 px-2 py-1 bg-primary rounded-md"
          >
            <div>Done</div>
          </div>
        </div>
      </div>
    </div>
  );
}
