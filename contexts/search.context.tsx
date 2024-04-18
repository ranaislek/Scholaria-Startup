"use client";
import React from "react";

type ISearch = {
  isSearchOverlayOpen: boolean;
  setIsSearchOverlayOpen: (value: boolean) => void;
};

const SearchContext = React.createContext<ISearch>({
  isSearchOverlayOpen: false,
  setIsSearchOverlayOpen: () => null,
});

const useSearch = () => React.useContext(SearchContext);

const SearchProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = React.useState(true);

  return (
    <SearchContext.Provider
      value={{ isSearchOverlayOpen, setIsSearchOverlayOpen }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider, useSearch };
