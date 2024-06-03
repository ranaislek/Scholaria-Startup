import React from "react";
import PaperCard from "./paper-card";
import { Paper } from "@/models/paper";

export interface PaperGridButtonProps {
  label: string;
  onClick: () => void;
}

export interface PaperGridProps {
  title?: string;
  subtitle?: string;
  isSelectable?: boolean;
  button?: PaperGridButtonProps;
  papers: Paper[];
}

const PaperGrid: React.FC<PaperGridProps> = ({
  papers,
  title,
  subtitle,
  button,
  isSelectable,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-start py-4">
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
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {papers.map((paper, index) => {
          if (!paper) return;
          return (
            <PaperCard key={index} {...paper} isSelectable={isSelectable} />
          );
        })}
      </div>
    </div>
  );
};

export default PaperGrid;
