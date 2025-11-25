import "../../styles/Dashboard.css";

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay" onClick={onClose}>
      <div
        className="confirm-modal"
        onClick={(e) => e.stopPropagation()} // evita cierre al hacer clic dentro
      >
        <h3>ELIMINAR PRODUCTO</h3>
        <p>{message}</p>

        <div className="confirm-buttons">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn-confirm" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}