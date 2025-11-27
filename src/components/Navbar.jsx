import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // importo carrito  de Context
import { FaCartPlus } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';



const Navbar = () =>
{
    const { cartItems } = useCart();
    const { user, isAuthenticated, logout } = useAuth(); // agregado 10-10
    const navigate = useNavigate();
    const CartItemCount = cartItems.length;
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    //menu burguer 26-11-2025
    const [openMenu, setOpenMenu] = useState(false);


    // si cierra la sesion lo mando al home después del logout
    const handleLogout = () =>
    {
        logout();
        navigate('/');
        setOpenMenu(false);
    };

    const email = user?.email?.split('@')[0];

 return (
    <nav className="navbar">
      
      {/* Logo */}
      <div 
        className="logo" 
        data-text="Art Market"
        onClick={() => navigate("/")}
      >
        Art Market
      </div>

      {/* Hamburger button */}
      <div 
        className={`burger ${openMenu ? "open" : ""}`} 
        onClick={() => setOpenMenu(!openMenu)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <div className={`links ${openMenu ? "show" : ""}`}>
        
        <Link to="/" onClick={() => setOpenMenu(false)}>Inicio</Link>

        {user?.role === "admin" ? (
          <Link 
            to="/dashboard" 
            className="dashboard" 
            onClick={() => setOpenMenu(false)}
          >
            Dashboard
          </Link>
        ) : (
          <Link 
            to="/cart" 
            className="checkout" 
            onClick={() => setOpenMenu(false)}
          >
            Checkout
          </Link>
        )}

        {/* Carrito */}
        <div className="cart-icon">
          <Link 
            to="/cart" 
            className="cart-icon" 
            onClick={() => setOpenMenu(false)}
          >
            <FaCartPlus size={24} />
          </Link>
          {totalItems > 0 && (
            <span className="cart-count">{totalItems}</span>
          )}
        </div>

        {/* Login / Logout */}
        {!isAuthenticated ? (
          <Link 
            to="/login" 
            className="login-link" 
            onClick={() => setOpenMenu(false)}
          >
            Login
          </Link>
        ) : (
          <div className="user-info">
            <span className="user-name">Hola, {email}</span>
            <button className="btn-logout" onClick={handleLogout}>
              Salir
            </button>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
