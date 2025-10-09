import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './../Styles/Checkout.css';
import './../App.css';

const Checkout = () =>
{
    const { cartItems, total, clearCart } = useCart();
    const navigate = useNavigate();
    const [showPay, setShowPay] = useState(false); // agregado el 05-10
    const { isAuthenticated } = useAuth(); // agregado el 09-10

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) =>
    {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () =>
    {
        // sacado del curso de NodeJs    
        const newErrors = {};
        if (!formData.name) newErrors.name = "Nombre requerido";
        if (!formData.email.includes('@')) newErrors.email = "Email inválido";
        if (!formData.address) newErrors.address = "Dirección requerida";
        if (!/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = "Número de tarjeta inválido";
        if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) newErrors.expiry = "Formato inválido (MM/YY)";
        if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = "CVV inválido";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if (!validate()) return;


        setTimeout(() =>
        {
            // Simulación de procesamiento tengo que cambiar el alert feo este por una tarjeta
            {/*   alert("Pago procesado con éxito. ¡Gracias por tu compra!");
            clearCart();
            navigate('/');
        }, 1000);*/}

            setShowPay(true);
            clearCart();
        }, 1000);

    };

    if (!cartItems.length && !showPay) // despues de 2 hs me di cuenta que tengo que agregar <> showPay para que funcione!!
    {
        return <p>Tu carrito está vacío. Agrega productos antes de proceder al pago.</p>;
    }

    return (
        <div>
            <div className="checkout">
                <h2>Finalizar compra</h2>

                <div className="order-summary">
                    <h3>Resumen de compra</h3>
                    {cartItems.map(item => (
                        <p key={item.id}>
                            {item.title} × {item.quantity} — ${item.price * item.quantity}
                        </p>
                    ))}
                    <hr />
                    <p><strong>Total: ${total.toFixed(2)}</strong></p>
                </div>

                <form onSubmit={handleSubmit} className="checkout-form">
                    <label>
                        Nombre completo:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </label>

                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </label>

                    <label>
                        Dirección:
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                        {errors.address && <span className="error">{errors.address}</span>}
                    </label>

                    <label>
                        Número de tarjeta:
                        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="1234567812345678" />
                        {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                    </label>

                    <label>
                        Vencimiento (MM/YY):
                        <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="12/25" />
                        {errors.expiry && <span className="error">{errors.expiry}</span>}
                    </label>

                    <label>
                        CVV:
                        <input type="password" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="555" />
                        {errors.cvv && <span className="error">{errors.cvv}</span>}
                    </label>

                    <button type="submit" className="btn btn-primary">Pagar</button>
                </form>
            </div>
            {/** Agregado el 05-10 para reemplazar el alert de pago existoso **/}
            {showPay && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h2>✅ Pago exitoso</h2>
                        <p>¡Gracias por tu compra! Tu pedido está siendo procesado.</p>
                        <button
                            className="btn btn-success"
                            onClick={() => navigate('/')}
                        >
                            Volver al inicio
                        </button>
                    </div>
                </div>
            )}

        </div>


    );
};

export default Checkout;