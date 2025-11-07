import AppSidebar from "@/components/AppSidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import EmployeeHome from "../pages/employeePages/EmployeeHome";

function EmployeeRoute() {
  return (
    <div className="flex  h-screen  w-full ">
      <div>
        <AppSidebar />
      </div>
      <div className="content sm:p-8  md:p-16 lg:p-16   w-full flex flex-col h-screen p-8 gap-4 bg-amber-50">
        <Routes>
          <Route path="/employee/home" element={<EmployeeHome />} />
          <Route path="*" element={<Navigate to={"/employee/home"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default EmployeeRoute;
