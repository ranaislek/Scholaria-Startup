"use client";
import React from "react";

type IAuth = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (v: boolean) => void;
};

const SidBarContext = React.createContext<IAuth>({
  isSideBarOpen: false,
  setIsSideBarOpen: () => null,
});

const useSideBar = () => React.useContext(SidBarContext);

const SideBarProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);

  return (
    <SidBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}
    </SidBarContext.Provider>
  );
};

export { SidBarContext, SideBarProvider, useSideBar };
