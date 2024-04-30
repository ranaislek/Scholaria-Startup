import React from "react";
import PaperCard from "./paper-card";
import { Paper } from "@/models/paper";

export interface PaperCarouselButtonProps {
  label: string;
  onClick: () => void;
}

export interface PaperCarouselProps {
  title: string;
  subtitle?: string;
  button?: PaperCarouselButtonProps;
  papers: Paper[];
}

function PaperCarousel({
  papers,
  title,
  subtitle,
  button,
}: PaperCarouselProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-start pb-4">
        <div className="flex flex-col">
          <div className="text-2xl font-bold">{title}</div>
          {subtitle && <div className="text-gray-500">{subtitle}</div>}
        </div>
        {button && (
          <div
            className="cursor-pointer rounded-full py-2 px-4 text-gray-500 bg-gray-200 hover:bg-opacity-75"
            onClick={button.onClick}
          >
            {button.label}
          </div>
        )}
      </div>
      <div className="flex gap-8">
        {papers.map((paper, index) => (
          <PaperCard {...paper} size="md" key={index} />
        ))}
      </div>
    </div>
  );
}

export default PaperCarousel;
