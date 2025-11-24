import ProductRow from "./ProductRow";

export default function ProductList({ products }) {

  if (!products || products.length === 0) {
    return <p style={{ color: "white" }}>No hay productos cargados.</p>;
  }

  return (

    <div className="table">
      <div className="table-header">
        <span>Título</span>
        <span>Autor</span>
        <span>Precio</span>
        <span>Stock</span>
        <span>Acciones</span>
      </div>
    <div>
      {products.map((prod) => (
        <ProductRow key={prod.id} product={prod} />
      ))}
    </div>
    </div>
  );
}

