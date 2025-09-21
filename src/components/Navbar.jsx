import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // importa el carrito desde el contexto
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
                <FaCartPlus size={24} />
                {totalItems > 0 && <span className="cart-count animar">{totalItems}</span>}
            </div>
        </nav>
    );
};

export default Navbar;
