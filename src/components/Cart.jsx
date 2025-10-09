import React from 'react';
import { useCart } from '../context/CartContext';
import './../styles/Cart.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cart = () =>
{

    const { cartItems, removeItem, clearCart, addToCart, decreaseQuantity, total } = useCart();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleCheckout = () =>
    {
        if (isAuthenticated)
        {
            navigate('/Checkout');
        }
        else
        {
            navigate('/Login', { state: { from: 'cart' } });
        }
    }

    if (cartItems.length === 0)
    {
        return (<div className="cart" style={{ backgroundColor: 'rgba(241,193,193,1)', marginTop: '20px', }}><h2>Tu carrito está vacío.</h2>
            <img className="img-vacio" src={`${import.meta.env.BASE_URL}${'/images/vacio.png'}`} alt="carrito vacio" />
            <Link to="/" className="btn btn-primary">
                Seguir navegando!
            </Link>
        </div >);
    }
    return (
        <div className="cart">
            <h2>Carrito</h2>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div className='item-key' key={item.id}>
                        <img className="img" src={`${import.meta.env.BASE_URL}images/${item.imageUrl}`} alt={item.title} />
                        <div className="cart-item-details">
                            <h3>{item.title}</h3>
                            {/*<p>Cantidad: {item.quantity}</p>*/}
                            <p>Precio unitario: ${item.price}</p>

                            <div className="qty-controls">
                                <p>Cantidad: </p>
                                <button className="btn btn-primary" onClick={() => decreaseQuantity(item.id)}>-</button>
                                <span style={{ padding: '0 0.6rem', fontWeight: 700 }}>{item.quantity}</span>
                                <button className="btn btn-primary" onClick={() => addToCart(item, 1)}>+</button>
                            </div>
                            <button className="btn btn-danger" onClick={() => removeItem(item.id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
            <hr />
            <div className="cart-summary">

                <p style={{ fontSize: '30px' }}><strong>Total:</strong> ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                <div className="cart-actions">
                    <button className="btn btn-success" onClick={handleCheckout}>Proceder a Pago</button>


                    <button className="btn btn-danger" onClick={clearCart}>Vaciar carrito</button>
                </div>
            </div >
        </div>
    );
};

export default Cart;
