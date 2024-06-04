"use client";
import { API_BASE_URL } from "@/api";
import { AuthorData } from "@/models/author";
import { PaperData } from "@/models/paper";
import React, { useEffect, useRef } from "react";

type PaperSearchResult = {
  type: "Paper";
  item: PaperData;
};

type AuthorSearchResult = {
  type: "Author";
  item: AuthorData;
};

type SearchResults = PaperSearchResult | AuthorSearchResult;

type ISearch = {
  isSearchOverlayOpen: boolean;
  setIsSearchOverlayOpen: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchResults: SearchResults[];
};

const SearchContext = React.createContext<ISearch>({
  isSearchOverlayOpen: false,
  setIsSearchOverlayOpen: () => null,
  isLoading: false,
  setIsLoading: () => null,
  searchQuery: "",
  setSearchQuery: () => null,
  searchResults: [],
});

const useSearch = () => React.useContext(SearchContext);

const SearchProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<SearchResults[]>([]);
  const debounceTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/search`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchQuery: searchQuery }),
      });
      const data = await res.json();
      setIsLoading(false);
      if (data.error || data.message) {
        alert(data.error ?? data.message);
        return;
      }
      setSearchResults(data);
    };

    if (searchQuery === "") return;

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = window.setTimeout(() => {
      fetchSearchResults();
    }, 500);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchQuery]);
  return (
    <SearchContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isSearchOverlayOpen,
        setIsSearchOverlayOpen,
        searchQuery,
        setSearchQuery,
        searchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider, useSearch };
