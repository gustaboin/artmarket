import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../data/fakeApi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCategories } from '../context/CategoryContext'



const Home = () =>
{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Buscador 27-11//
    const [search, setSearch] = useState("");

    // Filtro categoría
    const { categories } = useCategories();
    const [categoryFilter, setCategoryFilter] = useState("");

    /** Modal State */
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    // const history = useNavigate(); cambio esta linea porque me genera error en navigate
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const baseUrl = import.meta.env.BASE_URL;
    // agrego un index 02-10-2025 para poder hacer mejor la navegabilidad con botones next y prev
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 4;

    // logica para la busqueda de productos //

        useEffect(() => {
        fetchProducts()
            .then((data) => {
                // FILTRO: solo active = true
                const filtered = data.filter((p) => p.active !== false);
                setProducts(filtered);
                setLoading(false);
            });
    }, []);

    // 🔍 FILTRO combinado (search + categoría)
    const filteredProducts = products.filter((p) => {
        const matchesSearch =
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.autor.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            categoryFilter === "" || p.categoryId === categoryFilter;

        return matchesSearch && matchesCategory;
    });




    const visibleProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const next = () =>
    {
        if (startIndex + itemsPerPage < products.length)
        {
            setStartIndex(startIndex + itemsPerPage);
        }
    };

    const prev = () =>
    {
        if (startIndex - itemsPerPage >= 0)
        {
            setStartIndex(startIndex - itemsPerPage);
        }
    };

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
            console.log("Navegando a producto con id:", selectedProduct.id);
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
            <div className="filters-container">
            <h1>Obras destacadas</h1>

            {/* BUSCADOR */}
            <input
                type="text"
                placeholder="Buscar por título, autor o descripción..."
                value={search}
                onChange={(e) => {
                    setStartIndex(0);
                    setSearch(e.target.value);
                }}
                className="search-input"
            />

            {/* SELECT CATEGORÍAS */}
            <select
                className="search-input"
                value={categoryFilter}
                onChange={(e) => {
                    setStartIndex(0);
                    setCategoryFilter(e.target.value);
                }}
            >
                <option value="">Todas las categorías</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>

            </div>
            <div className="products-grid">
                {visibleProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        openModal={() => openModal(product)} />
                ))}
            </div>
            <div className="slider-controls">
                <button onClick={prev} disabled={startIndex === 0}>◄</button>
                <button onClick={next} disabled={startIndex + itemsPerPage >= products.length}>►</button>
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
                        

                        <img 
                            className='modal-image' 
                            src={
                                selectedProduct.imageUrl && (
                                    selectedProduct.imageUrl.startsWith('http') || selectedProduct.imageUrl.startsWith('https')
                                        ? selectedProduct.imageUrl // Externa: Uso la URL tal cual
                                        : `${baseUrl}images/${selectedProduct.imageUrl}` // Interna: Concateno la base
                                )
                            } 
                            alt={selectedProduct.title} 
                        />
                        
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
