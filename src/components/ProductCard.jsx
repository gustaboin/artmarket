import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, openModal }) =>
{ // Recibiendo openModal como prop
    const { addToCart } = useCart();

    return (
        <div className="product-card" onClick={() => openModal(product)}> {/* Ejecutando openModal al hacer clic */}
            <img src={product.imageUrl} alt={product.title} />
            <h3>{product.title}</h3>
            <h4>{product.autor}</h4>
            <p>{product.description}</p>
            <Link className="view-more" to={`/product/${product.id}`}>Ver más</Link>
            <button className="add-to-cart" onClick={(e) =>
            {
                e.stopPropagation();  // Para evitar que el clic en "Agregar al carrito" abra el modal
                addToCart(product);
            }}>
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductCard;
