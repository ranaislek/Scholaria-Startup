"use client";

import Loader from "@/components/loader";
import PaperCard from "@/components/paper-card";
import PlaceholderCard from "@/components/placeholder-card";
import { useSearch } from "@/contexts/search.context";
import Avatar from "boring-avatars";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SearchPage() {
  const {
    searchQuery,
    searchResults,
    similarResults,
    isLoading,
    setSearchQuery,
  } = useSearch();
  useEffect(() => {
    if (!searchQuery) {
      redirect("/home");
    }
  }, [searchQuery]);

  return (
    <>
      <div className="w-full h-full p-6 flex flex-col gap-10">
        <div className="flex justify-between">
          <div>
            <div className="text-2xl font-bold">{`Search Result for '${searchQuery}' `}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {isLoading ? (
            <>
              <PlaceholderCard />
              <PlaceholderCard />
              <PlaceholderCard />
            </>
          ) : (
            searchResults.map((r, index) =>
              r.type === "Paper" ? (
                <PaperCard
                  key={index}
                  id={""}
                  pdf={r.item.pdf}
                  title={r.item.title}
                  publicationDate={new Date(r.item.publicationDate ?? "")}
                  isSelectable={false}
                />
              ) : (
                <div
                  onClick={() => {
                    setSearchQuery(r.item.author);
                  }}
                  style={{
                    width: `350px`,
                    height: `${350 * 1.3}px`,
                  }}
                  className="cursor-pointer gap-4 h-auto w-96 flex flex-col justify-center items-center p-6 bg-white shadow-md rounded-md"
                  key={index}
                >
                  <Avatar
                    size={120}
                    name={r.item.author}
                    variant="beam"
                    colors={[
                      "#beed80",
                      "#59d999",
                      "#31ada1",
                      "#51647a",
                      "#453c5c",
                    ]}
                  />
                  <div className="text-center">{r.item.author} </div>
                  <div className="text-sm bottom-2 right-2 text-primary bg-primary bg-opacity-30 rounded-sm px-2 py-1">
                    Author
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>

      <div className="w-full h-full p-6 flex flex-col gap-10">
        <div className="flex justify-between">
          <div>
            <div className="text-2xl font-bold">Similar Results</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {isLoading ? (
            <>
              <PlaceholderCard />
              <PlaceholderCard />
              <PlaceholderCard />
            </>
          ) : (
            similarResults.map((r, index) =>
              r.type === "Paper" ? (
                <PaperCard
                  key={index}
                  id={""}
                  pdf={r.item.pdf}
                  title={r.item.title}
                  publicationDate={new Date(r.item.publicationDate ?? "")}
                  isSelectable={false}
                />
              ) : (
                <div
                  onClick={() => {
                    setSearchQuery(r.item.author);
                  }}
                  style={{
                    width: `350px`,
                    height: `${350 * 1.3}px`,
                  }}
                  className="cursor-pointer gap-4 h-auto w-96 flex flex-col justify-center items-center p-6 bg-white shadow-md rounded-md"
                  key={index}
                >
                  <Avatar
                    size={120}
                    name={r.item.author}
                    variant="beam"
                    colors={[
                      "#beed80",
                      "#59d999",
                      "#31ada1",
                      "#51647a",
                      "#453c5c",
                    ]}
                  />
                  <div className="text-center">{r.item.author} </div>
                  <div className="text-sm bottom-2 right-2 text-primary bg-primary bg-opacity-30 rounded-sm px-2 py-1">
                    Author
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </>
  );
}
