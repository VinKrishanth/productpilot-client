import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function AdminRoute({ children }) {
  
  const { isAdmin, role, isAuth } = useAppContext();
  if (!isAuth || role !== "admin" || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
