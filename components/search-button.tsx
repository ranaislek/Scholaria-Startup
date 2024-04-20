"use client";
import { useSearch } from "@/contexts/search.context";
import { useSideBar } from "@/contexts/sidebar.context";
import { use, useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchButton = () => {
  const { setIsSearchOverlayOpen } = useSearch();
  const { isSideBarOpen } = useSideBar();
  return (
    <div
      onClick={() => {
        setIsSearchOverlayOpen(true);
      }}
      className={
        "cursor-pointer flex items-center justify-center gap-2 p-2 bg-white border-2 border-gray-300 rounded-full w-full hover:opacity-80 "
      }
    >
      <CiSearch
        className={"text-gray-400 " + (isSideBarOpen ? "absolute left-10" : "")}
        size={25}
      />
      {isSideBarOpen && <div className="text-gray-400 self-center">Search</div>}
    </div>
  );
};

export default SearchButton;
