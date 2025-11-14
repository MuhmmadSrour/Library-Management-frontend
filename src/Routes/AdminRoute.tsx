import AppSidebar from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Admin from "@/pages/adminPages/AdminHome";
import Employees from "@/pages/adminPages/Employees";
import { Navigate, Route, Routes } from "react-router-dom";

function AdminRoute() {
  return (
    <div className="flex  h-screen  w-full ">
      <div>
        <AppSidebar />
        <SidebarTrigger className="text-brown-500 top-1 absolute left-1 font-medium hover:text-brown-500 hover:bg-brown-100" />
      </div>
      <div className="content sm:p-8  md:p-16 lg:p-16   w-full flex flex-col h-screen p-8 gap-4 bg-amber-50">
        <Routes>
          <Route path="/admin/home" element={<Admin />} />
          <Route path="/admin/employees" element={<Employees />} />

          <Route path="*" element={<Navigate to={"/admin/home"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminRoute;
