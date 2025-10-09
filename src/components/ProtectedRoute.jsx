
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) =>
{
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (isAuthenticated) return children;

    // redirijo a /login y dejo la ruta original en state (location.pathname)
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default ProtectedRoute;

