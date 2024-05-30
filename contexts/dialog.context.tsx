"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type IDialogBox = {
  isDialogBoxOpen: boolean;
  setIsDialogBoxOpen: (value: boolean) => void;
  dialogBoxContent: React.ReactNode;
  setDialogBoxContent: (value: React.ReactNode) => void;
};

const DialogContext = React.createContext<IDialogBox>({
  isDialogBoxOpen: false,
  setIsDialogBoxOpen: () => null,
  dialogBoxContent: null,
  setDialogBoxContent: () => null,
});

const useDialogBox = () => React.useContext(DialogContext);

const DialogProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [isDialogBoxOpen, setIsDialogBoxOpen] = React.useState(false);
  const [dialogBoxContent, setDialogBoxContent] =
    React.useState<React.ReactNode>(null);

  const pathname = usePathname();
  useEffect(() => {
    setIsDialogBoxOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isDialogBoxOpen) return;

    setDialogBoxContent(null);
  }, [isDialogBoxOpen]);
  return (
    <DialogContext.Provider
      value={{
        isDialogBoxOpen,
        setIsDialogBoxOpen,
        dialogBoxContent,
        setDialogBoxContent,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export { DialogContext, DialogProvider, useDialogBox };
