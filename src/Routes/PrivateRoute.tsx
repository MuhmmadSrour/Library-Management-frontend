import CatalogPage from "@/pages/catalogPage/CatalogPage";
import HomePage from "@/pages/homePage/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function PrivateRoute() {
  return (
    <div className="flex flex-col  min-h-screen overflow-hidden  my-2">
      <Navbar />
      <div className="content flex flex-1 mt-20    ">
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="*" element={<Navigate to={"/homepage"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default PrivateRoute;
