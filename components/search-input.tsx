"use client";
import { useSearch } from "@/contexts/search.context";
import { useEffect, useLayoutEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  const { isSearchOverlayOpen, setIsSearchOverlayOpen } = useSearch();
  const ref = useRef<HTMLInputElement>(null); // Specify HTMLInputElement type for ref

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsSearchOverlayOpen(false);
      }
    };

    if (isSearchOverlayOpen) {
      document.body.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOverlayOpen, setIsSearchOverlayOpen]);

  useLayoutEffect(() => {
    if (isSearchOverlayOpen && ref.current) {
      ref.current.focus();
    }
  }, [isSearchOverlayOpen]);

  if (!isSearchOverlayOpen) {
    return null; // If search overlay is not open, return null to render nothing
  }

  return (
    <div className="fixed z-50 h-screen w-screen bg-black bg-opacity-10 flex justify-center items-start pt-64 backdrop-blur-sm">
      <div className="relative p-4 w-1/3 h-12 rounded-full bg-gray-100 flex justify-between items-center">
        <input
          ref={ref}
          placeholder="Search for a paper, author, or journal..."
          type="text"
          className="w-full appearance-none bg-gray-100 focus:appearance-none"
        />
        <CiSearch className="text-gray-400 absolute right-6" size={25} />
      </div>
    </div>
  );
};

export default SearchInput;
