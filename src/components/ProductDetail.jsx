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
            <img style={{ maxWidth: '300px' }} src={`${import.meta.env.BASE_URL}${product.imageUrl}`} alt={product.title} />
            <div className="product-info">
                <h2>{product.title}</h2>
                <p>{product.description}</p></div>


            <div>
                <p><strong>Artista:</strong> {product.artist}</p>

                <p><strong>Precio:</strong> ${product.price}</p>
                <button onClick={() => addToCart(product)}>Agregar al carrito</button>
            </div></div>
    );
};

export default ProductDetail;
