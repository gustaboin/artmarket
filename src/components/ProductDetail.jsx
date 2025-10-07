import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../data/fakeApi';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () =>
{
    const { productId } = useParams();
    console.log("ID que llega al detalle:", productId);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const navigate = useNavigate(); // aca para poner un boton de volver

    useEffect(() =>
    {
        // --> los console log porque mockapi me volvio loco es malisimo el endpoint
        //console.log("Buscando producto ID:", productId); 
        fetchProductById(productId)
            .then((data) =>
            {
                //      console.log("Producto encontrado:", data);
                setProduct(data);
                setLoading(false);
            })
            .catch((error) =>
            {
                //    console.error("Error al cargar producto:", error);
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
                src={`${import.meta.env.BASE_URL}images/${product.imageUrl}`}
                alt={product.title}
            />
            <div className="product-info">
                <div className="info-header">
                    <h2>{product.title}</h2><button className="btn btn-secondary" onClick={() => navigate('/')}>
                        Volver
                    </button>
                </div>

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
