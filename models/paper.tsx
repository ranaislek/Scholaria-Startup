export interface Paper {
  _id: string;
  title: string;
  authors?: string[];
  pdf?: string;
  publicationDate?: Date;
  isCompleted?: boolean;
  // TODO: separare these UI properties from Paper data interface
  size?: "xs" | "sm" | "md" | "lg";
  isSelectable?: boolean;
  abstract?: string;
}

export interface PaperData {
  _id: string;
  title: string;
  abstract?: string;
  publicationDate?: Date;
  pdf?: string;
}
