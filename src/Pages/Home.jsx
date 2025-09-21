import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../data/fakeApi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const Home = () =>
{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    /** Modal State */
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const history = useNavigate();

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
            history.push(`/product/${selectedProduct.id}`);
            closeModal();
        }
    };

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
                        <h2>{selectedProduct.name}</h2>
                        <p>{selectedProduct.description}</p>
                        <button onClick={closeModal}>Cerrar</button>
                        <button onClick={goToProductDetail}>Ver detalles</button>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Home;
