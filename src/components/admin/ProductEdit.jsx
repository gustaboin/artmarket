import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import ProductForm from "./ProductForm";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, updateProduct } = useProducts();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!loading) {
      const p = products.find((p) => p.id === id);
      setProduct(p);
    }
  }, [products, loading, id]);

  const handleEdit = async (updatedData) => {
    await updateProduct(id, updatedData);
    navigate("/dashboard");
  };

  console.log("params id:", id);
console.log("products:", products);
console.log("product encontrado:", products.find((p) => p.id === id));
  if (loading) return <p>Cargando datos...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="dashboard-container">
     <div className="card">
                      <div className="info-header">
                    <h2>Editar Artículo:<a style={{color:"#3498db"}}> {product.title} </a></h2>
                    <button className="btn btn-secondary" style={{backgroundColor:"#0a3d62", color:"white"}} onClick={() => navigate('/dashboard')}>
                        Volver
                    </button>
                </div>
    <ProductForm
      mode="edit"
      initialData={product}
      onSubmit={handleEdit}
      
    />
    </div></div>
  );
}
