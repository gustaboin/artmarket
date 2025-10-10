import React from 'react';
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

    // si cierra la sesion lo mando al home después del logout
    const handleLogout = () =>
    {
        logout();
        navigate('/');
    };

    const email = user?.email?.split('@')[0];

    return (
        <nav>
            <div className="logo">Art Market</div>
            {/* <DarkModeToggle />*/}
            <div className="links">
                <Link to="/">Inicio</Link>
                <Link to="/cart" className='cart-icon checkout'>Checkout </Link>
                <div className="cart-icon">
                    <Link to="/cart" className='cart-icon'><FaCartPlus size={24} /></Link>
                    {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                </div>
                {!isAuthenticated ? (
                    <Link to="/login" className="cart-icon">Login</Link>
                ) : (
                    <div className="user-info-l">

                        <Link onClick={handleLogout} className="btn-logout">
                            Salir
                        </Link>
                        <span className="user-name">Hola, {email || "Usuario"}</span>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
