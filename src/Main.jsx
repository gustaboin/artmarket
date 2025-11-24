import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext.jsx';
import './App.css';
import { initializeAdminUser } from './utils/userStorage.js';
    // inicalizo un user admin
    initializeAdminUser();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </AuthProvider>
    </React.StrictMode>
);
