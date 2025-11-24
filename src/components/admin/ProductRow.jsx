import { useProducts } from "../../context/ProductContext";

export default function ProductRow({ product }) {
  const { deleteProduct, updateProduct } = useProducts();

  return (
    <div className="table-row">
      <span>{product.title}</span>
      <span>{product.autor}</span>
      <span>{product.stock}</span>

      <span>
        <button className="action-btn edit" onClick={() =>
          updateProduct(product.id, { ...product, active: !product.active })
        }>
          {product.active ? "Desactivar" : "Activar"}
        </button>

        <button
          className="action-btn delete"
          onClick={() => deleteProduct(product.id)}
        >
          Eliminar
        </button>
      </span>
    </div>
  );
}

