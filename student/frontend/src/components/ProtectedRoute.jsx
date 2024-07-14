import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  if (isAdmin === true) {
    return isAuthenticated && user.role === "admin" ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  } else {
    return isAuthenticated ? children : <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
