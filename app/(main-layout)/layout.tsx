"use client";
import SearchButton from "@/components/search-button";
import SearchInput from "@/components/search-input";
import SideBar from "@/components/sidebar";
import { useSearch } from "@/contexts/search.context";
import { useSideBar } from "@/contexts/sidebar.context";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setIsSearchOverlayOpen } = useSearch();
  const { isSideBarOpen } = useSideBar();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        setIsSearchOverlayOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsSearchOverlayOpen]);

  return (
    <>
      <SideBar />
      <SearchInput />
      <div
        className={
          "p-6 min-h-screen flex flex-col justify-start items-start transition-all duration-300 " +
          (isSideBarOpen ? "ml-80" : "ml-20")
        }
      >
        {children}
      </div>
    </>
  );
}
