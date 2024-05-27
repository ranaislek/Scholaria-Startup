"use client";
import React from "react";

type ISideBar = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (v: boolean) => void;
};

const SidBarContext = React.createContext<ISideBar>({
  isSideBarOpen: true,
  setIsSideBarOpen: () => null,
});

const useSideBar = () => React.useContext(SidBarContext);

const SideBarProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(true);

  return (
    <SidBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}
    </SidBarContext.Provider>
  );
};

export { SidBarContext, SideBarProvider, useSideBar };
