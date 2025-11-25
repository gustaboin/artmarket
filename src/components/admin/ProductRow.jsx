import { useProducts } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function ProductRow({ product }) {
  const navigate = useNavigate();
  const { deleteProduct, updateProduct } = useProducts();

  const [confirmOpen, setConfirmOpen] = useState(false);

  // undefined o true => activo
  const isActive = product.active !== false;

  const toggleActive = () => {
    updateProduct(product.id, {
      ...product,
      active: !isActive,
    });
  };

  const handleDelete = () => {
    deleteProduct(product.id);
    setConfirmOpen(false); // cierro modal luego de eliminar
  };

  return (
    <>
      <div className="table-row">
        <span>{product.title}</span>
        <span>{product.autor}</span>
        <span>${product.price}</span>
        <span>{product.stock}</span>

        <span className="buttons">
          {/* ACTIVAR / DESACTIVAR */}
          <button
            className={`action-btn ${isActive ? "active" : "notActive"}`}
            onClick={toggleActive}
          >
            {isActive ? "Desactivar" : "Activar"}
          </button>

          {/* EDITAR */}
          <button
            className="action-btn edit"
            onClick={() => navigate(`/admin/edit/${product.id}`)}
          >
            Editar
          </button>

          {/* ELIMINAR */}
          <button
            className="action-btn delete"
            onClick={() => setConfirmOpen(true)}
          >
            Eliminar
          </button>
        </span>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        message={`¿Seguro que querés eliminar "${product.title}"?`}
      />
    </>
  );
}
