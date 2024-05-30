"use client";
import Workspace from "@/components/workspace";
import { redirect, useSearchParams } from "next/navigation";

function WorkspacePage() {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("id");
  if (!workspaceId) redirect("/home");
  return <Workspace id={workspaceId} />;
}

export default WorkspacePage;
