import Register from "@/pages/authPage/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/authPage/Login";
function PuplicRoute() {
  return (
    <div className="flex justify-center h-screen items-center ">
      <Routes>
        <Route path="*" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default PuplicRoute;
