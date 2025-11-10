import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}

export default Layout;
