import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../data/fakeApi';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () =>
{
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const navigate = useNavigate();

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
            <img
                style={{ maxWidth: '300px' }}
                src={`${import.meta.env.BASE_URL}${product.imageUrl}`}
                alt={product.title}
            />
            <div className="product-info">
                <h2>{product.title}</h2>
                <p>{product.description}</p>

                <p><strong>Artista:</strong> {product.autor}</p>
                <p><strong>Tipo:</strong> {product.format}</p>
                <p><strong>Dimensiones:</strong> {product.dimension}</p>

                <p><strong>Precio:</strong> u$s {product.price}</p>

                <button onClick={() => addToCart(product)}>Agregar al carrito</button>
            </div>
        </div>

    );
};

export default ProductDetail;
