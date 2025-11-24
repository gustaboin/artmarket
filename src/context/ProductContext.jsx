import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

const API_URL = "https://68e45f7a8e116898997ba866.mockapi.io/products"; // Endpoint de mockapi

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  };


  const addProduct = async (data) => {
    const res = await axios.post(API_URL, data);
    setProducts([...products, res.data]);
  };

  const updateProduct = async (id, data) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    setProducts(products.map((p) => (p.id === id ? res.data : p)));
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setProducts(products.filter((p) => p.id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
