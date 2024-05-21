"use client";
import Workspace from "@/components/workspace";
import { redirect, useSearchParams } from "next/navigation";

function WorkspacePage() {
  const searchParams = useSearchParams();
  const workplaceId = searchParams.get("id");
  if (!workplaceId) redirect("/home");
  return <Workspace id={workplaceId} />;
}

export default WorkspacePage;
