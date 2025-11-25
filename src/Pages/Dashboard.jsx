import "./../styles/Dashboard.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import ProductForm from "../components/admin/ProductForm";
import ProductList from "../components/admin/ProductList";
import SuccessModal from "../components/admin/SuccessModal";


export default function Dashboard() {
  const { user } = useAuth();
  
  const { products, loading, addProduct } = useProducts();
   const [successOpen, setSuccessOpen] = useState(false);

  if (!user || user.role !== "admin") {
    return <h1>No autorizado</h1>;
  }

    const handleCreateProduct = async (formData) => {
    await addProduct(formData);
    setSuccessOpen(true); // Abrimos modal de éxito
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
