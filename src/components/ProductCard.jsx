import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaStar } from 'react-icons/fa';
// import RatingStars from './RatingStars'; --> proximo paso estrellas segun el rating

const ProductCard = ({ product, openModal }) =>
{ // Recibiendo openModal como prop
    const { addToCart } = useCart();

    const baseUrl = import.meta.env.BASE_URL;
    
    const imageSource = 
        product.imageUrl && (
            product.imageUrl.startsWith('http') || product.imageUrl.startsWith('https')
                ? product.imageUrl // Si es externa, uso url
                : `${baseUrl}images/${product.imageUrl}` // Si es interna, concateno
        );

    return (
        <div className="product-card" onClick={() => openModal(product)}> {/* Ejecutando openModal al hacer clic */}
            
            <div className="product-content">
            {/*    <img src={`${import.meta.env.BASE_URL}images/${product.imageUrl}`} alt={product.title} /> */}
            <img src={imageSource} alt={product.title} />
                <h3>{product.title}</h3>
                <h4>{product.autor}</h4>
                <p>{product.description.substring(0, 80) + "..."}</p>
                <p className="precio">Precio unitario: u$s {product.price}</p>
                <div className="rating" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>Rating: {product.rating}</span>
                    {/*<RatingStars rating={parseFloat(product.rating)} size={18} />*/}
                    <FaStar />
                </div>
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
