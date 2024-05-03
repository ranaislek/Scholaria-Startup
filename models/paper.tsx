export interface Paper {
  id: string;
  title: string;
  authors: string[];
  pdfUrl: string;
  uploadDate: Date;
  isCompleted?: boolean;
  // TODO: separare these UI properties from Paper data interface
  size?: "xs" | "sm" | "md" | "lg";
  isSelectable?: boolean;
}
