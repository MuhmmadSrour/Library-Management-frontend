import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import "./index.css";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <App />
        <Toaster />
      </SidebarProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
