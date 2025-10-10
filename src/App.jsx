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
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './App.css';

function App()
{
  return (
    <AuthProvider>
      <CartProvider>
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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
