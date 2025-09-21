import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) =>
{
    // ⬇ Cargar desde localStorage si existe, o array vacío
    const [cartItems, setCartItems] = useState(() =>
    {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });


    useEffect(() =>
    {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) =>
    {
        setCartItems(prev =>
        {
            const existing = prev.find(item => item.id === product.id);
            if (existing)
            {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else
            {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) =>
    {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () =>
    {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
