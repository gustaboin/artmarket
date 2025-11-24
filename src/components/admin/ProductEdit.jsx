import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import ProductForm from "./ProductForm";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProducts();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const p = products.find((p) => p.id === id);
    setProduct(p);
  }, [products, id]);

  const handleEdit = async (updatedData) => {
    await updateProduct(id, updatedData);
    navigate("/dashboard");
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="dashboard-container">
     <div className="card">
    <ProductForm
      mode="edit"
      initialData={product}
      onSubmit={handleEdit}
    />
    </div></div>
  );
}
