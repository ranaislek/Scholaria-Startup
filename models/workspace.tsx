import { Paper } from "./paper";

export type IWorkspace = {
  name: string;
  id: string;
  createdOn: Date;
  papers: Paper[];
};
