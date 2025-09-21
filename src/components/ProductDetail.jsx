import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../data/fakeApi';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const ProductDetail = () =>
{
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() =>
    {
        fetchProductById(productId)
            .then((data) =>
            {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) =>
            {
                console.error(error);
                setLoading(false);
            });
    }, [productId]);

    if (loading) return <Loader />;
    if (!product) return <p>Producto no encontrado</p>;

    return (
        <div className="product-detail">
            <img src={product.imageUrl} alt={product.title} />
            <h2>{product.title}</h2>
            <p><strong>Artista:</strong> {product.artist}</p>
            <p>{product.description}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        </div>
    );
};

export default ProductDetail;
