import "./../styles/Dashboard.css";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import ProductForm from "../components/admin/ProductForm";
import ProductList from "../components/admin/ProductList";

export default function Dashboard() {
  const { user } = useAuth();
  const { products, loading } = useProducts();

  if (!user || user.role !== "admin") {
    return <h1>No autorizado</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard Admin</h1>

      <ProductForm />

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}
