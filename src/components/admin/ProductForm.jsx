import { useState } from "react";
import { useProducts } from "../../context/ProductContext";

export default function ProductForm() {
  const { addProduct } = useProducts();
  const [f, setF] = useState({
    title: "",
    autor: "",
    description: "",
    imagenUrl: "",
    price: "",
    stock: "",
    dimension: "",
    format: "",
    rating: "",
  });

  const handleChange = (e) =>
    setF({ ...f, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    addProduct(f);
    setF({
      title: "",
      autor: "",
      description: "",
      imagenUrl: "",
      price: "",
      stock: "",
      dimension: "",
      format: "",
      rating: "",
    });
  };

  return (
    <form onSubmit={submit} className="form-grid">
      <input name="title" placeholder="Título" value={f.title} onChange={handleChange} />
      <input name="autor" placeholder="Autor" value={f.autor} onChange={handleChange} />
      <input name="description" placeholder="Descripción" value={f.description} onChange={handleChange} />
      <input name="imagenUrl" placeholder="URL Imagen" value={f.imagenUrl} onChange={handleChange} />
      <input name="price" placeholder="Precio" value={f.price} onChange={handleChange} />
      <input name="stock" placeholder="Stock" value={f.stock} onChange={handleChange} />
      <input name="dimension" placeholder="Dimensión" value={f.dimension} onChange={handleChange} />
      <input name="format" placeholder="Formato" value={f.format} onChange={handleChange} />
      <input name="rating" placeholder="Rating" value={f.rating} onChange={handleChange} />

      <button className="btn-primary" type="submit">
        Crear
      </button>
    </form>
  );
}

