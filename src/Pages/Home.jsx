import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../data/fakeApi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';


const Home = () =>
{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    /** Modal State */
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    // const history = useNavigate(); cambio esta linea porque me genera error en navigate
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() =>
    {
        fetchProducts()
            .then((data) =>
            {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    const openModal = (product) =>
    {
        console.log(modalIsOpen)
        setSelectedProduct(product);
        setModalIsOpen(true);
    };

    const closeModal = () =>
    {
        setModalIsOpen(false);
        setSelectedProduct(null);
    };

    const goToProductDetail = () =>
    {
        if (selectedProduct)
        {
            //history.push(`/product/${selectedProduct.id}`);
            navigate(`/product/${selectedProduct.id}`);
            closeModal();
        }
    };

    const addFromModal = (e) =>
    {
        e.stopPropagation();
        if (selectedProduct)
        {
            addToCart(selectedProduct);

            // closeModal(); // Decido no cerrar el modal al agregar al carrito, o tengo que implentar un desvanecimiento
        }
    }

    if (loading) return <Loader />;

    return (
        <div className="home">
            <h1>Obras destacadas</h1>
            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        openModal={() => openModal(product)} />
                ))}
            </div>

            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Producto Detalles"
                ariaHideApp={false}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                {selectedProduct && (
                    <>
                        <h2>{selectedProduct.title} </h2>
                        <p>{selectedProduct.description}</p>
                        <img className='modal-image' src={`${import.meta.env.BASE_URL}${selectedProduct.imageUrl}`} alt={selectedProduct.title} />
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'center', marginBottom: '1rem' }}>
                            <button className="btn btn-success" onClick={addFromModal}>
                                Agregar al carrito
                            </button>
                            <button className="btn btn-primary" onClick={() => goToProductDetail()}>
                                Detalles
                            </button>
                            <button className='btn btn-danger' onClick={closeModal}>Cerrar</button>
                        </div>
                    </>
                )}
            </Modal>
        </div >
    );
};

export default Home;
