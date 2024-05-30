"use client";

import { useDialogBox } from "@/contexts/dialog.context";
import { useEffect, useState } from "react";

export default function DialogBox() {
  const { setIsDialogBoxOpen, isDialogBoxOpen, dialogBoxContent } =
    useDialogBox();

  if (!isDialogBoxOpen) return;

  return (
    <div className="absolute w-full h-full bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="flex flex-col gap-6 w-1/3 h-fit bg-white shadow-lg rounded-md p-8">
        {dialogBoxContent}
      </div>
    </div>
  );
}
