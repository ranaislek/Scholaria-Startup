"use client";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <div
      className={
        "fixed top-4 right-4 flex items-center gap-2 p-2 bg-gray-100 border-2 border-gray-300 rounded-md w-1/4 " +
        (isFocused ? "opacity-100" : "opacity-50")
      }
    >
      <CiSearch className="text-gray-400" size={25} />
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search for a paper, author, or journal..."
        type="text"
        className="appearance-none bg-gray-100 w-full focus:appearance-none"
      />
    </div>
  );
};

export default SearchBar;
