import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // importo carrito  de Context
import { FaCartPlus } from "react-icons/fa";
import '../App.css';

const Navbar = () =>
{
    const { cartItems } = useCart();

    const CartItemCount = cartItems.length;
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav>
            <div className="logo">Arte Marketplace</div>
            <div className="links">
                <Link to="/">Inicio</Link>
                <Link to="/cart" className='cart-icon'>Checkout </Link>
                <Link to="/cart" className='cart-icon'><FaCartPlus size={24} /></Link>
                {totalItems > 0 && <span className="cart-count animar">{totalItems}</span>}
            </div>
        </nav>
    );
};

export default Navbar;
