import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth.context";
import { SearchProvider } from "@/contexts/search.context";
import { SideBarProvider } from "@/contexts/sidebar.context";
import { PDFViewerProvider } from "@/contexts/pdf-viewer.context";
import { ToastsProvider } from "@/contexts/toast.context";
import { WorkspacesProvider } from "@/contexts/workspace.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scholaria",
  description: "Your Research Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <QueryClientProvider client={queryClient}> */}
        <ToastsProvider>
          <AuthProvider>
            <WorkspacesProvider>
              <PDFViewerProvider>
                <SearchProvider>
                  <SideBarProvider>
                    <>{children}</>
                  </SideBarProvider>
                </SearchProvider>
              </PDFViewerProvider>
            </WorkspacesProvider>
          </AuthProvider>
        </ToastsProvider>
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
