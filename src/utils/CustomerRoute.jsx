import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function CustomerRoute({ children }) {
  const { user, role, isAuth } = useAppContext();

  if (!isAuth || role !== "user" || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
