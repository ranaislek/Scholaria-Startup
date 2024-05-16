import Workspace from "@/components/workspace";

function WorkspacePage({ params }: { params: { id: string } }) {
  return <Workspace id={params.id} />;
}

export default WorkspacePage;

export async function generateStaticParams() {
  // TODO: fetch user workspaces here
  const mockWorkspaces = [
    {
      name: "My PhD Thesis",
      id: "123",
      createdOn: new Date("10/08/2023"),
    },
    {
      name: "Adam's Thesis",
      id: "1234",
      createdOn: new Date("10/10/2023"),
    },
  ];

  return mockWorkspaces.map((workspace) => ({
    id: workspace.id.toString(),
  }));
}
