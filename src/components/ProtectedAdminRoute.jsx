import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

// agregue esta proteccion porque tenia solo protected route para usuarios, 
// la logica de proteccion de dashboard y edit qudaban expuestas

export default function ProtectedAdminRoute({ children }) {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    toast.error("Acceso restringido. Solo administradores.");
    return <Navigate to="/" replace />;
  }

  return children;
}
