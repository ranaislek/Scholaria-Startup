import SearchBar from "@/components/search-bar";
import SideBar from "@/components/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideBar />
      <SearchBar />
      <div className="w-full min-h-screen pl-80">{children}</div>
    </>
  );
}
