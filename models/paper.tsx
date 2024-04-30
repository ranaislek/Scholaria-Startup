export interface Paper {
  id: string;
  title: string;
  authors: string[];
  pdfUrl: string;
  uploadDate: Date;
  size?: "xs" | "sm" | "md" | "lg";
  isSelectable?: boolean;
  isCompleted?: boolean;
}
