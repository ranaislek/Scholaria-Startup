"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type IDialogBox = {
  isDialogBoxOpen: boolean;
  setIsDialogBoxOpen: (value: boolean) => void;
  dialogBoxContent: React.ReactNode;
  setDialogBoxContent: (value: React.ReactNode) => void;
  action: () => void | null;
  setAction: (value: () => void) => void;
};

const DialogContext = React.createContext<IDialogBox>({
  isDialogBoxOpen: false,
  setIsDialogBoxOpen: () => null,
  dialogBoxContent: null,
  setDialogBoxContent: () => null,
  action: () => null,
  setAction: () => null,
});

const useDialogBox = () => React.useContext(DialogContext);

const DialogProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [action, setAction] = React.useState<() => void>(() => {});
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
    setAction(() => {});
  }, [isDialogBoxOpen]);
  return (
    <DialogContext.Provider
      value={{
        action,
        setAction,
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
