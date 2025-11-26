import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();


export const CartProvider = ({ children }) =>
{
    // ⬇ Cargar desde localStorage si existe, o array vacío
    const [cartItems, setCartItems] = useState(() =>
    {
        try // agrego try catch por si surge un error al parsear el JSON
        {
            const stored = localStorage.getItem("cart");
            return stored ? JSON.parse(stored) : [];
        } catch (error)
        {
            console.error("Error al cargar el carrito desde localStorage:", error);
            return [];
        }
    });


    useEffect(() =>
    {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, qty = 1) => // qty para agregar multiples antes tenia hardcodeado 1
    {
        setCartItems(prev =>
        {
            const existing = prev.find(item => item.id === product.id);
            if (existing)
            {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            } else
            {
                return [...prev, { ...product, quantity: qty }];
            }
        });
        toast.success("Producto agregado al carrito 🛒");
    };

    // funcion para eliminar unidad del carrito
    const decreaseQuantity = (productId) =>
    {
        setCartItems((prev) =>
        {
            const found = prev.find((p) => p.id === productId);
            if (!found) return prev;
            if (found.quantity <= 1)
            {
                // quitar el item si se reduce a 0
                return prev.filter((p) => p.id !== productId);
            } else
            {
                return prev.map((p) => p.id === productId ? { ...p, quantity: p.quantity - 1 } : p);
            }
        });
    };

    const setItemQuantity = (productId, qty) =>
    {
        if (qty <= 0)
        {
            removeItem(productId);
            return;
        }
        setCartItems((prev) => prev.map((p) => p.id === productId ? { ...p, quantity: qty } : p));
    };

    const removeItem = (productId) =>
    {
        setCartItems((prev) => prev.filter((p) => p.id !== productId));
    };

    const clearCart = () =>
    {
        setCartItems([]);
    };

    const total = cartItems.reduce((acc, it) => acc + it.price * (it.quantity || 0), 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                decreaseQuantity,
                clearCart,
                setItemQuantity,
                removeItem,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () =>
{
    return useContext(CartContext);
};