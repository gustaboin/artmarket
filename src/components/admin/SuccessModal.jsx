import "../../styles/Dashboard.css";

export default function SuccessModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="success-overlay" onClick={onClose}>
      <div
        className="success-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>✔ Operación exitosa</h3>
        <p>{message}</p>

        <button className="btn-success-modal" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
