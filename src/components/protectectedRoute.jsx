import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, show the requested page
  return children;
};

export default ProtectedRoute;
