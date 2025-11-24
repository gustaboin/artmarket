import { useProducts } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

export default function ProductRow({ product }) {

  const navigate = useNavigate();
  const { deleteProduct, updateProduct } = useProducts();

   // undefined o true => activo | para los productos viejos
  const isActive = product.active !== false;

  const toggleActive = () => {
    updateProduct(product.id, {
      ...product,
      active: !isActive,   // esto porque los productos viejos en mockapi me venian undefined
    });
  };

  return (
    <div className="table-row">
      <span>{product.title}</span>
      <span>{product.autor}</span>
      <span>${product.price}</span>
      <span>{product.stock}</span>

      <span className="buttons">
        <button className={`action-btn ${isActive ? "active" : "notActive"}`} onClick={toggleActive}>
          {isActive ? "Desactivar" : "Activar"}
        </button>
        <button
  className="action-btn edit"
  onClick={() => navigate(`/admin/edit/${product.id}`)}
>
  Editar
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


