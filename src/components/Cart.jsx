import React from 'react';
import { useCart } from '../context/CartContext';
import './../styles/Cart.css';
import { useNavigate } from 'react-router-dom';


const Cart = () =>
{

    const { cartItems, removeItem, clearCart, addToCart, decreaseQuantity, total } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) return <p>Tu carrito está vacío.</p>;

    return (
        <div className="cart">
            <h2>Carrito</h2>
            {cartItems.map(item => (
                <div className='item-key' key={item.id}>
                    <img className="img" src={`${import.meta.env.BASE_URL}${item.imageUrl}`} alt={item.title} />
                    <h3>{item.title}</h3>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Precio unitario: ${item.price}</p>

                    <div className="qty-controls">
                        <button className="btn btn-primary" onClick={() => decreaseQuantity(item.id)}>-</button>
                        <span style={{ padding: '0 0.6rem', fontWeight: 700 }}>{item.quantity}</span>
                        <button className="btn btn-primary" onClick={() => addToCart(item, 1)}>+</button>
                    </div>
                    <button className="btn btn-danger" onClick={() => removeItem(item.id)}>Eliminar</button>
                </div>
            ))}
            <hr />
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '30px' }}><strong>Total:</strong> ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>

                <button className="btn btn-success" onClick={() => navigate('/Checkout')}>Proceder a Pago</button>

                <button className="btn btn-danger" onClick={clearCart}>Vaciar carrito</button>
            </div>
        </div >
    );
};

export default Cart;
