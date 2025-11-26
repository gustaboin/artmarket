import "./../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/admin/ProductForm";
import ProductList from "../components/admin/ProductList";
import SuccessModal from "../components/admin/SuccessModal";
import { toast } from "react-toastify";


export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { products, loading, addProduct } = useProducts();
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast.error("Debes iniciar sesión como administrador");
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleCreateProduct = async (formData) => {
    await addProduct(formData);
    setSuccessOpen(true);
  };

  return (

<div className="dashboard-container">
  <h2 className="dashboard-title">Dashboard Admin</h2>
      <div className="card">
         <ProductForm mode="create" onSubmit={handleCreateProduct} />
      </div>
  <div className="table">
    {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ProductList products={products} />
      )}
  </div>
        <SuccessModal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        message="Producto agregado correctamente."
      />
</div>




  );
}
