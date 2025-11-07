import { useSignals } from "@preact/signals-react/runtime";
// import "./App.css";
import { token, UserInfo } from "./context/signal";
import AdminRoute from "./Routes/AdminRoute";
import EmployeeRoute from "./Routes/EmployeeRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import PuplicRoute from "./Routes/PuplicRoute";
function App() {
  useSignals();

  return (
    <div className="capitalize ">
      {token.value && UserInfo.value?.type == "PATRON" ? (
        <PrivateRoute />
      ) : token.value && UserInfo.value?.type == "ADMIN" ? (
        <AdminRoute />
      ) : token.value && UserInfo.value?.type == "EMPLOYEE" ? (
        <EmployeeRoute />
      ) : (
        <PuplicRoute />
      )}
    </div>
  );
}

export default App;
