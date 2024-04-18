"use client";
import { useSearch } from "@/contexts/search.context";
import { use, useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchButton = () => {
  const { isSearchOverlayOpen, setIsSearchOverlayOpen } = useSearch();

  return (
    <div
      onClick={() => {
        setIsSearchOverlayOpen(true);
      }}
      className={
        "cursor-pointer flex items-center justify-center gap-2 p-2 bg-white border-2 border-gray-300 rounded-full w-full hover:opacity-80 "
      }
    >
      <CiSearch className="text-gray-400 absolute left-10" size={25} />
      <div className="text-gray-400 self-center">Search</div>
    </div>
  );
};

export default SearchButton;
