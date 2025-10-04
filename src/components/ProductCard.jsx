import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, openModal }) =>
{ // Recibiendo openModal como prop
    const { addToCart } = useCart();

    return (
        <div className="product-card" onClick={() => openModal(product)}> {/* Ejecutando openModal al hacer clic */}
            {/* <img src={product.imageUrl} alt={product.title} / > * /} {/ * comento para poder publicar en git con la ruta */}
            <div className="product-content">
                <img src={`${import.meta.env.BASE_URL}${product.imageUrl}`} alt={product.title} />
                <h3>{product.title}</h3>
                <h4>{product.autor}</h4>
                <p>{product.description.substring(0, 80) + "..."}</p>
                <p class="precio">Precio unitario: u$s {product.price}</p>
            </div>
            <div className="product-actions">
                <Link className="btn btn-secondary" to={`/product/${product.id}`}>Ver más</Link>
                <button className="add-to-cart" onClick={(e) =>
                {
                    e.stopPropagation();  // Para evitar que el clic en "Agregar al carrito" abra el modal
                    addToCart(product);
                }}>
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
