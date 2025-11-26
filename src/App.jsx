import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/*import Navbar from './components/Navbar';
import Footer from './components/Footer'; */
import Layout from './components/Layout';
import Home from './Pages/Home';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './Pages/Checkout';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedAdminRoute from "./components/ProtectedAdminRoute"; // add 26-11
import Screensaver from './components/Screensaver';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { CategoryProvider } from './context/CategoryContext';
import ProductEdit from "./components/admin/ProductEdit";
import './App.css';
// agregado el 25/11/2025
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App()
{
  return (
    <>
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <CategoryProvider>
        <Router basename="/artmarket/">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/Checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedAdminRoute>
                    <Dashboard />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/edit/:id"
                element={
                  <ProtectedAdminRoute>
                    <ProductEdit />
                  </ProtectedAdminRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <Screensaver />
        </Router>
        </CategoryProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
    <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
