import ProductRow from "./ProductRow";

export default function ProductList({ products }) {

  if (!products || products.length === 0) {
    return <p style={{ color: "white" }}>No hay productos cargados.</p>;
  }

  return (
    <div>
      {products.map((prod) => (
        <ProductRow key={prod.id} product={prod} />
      ))}
    </div>
  );
}

