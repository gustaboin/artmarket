import { useState, useEffect } from "react";

export default function ProductForm({ initialData, onSubmit, mode = "create" }) {
  
  const [form, setForm] = useState({
    title: "",
    autor: "",
    description: "",
    imagenUrl: "",
    price: "",
    stock: "",
    dimension: "",
    format: "",
    rating: "",
    active: true,
  });

  const [errors, setErrors] = useState({});

  // si initialData existe, cargamos los datos en el form
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "El título es obligatorio";
    if (!form.autor.trim()) err.autor = "El autor es obligatorio";
    if (!form.imagenUrl.trim()) err.imagenUrl = "La URL es obligatoria";
    if (!form.price || isNaN(form.price)) err.price = "Precio inválido";
    if (!form.stock || isNaN(form.stock)) err.stock = "Stock inválido";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">

      <div>
        <input name="title" placeholder="Título" value={form.title} onChange={handleChange} />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>

      <div>
        <input name="autor" placeholder="Autor" value={form.autor} onChange={handleChange} />
        {errors.autor && <p className="error">{errors.autor}</p>}
      </div>

      <div>
        <input name="imageUrl" placeholder="URL Imagen" value={form.imageUrl} onChange={handleChange} />
        {errors.imagenUrl && <p className="error">{errors.imagenUrl}</p>}
      </div>

      <div>
        <input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} />
        {errors.price && <p className="error">{errors.price}</p>}
      </div>

      <div>
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
        {errors.stock && <p className="error">{errors.stock}</p>}
      </div>

      <input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
      <input name="dimension" placeholder="Dimensión" value={form.dimension} onChange={handleChange} />
      <input name="format" placeholder="Formato" value={form.format} onChange={handleChange} />
      <input name="rating" placeholder="Rating" value={form.rating} onChange={handleChange} />

      <button className="btn-primary" type="submit">
        {mode === "edit" ? "Guardar cambios" : "Crear"}
      </button>

    </form>
  );
}
