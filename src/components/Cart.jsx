import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () =>
{
    const { cartItems, removeFromCart, clearCart } = useCart();

    if (cartItems.length === 0) return <p>Tu carrito está vacío.</p>;

    return (
        <div className="cart">
            <h2>Carrito</h2>
            {cartItems.map(item => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Precio unitario: ${item.price}</p>
                    <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
            ))}
            <hr />
            <p><strong>Total:</strong> ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
            <button onClick={clearCart}>Vaciar carrito</button>
        </div>
    );
};

export default Cart;
