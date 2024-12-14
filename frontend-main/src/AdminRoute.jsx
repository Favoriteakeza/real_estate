import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = sessionStorage.getItem("userRole");
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated && role === "admin") {
    return children;
  } else if (isAuthenticated && role !== "admin") {
    return <Navigate to="/unauthorized" />;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminRoute;
