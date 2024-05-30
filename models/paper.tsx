export interface Paper {
  id: string;
  title: string;
  authors?: string[];
  pdf?: string;
  publicationDate?: Date;
  isCompleted?: boolean;
  // TODO: separare these UI properties from Paper data interface
  size?: "xs" | "sm" | "md" | "lg";
  isSelectable?: boolean;
}

export interface PaperData {
  title: string;
  abstract?: string;
  publicationDate?: Date;
  pdf?: string;
}
