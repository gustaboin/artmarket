import React, { useState } from "react";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { verifyLogin } from "../utils/userStorage";
import "../Styles/Login.css";

const Login = () =>
{
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();

    const [form, setForm] = useState({ usuario: "", password: "", role:"" });
    const [error, setError] = useState("");

    /*
    // Si ya está autenticado, lo redirigimos a la página de inicio (Home)
    if (isAuthenticated)
    {
        return <Navigate to="/" replace />;
    }

    */
    const handleChange = (e) =>
    {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setError("");

        if (form.usuario.trim() === "" || form.password.trim() === "")
        {
            setError("Por favor, ingresa tu email y contraseña.");
            return;
        }

        try
        {
            // 1. Verificar credenciales y obtener datos
            const userData = verifyLogin({
                email: form.usuario,
                password: form.password,
            });

            login(userData);

            if (userData.role === "admin") 
            {
                navigate("/dashboard");
            }
            else if (location.state?.from === "cart")
            {
                navigate("/checkout");
            } 
            else
            {
                navigate("/");
            }
            
        } catch (err)
        {

            setError(err.message);
        }
    };

    return (
        <div className="login-page">
            <h1>Iniciar sesión</h1>

            <form onSubmit={handleSubmit} className="login-form">

                <input
                    type="email"
                    name="usuario"
                    value={form.usuario}
                    onChange={handleChange}
                    placeholder="Email"
                />

                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                />

                {error && <p className="error">{error}</p>}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'center', marginBottom: '1rem' }}>
                    <button type="submit" className="btn-login">
                        Ingresar
                    </button>
                </div>
            </form>
            <p className="register-link">
                ¿No tenés cuenta? <Link to="/register">Registrate</Link>
            </p>
        </div>
    );
};

export default Login;