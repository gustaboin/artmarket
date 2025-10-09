import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) =>
{
    const [user, setUser] = useState(null); // null si no está logueado

    useEffect(() =>
    {
        // Si guardás el usuario en localStorage al loguear:
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const login = (userData) =>
    {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () =>
    {
        setUser(null);
        localStorage.removeItem("user");
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
